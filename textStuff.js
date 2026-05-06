//STUFF THAT YOU HAVE TO DO
//GET BATTLES TO WORK
//ADD MORE ITEMS
//USE CSS TO STYLE BETTER
//CHANGE BACKGROUNDS USING SOME SORT OF VARIABLE IN CERTAIN OBJECTS
//ADD A 'MEMORY' THING IN CERTAIN OBJECTS AND THEN STORE THEM IN AN ARRAY TO SHOW IN THE RESULTS SCREEN


export const textBox = document.getElementById('story');
export const battleScreen = document.getElementById('battle');
export const shopScreen = document.getElementById('shop');
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a' ];
//Variables

let logDiv = document.getElementById('textLog');
let logButton = document.getElementById('log');
let closeLogButton = logDiv.querySelector('button');
export let name = "Guy";
export let talons = 300;
let healCount = 2;
export let maxHP = 100;
export var HP = 100;
export let energy = 50;
export let maxEnergy = 50;
export let luck = 3;
export let atk = 5;
export let defense = 5;
export let healCost = 20;

let elic = 'pizza';
export let defendingStatus = false;
let agressive = false;
let bjCount = 0;
export let isItMyTurnYet = false;
export const inventory = [];

// konami code 
let konamiPosition = 0;
document.addEventListener('keyup', function(e) {
console.log (e.key)
  if (e.key === konamiCode[konamiPosition]) {
    konamiPosition++;
    
 
    if (konamiPosition === konamiCode.length) {
      activateComicSans();
      konamiPosition = 0;
    }
  } else {

    konamiPosition = 0;
  }
});
function activateComicSans() {
  const style = document.createElement('style');
  style.textContent = `
    * {
      font-family: "Comic Sans MS", "Comic Sans", cursive !important;
    }
  `;
  document.head.appendChild(style);
}


// === UPDATE STATS DISPLAY (Health and Energy) ===
export function updateStats() {
    // Update health display and progress bar
    const healthElements = document.getElementsByClassName('health');
    const healthBars = document.getElementsByClassName('healthBar');
    for (let i = 0; i < healthElements.length; i++) {
        healthElements[i].textContent = HP;
    }
    for (let i = 0; i < healthBars.length; i++) {
        healthBars[i].value = HP;
        healthBars[i].max = maxHP;
    }
    
    // Update energy display and progress bar
    const energyElements = document.getElementsByClassName('energy');
    const energyBars = document.getElementsByClassName('energyBar');
    for (let i = 0; i < energyElements.length; i++) {
        energyElements[i].textContent = energy;
    }
    for (let i = 0; i < energyBars.length; i++) {
        energyBars[i].value = energy;
        energyBars[i].max = maxEnergy;
    }
    //update any names
    const nameElements = document.getElementsByClassName('name');
    for (let i = 0; i < nameElements.length; i++) {
        const element = nameElements[i];
        element.innerHTML = name;
    }
    const talonElements = document.getElementsByClassName('talons');
    for (let i = 0; i < talonElements.length; i++) {
        talonElements[i].textContent = talons;
    }
}

//functions
//branch logic




import { createBattle } from "./battleLogic.js";

//shoppingList
updateStats()