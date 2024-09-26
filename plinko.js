const canvas = document.getElementById('plinkoCanvas');
const ctx = canvas.getContext('2d');
const balls = [];
const pegs = [];

// Константы
const ballRadius = 5;
const pegRadius = 5;
const ballSpeed = 2;

// Создание пегов
function createPegs() {
  for (let y = 100; y < 500; y += 50) {
    for (let x = 50; x < 400; x += 50) {
      pegs.push({ x, y });
    }
  }
}

// Отрисовка пегов
function drawPegs() {
  pegs.forEach(peg => {
    ctx.beginPath();
    ctx.arc(peg.x, peg.y, pegRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
  });
}

// Создание нового шара
function dropBall() {
  balls.push({ x: Math.random() * canvas.width, y: 0, dx: 0, dy: ballSpeed });
}

// Обновление положения шара
function updateBalls() {
  balls.forEach(ball => {
    ball.y += ball.dy;

    // Простое взаимодействие с пегами (отскакивание)
    pegs.forEach(peg => {
      const dist = Math.hypot(ball.x - peg.x, ball.y - peg.y);
      if (dist < ballRadius + pegRadius) {
        ball.dy = ballSpeed;
        ball.dx = (ball.x > peg.x ? 1 : -1) * 1.5;
      }
    });

    ball.x += ball.dx;

    // Ограничение движения по краям
    if (ball.x < ballRadius || ball.x > canvas.width - ballRadius) {
      ball.dx = -ball.dx;
    }

    // Удаление шара, если он выходит за нижнюю границу
    if (ball.y > canvas.height) {
      balls.splice(balls.indexOf(ball), 1);
    }
  });
}

// Отрисовка шаров
function drawBalls() {
  balls.forEach(ball => {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
  });
}

// Главный игровой цикл
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPegs();
  updateBalls();
  drawBalls();
  requestAnimationFrame(gameLoop);
}

// Инициализация
createPegs();
gameLoop();
