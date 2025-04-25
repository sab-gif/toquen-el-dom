/* ----- Sound and key animation ----- */

//Select elements from HTML
const keys  = document.querySelectorAll(".key"); //NodeList [] 
const volumeSlider = document.getElementById("volume-slider");

//Variable to store the audio being played
let audioPlayed = 0;

//Play function
const playNote = (key) => {

    //get the audio
    const note = key.getAttribute("data-note");
    const audio = new Audio(`./assets/note-sounds/${note}.mp3`);

    //store audio in variable for pause
    audioPlayed = audio;

    //adjust audio properties
    audio.volume = volumeSlider.value;
    audio.currentTime= 0;
    audio.playbackRate = 1;

    audio.play();

    //Make long notes last more time
    let speed;
    let jump = 0.111111;
    let interval = setInterval(() => {
        speed = 1 - jump;
        jump = Math.cbrt(jump);
        audio.playbackRate = speed;
        //stop interval if audio stops
        if (speed<=0.22 || audio.paused || audio.ended){
            clearInterval(interval);
        } }, 100);

    //add class for visual response
    key.classList.add('active');
}

//Pause function
const pauseNote = (key) => {

    //select audio from variable
    let audio = audioPlayed;

    //remove class for visual response
    key.classList.remove('active');

    //pause after timeout
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

//Variable to store pressed keyboard keys
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

//add text to buttons function
const createText = (key) => {
    
    //get the text content
    const note = key.getAttribute("data-note");
    const keyboard = key.getAttribute("data-key");

    //letters in piano buttons
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

    //move inside the button
    key.appendChild(keysContainer);
    key.appendChild(lineBreak);
    key.appendChild(notesContainer);
}

keys.forEach(key => {
    createText(key);
})

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
