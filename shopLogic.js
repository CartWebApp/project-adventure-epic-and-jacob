import { shop } from "./shopitems.js";
import { inventory, textBox } from "./textStuff.js";

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
        const itemBox = document.createElement('section');
        const textStuff = document.createElement('section');
        const buyButton = document.createElement('button');
        const itemTitle = document.createElement('h3');
        const itemDesc = document.createElement('p');
        itemTitle.innerHTML = fullItem.name;
        itemDesc.innerHTML = fullItem.desc;
        textStuff.appendChild(itemTitle);
        textStuff.appendChild(itemDesc);
        textStuff.classList.add('itemText');
        for (const thingy of inventory) {
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
            itemBox.addEventListener('click', function() {
                if (talons >= item.price) {
                    buyItem(item);
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
    leavebutton.classList.add = 'leavebtn';
    textBox.appendChild(shopItems);
    leavebutton.addEventListener('click', function() {
        transition(leaving);
    });
}