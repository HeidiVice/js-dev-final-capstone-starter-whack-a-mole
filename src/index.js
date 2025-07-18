const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score');
const timerDisplay = document.querySelector('#timer');
const grid = document.querySelector('.grid');
const container = document.querySelector('.container');

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let moleTimeout;
let difficulty = "hard";
let gameInProgress = false;

// --- Utility Functions ---
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setDelay(difficulty) {
  if (difficulty === "easy") return 1500;
  if (difficulty === "normal") return 1000;
  return randomInteger(600, 1200);
}

function chooseHole(holes) {
  const index = randomInteger(0, holes.length - 1);
  const hole = holes[index];
  if (hole === lastHole) return chooseHole(holes);
  lastHole = hole;
  return hole;
}

function toggleVisibility(hole) {
  hole.classList.toggle('show');
  return hole;
}

function updateScore() {
  points++;
  score.textContent = points;
  return points;
}

function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

function updateTimer() {
  if (time > 0) {
    time--;
    timerDisplay.textContent = time;
  }
  return time;
}

function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

function whack(event) {
  if (!gameInProgress) return;
  updateScore();
  const parentHole = event.target.closest('.hole');
  parentHole.classList.remove('show');
}

function setEventListeners() {
  moles.forEach(mole => mole.addEventListener('click', whack));
  return moles;
}

function setDuration(duration) {
  time = duration;
  timerDisplay.textContent = time;
  return time;
}

function showAndHide(hole, delay) {
  toggleVisibility(hole);
  moleTimeout = setTimeout(() => {
    toggleVisibility(hole);
    gameOver();
  }, delay);
  return moleTimeout;
}

function showUp() {
  const delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

function gameOver() {
  if (time > 0) {
    return showUp();
  } else {
    return stopGame();
  }
}

function stopGame() {
  clearInterval(timer);
  clearTimeout(moleTimeout);
  holes.forEach(hole => hole.classList.remove('show'));
  gameInProgress = false;
  startButton.disabled = false;
  return "game stopped";
}

function startGame() {
  if (gameInProgress) return;

  clearScore();
  setDuration(10);
  setEventListeners();
  startTimer();
  gameInProgress = true;
  startButton.disabled = true;
  showUp();

  return "game started";
}

startButton.addEventListener("click", startGame);

// Do not modify below
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
