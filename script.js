const canvas = document.getElementById('emberCanvas');
const ctx = canvas.getContext('2d');

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '1';
canvas.style.pointerEvents = 'none';

let embers = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createEmberInCircle(cx, cy, radius) {
  let angle = Math.random() * Math.PI * 2;
  let r = radius * Math.sqrt(Math.random());

  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
    radius: Math.random() * 2 + 1,
    speed: Math.random() * 0.3 + 0.1,
    alpha: Math.random() * 0.5 + 0.3
  };
}

function drawEmber(ember) {
  ctx.beginPath();
  ctx.arc(ember.x, ember.y, ember.radius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(249, 115, 22, ${ember.alpha})`;
  ctx.fill();
}

function updateEmbers() {
  const cx = canvas.width / 2;
  const cy = canvas.height * 0.45; // adjust if needed to align with logo
  const radius = Math.min(canvas.width, canvas.height) * 0.25;

  if (embers.length < 100) {
    embers.push(createEmberInCircle(cx, cy, radius));
  }

  for (let i = embers.length - 1; i >= 0; i--) {
    embers[i].y -= embers[i].speed;
    embers[i].alpha -= 0.002;

    if (embers[i].alpha <= 0) {
      embers.splice(i, 1);
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateEmbers();
  embers.forEach(drawEmber);
  requestAnimationFrame(animate);
}

animate();
