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
import { transition } from "./movePaths.js";
import { player } from "./playerStats.js";
//Variables
export let name = "Guy";
let elic = 'pizza';
export const inventory = [];

// Save game state to localStorage
export function saveGame(currentBranch, log, results, talons, shardCount) {
  const saveData = {
    player,
    inventory,
    name,
    currentBranch,
    log,
    results,
    talons,
    shardCount
  };
  localStorage.setItem('adventureSave', JSON.stringify(saveData));
}

// Load game state from localStorage
export function loadGame() {
  const save = localStorage.getItem('adventureSave');
  if (!save) return null;
  try {
    const data = JSON.parse(save);
    // Restore player fields
    Object.assign(player, data.player);
    inventory.length = 0;
    if (Array.isArray(data.inventory)) {
      data.inventory.forEach(item => inventory.push(item));
    }
    name = data.name || name;
    return data;
  } catch (e) {
    console.error('Failed to load save:', e);
    return null;
  }
}



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
    console.log('changing stat bars and stuff')
    const healthElements = document.getElementsByClassName('health');
    const healthBars = document.getElementsByClassName('healthBar');
    for (let i = 0; i < healthElements.length; i++) {
        healthElements[i].textContent = player.HP;
    }
    for (let i = 0; i < healthBars.length; i++) {
        healthBars[i].value = player.HP;
        healthBars[i].max = player.maxHP;
    }
    
    // Update energy display and progress bar
    const energyElements = document.getElementsByClassName('energy');
    const energyBars = document.getElementsByClassName('energyBar');
    for (let i = 0; i < energyElements.length; i++) {
        energyElements[i].textContent = player.energy;
    }
    for (let i = 0; i < energyBars.length; i++) {
        energyBars[i].value = player.energy;
        energyBars[i].max = player.maxEnergy;
    }
    //update any names
    const nameElements = document.getElementsByClassName('name');
    for (let i = 0; i < nameElements.length; i++) {
        const element = nameElements[i];
        element.innerHTML = name;
    }
    const talonElements = document.getElementsByClassName('talons');
    for (let i = 0; i < talonElements.length; i++) {
        talonElements[i].textContent = player.talons;
    }
}

const nameEntry = document.getElementById('nameEnterer');
const submitName = document.getElementById('enterName');
submitName.addEventListener('click', function() {
  name = nameEntry.value || 'Guy';
  console.log(name);
  transition('start');
  logButton.style.display = 'block';
});

import { displayLog } from "./movePaths.js";
const popupOverlay = document.getElementById('overlay');
const closeButton = document.getElementById('close');
const logButton = document.getElementById('log');
logButton.addEventListener('click', function() {
    displayLog();
    popupOverlay.style.display = 'block';
})
closeButton.addEventListener('click', function() {
    const logDiv = document.getElementById('textLog');
    popupOverlay.style.display = 'none';
})

//functions
//branch logic
//shoppingList
updateStats()