import { name, textBox, battleScreen, updateStats } from "./textStuff.js";
import { transition } from "./movePaths.js";
import { enemy } from "./enemylist.js";
import { player } from "./playerStats.js";

let isItMyTurnYet = false;

export function createBattle(idName, winpath, losepath) {
    console.log(`Battling ${idName}`);
    //boring dom stuff
    const commentary = document.getElementById('commentary');
    const butonDiv = document.getElementById('buttonList');
    const humanImg = document.getElementById('humanPic');
    const enemyImg = document.getElementById('enemyPic');
        //stats 
        
        class fiend {
            constructor(name, img, attack, defense, luck, defending, maxhp, hp, energy, maxenergy, healcost, actions, waste, drop) {
                this.name = name;
                this.img = img;
                this.attack = attack;
                this.defense = defense;
                this.luck = luck;
                this.hp = hp;
                this.maxhp = maxhp;
                this.healCost = healcost;
                this.maxenergy = maxenergy;
                this.energy = energy;
                this.actions = actions;
                this.waste = waste;
                this.defending = defending;
                this.drop = drop;
            }
        }
        let foe = new fiend(...Object.values(enemy[idName]));
        console.log(foe);

        if (foe.img != '#') {
            enemyImg.src = foe.img;
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
        function defend() {
            console.log(`DEFENDING STATUS BEFORE: ${player.defending}`);
            player.defending = true;
            console.log(`DEFENDING STATUS AFTER: ${player.defending}`);
            commentary.innerHTML = `${name} is on guard.`;
        }
        function heal() {
            player.defending = false;
            if (player.healCost <= player.energy) {
                const healt = (Math.round(Math.random() * 10 * player.luck));
                player.HP += healt;
                player.energy -= player.healCost;
                if (player.HP > player.maxHP) {
                    player.HP = player.maxHP;
                    commentary.innerHTML = `${name} fully restores their HP!`;
                }
                else {
                    commentary.innerHTML = `${name} heals for ${healt} health!`;
                }
                updateStats();
            }
            else {
                commentary.innerHTML = `${name} tries to heal. But it failed!`;
            }
        }
        //A = attacker stat, B = defender stat
        function fight() {
            //BUG DISCOVERED: variables don't update after they change. Why?
            //still have no damn clue on how to make this work.
            player.defending = false;
            if (foe.defending === true) {
                //ATTACKING WHILE DEFENDING
                console.log('BEFORE');
                console.log(name, player.HP);
                console.log(foe.name, foe.hp);
                let damage = (Math.round(Math.random() * foe.luck * foe.defense * 3))
                player.HP -= damage;
                if (player.HP < 0) {
                    player.HP = 0;
                }
                foe.defending = false;
                commentary.innerHTML = `${attackerName} attacks! But ${attackedName} counters and attacks for ${damage} health!`;
                console.log('AFTER');
                console.log(name, player.HP);
                console.log(foe.name, foe.hp);
                updateStats();
                updateHP();
            }
            else if (foe.defending === false) {
                //ATTACKING
                console.log('BEFORE');
                console.log(name, player.HP);
                console.log(foe.name, foe.hp);
                let damage = (Math.round(Math.random() * 3 * player.luck * player.attack));
                foe.hp -= damage;
                if (foe.hp < 0) {
                    foe.hp = 0;
                };
                commentary.innerHTML = `${name} attacks! ${damage} damage dealt to opposing ${foe.name}!`;
                console.log('AFTER')
                console.log(name, player.HP);
                console.log(foe.name, foe.hp);
            }
        }

        //ENEMY FUNCTIONS

        function enDefend() {
            console.log(`DEFENDING STATUS BEFORE: ${de}`);
            foe.defending = true;
            console.log(`DEFENDING STATUS AFTER: ${de}`);
            commentary.innerHTML = `${foe.name} is on guard.`;
        }
        function enHeal() {
            console.log('healing');
            foe.defending = false;
            if (foe.healCost <= foe.energy) {
                const healt = (Math.round(Math.random() * 10 * foe.luck));
                foe.hp =+ healt;
                foe.energy -= foe.healCost;
                if (foe.hp > foe.maxhp) {
                    foe.hp = foe.maxhp;
                    commentary.innerHTML = `${foe.name} fully restores thier HP!`;
                }
                else {
                    commentary.innerHTML = `${foe.name} heals for ${healt} health!`;
                }
            }
            else {
                commentary.innerHTML = `${foe.name} tries to heal. But it failed!`;
            }
        }
        function waste(w) {
            commentary.innerHTML = `${w}`;
        }
        
        //A = attacker stat, B = defender stat
        function enFight() {
            //BUG DISCOVERED: variables don't update after they change. Why?
            //still have no damn clue on how to make this work.
            foe.defending = false;
            if (player.defending === true) {
                //ATTACKING WHILE DEFENDING
                console.log('BEFORE');
                console.log(name, player.HP);
                console.log(foe.name, foe.hp);
                let damage = (Math.round(Math.random() * player.luck * player.defense * 5))
                foe.hp -= damage;
                if (foe.hp < 0) {
                    foe.hp = 0;
                }
                player.defending = false;
                commentary.innerHTML = `${foe.name} attacks! But ${name} counters and attacks for ${damage} health!`;
                console.log('AFTER');
                console.log(name, player.HP);
                console.log(foe.name, foe.hp);
                updateStats();
                updateHP();
            }
            else if (player.defending === false) {
                //ATTACKING
                console.log('BEFORE');
                console.log(name, player.HP);
                console.log(foe.name, foe.hp, foe.luck, foe.attack);
                let damage = (Math.round(Math.random() * 5 * foe.luck * foe.attack));
                player.HP -= damage;
                if (player.HP < 0) {
                    player.HP = 0;
                }
                commentary.innerHTML = `${foe.name} attacks! ${damage} damage dealt to opposing ${name}!`;
                console.log('AFTER')
                console.log(name, player.HP);
                console.log(foe.name, foe.hp);
            }
        }
        function enemyMove() {
            console.log(foe.actions);
            const move = foe.actions[(Math.round(Math.random() * foe.actions.length))];
            console.log(`current move: ${move}`);
            
            if (move === 'attack') {
                console.log('enemy attacking');
                enFight();
            }
            else if (move === 'defend') {
                console.log('enemy defending');
                enDefend()
            }
            else if (move === 'heal') {
                console.log('enemy healing');
                enHeal();
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
                if (foe.drop.attack) {
                    player.attack += foe.drop.attack;
                }
                if (foe.drop.defense) {
                    player.defense += foe.drop.defense;
                }
                if (foe.drop.hp) {
                    player.maxHP += foe.drop.hp;
                    player.HP += foe.drop.hp;
                }
                if (foe.drop.energy) {
                    player.maxEnergy += foe.drop.energy;
                    player.energy += foe.drop.energy;
                }
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
                fight(player.attack, foe.defense, player.defending, foe.defending, player.luck, foe.luck, name, foe.name, player.HP, foe.hp);
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
        }
        guyTurn();
}