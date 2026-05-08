export const textBox = document.getElementById('story');
export const battleScreen = document.getElementById('battle');
import { story } from "./story.js";
import { createBattle } from "./battleLogic.js";
import { createShop } from "./shopLogic.js";
import { updateStats, saveGame, loadGame } from "./textStuff.js";
import { startBlackjack } from "./blackjack.js";
import { player } from "./playerStats.js";
let log = [];
let results = [];
let talons = player.talons;
let agressive = false;
function updateStuff() {
    player.talons = talons;
}

export function transition(t) {
    // Update stats display
    battleScreen.classList.add('hidden');
    if (textBox.contains(battleScreen)) {
        textBox.removeChild(battleScreen);
    }
    const branch = story[`${t}`];
    addToLog(branch);
    console.log(branch);
    console.log(branch.text);
    textBox.innerHTML = '';
    //basic story
    if (branch.trait) {
        if (branch.trait == 'agressive') {
            agressive = true;
        }
    }
    if (branch.memory) {
        results.push(branch.memory);
    }
    if (branch.text) {
        let p = document.createElement('p');
        p.classList.add('dialogue');
        p.innerHTML = `${branch.text}`;
        textBox.appendChild(p);
        console.log(p);
        log.push(branch.text);
    }
    if (branch.img) {
        let img = document.createElement('img');
        img.src = `url(${branch.img})`;
        if (branch.alt) {
            img.alt = `${branch.alt}`
        }
        textBox.appendChild(img);
        console.log(p);
    }
    if (branch.choice) {
        let btnArr = document.createElement('div');
        btnArr.classList.add('choices');
        for (let index = 0; index < branch.choice.length; index++) {
            const btnText = branch.choice[index];
            const path = branch.choiceId[index];
            console.log(btnText);
            console.log(path);
            if (branch == 'results') {
                player.shardCount++;
                console.log(`shard added: ${player.shardCount}`)
            }
            else if (path === 'start') {
                log = [];
                results = [];
                player = {
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
                    shardCount: player.shardCount,
                };
                saveGame(branch, log, results, player.talons, player.shardCount)
                updateStuff();
            }
            if (path === 'dimensionSwordEnd') {
                if (player.shardCount > 6) {
                    console.log(`Shard path created at ${player.shardCount}`)
                    const button = document.createElement('button');
                    button.classList.add('SWORD')
                    button.addEventListener('click', function() {
                        transition(path);
                    });
                    button.innerHTML =  btnText;
                    btnArr.appendChild(button);
                    console.log(btnArr);
                }
                else if (player.shardCount < 6) {
                    console.log('There never was a dimensionSword!')
                }
            }

            else if (path === 'unquotaAggro') {
            if (agressive) {
                const button = document.createElement('button');
                button.addEventListener('click', function() {
                    transition(path);
                })
                button.innerHTML =  btnText;
                btnArr.appendChild(button);
                console.log(btnArr);
            }
            else {
                const button = document.createElement('button');
                button.addEventListener('click', function() {
                    transition('unquotaNice');
                });
                button.innerHTML =  btnText;
                btnArr.appendChild(button);
                console.log(btnArr);
            }
        }
        if (path === 'unquotaNice') {
            if (!agressive) {
                const button = document.createElement('button');
                button.addEventListener('click', function() {
                    transition(path);
                });
                button.innerHTML =  btnText;
                btnArr.appendChild(button);
                console.log(btnArr);
            }
        }
        else {
            const button = document.createElement('button');
            button.addEventListener('click', function() {
                transition(path);
            });
            button.innerHTML =  btnText;
            button.classList.add('choice')
            btnArr.appendChild(button);
            console.log(btnArr);
            updateStuff()
        }}
        textBox.appendChild(btnArr);
    };
    // Update talons if the branch has a talons property
    if (branch.talons !== undefined) {
        player.talons += branch.talons;
        updateStats();
    }
    // Update maxHP if the branch has a maxHP property
    if (branch.maxHP !== undefined) {
        player.maxHP += branch.maxHP;
    }
    // Update maxEnergy if the branch has a maxEnergy property
    if (branch.maxEnergy !== undefined) {
        player.maxEnergy += branch.maxEnergy;
    }
    if (branch.type == 'battle') {
        createBattle(t, branch.win, branch.lose);
    };
    if (branch.type == 'blackjack') {
        startBlackjack(branch);
    };   
    if (branch.type == 'heal') {
        player.HP = player.maxHP;
        player.energy = maxEnergy;
        console.log('Full heal!')
    }
    if (branch.type == 'shop') {
        createShop(branch.inventory, branch.leave);
    }
    updateStats();
    saveGame(branch, log, results, player.talons, player.shardCount);
}


const nameEntry = document.getElementById('nameEnterer');
const submitName = document.getElementById('enterName');
//same thing but for the name since you only need it once
submitName.addEventListener('click', function() {
    name = nameEntry.value || 'Guy';
    console.log(name);
    transition('start');
});

function addToLog(branch) {
    if (branch.type == 'battle') {
        log.push(`Entered a battle.`);
    }
    else if (branch.type == 'shop') {
        log.push('Entered a shop');
    }
    else if (branch.type == 'blackjack') {
        log.push('Started a game of blackjack');
    }
    console.log(log);
}
window.addEventListener('DOMContentLoaded', function() {
    const save = loadGame();
    if (save) {
        log = save.log || [];
        results = save.results || [];
        talons = save.talons || player.talons;
        player.shardCount = save.shardCount || player.shardCount;
        currentBranch = save.currentBranch || 'start';
        transition(currentBranch);
    }
});


export function displayLog() {
    console.log('Log function activated!');
    const logDiv = document.getElementById('textLog');
    const logDivSection = document.createElement('textLogContent');
    const ul = document.createElement('ul');
    if (log.length > 0) {
        for (const thingy of log) {
        const event = log[thingy];
        console.log(event);
        console.log(thingy);
        const li = document.createElement('li');
        li.classList.add('ancientScroll');
        li.innerHTML = thingy;
        ul.appendChild(li);
    }
    logDivSection.appendChild(ul);
    logDiv.appendChild(logDivSection);
    logDiv.style.display = 'block';
    }
}
