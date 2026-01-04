/* ----- IMPORT WORD BANK ----- */
import { wordBank } from './wordlist.js';

/* ----- STATE ----- */
// changing variables
let guessesLeft = 6;
let selectedLetter = "";
let PokemontoGuess;
let otrMons;
let dragonTypes;
let allLettersRevealed = false;

// cached element
const btnStart = document.querySelector("#startBtn");
const btnLetters = document.querySelectorAll(".letter-ctr div");
const option = document.querySelector(".optionCtr");
const playAgainBtn = document.querySelector(".reset");
const otrMonsBank = document.querySelector(".optionOthers");
const rdmdragonTypesBank = document.querySelector(".optionDragon");
const backgroundImg = document.querySelector(".movingPic");
const Who = document.querySelector(".WhosThatPokemon");

// event listeners
btnStart.addEventListener("click", function () {
  option.style.visibility = "visible";
  btnStart.style.visibility = "hidden";
});
option.addEventListener("click", function () {
  option.style.visibility = "hidden";
});

playAgainBtn.addEventListener("click", resetGame);

rdmdragonTypesBank.addEventListener("click", function () {
  dragonTypes =
    wordBank.dragons[Math.floor(Math.random() * wordBank.dragons.length)];
  renderGame(dragonTypes);
  // console.log(dragonTypes);
});
otrMonsBank.addEventListener("click", function () {
  otrMons =
    wordBank.otherMons[
      Math.floor(Math.random() * wordBank.otherMons.length)
    ];
  renderGame(otrMons);
  // console.log(otrMons);
});

// functions
initializeGame();
function initializeGame() {
  guessesLeft = 6;
  btnStart.style.visibility = "visible";
  backgroundImg.src = "./assets/hangman6.png";
}

function renderGame(word) {
  playerGuessLetters();
  backgroundImg.src = "./assets/hangman0.png";
  Who.innerHTML = "";

  for (let i = 0; i < word.length; i++) {
    let letter = document.createElement("div");
    letter.innerText = "_";
    Who.appendChild(letter);
  }
}

function resetGame() {
  endGame();
  initializeGame();
  Who.innerHTML = "";
  btnStart.style.visibility = "visible";
  option.style.visibility = "hidden";
  btnStart.innerText = "Start";
  btnLetters.forEach((letter) => {
    letter.style.backgroundColor = "#F0F4F8";
  });
}
function endGame() {
  btnLetters.forEach((letter) => {
    letter.removeEventListener("click", handleLetterClick);
  });
}

// determine which word to check based on the option selected
function checkWord() {
  if (dragonTypes) {
    PokemontoGuess = dragonTypes;
  } else {
    PokemontoGuess = otrMons;
  }
}

function playerGuessLetters() {
  checkWord();
  btnLetters.forEach((letter) => {
    letter.addEventListener("click", handleLetterClick);
  });
}

function handleLetterClick() {
  const selectedLetter = this.innerText;
  this.style.backgroundColor = "black";
  // console.log('Selected letter:', selectedLetter);
  let letterFound = checkLetterInWord(selectedLetter);
  if (!letterFound) {
    //if letter selected is wrong, change the image
    guessesLeft--;
    backgroundImg.src = `./assets/hangman${6 - guessesLeft}.png`;
    console.log(`${guessesLeft}`);
  }
  allLettersRevealed = checkIfPlayerRevealAllLetters();
  checkResult();
}

function checkLetterInWord(selectedLetter) {
  // check if the selected letter is in the word to guess
  let wordLetters = PokemontoGuess.split("");
  let WhoDivs = Who.querySelectorAll("div");
  let result = false;
  for (let i = 0; i < wordLetters.length; i++) {
    if (wordLetters[i].toLowerCase() === selectedLetter.toLowerCase()) {
      WhoDivs[i].innerText = wordLetters[i];
      result = true;
    }
  }
  return result;
}

// checking if player reveals all the letters or not
function checkIfPlayerRevealAllLetters() {
  let revealedLetters = Who.querySelectorAll("div");
  let result = true;
  for (let i = 0; i < revealedLetters.length; i++) {
    if (revealedLetters[i].innerText === "_") {
      result = false;
      break;
    }
  }
  return result;
}

function checkResult() {
  if (allLettersRevealed === true) {
    btnStart.style.visibility = "visible";
    btnStart.style.height = "auto";
    btnStart.style.width = "15vh";
    btnStart.innerText = "You Win!!";
    endGame();
  } else if (guessesLeft === 0) {
    btnStart.style.visibility = "visible";
    btnStart.style.height = "auto";
    btnStart.style.width = "15vh";
    btnStart.innerText = "You Lose!!";
    endGame();
  }
}