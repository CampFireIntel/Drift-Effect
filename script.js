const canvas = document.getElementById('emberCanvas');
const ctx = canvas.getContext('2d');

// Style the canvas overlay
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '1';
canvas.style.pointerEvents = 'none';

let embers = [];
let mouseNear = false;
let time = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Update hover proximity
window.addEventListener('mousemove', (e) => {
  const cx = canvas.width / 2;
  const cy = canvas.height * 0.45;
  const radius = Math.min(canvas.width, canvas.height) * 0.3;
  const dx = e.clientX - cx;
  const dy = e.clientY - cy;
  mouseNear = dx * dx + dy * dy < radius * radius;
});

function createEmberInCircle(cx, cy, radius) {
  const angle = Math.random() * Math.PI * 2;
  const r = radius * Math.sqrt(Math.random());
  const orbitSpeed = (Math.random() - 0.5) * 0.01;

  return {
    baseX: cx + r * Math.cos(angle),
    baseY: cy + r * Math.sin(angle),
    radius: Math.random() * 2 + 1,
    speed: Math.random() * 0.3 + 0.1,
    alpha: Math.random() * 0.4 + 0.4,
    orbit: orbitSpeed,
    angle: angle
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
  const cy = canvas.height * 0.45;
  const radius = Math.min(canvas.width, canvas.height) * 0.25;

  if (embers.length < 120) {
    embers.push(createEmberInCircle(cx, cy, radius));
  }

  for (let i = embers.length - 1; i >= 0; i--) {
    let ember = embers[i];

    ember.angle += ember.orbit;
    ember.y -= ember.speed;

    // Orbit motion
    ember.x = ember.baseX + Math.sin(time * ember.orbit * 5) * 4;
    ember.alpha -= 0.002;

    if (ember.alpha <= 0) {
      embers.splice(i, 1);
    }
  }
}

function animate() {
  time += 1;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Pulse glow if mouse is near
  if (mouseNear) {
    ctx.shadowBlur = 10 + Math.sin(time * 0.1) * 10;
    ctx.shadowColor = 'rgba(255, 140, 0, 0.5)';
  } else {
    ctx.shadowBlur = 0;
  }

  updateEmbers();
  embers.forEach(drawEmber);

  requestAnimationFrame(animate);
}

animate();
