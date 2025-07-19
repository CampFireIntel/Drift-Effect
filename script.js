const canvas = document.getElementById('emberCanvas');
const ctx = canvas.getContext('2d');

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '0';
canvas.style.pointerEvents = 'none';

let embers = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createEmber() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * 100,
    radius: Math.random() * 2 + 1,
    speed: Math.random() * 0.5 + 0.2,
    alpha: Math.random() * 0.5 + 0.1,
    wind: Math.random() * 0.2 - 0.1
  };
}

function updateEmbers() {
  for (let i = 0; i < embers.length; i++) {
    const ember = embers[i];
    ember.y -= ember.speed;
    ember.x += ember.wind;

    if (ember.y < -10 || ember.x < -10 || ember.x > canvas.width + 10) {
      embers[i] = createEmber();
    }
  }
}

function drawEmbers() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const ember of embers) {
    ctx.beginPath();
    ctx.arc(ember.x, ember.y, ember.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 115, 0, ${ember.alpha})`;
    ctx.fill();
  }
}

function animate() {
  updateEmbers();
  drawEmbers();
  requestAnimationFrame(animate);
}

function initEmbers(count = 200) {
  embers = [];
  for (let i = 0; i < count; i++) {
    embers.push(createEmber());
  }
}

initEmbers();
animate();
