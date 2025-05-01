import { playNote } from "./functions.js";
import { pauseNote } from "./functions.js";
import { createText } from "./functions.js";
import { toggleSwitch } from "./functions.js";

/* ----- Sound and key animation ----- */

const keys  = document.querySelectorAll(".key"); //NodeList [] 

//Click events in each button
keys.forEach(key => {
    key.addEventListener("mousedown", () => {playNote(key)});
    key.addEventListener("mouseout", () => {pauseNote(key)});     
    key.addEventListener("mouseup", () => {pauseNote(key)});  
})

const pressedKeys = new Set();

//Keyboard events in the document
document.addEventListener("keydown", function(event){
    const key = event.key.toLowerCase();
    if (pressedKeys.has(key)){
        return;
    }
    const keyElement = document.querySelector(`.key[data-key="${key}"]`);
    if(!keyElement){
        return;
    }
    pressedKeys.add(key);
    playNote(keyElement);
});

document.addEventListener("keyup", function(event){
    const key = event.key.toLowerCase();
    const keyElement = document.querySelector(`.key[data-key="${key}"]`);
    if(!keyElement){
        return;
    }
    pressedKeys.delete(key);
    pauseNote(keyElement);
});

/* ----- Letterrs and keyboard text ----- */

keys.forEach(key => {
    createText(key);
})

//Piano notes switch
const noteCheckbox = document.getElementById("note-checkbox");
const notesText  = document.querySelectorAll(".noteText"); 
noteCheckbox.addEventListener("change", () => toggleSwitch(notesText, noteCheckbox));

//Keyboard letters switch
const keysCheckbox = document.getElementById("letters-checkbox");
const keysText  = document.querySelectorAll(".keyText"); 
keysCheckbox.addEventListener("change", () => toggleSwitch(keysText, keysCheckbox));
