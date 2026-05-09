export const textBox = document.getElementById('story');
export const battleScreen = document.getElementById('battle');
import { story } from "./story.js";
import { createBattle } from "./battleLogic.js";
import { createShop } from "./shopLogic.js";
import { updateStats, saveGame, loadGame } from "./textStuff.js";
import { startBlackjack } from "./blackjack.js";
import { player } from "./playerStats.js";
export let log = [];
export let results = [];
let agressive = false;

export function transition(t) {
    // Update stats display
    battleScreen.classList.add('hidden');
    if (textBox.contains(battleScreen)) {
        textBox.removeChild(battleScreen);
    }
    const branch = story[`${t}`];
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

            if (path === 'dimensionSwordEnd') {
                if (player.shardCount > 6) {
                    console.log(`Shard path created at ${player.shardCount}`)
                    const button = document.createElement('button');
                    button.classList.add('SWORD')
                    button.addEventListener('click', function() {
                        transition(path);
                    });
                    button.innerHTML = btnText;
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
                    button.innerHTML = btnText;
                    btnArr.appendChild(button);
                    console.log(btnArr);
                }
                else {
                    const button = document.createElement('button');
                    button.addEventListener('click', function() {
                        transition('unquotaNice');
                    });
                    button.innerHTML = btnText;
                    btnArr.appendChild(button);
                    console.log(btnArr);
                }
            }
            else if (path === 'unquotaNice') {
                if (!agressive) {
                    const button = document.createElement('button');
                    button.addEventListener('click', function() {
                        transition(path);
                    });
                    button.innerHTML = btnText;
                    btnArr.appendChild(button);
                    console.log(btnArr);
                }
            }
            else {
                const button = document.createElement('button');
                button.addEventListener('click', function() {
                    transition(path);
                });
                button.innerHTML = btnText;
                button.classList.add('choice')
                btnArr.appendChild(button);
                console.log(btnArr);
            }
        }
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
        player.energy = player.maxEnergy;
        console.log('Full heal!')
    }
    if (branch.type == 'shop') {
        createShop(branch.inventory, branch.leave);
    }
    updateStats();
    saveGame(t, log, results);
}







const nameEntry = document.getElementById('nameEnterer');
const submitName = document.getElementById('enterName');
//same thing but for the name since you only need it once
submitName.addEventListener('click', function() {
    name = nameEntry.value || 'Guy';
    console.log(name);
    transition('start');
});

function displayResults() {
    const ol = document.createElement('ol');
    for (let index = 0; index < results.length; index++) {
        const tingly = results[index];
        const li = document.createElement('li')
        li.innerHTML = tingly;
        li.classList.add('resultItem');
        ol.appendChild(li);
    }
    textBox.appendChild(ol)

    //leave button
    const leavebtn = document.createElement('button');
    leavebtn.classList.add('leave');
    leavebtn.addEventListener('click', function() {
        transition('start');
    });
    textBox.appendChild(leavebtn);
}


export function displayLog() {
    console.log('Log function activated!');
    const logDiv = document.getElementById('textLog');
    if (!logDiv) return;
    logDiv.innerHTML = '';
    const ol = document.createElement('ol');
    if (log.length > 0) {
        for (const entry of log) {
            const li = document.createElement('li');
            li.classList.add('ancientScroll');
            li.innerHTML = entry;
            ol.appendChild(li);
        }
        logDiv.appendChild(ol);
        logDiv.style.display = 'block';
    } else {
        logDiv.style.display = 'none';
    }
}
