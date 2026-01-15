const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

// Paddles
const paddleWidth = 10, paddleHeight = 80;
let playerY = (canvas.height - paddleHeight)/2;
let aiY = (canvas.height - paddleHeight)/2;
const paddleSpeed = 5;

// Ball
let ballX = canvas.width/2;
let ballY = canvas.height/2;
let ballRadius = 10;
let ballSpeedX = 4;
let ballSpeedY = 3;

// Score
let playerScore = 0;
let aiScore = 0;
let maxScore = 10;

// Controls
let upPressed = false;
let downPressed = false;

// Colors
let colorful = true;

document.addEventListener("keydown", e => {
  if(e.key === "ArrowUp") upPressed = true;
  if(e.key === "ArrowDown") downPressed = true;
});
document.addEventListener("keyup", e => {
  if(e.key === "ArrowUp") upPressed = false;
  if(e.key === "ArrowDown") downPressed = false;
});

// Menu buttons
const menu = document.getElementById("menu");
const startBtn = document.getElementById("startBtn");
const rulesBtn = document.getElementById("rulesBtn");
const colorBtn = document.getElementById("colorBtn");
const menuMessage = document.getElementById("menuMessage");

const rulesOverlay = document.getElementById("rules");
const closeRules = document.getElementById("closeRules");

startBtn.addEventListener("click", () => {
  menu.style.display = "none";
  canvas.style.display = "block";
  resetGame();
  gameLoop();
});

rulesBtn.addEventListener("click", () => {
  rulesOverlay.style.display = "flex";
});

closeRules.addEventListener("click", () => {
  rulesOverlay.style.display = "none";
});

colorBtn.addEventListener("click", () => {
  colorful = !colorful;
  menuMessage.textContent = colorful ? "Colors ON" : "Colors OFF";
});

// Draw everything
function draw() {
  // Background
  ctx.fillStyle = "#0a1330";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // Net
  ctx.fillStyle = "#FFD700";
  ctx.fillRect(canvas.width/2 - 1, 0, 2, canvas.height);

  // Paddles
  ctx.fillStyle = colorful ? "#00FFCC" : "#fff";
  ctx.fillRect(10, playerY, paddleWidth, paddleHeight);
  ctx.fillStyle = colorful ? "#FF3C00" : "#fff";
  ctx.fillRect(canvas.width - 20, aiY, paddleWidth, paddleHeight);

  // Ball
  ctx.fillStyle = colorful ? "#FFD700" : "#fff";
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
  ctx.fill();

  // Scores
  ctx.fillStyle = "#fff";
  ctx.font = "24px Arial";
  ctx.fillText(playerScore, canvas.width/4, 30);
  ctx.fillText(aiScore, 3*canvas.width/4, 30);
}

// Update game logic
function update() {
  if(upPressed && playerY > 0) playerY -= paddleSpeed;
  if(downPressed && playerY + paddleHeight < canvas.height) playerY += paddleSpeed;

  // AI Paddle
  if(aiY + paddleHeight/2 < ballY) aiY += 3;
  else aiY -= 3;

  // Move Ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Bounce top/bottom
  if(ballY + ballRadius > canvas.height || ballY - ballRadius < 0) ballSpeedY *= -1;

  // Bounce paddles
  if(ballX - ballRadius < 20 && ballY > playerY && ballY < playerY + paddleHeight) {
    ballSpeedX *= -1;
    addBallEffect();
  }
  if(ballX + ballRadius > canvas.width - 20 && ballY > aiY && ballY < aiY + paddleHeight) {
    ballSpeedX *= -1;
    addBallEffect();
  }

  // Score
  if(ballX - ballRadius < 0) { aiScore++; resetBall(); }
  if(ballX + ballRadius > canvas.width) { playerScore++; resetBall(); }

  // Check winner
  if(playerScore >= maxScore || aiScore >= maxScore){
    menu.style.display = "flex";
    canvas.style.display = "none";
    menuMessage.textContent = playerScore > aiScore ? "You Win! 🏆" : "AI Wins! 🤖";
  }
}

// Reset ball to center
function resetBall() {
  ballX = canvas.width/2;
  ballY = canvas.height/2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = 3 * (Math.random() > 0.5 ? 1 : -1);
}

// Ball effect array
let effects = [];
function addBallEffect() {
  for(let i=0;i<5;i++){
    effects.push({
      x: ballX,
      y: ballY,
      dx: (Math.random()-0.5)*4,
      dy: (Math.random()-0.5)*4,
      life: 20
    });
  }
}

// Draw effects
function drawEffects() {
  effects.forEach((e, i)=>{
    ctx.fillStyle = `rgba(255,215,0,${e.life/20})`;
    ctx.beginPath();
    ctx.arc(e.x, e.y, 3, 0, Math.PI*2);
    ctx.fill();
    e.x += e.dx;
    e.y += e.dy;
    e.life--;
    if(e.life <= 0) effects.splice(i,1);
  });
}

// Game loop
function gameLoop() {
  update();
  draw();
  drawEffects();
  requestAnimationFrame(gameLoop);
}

// Reset game
function resetGame() {
  playerScore = 0;
  aiScore = 0;
  playerY = (canvas.height - paddleHeight)/2;
  aiY = (canvas.height - paddleHeight)/2;
  effects = [];
  resetBall();
}




