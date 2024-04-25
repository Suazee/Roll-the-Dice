"use strict";

// VARIABLES
const players = document.querySelectorAll(".player");
const diceRolled = document.querySelector(".dice");
const diceRollButton = document.querySelector(".btn--roll");
const holdScoreButton = document.querySelector(".btn--hold");
const newGameButton = document.querySelector(".btn--new");
const ruleModal = document.querySelector(".rule-modal");
const closeModalButton = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");
const playerName1 = document.getElementById("name--0");
const playerName2 = document.getElementById("name--1");
const score1 = document.getElementById("score--0");
const score2 = document.getElementById("score--1");

let currentScore = 0;
let player1Total = 0;
let player2Total = 0;
let randomNumber;
let activePlayer;

/*---------------------------PRESENTS THE RULES OF THE GAME ONCE THE PAGE IS LOADED UP-------------------------- */

const startGame = function () {
  // ACTIVATES THE ROLL DICE BUTTON AT THE START OF THE GAME
  playerName1.textContent = prompt("Player 1, ENTER NAME:");
  playerName2.textContent = prompt("Player 2, ENTER NAME:");
  document
    .querySelector(`.player--${Math.floor(Math.random() * 2)}`)
    .classList.add("player--active");
  diceRollButton.addEventListener("click", gameLogic);
};

const updateCurrentScore = function () {
  // HELPS UPDATE THE CURRENT PLAYER'S SCORE ONCE THE DICE IS ROLLED
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
};

const updateTotalScore = function (total) {
  // HELPS UPDATE THE CURRENT PLAYER'S TOTAL SCORE ONCE THE HOLD BUTTON IS PRESSED
  document.querySelector(`#score--${activePlayer}`).textContent = total;
};

const randomNumberGenerator = function () {
  // GENERATES THE NEW DICE NUMBER TO BE ROLLED
  randomNumber = Math.floor(Math.random() * 6 + 1);
  return randomNumber;
};

const whoseTurn = function () {
  // DECTECTS THE ACTIVATE PLAYER IN ORDER TO ENABLE EFFECTIVE SCORE RECORDING
  for (let i = 0; i < players.length; i++) {
    if (players[i].classList.contains("player--active")) {
      if (players[i].classList.contains("player--0")) activePlayer = 0;
      else activePlayer = 1;
    }
  }
};

const callWinner = function () {
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
  // newGameButton.addEventListener("click", resetGame);
};

const switchPlayer = function () {
  // SWITCHES THE ACTIVE AND INACTIVE PLAYER AND RESETS THE CURRENT SCORE BACK TO 0
  currentScore = 0;
  updateCurrentScore();
  // activePlayer = activePlayer === 0 ? 1 : 0
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
  document
    .querySelector(`.player--${activePlayer === 0 ? 1 : 0}`)
    .classList.add("player--active");
  whoseTurn();
  holdScoreButton.removeEventListener("click", holdCurrentScore);
};

const holdCurrentScore = function () {
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

  if (player1Total >= 1000 || player2Total >= 1000) callWinner();
  else switchPlayer();
};

const gameLogic = function () {
  // DETECTS WHO THE ACTIVATE PLAYER IS FROM whoseTurn(), ACTIVATES THGE HOLD BUTTON
  // MAKES SURE THE RIGHT DICE IS BEING DISPLAYED ON SCREEN
  // CHECKS IF THE ACTIVE PLAYER ROLLED A ONE AND CALLS THE switchPlayer()
  whoseTurn();
  diceRolled.classList.remove("hidden");
  diceRolled.src = `images/dice-${randomNumberGenerator()}.png`;

  if (randomNumber !== 1) {
    currentScore += randomNumber;
    // if (currentScore >= 50)
    holdScoreButton.addEventListener("click", holdCurrentScore);
    updateCurrentScore();
  } else switchPlayer();
};

const resetGame = function () {
  // RESETS EVERYTHING IN THE GAME BACK TO THE RELOADED PAGE VERSION
  currentScore = 0;
  player1Total = 0;
  player2Total = 0;
  updateCurrentScore();
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  score1.textContent = player1Total;
  score2.textContent = player2Total;
  // newGameButton.removeEventListener("click", resetGame);
  startGame();
  console.log("Hello");
};

const closeModal = function () {
  overlay.classList.add("hidden");
  ruleModal.classList.add("hidden");
  newGameButton.addEventListener("click", resetGame);
  startGame();
};

/*------------------------------PIG GAME LOGIC BY JOHNSON AKA SUAZEE------------------------------------------- */

closeModalButton.addEventListener("click", closeModal);
