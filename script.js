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

// Controls
let upPressed = false;
let downPressed = false;

document.addEventListener("keydown", e => {
  if(e.key === "ArrowUp") upPressed = true;
  if(e.key === "ArrowDown") downPressed = true;
});
document.addEventListener("keyup", e => {
  if(e.key === "ArrowUp") upPressed = false;
  if(e.key === "ArrowDown") downPressed = false;
});

function draw() {
  // Clear
  ctx.fillStyle = "#0a1330";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Net
  ctx.fillStyle = "#FFD700";
  ctx.fillRect(canvas.width/2 - 1, 0, 2, canvas.height);

  // Paddles
  ctx.fillStyle = "#00FFCC";
  ctx.fillRect(10, playerY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#FF3C00";
  ctx.fillRect(canvas.width - 20, aiY, paddleWidth, paddleHeight);

  // Ball
  ctx.fillStyle = "#FFD700";
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
  ctx.fill();

  // Scores
  ctx.fillStyle = "#fff";
  ctx.font = "24px Arial";
  ctx.fillText(playerScore, canvas.width/4, 30);
  ctx.fillText(aiScore, 3*canvas.width/4, 30);
}

function update() {
  // Move paddles
  if(upPressed && playerY > 0) playerY -= paddleSpeed;
  if(downPressed && playerY + paddleHeight < canvas.height) playerY += paddleSpeed;

  // Move AI paddle
  if(aiY + paddleHeight/2 < ballY) aiY += 3;
  else aiY -= 3;

  // Move ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Collisions with top/bottom
  if(ballY + ballRadius > canvas.height || ballY - ballRadius < 0) ballSpeedY *= -1;

  // Collisions with paddles
  if(ballX - ballRadius < 20 && ballY > playerY && ballY < playerY + paddleHeight) {
    ballSpeedX *= -1;
  }
  if(ballX + ballRadius > canvas.width - 20 && ballY > aiY && ballY < aiY + paddleHeight) {
    ballSpeedX *= -1;
  }

  // Score
  if(ballX - ballRadius < 0) {
    aiScore++;
    resetBall();
  }
  if(ballX + ballRadius > canvas.width) {
    playerScore++;
    resetBall();
  }
}

function resetBall() {
  ballX = canvas.width/2;
  ballY = canvas.height/2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = 3 * (Math.random() > 0.5 ? 1 : -1);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();



