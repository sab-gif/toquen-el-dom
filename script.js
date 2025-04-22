
const keys  = document.querySelectorAll(".key"); //NodeList [] 

const adjustVolume = (audio) => {
    const volumeSlider = document.getElementById("volume-slider");
    const volume = volumeSlider.value;
    audio.volume = volume;
}

//Mouse or click
const playNoteClick = (key, audio) => {
    adjustVolume(audio);
    audio.currentTime= 0;
    audio.playbackRate = 1;
    audio.play();
    key.classList.add('active');
}

const pauseNoteClick = (key, audio) => {
    key.classList.remove('active')
    if (!audio.paused) {
        setTimeout(() => {
            audio.pause()}, 500)
    }
}

keys.forEach(key => {
    const note = key.getAttribute("data-note");
    const keyboard = key.getAttribute("data-key");
    const audio = new Audio(`./assets/note-sounds/${note}.mp3`);

    //Letters in piano buttons
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

    //Click events to play note
    key.addEventListener("mousedown", () => playNoteClick(key, audio));
    key.addEventListener("mouseout", () => pauseNoteClick(key, audio));     
    key.addEventListener("mouseup", () => pauseNoteClick(key, audio));  
})

//Keyboard keys
const playNoteKeyboard = (keyElement) => {
    const note = keyElement.getAttribute("data-note");
    const audio = new Audio(`./assets/note-sounds/${note}.mp3`);
    adjustVolume(audio);
    audio.currentTime = 0;
    audio.play();
    keyElement.classList.add('active');
}

const pauseNoteKeyboard = (keyElement) => {
    const note = keyElement.getAttribute("data-note");
    const audio = new Audio(`./assets/note-sounds/${note}.mp3`);
    keyElement.classList.remove('active');
    if (!audio.paused) {
        setTimeout(() => {
            audio.pause()}, 500)
    }
}

const pressedKeys = new Set();

document.addEventListener("keydown", function(event){
    const key = event.key.toLowerCase();
    console.log(key)
    if (pressedKeys.has(key)){
        return;
    }
    pressedKeys.add(key);
    const keyElement = document.querySelector(`.key[data-key="${key}"]`);
    playNoteKeyboard(keyElement);
    if(!keyElement){
        return;
    }
});

document.addEventListener("keyup", function(event){
    const key = event.key.toLowerCase();
    pressedKeys.delete(key);
    const keyElement = document.querySelector(`.key[data-key="${key}"]`);
    pauseNoteKeyboard(keyElement);
});

const noteCheckbox = document.getElementById("note-checkbox");

const toggleNotes = () => {
    const keysText  = document.querySelectorAll(".noteText"); 
    for (const key of keysText){
        if (noteCheckbox.checked == true){
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

noteCheckbox.addEventListener("change", toggleNotes);

const keysCheckbox = document.getElementById("letters-checkbox");

const toggleKeys = () => {
    const keysText  = document.querySelectorAll(".keyText"); 
    for (const key of keysText){
        if (keysCheckbox.checked == true){
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

keysCheckbox.addEventListener("change", toggleKeys);