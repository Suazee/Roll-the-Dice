"use strict";

const players = document.querySelectorAll(".player");
const diceRolled = document.querySelector(".dice");
const diceRollButton = document.querySelector(".btn--roll");
const holdScoreButton = document.querySelector(".btn--hold");
const newGameButton = document.querySelector(".btn--new");
const modal = document.querySelector(".modal");
const closeModalButton = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");

let playerScore = 0;
let player1Total = 0;
let player2Total = 0;
let randomNumber;
let playerActive;
let playerInactive;
let playerID;

closeModalButton.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeModal();
});

function closeModal() {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
  startGame();
}

// PIG GAME LOGIC BY JOHNSON AKA SUAZEE

function startGame() {
  diceRollButton.addEventListener("click", gameLogic);
}

function randomNumberGenerator() {
  randomNumber = Math.floor(Math.random() * 6 + 1);
  return randomNumber;
}

function whoseTurn() {
  for (let i = 0; i < players.length; i++) {
    if (players[i].classList.contains("player--active")) {
      playerActive = players[i].classList[1];
    } else {
      playerInactive = players[i].classList[1];
    }
  }
  playerActive === "player--0" ? (playerID = 0) : (playerID = 1);
}

function updateCurrentScore() {
  document.querySelector(`.${playerActive} #current--${playerID}`).textContent =
    playerScore;
}

function updateTotalScore(total) {
  document.querySelector(`.${playerActive} #score--${playerID}`).textContent =
    total;
}

function gameLogic() {
  whoseTurn();
  holdScoreButton.addEventListener("click", holdScoreEvent);
  diceRolled.classList.remove("hidden");
  diceRolled.src = `../images/dice-${randomNumberGenerator()}.png`;

  playerScore += randomNumber;
  if (randomNumber === 1) {
    nextPlayer();
  } else {
    updateCurrentScore();
  }
}

function nextPlayer() {
  playerScore = 0;
  updateCurrentScore();
  document.querySelector(`.${playerActive}`).classList.remove("player--active");
  document.querySelector(`.${playerInactive}`).classList.add("player--active");
  whoseTurn();
  holdScoreButton.removeEventListener("click", holdScoreEvent);
}

function holdScoreEvent() {
  if (playerActive === "player--0") {
    player1Total += playerScore;
    updateTotalScore(player1Total);
    if (player1Total >= 100) {
      callWinner();
      return;
    }
  } else {
    player2Total += playerScore;
    updateTotalScore(player2Total);
    if (player2Total >= 100) {
      callWinner();
      return;
    }
  }

  nextPlayer();
}

function resetGame() {
  playerScore = 0;
  player1Total = 0;
  player2Total = 0;
  updateCurrentScore();
  diceRolled.classList.add("hidden");
  document.querySelector(`.${playerActive}`).classList.remove("player--winner");
  document.querySelector(`.${playerActive}`).classList.remove("player--active");
  document.querySelector("#score--0").textContent = player1Total;
  document.querySelector("#score--1").textContent = player2Total;
  document.querySelector(".player--0").classList.add("player--active");
  startGame();
}

function callWinner() {
  document.querySelector(`.${playerActive}`).classList.add("player--winner");
  diceRollButton.removeEventListener("click", gameLogic);
  holdScoreButton.removeEventListener("click", holdScoreEvent);
  newGameButton.addEventListener("click", resetGame);
}
