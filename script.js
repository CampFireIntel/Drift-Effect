const canvas = document.getElementById('emberCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let embers = [];

function Ember() {
  this.x = Math.random() * canvas.width;
  this.y = canvas.height + Math.random() * 100;
  this.radius = Math.random() * 2 + 1;
  this.speedY = Math.random() * 1.5 + 0.5;
  this.color = `hsl(${Math.random() * 60 + 20}, 100%, ${Math.random() * 30 + 50}%)`;
  this.alpha = Math.random() * 0.6 + 0.2;
}

function createEmbers(count) {
  for (let i = 0; i < count; i++) {
    embers.push(new Ember());
  }
}

function drawEmbers() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = 'lighter';

  for (let i = 0; i < embers.length; i++) {
    let e = embers[i];
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
    ctx.fillStyle = e.color;
    ctx.globalAlpha = e.alpha;
    ctx.fill();
    e.y -= e.speedY;
    if (e.y < -10) embers[i] = new Ember();
  }

  ctx.globalAlpha = 1.0;
  requestAnimationFrame(drawEmbers);
}

createEmbers(150);
drawEmbers();
