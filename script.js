/* ----- Sound and key animation ----- */

const keys  = document.querySelectorAll(".key"); //NodeList [] 
const volumeSlider = document.getElementById("volume-slider");

let audioPlayed = 0;

const playNote = (key) => {
    const note = key.getAttribute("data-note");
    const audio = new Audio(`./assets/note-sounds/${note}.mp3`);
    audioPlayed = audio;
    audio.volume = volumeSlider.value;
    audio.currentTime= 0;
    audio.playbackRate = 1;
    audio.play();
    key.classList.add('active');

    //Make long notes last more time
    let speed;
    let jump = 0.111111;
    let interval = setInterval(() => {
        speed = 1 - jump;
        jump = Math.cbrt(jump);
        audio.playbackRate = speed;
        if (speed<=0.22 || audio.paused || audio.ended){
            clearInterval(interval);
        } }, 100);
}

const pauseNote = (key) => {
    let audio = audioPlayed;
    key.classList.remove('active');
    if (!audio.paused) {
        setTimeout(() => {
            audio.muted = true;
            audio.pause();}, 200)
    }
}

//Click events in each button
keys.forEach(key => {
    key.addEventListener("mousedown", () => {playNote(key)});
    key.addEventListener("mouseout", () => {pauseNote(key)});     
    key.addEventListener("mouseup", () => {pauseNote(key)});  
})

const pressedKeys = new Set();

//Keyboard events in the document
document.addEventListener("keydown", function(event){
    const key = event.key.toLowerCase();
    if (pressedKeys.has(key)){
        return;
    }
    pressedKeys.add(key);
    const keyElement = document.querySelector(`.key[data-key="${key}"]`);
    playNote(keyElement);
    if(!keyElement){
        return;
    }
});

document.addEventListener("keyup", function(event){
    const key = event.key.toLowerCase();
    pressedKeys.delete(key);
    const keyElement = document.querySelector(`.key[data-key="${key}"]`);
    pauseNote(keyElement);
});

/* ----- Letterrs and keyboard text ----- */

const createText = (key) => {
    const note = key.getAttribute("data-note");
    const keyboard = key.getAttribute("data-key");
    let keysContainer = document.createElement("span");
    let notesContainer = document.createElement("span");
    let lineBreak = document.createElement("br");
    if (key.classList.contains('black')){
        keysContainer.classList. add("black");
        notesContainer.classList. add("black");
    }
    keysContainer.classList. add("keyText");
    notesContainer.classList. add("noteText");
    keysContainer.textContent = `${keyboard.toUpperCase()}`;
    notesContainer.textContent = `${note}`;
    key.appendChild(keysContainer);
    key.appendChild(lineBreak);
    key.appendChild(notesContainer);
}

keys.forEach(key => {
    createText(key);
})

const toggleSwitch = (keysText, checkbox) => {
    for (const key of keysText){
        if (checkbox.checked == true){
            if (key.classList.contains('black')){
                key.style.color = "white";
            } else {
                key.style.color = "black";
            }
        } else {
            key.style.color = "transparent";
        }
    }
}

//Piano notes switch
const noteCheckbox = document.getElementById("note-checkbox");
const notesText  = document.querySelectorAll(".noteText"); 
noteCheckbox.addEventListener("change", () => toggleSwitch(notesText, noteCheckbox));

//Keyboard letters switch
const keysCheckbox = document.getElementById("letters-checkbox");
const keysText  = document.querySelectorAll(".keyText"); 
keysCheckbox.addEventListener("change", () => toggleSwitch(keysText, keysCheckbox));
