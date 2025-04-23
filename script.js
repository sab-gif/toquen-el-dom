
const keys  = document.querySelectorAll(".key"); //NodeList [] 

const adjustVolume = (audio) => {
    const volumeSlider = document.getElementById("volume-slider");
    const volume = volumeSlider.value;
    audio.volume = volume;
}

//Mouse or click
const playNote = (key) => {
    const note = key.getAttribute("data-note");
    const audio = new Audio(`./assets/note-sounds/${note}.mp3`);
    adjustVolume(audio);
    audio.currentTime= 0;
    audio.playbackRate = 1;
    audio.play();
    key.classList.add('active');
}

const pauseNote = (key) => {
    const note = key.getAttribute("data-note");
    const audio = new Audio(`./assets/note-sounds/${note}.mp3`);
    key.classList.remove('active')
    if (!audio.paused) {
        setTimeout(() => {
            audio.pause()}, 500)
    }
}

const createText = (key) => {
    const note = key.getAttribute("data-note");
    const keyboard = key.getAttribute("data-key");
    //Letters in piano buttons
    let keysContainer = document.createElement("span");
    let notesContainer = document.createElement("span");
    let lineBreak = document.createElement("br");

    //add classes
    if (key.classList.contains('black')){
        keysContainer.classList. add("black");
        notesContainer.classList. add("black");
    }
    keysContainer.classList. add("keyText");
    notesContainer.classList. add("noteText");

    //add content
    keysContainer.textContent = `${keyboard.toUpperCase()}`;
    notesContainer.textContent = `${note}`;

    key.appendChild(keysContainer);
    key.appendChild(lineBreak);
    key.appendChild(notesContainer);
}

keys.forEach(key => {
    createText(key);
    //Click events to play note
    key.addEventListener("mousedown", () => playNote(key));
    key.addEventListener("mouseout", () => pauseNote(key));     
    key.addEventListener("mouseup", () => pauseNote(key));  
})

const pressedKeys = new Set();

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

//Switch function
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
