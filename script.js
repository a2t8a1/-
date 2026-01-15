const overlay = document.getElementById("overlay");
const startBtn = document.getElementById("startBtn");
const rulesBtn = document.getElementById("rulesBtn");
const rulesOverlay = document.getElementById("rulesOverlay");
const closeRulesBtn = document.getElementById("closeRulesBtn");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Start button
startBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  startGame();
});

// Rules button
rulesBtn.addEventListener("click", () => {
  rulesOverlay.classList.remove("hidden");
});

// Close rules
closeRulesBtn.addEventListener("click", () => {
  rulesOverlay.classList.add("hidden");
});

// --- GAME LOGIC ---
// Basic paddle and ball for now
let ball = { x: 400, y: 250, vx: 4, vy: 4, radius: 10 };
let paddle = { x: 350, y: 450, width: 100, height: 10, speed: 8 };

function startGame() {
  requestAnimationFrame(gameLoop);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw ball
  ctx.fillStyle = "#FFD700";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();

  // Move ball
  ball.x += ball.vx;
  ball.y += ball.vy;

  // Bounce off walls
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) ball.vx *= -1;
  if (ball.y - ball.radius < 0) ball.vy *= -1;

  // Paddle collision
  if (ball.y + ball.radius > paddle.y && ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
    ball.vy *= -1;
  }

  // Draw paddle
  ctx.fillStyle = "#00FFCC";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

  requestAnimationFrame(gameLoop);
}

// Paddle movement
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") paddle.x -= paddle.speed;
  if (e.key === "ArrowRight") paddle.x += paddle.speed;
  paddle.x = Math.max(0, Math.min(canvas.width - paddle.width, paddle.x));
});







