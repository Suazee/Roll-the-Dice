"use strict";

const players = document.querySelectorAll(".player");
const diceRolled = document.querySelector(".dice");
const diceRollButton = document.querySelector(".btn--roll");
const holdScoreButton = document.querySelector(".btn--hold");
const newGameButton = document.querySelector(".btn--new");
const ruleModal = document.querySelector(".rule-modal");
const closeModalButton = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");

let currentScore = 0;
let player1Total = 0;
let player2Total = 0;
let randomNumber;
let activePlayer;

/*---------------------------PRESENTS THE RULES OF THE GAME ONCE THE PAGE IS LOADED UP-------------------------- */

function startGame() {
  // ACTIVATES THE ROLL DICE BUTTON AT THE START OF THE GAME

  diceRollButton.addEventListener("click", gameLogic);
}

function updateCurrentScore() {
  // HELPS UPDATE THE CURRENT PLAYER'S SCORE ONCE THE DICE IS ROLLED

  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
}

function updateTotalScore(total) {
  // HELPS UPDATE THE CURRENT PLAYER'S TOTAL SCORE ONCE THE HOLD BUTTON IS PRESSED

  document.querySelector(`#score--${activePlayer}`).textContent = total;
}

function randomNumberGenerator() {
  // GENERATES THE NEW DICE NUMBER TO BE ROLLED

  randomNumber = Math.floor(Math.random() * 6 + 1);
  return randomNumber;
}

function whoseTurn() {
  // DECTECTS THE ACTIVATE PLAYER IN ORDER TO ENABLE EFFECTIVE SCORE RECORDING

  for (let i = 0; i < players.length; i++) {
    if (players[i].classList.contains("player--active")) {
      if (players[i].classList.contains("player--0")) {
        activePlayer = 0;
      } else {
        activePlayer = 1;
      }
    }
  }
}

function callWinner() {
  // ADDS THE WINNER STYLE ON TO THE CURRENT PLAYER THAT HIT 100 TOTAL POINTS FIRST

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--winner");
  diceRolled.classList.add("hidden");
  diceRollButton.removeEventListener("click", gameLogic);
  holdScoreButton.removeEventListener("click", holdCurrentScore);
  newGameButton.addEventListener("click", resetGame);
}

function switchPlayer() {
  // SWITCHES THE ACTIVE AND INACTIVE PLAYER AND RESETS THE CURRENT SCORE BACK TO 0

  currentScore = 0;
  updateCurrentScore();
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
  document
    .querySelector(`.player--${activePlayer === 0 ? 1 : 0}`)
    .classList.add("player--active");
  whoseTurn();
  holdScoreButton.removeEventListener("click", holdCurrentScore);
}

function holdCurrentScore() {
  // ADDS THE CURRENT SCORE OF THE ACTIVE PLAYER TO THE TOTAL SCORE OF THE PLAYER WHEN THE PLAYER HITS THE HOLD BUTTON
  // CHECKS FOR THE WINNER
  // CALLS THE switchPlayer() IF NO WINNER IS FOUND

  if (activePlayer === 0) {
    player1Total += currentScore;
    updateTotalScore(player1Total);
  } else {
    player2Total += currentScore;
    updateTotalScore(player2Total);
  }

  if (player1Total >= 100 || player2Total >= 100) {
    callWinner();
    return;
  } else {
    switchPlayer();
  }
}

function gameLogic() {
  // DETECTS WHO THE ACTIVATE PLAYER IS FROM whoseTurn(), ACTIVATES THGE HOLD BUTTON
  // MAKES SURE THE RIGHT DICE IS BEING DISPLAYED ON SCREEN
  // CHECKS IF THE ACTIVE PLAYER ROLLED A ONE AND CALLS THE switchPlayer()

  whoseTurn();
  holdScoreButton.addEventListener("click", holdCurrentScore);
  diceRolled.classList.remove("hidden");
  diceRolled.src = `../images/dice-${randomNumberGenerator()}.png`;

  if (randomNumber === 1) {
    switchPlayer();
  } else {
    currentScore += randomNumber;
    updateCurrentScore();
  }
}

function resetGame() {
  // RESETS EVERYTHING IN THE GAME BACK TO THE RELOADED PAGE VERSION

  currentScore = 0;
  player1Total = 0;
  player2Total = 0;
  updateCurrentScore();
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  document.querySelector("#score--0").textContent = player1Total;
  document.querySelector("#score--1").textContent = player2Total;
  document
    .querySelector(`.player--${Math.floor(Math.random() * 2)}`)
    .classList.add("player--active");
  newGameButton.removeEventListener("click", resetGame);
  startGame();
}

function closeModal() {
  overlay.classList.add("hidden");
  ruleModal.classList.add("hidden");
  startGame();
}

/*------------------------------PIG GAME LOGIC BY JOHNSON AKA SUAZEE------------------------------------------- */

closeModalButton.addEventListener("click", closeModal);
