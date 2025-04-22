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
//console.log(keys);

keys.forEach(key => {
    const note = key.getAttribute("data-note");
    const keyboard = key.getAttribute("data-key");
    const audio = new Audio(`./assets/note-sounds/${note}.mp3`);
    key.textContent = `${note}\n${keyboard.toUpperCase()}`;
    key.addEventListener("mousedown", () =>{
        const start = performance.now()
        //console.log("mousedown", start);
        audio.currentTime= 0;
        audio.playbackRate = 1;
        audio.play();
        key.classList.add('active')
    })
    key.addEventListener("mouseout", () => {
        if (!audio.paused) {
            key.classList.remove('active')
            setTimeout(() => {
                audio.pause()}, 500)
            const end = performance.now()
            //console.log("mouseout", end);
        }        
    })
    key.addEventListener("mouseup", () => {
        if (!audio.paused) {
            key.classList.remove('active');
            setTimeout(() => {
                audio.pause()}, 500)
            const end2 = performance.now()
            //console.log("mouseup", end2);
        }  
    })
    //audio.addEventListener('pause', () => {
      //  key.classList.remove('active');
   // })
})

const pressedKeys = new Set();
document.addEventListener("keydown", function(event){
    const key = event.key.toLowerCase();
    console.log(key)
    if (pressedKeys.has(key)){
        return;
    }
    pressedKeys.add(key);
    const keyElement = document.querySelector(`.key[data-key="${key}"]`);
    console.log(keyElement)
    if(!keyElement){
        return;
    }
    const note = keyElement.getAttribute("data-note");
    const audio = new Audio(`./assets/note-sounds/${note}.mp3`);
    audio.currentTime = 0;
    audio.play();
    keyElement.classList.add('active');
    audio.addEventListener('ended', function(){
        keyElement.classList.remove('active');
    });
});

document.addEventListener("keyup", function(event){
    const key = event.key.toLowerCase();
    pressedKeys.delete(key);
    const keyElement = document.querySelector(`.key[data-key="${key}"]`);
    if (keyElement){
        keyElement.classList.remove('active');
    }
});

