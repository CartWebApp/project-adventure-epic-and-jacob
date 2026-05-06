import { luck, name, maxHP, HP, energy, atk, healCost, defendingStatus, isItMyTurnYet, textBox, battleScreen, updateStats } from "./textStuff.js";
import { transition } from "./movePaths.js";
import { enemy } from "./enemylist.js";
export function createBattle(idName, winpath, losepath) {
    console.log(`Battling ${idName}`);
    //boring dom stuff
    const commentary = document.getElementById('commentary');
    const butonDiv = document.getElementById('buttonList');
    const humanImg = document.getElementById('humanPic');
    const enemyImg = document.getElementById('enemyPic');
    let myTurn = isItMyTurnYet;

        //stats 
        let foe = enemy[`${idName}`];
        console.log(foe);
        let enName = foe.name;
        let enAtk = foe.attack;
        let enDef = foe.defense;
        let enLuck = foe.luck;
        let enMaxhp = foe.maxhp;
        let enHealCost = foe.healCost;
        let enMaxe = foe.maxenergy;
        let enWaste = foe.waste;
        let enDefending = foe.defending;
        let enhp = foe.hp;
        let ene = foe.energy;
        const actions = foe.actions;
        let enemyIcon = foe.img;
        if (enemyIcon != null) {
            enemyImg.src = enemyIcon;
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
                healthElements[i].textContent = enhp;
            }
            console.log('Updating Energy')
            for (let i = 0; i < healthBars.length; i++) {
                healthBars[i].value = enhp;
                healthBars[i].max = enMaxhp;
            }
            
            // Update energy display and progress bar
            const energyElements = document.getElementsByClassName('enEnergy');
            const energyBars = document.getElementsByClassName('enEnergyBar');
            for (let i = 0; i < energyElements.length; i++) {
                energyElements[i].textContent = ene;
            }
            for (let i = 0; i < energyBars.length; i++) {
                energyBars[i].max = enMaxe;
                energyBars[i].value = ene;
            }
            //update any names
            const nameElements = document.getElementsByClassName('enName');
            for (let i = 0; i < nameElements.length; i++) {
                const element = nameElements[i];
                element.innerHTML = enName;
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
        function attack(aA, dB, dsA, dsB, lA, lB, nA, nB, hA, hB) {
            //BUG DISCOVERED: variables don't update after they change. Why?
            dsA = false;
            if (dsB == true) {
                //ATTACKING WHILE DEFENDING
                console.log(nA, hA);
                console.log(nB, hB);
                let damage = (Math.round(Math.random() * lB * dB/2 * 5))
                if (damage < 0) {
                    damage = 0;
                }
                hA = hA - damage;
                if (hA < 0) {
                    hA = 0;
                };
                dsB = false;
                commentary.innerHTML = `${nA} attacks! But ${nB} counters and attacks for ${damage} health!`;
                dsA = false;
                console.log(nA, hA);
                console.log(nB, hB);
                return;
            }
            else if (dsB == false) {
                //ATTACKING
                console.log(nA, hA);
                console.log(nB, hB);
                let damage = (Math.round(Math.random() * 5 * lA * aA/2));
                if (damage < 0) {
                    damage = 0;
                }
                hB = hB - damage;
                if (hB < 0) {
                    hB = 0;
                };
                commentary.innerHTML = `${nA} attacks! ${damage} damage dealt to opposing ${nB}!`;
                console.log(nA, hA);
                console.log(nB, hB);
                return;
            }
        }
        function enemyMove() {
            const move = actions[(Math.round(Math.random() * actions.length))]
            if (move == 'attack') {
                console.log('enemy attacking');
                attack(enAtk, defend, enDefending, defendingStatus, enLuck, luck, enName, name, enhp, HP);
            }
            else if (move == 'defend') {
                console.log('enemy defending');
                defend(enDefending, enName);
            }
            else if (move == 'heal') {
                console.log('enemy healing');
                heal(ene, enHealCost, enhp, enMaxhp, enLuck, enName, enDefending);
            }
            else {
                console.log('enemy wasting time');
                waste(enWaste);
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
            if (enhp != 0 && HP != 0) {
                console.log('battle continuing');
                console.log(myTurn)
                if (myTurn) {
                    stuff.addEventListener('click', function() {
                        updateEnemyStats();
                        updateStats();
                        myTurn = !myTurn;
                        guyTurn();
                        
                    })
                }
                else {
                    stuff.addEventListener('click', function() {
                        updateEnemyStats();
                        updateStats();
                        myTurn = !myTurn;
                        enemyMove();       
                    })
                }
            }
            else if (enhp == 0) {
                console.log('battle won!');
                commentary.innerHTML = `You beat ${enName}!`
                stuff.addEventListener('click', function() {
                    transition(winpath);
                })
            }
            else if (HP == 0) {
                console.log('battle won!');
                    commentary.innerHTML = `You lost to ${enName}!`
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
                attack(atk, enDef, defendingStatus, enDefending, luck, enLuck, name, enName, HP, enhp);
                createTransitionButton();
            })
            const defendButton = document.createElement('button');
            defendButton.classList.add('defend');
            defendButton.innerHTML = 'Defend';
            defendButton.addEventListener('click', function() {
                defend(defendingStatus, name);
                createTransitionButton();
            })
            const healButton = document.createElement('button');
            healButton.classList.add('Heal');
            healButton.innerHTML = `Heal (${healCost} Energy)`;
            healButton.addEventListener('click', function() {
                heal(energy, healCost, HP, maxHP, luck, name, defendingStatus);
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