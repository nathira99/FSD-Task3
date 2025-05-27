
const cardImages = [
    './src/assets/instagram.png', './src/assets/instagram.png',
    './src/assets/messenger.png', './src/assets/messenger.png',
    './src/assets/pinterest.png', './src/assets/pinterest.png',
    './src/assets/skype.png', './src/assets/skype.png',
    './src/assets/snapchat.png', './src/assets/snapchat.png',
    './src/assets/telegram.png', './src/assets/telegram.png',
    './src/assets/viber.png', './src/assets/viber.png',
    './src/assets/whatsapp.png', './src/assets/whatsapp.png'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
const totalPairs = cardImages.length/2;
let matchedPairs = 0;

const gameContainer = document.getElementById('game-container');
const restartButton = document.getElementById('restart');
let win = document.getElementById('winMessage');

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createCard(imgSrc) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.image = imgSrc;

  const frontFace = document.createElement('img');
  frontFace.src = imgSrc;
  frontFace.classList.add('front-face');

  const backFace = document.createElement('img');
  backFace.src = './src/assets/front face.jpg'; 
  backFace.classList.add('back-face');

  card.appendChild(frontFace);
  card.appendChild(backFace);

  card.addEventListener('click', () => flipCard(card));

  gameContainer.appendChild(card);
}

function flipCard(card) {
  if (lockBoard || card === firstCard) return;

  card.classList.add('flip');

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.image === secondCard.dataset.image;

  if (isMatch) {
    disableCards(); 
    matchedPairs++ ;
    console.log(`Matched Pairs: ${matchedPairs} / ${totalPairs}`);

    if (matchedPairs === totalPairs) {
      winMsg();
    }

// Function to display the message
function winMsg() {
    win.style.display = 'block';
}

// To restart the game
    document.getElementById('playAgain').addEventListener('click', function() {
    win.style.display = 'none';
    initGame(); 
    });


  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', () => flipCard(firstCard));
  secondCard.removeEventListener('click', () => flipCard(secondCard));


  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}


function initGame() {
  gameContainer.innerHTML = '';
  shuffle(cardImages);
  cardImages.forEach((imgSrc) => {
    createCard(imgSrc);
  });
}

restartButton.addEventListener('click', initGame);

initGame();
