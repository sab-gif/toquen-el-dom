/* ----- Sound and key animation ----- */

const volumeSlider = document.getElementById("volume-slider");
const audiosPlayed = new Set();

export const playNote = (key) => {
    const note = key.dataset.note;
    const audio = new Audio(`../assets/note-sounds/${note}.mp3`);

    audiosPlayed.add(audio);
    audio.volume = volumeSlider.value;
    audio.currentTime = 0;
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
        if (speed <= 0.22 || audio.paused || audio.ended) {
            clearInterval(interval);
        }
    }, 100);
}

export const pauseNote = (key) => {
    let audioToPause;
    audiosPlayed.forEach(audio => {
        if (audio.src.includes(key.dataset.note)){
            audioToPause = audio;
            if (!audioToPause.paused) {
                key.classList.remove('active');
                setTimeout(() => {
                    audioToPause.muted = true;
                    audioToPause.pause();}, 200);
            }
        }
    });
}

/* ----- Letterrs and keyboard text ----- */

export const createText = (key) => {
    const note = key.dataset.note;
    const keyboard = key.dataset.key;
    let keysContainer = document.createElement("span");
    let notesContainer = document.createElement("span");
    let lineBreak = document.createElement("br");
    if (key.classList.contains('black')){
        keysContainer.classList.add("black");
        notesContainer.classList.add("black");
    }
    keysContainer.classList.add("keyText");
    notesContainer.classList.add("noteText");
    keysContainer.textContent = `${keyboard.toUpperCase()}`;
    notesContainer.textContent = `${note}`;
    key.appendChild(keysContainer);
    key.appendChild(lineBreak);
    key.appendChild(notesContainer);
}

export const toggleSwitch = (keysText, checkbox) => {
    for (const key of keysText){
        checkbox.checked ?
            (key.classList.contains('black') ? key.style.color = "white" : key.style.color = "black")
            : key.style.color = "transparent";
    }
}
