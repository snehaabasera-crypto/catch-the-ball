const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("start-btn");
const overlay = document.getElementById("overlay");
const finalText = document.getElementById("final-text");
const finalScore = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

let score = 0;
let timeLeft = 30;
let timer;
let gameInterval;
let isPlaying = false;

function startGame() {
  score = 0;
  timeLeft = 30;
  isPlaying = true;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
  gameArea.innerHTML = "";
  overlay.classList.add("hidden");
  startBtn.disabled = true;

  timer = setInterval(updateTimer, 1000);
  gameInterval = setInterval(spawnBall, 700);
}

function updateTimer() {
  timeLeft--;
  timeDisplay.textContent = timeLeft;
  if (timeLeft <= 0) endGame();
}

function spawnBall() {
  if (!isPlaying) return;
  const ball = document.createElement("div");
  ball.classList.add("ball");

  const x = Math.random() * (gameArea.clientWidth - 60);
  const y = Math.random() * (gameArea.clientHeight - 60);
  ball.style.left = `${x}px`;
  ball.style.top = `${y}px`;

  ball.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;
    ball.remove();
    const sound = new Audio("assets/sounds/click.mp3");
    sound.volume = 0.3;
    sound.play();
    createParticle(x, y);
  });

  gameArea.appendChild(ball);

  setTimeout(() => {
    if (gameArea.contains(ball)) ball.remove();
  }, 900);
}

function createParticle(x, y) {
  const particle = document.createElement("div");
  particle.style.position = "absolute";
  particle.style.left = `${x + 20}px`;
  particle.style.top = `${y + 20}px`;
  particle.style.width = "10px";
  particle.style.height = "10px";
  particle.style.borderRadius = "50%";
  particle.style.background = "#fff";
  particle.style.opacity = "0.8";
  gameArea.appendChild(particle);

  const angle = Math.random() * 2 * Math.PI;
  const distance = 50;
  const targetX = x + Math.cos(angle) * distance;
  const targetY = y + Math.sin(angle) * distance;

  particle.animate(
    [
      { transform: `translate(0,0)`, opacity: 0.8 },
      { transform: `translate(${targetX - x}px, ${targetY - y}px)`, opacity: 0 }
    ],
    { duration: 600, easing: "ease-out" }
  );

  setTimeout(() => particle.remove(), 600);
}

function endGame() {
  clearInterval(timer);
  clearInterval(gameInterval);
  isPlaying = false;
  startBtn.disabled = false;
  finalText.textContent = "⏰ Time’s Up!";
  finalScore.textContent = `Your Score: ${score}`;
  overlay.classList.remove("hidden");
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
