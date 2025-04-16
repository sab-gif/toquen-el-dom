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
    key.addEventListener("click", () =>{
        const note = key.getAttribute("data-note");
        const audio = new Audio(`./assets/note-sounds/${note}.mp3`);
        audio.currentTime= 0;
        audio.play();
        key.classList.add('active')
        audio.addEventListener('ended', () => {
            key.classList.remove('active');
        })
    })
})