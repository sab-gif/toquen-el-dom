/* const url = "./assets/sounds/C1.mp3";
const note = new Audio(url);
note.play()
console.log("hola")

const button = document.querySelector("note"); */

/* button.addEventListener("click", (event) => {
    note.play();   // PointerEvent
}); */


/* const audio = document.createElement("audio");
audio.preload = "auto";
audio.src = "https://manzdev.github.io/codevember2017/assets/eye-tiger.mp3";
audio.play();
document.body.append(audio); */





/* const keyC3 = document.getElementById("C3");
const soundC3 = document.getElementById("audioC3");

function playNote(){
    console.log("playing");
}


keyC3.addEventListener("click", playNote()) */




const keys  = document.querySelectorAll(".key"); //NodeList [] 
console.log(keys);

keys.forEach(key => {
    const note = key.getAttribute("data-note");
    const audio = new Audio(`./assets/note-sounds/${note}.mp3`);
    key.addEventListener("mousedown", () =>{
        const start = performance.now()
        console.log("mousedown", start);
        audio.currentTime= 0;
        audio.playbackRate = 1;
        audio.play();
        key.classList.add('active')
    })
    key.addEventListener("mouseout", () => {
        if (!audio.paused) {
            setTimeout(() => {
                audio.pause()}, 500)
            const end = performance.now()
            console.log("mouseout", end);
        }        
    })
    key.addEventListener("mouseup", () => {
        if (!audio.paused) {
            setTimeout(() => {
                audio.pause()}, 500)
            const end2 = performance.now()
            console.log("mouseup", end2);
        }  
    })
    audio.addEventListener('ended', () => {
        key.classList.remove('active');
    })
})
