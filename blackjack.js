import { transition } from "./movePaths.js";
import { textBox } from "./textStuff.js";

let currentBlackjackBranch = null;

// We want: blackjack scene plays ONCE per round.
// The story nodes themselves (win/keepWinning/win3/lose/lose2) decide whether to re-enter.
let roundWinCount = 0; // 0..2 so that third win advances to win3
let roundLoseCount = 0; // counts losses after win3 (lose -> lose2 -> lose)

const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = [
  { name: '2', value: 2, file: '02' },
  { name: '3', value: 3, file: '03' },
  { name: '4', value: 4, file: '04' },
  { name: '5', value: 5, file: '05' },
  { name: '6', value: 6, file: '06' },
  { name: '7', value: 7, file: '07' },
  { name: '8', value: 8, file: '08' },
  { name: '9', value: 9, file: '09' },
  { name: '10', value: 10, file: '10' },
  { name: 'jack', value: 10, file: 'J' },
  { name: 'queen', value: 10, file: 'Q' },
  { name: 'king', value: 10, file: 'K' },
  { name: 'ace', value: 11, file: 'A' },
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
        img: `stupidimages/card_${suit}_${rank.file}.png`,
      });
    }
  }
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function dealCard() {
  if (deck.length === 0) deck = buildDeck();
  return deck.pop();
}

function calculateScore(hand) {
  let score = hand.reduce((sum, card) => sum + card.value, 0);
  const aces = hand.filter((card) => card.value === 11);
  if (score > 21 && aces.length > 0) score -= 10 * aces.length;
  return score;
}

function renderBlackjack(showDealer) {
  textBox.innerHTML = '';

  const playerScore = calculateScore(playerHand);
  const dealerScore = calculateScore(dealerHand);

  const container = document.createElement('div');

  function cardRow(hand, hideSecond = false) {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.gap = '6px';
    row.style.marginBottom = '8px';

    hand.forEach((card, i) => {
      const img = document.createElement('img');
      img.style.height = '100px';
      if (hideSecond && i === 1) img.src = 'stupidimages/card_back.png';
      else img.src = card.img;
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
    : 'Dealer Hand';
  container.appendChild(dealerLabel);
  container.appendChild(cardRow(dealerHand, !showDealer));

  textBox.appendChild(container);

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

  // Note: we still allow hit, but we will only transition once (round ends).
  hitBtn.onclick = blackjackHit;
  standBtn.onclick = blackjackStand;
}

function getWinPath() {
  // We want 3 consecutive blackjack wins, then advance.
  // The `branch` passed into startBlackjack(branch) is the story node:
  // story.blackjack = { type:'blackjack', win:'blackjackWin', lose:'blackjackLose' }
  // So we can’t rely on branch.keepWinning or branch.win3 being present.
  roundWinCount++;

  if (roundWinCount === 1) return currentBlackjackBranch.win; // blackjackWin
  if (roundWinCount === 2) return 'keepWinning'; // 2nd win
  // roundWinCount === 3
  return 'blackjackWin3';
}

function getLosePath() {
  // Losses should follow the same blackjack story chain.
  // Before win3: lose goes to blackjackLose.
  // After win3: first loss goes to blackjackLose, second to blackjackLose2.
  roundLoseCount++;

  if (roundLoseCount === 1) return currentBlackjackBranch.lose; // blackjackLose
  if (roundLoseCount === 2) return 'blackjackLose2'; // 2nd loss

  // >=3: keep losing on blackjackLose so the player keeps retrying
  roundLoseCount = 1;
  return currentBlackjackBranch.lose;
}


function endRound(path) {
  // Immediately transition; this ends the blackjack scene (plays once).
  setTimeout(() => transition(path), 0);
}

function blackjackHit() {
  playerHand.push(dealCard());
  const score = calculateScore(playerHand);

  if (score > 21) {
    // Bust => lose
    renderBlackjack(true);

    // During the first phase (before reaching win3), the story wants regular lose behavior.
    // We'll just follow the same lose pattern.
    endRound(getLosePath());
  } else {
    renderBlackjack(true);
  }
}

function blackjackStand() {
  while (calculateScore(dealerHand) < 17) dealerHand.push(dealCard());

  const playerScore = calculateScore(playerHand);
  const dealerScore = calculateScore(dealerHand);

  renderBlackjack(true);

  const playerWins = dealerScore > 21 || playerScore > dealerScore;
  if (playerWins) {
    endRound(getWinPath());
  } else {
    endRound(getLosePath());
  }
}

export function startBlackjack(branch) {
  currentBlackjackBranch = branch;

  // Reset counters when entering the blackjack game node.
  // Because each win/lose transition will go to a story node,
  // we only play the blackjack screen once per transition.
  roundWinCount = 0;
  roundLoseCount = 0;

  deck = buildDeck();
  playerHand = [dealCard(), dealCard()];
  dealerHand = [dealCard(), dealCard()];

  renderBlackjack(false);
}

