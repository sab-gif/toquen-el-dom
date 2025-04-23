
const keys  = document.querySelectorAll(".key"); //NodeList [] 

const adjustVolume = (audio) => {
    const volumeSlider = document.getElementById("volume-slider");
    const volume = volumeSlider.value;
    audio.volume = volume;
}

/* const getAudio = (key) => {
    const note = key.getAttribute("data-note");
    const audio = new Audio(`./assets/note-sounds/${note}.mp3`);
    return audio;
} */

//Variable to store the audio being played
let audioPlayed = 0;

//Mouse or click
const playNote = (key) => {
    const note = key.getAttribute("data-note");
    const audio = new Audio(`./assets/note-sounds/${note}.mp3`);

    audioPlayed = audio;
    //console.log("new audio");

    adjustVolume(audio);
    audio.currentTime= 0;
    audio.playbackRate = 1;
    let speed;
    let jump = 0.111111;
    audio.play();

    //Make long notes last more time
    let interval = setInterval(() => {
        speed = 1 - jump;
        jump = Math.cbrt(jump);
        audio.playbackRate = speed;
        //console.log("speed " + speed + "audio " + audio.playbackRate)
        if (speed<=0.22 || audio.paused || audio.ended){
            clearInterval(interval);
        } }, 500);
    key.classList.add('active');
    //audio.addEventListener("pause", () => {console.log("audio paused")});

}

const pauseNote = (key, audio) => {
    //console.log("start pause " + audio.paused +" ended "+ audio.ended);
    key.classList.remove('active');
    if (!audio.paused) {
        setTimeout(() => {
            audio.muted = true;
            audio.pause(); /* console.log(audio.paused) */}, 200)
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
    key.addEventListener("mousedown", () => {/* console.log("one") */; playNote(key)});
    key.addEventListener("mouseout", () => {/* console.log("two" ) */; pauseNote(key, audioPlayed)});     
    key.addEventListener("mouseup", () => {/* console.log("three") */; pauseNote(key, audioPlayed)});  
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
    pauseNote(keyElement, audioPlayed);
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
