import { player } from "./playerStats.js";
import { shop } from "./shopitems.js";
import { transition } from "./movePaths.js";
import { inventory, textBox, updateStats } from "./textStuff.js";

export function createShop(i, leaving) {
    //use the key function to create a shop here.
    textBox.innerHTML = '<h2>Shop</h2>';
    const things = shop[i];
    const stock = Object.keys(things);
    console.log(things);
    console.log(stock);
    const shopItems = document.createElement('div');
    shopItems.classList.add('itemList');
    for (const item of stock) {
        console.log(item);
        const fullItem = shop[i][item];
        console.log(fullItem);
        const itemBox = document.createElement('div');
        const textStuff = document.createElement('section');
        const buyButton = document.createElement('button');
        const itemTitle = document.createElement('h3');
        const itemDesc = document.createElement('p');
        itemTitle.innerHTML = fullItem.name;
        itemDesc.innerHTML = fullItem.desc;
        textStuff.appendChild(itemTitle);
        textStuff.appendChild(itemDesc);
        textStuff.classList.add('itemText');
        buyButton.innerHTML = `${fullItem.price} Talons`;
        for (const thingy of inventory) {
            console.log(`Current item being compared: ${thingy}`)
            if (thingy === fullItem) {
                itemBox.classList.add('bought');
                buyButton.innerHTML = 'Bought!';
                return;
            }
            else {
                if (!itemBox.classList.contains('unbought')) {
                itemBox.classList.add('unbought');
                }
                buyButton.innerHTML = `${item.price} Talons`;
            }
            buyButton.addEventListener('click', function() {
                if (talons >= item.price) {
                    console.log('bought item');
                    console.log(player);
                    talons -= item.price;
                    inventory.push(fullItem);
                    increaseStats(fullItem);
                    console.log(player);
                    createShop(i, leaving);
                };
            })
        }
        itemBox.appendChild(textStuff);
        itemBox.appendChild(buyButton);
        shopItems.appendChild(itemBox);
        shopItems.appendChild(buyButton);
        console.log(shopItems)
    }
    const leavebutton = document.createElement('button');
    leavebutton.innerHTML = 'Leave';
    leavebutton.classList.add('leavebtn');
    textBox.appendChild(shopItems);
    textBox.appendChild(leavebutton);
    leavebutton.addEventListener('click', function() {
        transition(leaving);
    });
}

function increaseStats(stat, amount) {
    if (stat === 'attack') {
        player.attack += amount;
    }
    if (stat === 'defense') {
        player.defense += amount;
    }
    if (stat === 'luck') {
        player.luck += amount;
    }
    if (stat === 'maxHP') {
        player.maxHP += amount;
        player.HP += amount;
    }
    if (stat === 'maxEnergy') {
        player.maxEnergy += amount;
        player.energy += amount;
    }
    updateStats();
}