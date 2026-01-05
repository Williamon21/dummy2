/* ----- IMPORT WORD BANK ----- */
import { wordBank } from './wordlist.js';

/*---------------------------- Variables (state) ----------------------------*/

let guessesLeft = 6;

let selectedLetter = "";

let PokemontoGuess;

let otrMons;

let dragonTypes;

let Legendary;

let PokemonRevealed = false;

/*-------------------------------- CONSTANTS --------------------------------*/

const btnStart = document.querySelector("#startBtn");

const btnLetters = document.querySelectorAll(".letter-ctr div");

const option = document.querySelector(".optionCtr");

const playAgainBtn = document.querySelector(".reset");

const otrMonsBank = document.querySelector(".optionOthers");

const rdmdragonTypesBank = document.querySelector(".optionDragon");

const LegendaryBank = document.querySelector(".optionLegendary");

const backgroundImg = document.querySelector(".angrynoivern");

const Who = document.querySelector(".WhosThatPokemon");

/*----------------------------- EVENT LISTENERS -----------------------------*/

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
});


otrMonsBank.addEventListener("click", function () {
  otrMons =
    wordBank.otherMons[
      Math.floor(Math.random() * wordBank.otherMons.length)
    ];
  renderGame(otrMons);
});


LegendaryBank.addEventListener("click", function () {
  Legendary =
    wordBank.Legendary[
      Math.floor(Math.random() * wordBank.Legendary.length)
    ];
  renderGame(Legendary);
});

/*-------------------------------- FUNCTIONS --------------------------------*/


initializeGame();
function initializeGame() {
  guessesLeft = 6;
  btnStart.style.visibility = "visible";
  backgroundImg.src = "./assets/noivern6.png";
}

function renderGame(word) {
  playerGuessLetters();
  backgroundImg.src = "./assets/noivern0.png";
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
    letter.style.backgroundColor = "#3e5872ff";
  });
}
function endGame() {
  btnLetters.forEach((letter) => {
    letter.removeEventListener("click", handleLetterClick);
  });
}

function checkWord() {
  if (dragonTypes) {
    PokemontoGuess = dragonTypes;
  } else if (otrMons) {
    PokemontoGuess = otrMons;
  } else {
PokemontoGuess = Legendary;
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
  this.style.backgroundColor = "red";
  let letterFound = checkLetterInWord(selectedLetter);
  if (!letterFound) {
    guessesLeft--;
    backgroundImg.src = `./assets/noivern${6 - guessesLeft}.png`;
    console.log(`${guessesLeft}`);
  }
  PokemonRevealed = checkIfPlayerRevealAllLetters();
  checkResult();
}

function checkLetterInWord(selectedLetter) {
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
  if (PokemonRevealed === true && guessesLeft === 1) {
    
    btnStart.style.visibility = "visible";
    btnStart.style.height = "auto";
    btnStart.style.width = "25vh";
    btnStart.innerText = "Great, um...maybe we should give him a berry?";
    endGame();
  } 

  else if (PokemonRevealed === true) {
    
    btnStart.style.visibility = "visible";
    btnStart.style.height = "auto";
    btnStart.style.width = "15vh";
    btnStart.innerText = "You got it!!";
    endGame();
  } 

  else if (guessesLeft === 0) {
    
    btnStart.style.visibility = "visible";
    btnStart.style.height = "auto";
    btnStart.style.width = "20vh";
    btnStart.innerText = "Draco Meteor...Run!";
    endGame();
  }
}
