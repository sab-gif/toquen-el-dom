
const keys  = document.querySelectorAll(".key"); //NodeList [] 

//Mouse or click
const playNoteClick = (key, audio) => {
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
    key.textContent = `${note}\n${keyboard.toUpperCase()}`;
    key.addEventListener("mousedown", () => playNoteClick(key, audio));
    key.addEventListener("mouseout", () => pauseNoteClick(key, audio));     
    key.addEventListener("mouseup", () => pauseNoteClick(key, audio));  
})

//Keyboard keys
const playNoteKeyboard = (keyElement) => {
    const note = keyElement.getAttribute("data-note");
    const audio = new Audio(`./assets/note-sounds/${note}.mp3`);
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

