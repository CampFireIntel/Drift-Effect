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

function createEmber() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * 100,
    radius: Math.random() * 2 + 1,
    speed: Math.random() * 0.5 + 0.2,
    alpha: Math.random() * 0.5 + 0.3
  };
}

function drawEmber(ember) {
  ctx.beginPath();
  ctx.arc(ember.x, ember.y, ember.radius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(249, 115, 22, ${ember.alpha})`; // Ember orange
  ctx.fill();
}

function updateEmbers() {
  if (embers.length < 100) {
    embers.push(createEmber());
  }

  for (let i = embers.length - 1; i >= 0; i--) {
    embers[i].y -=
