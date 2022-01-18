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

closeModalButton.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

function closeModal() {
  overlay.classList.add("hidden");
  ruleModal.classList.add("hidden");
  startGame();
}

/*------------------------------PIG GAME LOGIC BY JOHNSON AKA SUAZEE------------------------------------------- */

function startGame() {
  // ACTIVATES THE ROLL DICE BUTTON AT THE START OF THE GAME

  diceRollButton.addEventListener("click", gameLogic);
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

function updateCurrentScore() {
  // HELPS UPDATE THE CURRENT PLAYER'S SCORE ONCE THE DICE IS ROLLED

  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
}

function updateTotalScore(total) {
  // HELPS UPDATE THE CURRENT PLAYER'S TOTAL SCORE ONCE THE HOLD BUTTON IS PRESSED

  document.querySelector(`#score--${activePlayer}`).textContent = total;
}

function gameLogic() {
  // DETECTS WHO THE ACTIVATE PLAYER IS FROM whoseTurn(), ACTIVATES THGE HOLD BUTTON
  // MAKES SURE THE RIGHT DICE IS BEING DISPLAYED ON SCREEN
  // CHECKS IF THE ACTIVE PLAYER ROLLED A ONE AND CALLS THE nextPlayer()

  whoseTurn();
  holdScoreButton.addEventListener("click", holdScoreEvent);
  diceRolled.classList.remove("hidden");
  diceRolled.src = `../images/dice-${randomNumberGenerator()}.png`;

  if (randomNumber === 1) {
    nextPlayer();
  } else {
    currentScore += randomNumber;
    updateCurrentScore();
  }
}

function nextPlayer() {
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
  holdScoreButton.removeEventListener("click", holdScoreEvent);
}

function holdScoreEvent() {
  // ADDS THE CURRENT SCORE OF THE ACTIVE PLAYER TO THE TOTAL SCORE OF THE PLAYER WHEN THE PLAYER HITS THE HOLD BUTTON
  // CHECKS FOR THE WINNER
  // CALLS THE nextPlayer() IF NO WINNER IS FOUND

  if (activePlayer === 0) {
    player1Total += currentScore;
    updateTotalScore(player1Total);
    if (player1Total >= 100) {
      callWinner();
      return;
    }
  } else {
    player2Total += currentScore;
    updateTotalScore(player2Total);
    if (player2Total >= 100) {
      callWinner();
      return;
    }
  }

  nextPlayer();
}

function resetGame() {
  // RESETS EVERYTHING IN THE GAME BACK TO THE RELOADED PAGE VERSION

  currentScore = 0;
  player1Total = 0;
  player2Total = 0;
  updateCurrentScore();
  diceRolled.classList.add("hidden");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
  document.querySelector("#score--0").textContent = player1Total;
  document.querySelector("#score--1").textContent = player2Total;
  document.querySelector(".player--0").classList.add("player--active");
  newGameButton.removeEventListener("click", resetGame);
  startGame();
}

function callWinner() {
  // ADDS THE WINNER STYLE ON TO THE CURRENT PLAYER THAT HIT 100 TOTAL POINTS FIRST

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--winner");
  diceRollButton.removeEventListener("click", gameLogic);
  holdScoreButton.removeEventListener("click", holdScoreEvent);
  newGameButton.addEventListener("click", resetGame);
}
