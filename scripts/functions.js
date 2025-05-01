/* ----- Sound and key animation ----- */

const volumeSlider = document.getElementById("volume-slider");
const audiosPlayed = new Set();

export const playNote = (key) => {
    const note = key.getAttribute("data-note");
    const audio = new Audio(`../assets/note-sounds/${note}.mp3`);

    //store audio in variable for pause
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
    let audioToPause
    audiosPlayed.forEach(audio => {
        if (audio.src.includes(key.dataset.note)){
            audioToPause = audio;
        }
        });
    key.classList.remove('active');
    if (!audioToPause.paused) {
        setTimeout(() => {
            audioToPause.muted = true;
            audioToPause.pause();}, 200)
    }
}

/* ----- Letterrs and keyboard text ----- */

export const createText = (key) => {
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

export const toggleSwitch = (keysText, checkbox) => {
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
