/* ----- IMPORT WORD BANK ----- */
import { wordBank } from './wordlist.js';

/* ----- STATE ----- */
let guessesLeft;
let wordToGuess;
let revealedLetters;
let gameOver;

/* ----- CONSTANTS ----- */
const MAX_TRIES = 6;

/* ----- CACHED ELEMENTS ----- */
const startBtn = document.getElementById('start-button');
const wordDisplay = document.getElementById('word-display');
const attemptsEl = document.getElementById('attempts-remaining');
const messageEl = document.getElementById('message');
const keys = document.querySelectorAll('.key');
const keyboard = document.getElementById('keyboard');
const popup = document.querySelector('.popup-ctr');
const resetBtn = document.querySelector('.reset');

/* ----- EVENT LISTENERS ----- */
startBtn.addEventListener('click', init);
resetBtn.addEventListener('click', () => location.reload());

keys.forEach(key => {
  key.addEventListener('click', () => handleLetterClick(key));
});

/* ----- FUNCTIONS ----- */

function init() {
  guessesLeft = MAX_TRIES;
  gameOver = false;

  wordToGuess = getRandomWord().toUpperCase();
  revealedLetters = Array(wordToGuess.length).fill('_');

  keyboard.style.display = 'flex';
  document.getElementById('game-area').style.display = 'block';
  popup.style.display = 'none';

  keys.forEach(k => k.classList.remove('used'));

  messageEl.textContent = '';
  render();
}

function getRandomWord() {
  const allWords = [
    ...wordBank.randomWords,
    ...wordBank.roboWords
  ];
  return allWords[Math.floor(Math.random() * allWords.length)];
}


function handleLetterClick(key) {
  if (gameOver || key.classList.contains('used')) return;

  const selectedLetter = key.textContent;
  key.classList.add('used');

  let letterFound = false;

  for (let i = 0; i < wordToGuess.length; i++) {
    if (wordToGuess[i] === selectedLetter) {
      revealedLetters[i] = selectedLetter;
      letterFound = true;
    }
  }

  if (!letterFound) {
    guessesLeft--;
  }

  render();
  checkResult();
}

function render() {
  wordDisplay.textContent = revealedLetters.join(' ');
  attemptsEl.textContent = `Attempts remaining: ${guessesLeft}`;
}

function checkResult() {
  if (!revealedLetters.includes('_')) {
    endGame(true);
  } else if (guessesLeft === 0) {
    endGame(false);
  }
}

function endGame(win) {
  gameOver = true;
  popup.style.display = 'flex';
  messageEl.textContent = win
    ? '🎉 You Win!!'
    : `💀 You Lose!! The word was "${wordToGuess}"`;
}
