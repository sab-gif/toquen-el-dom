const url = "./assets/sounds/C1.mp3";
const note = new Audio(url);
note.play()
console.log("hola")

const button = document.querySelector("note");

button.addEventListener("click", (event) => {
    note.play();   // PointerEvent
});