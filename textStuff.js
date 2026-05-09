// textStuff.js
// Responsibilities: player stats UI + inventory + save/load + simple UI wiring.

import { player } from "./playerStats.js";
import { transition, displayLog } from "./movePaths.js";

// ===== DOM refs =====
export const textBox = document.getElementById('story');
export const battleScreen = document.getElementById('battle');
export const shopScreen = document.getElementById('shop');

const nameEntry = document.getElementById('nameEnterer');
const submitName = document.getElementById('enterName');

const popupOverlay = document.getElementById('overlay');
const closeButton = document.getElementById('close');
const logButton = document.getElementById('log');

const restartBtn = document.getElementById('restartGame');

// ===== Game state (shared with movePaths via save payload) =====
export let name = "Guy";
export const inventory = [];

// ===== Restart =====
function restartGame() {
  Object.assign(player, {
    talons: 300,
    maxHP: 100,
    HP: 100,
    energy: 50,
    maxEnergy: 50,
    luck: 3,
    attack: 5,
    defense: 5,
    healCost: 20,
    defending: false,
    shardCount: 0,
  });

  inventory.length = 0;
  name = "Guy";

  localStorage.removeItem('adventureSave');
  transition('start');
}

// Hook up restart button if present
if (restartBtn) {
  restartBtn.addEventListener('click', restartGame);
}

// Hook up name submit if present
if (submitName) {
  submitName.addEventListener('click', function () {
    name = nameEntry?.value || 'Guy';
    transition('start');
  });
}

// Log overlay wiring
if (logButton) {
  logButton.addEventListener('click', function () {
    displayLog();
    if (popupOverlay) popupOverlay.style.display = 'block';
  });
}

if (closeButton) {
  closeButton.addEventListener('click', function () {
    if (popupOverlay) popupOverlay.style.display = 'none';
  });
}

// ===== Stats display update =====
export function updateStats() {
  // health
  const healthElements = document.getElementsByClassName('health');
  const healthBars = document.getElementsByClassName('healthBar');
  for (let i = 0; i < healthElements.length; i++) {
    healthElements[i].textContent = player.HP;
  }
  for (let i = 0; i < healthBars.length; i++) {
    healthBars[i].value = player.HP;
    healthBars[i].max = player.maxHP;
  }

  // energy
  const energyElements = document.getElementsByClassName('energy');
  const energyBars = document.getElementsByClassName('energyBar');
  for (let i = 0; i < energyElements.length; i++) {
    energyElements[i].textContent = player.energy;
  }
  for (let i = 0; i < energyBars.length; i++) {
    energyBars[i].value = player.energy;
    energyBars[i].max = player.maxEnergy;
  }

  // names
  const nameElements = document.getElementsByClassName('name');
  for (let i = 0; i < nameElements.length; i++) {
    nameElements[i].innerHTML = name;
  }

  // talons
  const talonElements = document.getElementsByClassName('talons');
  for (let i = 0; i < talonElements.length; i++) {
    talonElements[i].textContent = player.talons;
  }
}

// ===== Save / Load =====
export function saveGame(currentPath, log, results) {
  const saveData = {
    player,
    inventory,
    currentPath,
    name,
    log,
    results,
  };
  localStorage.setItem('adventureSave', JSON.stringify(saveData));
}

export function loadGame() {
  const save = localStorage.getItem('adventureSave');
  if (!save) return null;

  try {
    const data = JSON.parse(save);

    if (data.player) Object.assign(player, data.player);

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

// ===== Init =====
window.addEventListener('DOMContentLoaded', () => {
  updateStats();

  // Restore and continue if we have a save.
  // Note: movePaths.js owns log/results arrays; we just load the payload.
  const save = loadGame();
  if (save?.currentPath) {
    transition(save.currentPath);
  }

  // Konami code (kept, but isolated to avoid breaking boot)
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiPosition = 0;

  document.addEventListener('keyup', function (e) {
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
});

