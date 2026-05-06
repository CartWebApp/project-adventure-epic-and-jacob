import { transition } from "./movePaths.js";
import { textBox } from "./textStuff.js";
let currentBlackjackBranch = null;
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = [
    { name: '2',  value: 2,  file: '02' },
    { name: '3',  value: 3,  file: '03' },
    { name: '4',  value: 4,  file: '04' },
    { name: '5',  value: 5,  file: '05' },
    { name: '6',  value: 6,  file: '06' },
    { name: '7',  value: 7,  file: '07' },
    { name: '8',  value: 8,  file: '08' },
    { name: '9',  value: 9,  file: '09' },
    { name: '10', value: 10, file: '10' },
    { name: 'jack',  value: 10, file: 'J' },
    { name: 'queen', value: 10, file: 'Q' },
    { name: 'king',  value: 10, file: 'K' },
    { name: 'ace',   value: 11, file: 'A' },
];
let deck = [];
let playerHand = [];
let dealerHand = [];
function buildDeck() {
    deck = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push({
                value: rank.value,
                img: `stupidimages/card_${suit}_${rank.file}.png`
            });
        }
    }
    // Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Pops one card off the deck (removes it so it can't be dealt again)
function dealCard() {
    console.log('dealing card')
    if (deck.length === 0) {
        deck = buildDeck();
        console.log('reshuffling deck');
    } // reshuffle if somehow empty
    return deck.pop();
}


function calculateScore(hand) {
    console.log('calculating score');
    let score = hand.reduce((sum, card) => sum + card.value, 0);
    let aces = hand.filter(card => card.value === 11);
    console.log(score, aces)
    if (score > 21 && aces > 0) {
        aces.forEach( () => {
            console.log('adjusting ace value')
            score -= 10;
        }// aces--;
    )};
    return score;
}

function renderBlackjack(showDealer) {
    console.log('rendering')
    textBox.innerHTML = '';

    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);

    const container = document.createElement('div');

    // Helper: render a row of card images
    function cardRow(hand, hideSecond = false) {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.gap = '6px';
        row.style.marginBottom = '8px';
        hand.forEach((card, i) => {
            const img = document.createElement('img');
        if (hideSecond && i === 1) {
                img.src = 'stupidimages/card_back.png'; // your card back image
            } else {
                img.src = card.img;
            }
            img.style.height = '100px';
            row.appendChild(img);
        });
        return row;
        }

    const title = document.createElement('strong');
    title.textContent = 'Blackjack';
    container.appendChild(title);
    container.appendChild(document.createElement('br'));
    container.appendChild(document.createElement('br'));

    const yourLabel = document.createElement('p');
    yourLabel.textContent = `Your Hand (Score: ${playerScore})`;
    container.appendChild(yourLabel);
    container.appendChild(cardRow(playerHand));

    const dealerLabel = document.createElement('p');
    dealerLabel.textContent = showDealer
        ? `Dealer Hand (Score: ${dealerScore})`
        : `Dealer Hand`;
    container.appendChild(dealerLabel);
    container.appendChild(cardRow(dealerHand, !showDealer)); // hide dealer's second card
    textBox.appendChild(container);

    // Buttons
    const hitBtn = document.createElement('button');
    hitBtn.innerText = 'Hit';
    hitBtn.classList.add('Hit');

    const standBtn = document.createElement('button');
    standBtn.innerText = 'Stand';
    standBtn.classList.add('Stand');

    const btnWrap = document.createElement('div');
    btnWrap.appendChild(hitBtn);
    btnWrap.appendChild(standBtn);
    textBox.appendChild(btnWrap);

    hitBtn.onclick = blackjackHit();
    standBtn.onclick = blackjackStand();
}

// === START ===
export function startBlackjack(branch) {
    console.log('starting blackjack');
    currentBlackjackBranch = branch;
    deck = buildDeck(); // fresh shuffled deck each game
    playerHand = [dealCard(), dealCard()];
    dealerHand = [dealCard(), dealCard()];
    renderBlackjack(false);
    console.log (currentBlackjackBranch)
}

// === HIT ===
function blackjackHit() {
    console.log('hit');
    playerHand.push(dealCard());
    const score = calculateScore(playerHand);
    if (score > 21) {
        console.log('bust');
        // renderBlackjack(false);
        setTimeout(() => transition(currentBlackjackBranch.lose), 1000);
        return;
    }
    renderBlackjack(true);
}

// === STAND ===
function blackjackStand() {
    console.log('stand');
    while (calculateScore(dealerHand) < 17) {
        dealerHand.push(dealCard());
    }
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);
    renderBlackjack(true);
    setTimeout(() => {
        if (dealerScore > 21 || playerScore > dealerScore) {
            transition(currentBlackjackBranch.win);
        } else {
            transition(currentBlackjackBranch.lose);
        }
    }, 1000);
}