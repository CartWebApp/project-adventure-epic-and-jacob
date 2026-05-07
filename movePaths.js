export const textBox = document.getElementById('story');
export const battleScreen = document.getElementById('battle');
import { story } from "./story.js";
import { updateStats } from "./textStuff.js";
import { createBattle } from "./battleLogic.js";
import { createShop } from "./shopLogic.js";
import { startBlackjack } from "./blackjack.js";
import { player } from "./playerStats.js";
let log = [];
let talons = player.talons;
let shardCount = player.shardCount;

function updateStuff() {
    player.talons = talons;
    player.shardCount = shardCount;
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
        if (trait == 'agressive') {
            agressive = true;
        }
    };
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
            if (path === 'results') {
                shardCount++;
                console.log(`shard added: ${shardCount}`)
            }
            if (path === 'dimensionSwordEnd') {
                if (shardCount > 6) {
                    console.log(`Shard path created at ${shardCount}`)
                    const button = document.createElement('button');
                    button.classList.add('SWORD')
                    button.addEventListener('click', function() {
                        transition(path);
                    });
                    button.innerHTML =  btnText;
                    btnArr.appendChild(button);
                    console.log(btnArr);
                }
                else if (shardCount < 6) {
                    console.log('There never was a dimensionSword!')
                }
            }
        if (path === 'unquotaAggro') {
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
        talons += branch.talons;
        updateStats();
    }
    // Update maxHP if the branch has a maxHP property
    if (branch.maxHP !== undefined) {
        maxHP += branch.maxHP;
    }
    // Update maxEnergy if the branch has a maxEnergy property
    if (branch.maxEnergy !== undefined) {
        maxEnergy += branch.maxEnergy;
    }
    if (branch.type == 'battle') {
        const winPath = branch.win;
        const losePath = branch.lose;
        createBattle(t, winPath, losePath);
    };
    if (branch.type == 'blackjack') {
        startBlackjack(branch);
    };   
    if (branch.type == 'heal') {
        HP = maxHP;
        energy = maxEnergy;
        console.log('Full heal!')
    }
    if (branch.type == 'shop') {
        createShop(branch.inventory, branch.leave);
    }
    updateStats();
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
