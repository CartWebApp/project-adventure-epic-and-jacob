import { name, textBox, battleScreen, updateStats } from "./textStuff.js";
import { transition } from "./movePaths.js";
import { enemy } from "./enemylist.js";
import { player } from "./playerStats.js";


let isItMyTurnYet = true;

export function createBattle(idName, winpath, losepath) {
    console.log(`Battling ${idName}`);
    //boring dom stuff
    const commentary = document.getElementById('commentary');
    const butonDiv = document.getElementById('buttonList');
    const humanImg = document.getElementById('humanPic');
    const enemyImg = document.getElementById('enemyPic');
        //stats 
        
        class fiend {
            constructor(name, icon, atk, def, luck, defending, maxhp, hp, energy, maxenergy, healcost, actions, waste, drop) {
                this.name = name;
                this.img;
                this.atk = atk;
                this.def = def;
                this.luck = luck;
                this.hp = hp;
                this.maxhp = maxhp;
                this.healCost = healcost;
                this.maxenergy = maxenergy;
                this.energy = energy;
                this.actions = actions;
                this.icon = icon;
                this.waste = waste;
                this.defending = defending;
                this.drop = drop;
            }
        }
        let foe = new fiend(...Object.values(enemy[idName]));
        console.log(foe);

        if (foe.icon != null) {
            enemyImg.src = foe.icon;
        }
        else {
            enemyImg.src = enemy['fallback'].img;
        } //fallback image 
        humanImg.src = '/enemyFiles/THESWORD.png';
        updateEnemyStats();

        textBox.appendChild(battleScreen);
        battleScreen.classList.remove('hidden');
        //update stats
        function updateEnemyStats() {
            console.log('updating HP')
            // Update health display and progress bar
            const healthElements = document.getElementsByClassName('enHealth');
            const healthBars = document.getElementsByClassName('enHealthBar');
            for (let i = 0; i < healthElements.length; i++) {
                healthElements[i].textContent = foe.hp;
            }
            console.log('Updating Energy')
            for (let i = 0; i < healthBars.length; i++) {
                healthBars[i].value = foe.hp;
                healthBars[i].max = foe.maxhp;
            }
            
            // Update energy display and progress bar
            const energyElements = document.getElementsByClassName('enEnergy');
            const energyBars = document.getElementsByClassName('enEnergyBar');
            for (let i = 0; i < energyElements.length; i++) {
                energyElements[i].textContent = foe.energy;
            }
            for (let i = 0; i < energyBars.length; i++) {
                energyBars[i].max = foe.maxenergy;
                energyBars[i].value = foe.energy;
            }
            //update any names
            const nameElements = document.getElementsByClassName('enName');
            for (let i = 0; i < nameElements.length; i++) {
                const element = nameElements[i];
                element.innerHTML = foe.name;
            }
        }
        //attack, defend, heal, and waste turn (enemy only)
        function defend(de, n) {
            console.log(`DEFENDING STATUS BEFORE: ${de}`);
            de = true;
            console.log(`DEFENDING STATUS AFTER: ${de}`);
            commentary.innerHTML = `${n} is on guard.`;
        }
        function heal(e, c, h, m, l, n, d) {
            console.log(e, c, h, m, l, n, d);
            d = false;
            if (c >= e) {
                const healt = (Math.round(Math.random() * 10 * l));
                h =+ healt;
                e -= c;
                if (h > m) {
                    h = m;
                    commentary.innerHTML = `${n} fully restores thier HP!`;
                }
                else {
                    commentary.innerHTML = `${n} heals for ${healt} health!`;
                }
            }
            else {
                commentary.innerHTML = `${n} tries to heal. But it failed!`;
            }
        }
        function waste(w) {
            commentary.innerHTML = `${w}`;
        }
        //A = attacker stat, B = defender stat
        function fight(aA, dB, dsA, dsB, lA, lB, nA, nB, hA, hB) {
            //BUG DISCOVERED: variables don't update after they change. Why?
            //still have no damn clue on how to make this work.
            dsA = false;
            if (dsB === true) {
                //ATTACKING WHILE DEFENDING
                console.log('BEFORE');
                console.log(nA, hA);
                console.log(nB, hB);
                let damage = (Math.round(Math.random() * lB * dB/2 * 5))
                hA = hA - damage;
                if (hA < 0) {
                    hA = 0;
                }
                dsB = false;
                commentary.innerHTML = `${nA} attacks! But ${nB} counters and attacks for ${damage} health!`;
                console.log('AFTER');
                console.log(nA, hA);
                console.log(nB, hB);
                updateStats();
                updateHP();
            }
            else if (dsB === false) {
                //ATTACKING
                console.log('BEFORE');
                console.log(nA, hA);
                console.log(nB, hB);
                let damage = (Math.round(Math.random() * 5 * lA * aA/2));
                hB = hB - damage;
                if (hB < 0) {
                    hB = 0;
                };
                commentary.innerHTML = `${nA} attacks! ${damage} damage dealt to opposing ${nB}!`;
                console.log('AFTER')
                console.log(nA, hA);
                console.log(nB, hB);
                return;
            }
        }
        function enemyMove() {
            console.log(foe.actions);
            const move = foe.actions[(Math.round(Math.random() * foe.actions.length))];
            console.log(`current move: ${move}`);
            
            if (move == 'attack') {
                console.log('enemy attacking');
                fight(foe.atk, player.defense, foe.defending, player.defending, foe.luck, player.luck, foe.name, name, foe.hp, player.HP);
            }
            else if (move == 'defend') {
                console.log('enemy defending');
                defend(foe.defending, foe.name);
            }
            else if (move == 'heal') {
                console.log('enemy healing');
                heal(foe.energy, foe.healCost, foe.hp, foe.maxhp, foe.luck, foe.name, foe.defending);
            }
            else {
                console.log('enemy wasting time');
                waste(foe.waste);
            }
            updateEnemyStats();
            createTransitionButton();
        }
        function createTransitionButton() {
            const stuff = document.createElement('button');
            stuff.classList.add('choice');
            stuff.innerHTML = 'Next -->';
            butonDiv.innerHTML = '';
            butonDiv.appendChild(stuff);
            if (foe.hp != 0 && player.HP != 0) {
                console.log('battle continuing');
                console.log(isItMyTurnYet)
                if (isItMyTurnYet) {
                    stuff.addEventListener('click', function() {
                        updateEnemyStats();
                        updateStats();
                        isItMyTurnYet = !isItMyTurnYet;
                        guyTurn();
                        
                    })
                }
                else {
                    stuff.addEventListener('click', function() {
                        updateEnemyStats();
                        updateStats();
                        isItMyTurnYet = !isItMyTurnYet;
                        enemyMove();       
                    })
                }
            }
            else if (foe.hp == 0) {
                console.log('battle won!');
                commentary.innerHTML = `You beat ${foe.name}!`
                stuff.addEventListener('click', function() {
                    transition(winpath);
                })
            }
            else if (player.HP == 0) {
                console.log('battle won!');
                    commentary.innerHTML = `You lost to ${foe.name}!`
                    stuff.addEventListener('click', function() {
                        transition(losepath);
                    })
            }
            else {
                
            }
        }
        function guyTurn() {
            updateEnemyStats();
            butonDiv.innerHTML='';
            const attackButton = document.createElement('button');
            attackButton.classList.add('attack');
            attackButton.innerHTML = 'Attack!';
            attackButton.addEventListener('click', function() {
                fight(player.attack, foe.def, player.defending, foe.defending, player.luck, foe.luck, name, foe.name, player.HP, foe.hp);
                createTransitionButton();
            })
            const defendButton = document.createElement('button');
            defendButton.classList.add('defend');
            defendButton.innerHTML = 'Defend';
            defendButton.addEventListener('click', function() {
                defend(player.defending, name);
                createTransitionButton();
            })
            const healButton = document.createElement('button');
            healButton.classList.add('Heal');
            healButton.innerHTML = `Heal (${player.healCost} Energy)`;
            healButton.addEventListener('click', function() {
                heal(player.energy, player.healCost, player.HP, player.maxHP, player.luck, name, player.defending);
                createTransitionButton();
            })
            butonDiv.appendChild(attackButton);
            butonDiv.appendChild(defendButton);
            butonDiv.appendChild(healButton);

            //DEBUG ONLY - REMOVE WHEN THE BATTLE FUNCTION IS ACTUALLY FIXED
            const winbtn = document.createElement('button');
            const losebtn = document.createElement('button');
            winbtn.innerHTML = "Win Match (Debug option until battles are fully fleshed out)";
            losebtn.innerHTML = "Lose Match (Debug option until battles are fully fleshed out)";
            winbtn.addEventListener('click', function() {
                transition(winpath);
            })
            losebtn.addEventListener('click', function() {
                transition(losepath);
            })
            butonDiv.appendChild(winbtn);
            butonDiv.appendChild(losebtn);
        }
        guyTurn();
}