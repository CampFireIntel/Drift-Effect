const canvas = document.getElementById('emberCanvas');
const ctx = canvas.getContext('2d');

let embers = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Ember(x, y) {
  this.x = x;
  this.y = y;
  this.size = Math.random() * 3 + 1;
  this.speedX = (Math.random() - 0.5) * 4;  // Swirl speed adjustment
  this.speedY = (Math.random() - 0.5) * 4;  // Swirl speed adjustment
  this.opacity = Math.random() * 0.5 + 0.2;
}

function createEmbers(e) {
  const xPos = e.x;
  const yPos = e.y;
  for (let i = 0; i < 5; i++) {
    embers.push(new Ember(xPos, yPos));
  }
}

function updateEmbers() {
  for (let i = 0; i < embers.length; i++) {
    embers[i].x += embers[i].speedX;
    embers[i].y += embers[i].speedY;

    embers[i].speedX *= 0.98; // Slow down over time to give a swirling effect
    embers[i].speedY *= 0.98; // Slow down over time to give a swirling effect

    embers[i].size *= 0.98;
    embers[i].opacity *= 0.98;

    if (embers[i].size <= 0.1 || embers[i].opacity <= 0.05) {
      embers.splice(i, 1);
      i--;
    }
  }
}

function drawEmber(ember) {
  ctx.beginPath();
  ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 165, 0, ${ember.opacity})`;
  ctx.fill();
}

canvas.addEventListener('mousemove', createEmbers);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateEmbers();
  embers.forEach(drawEmber);
  requestAnimationFrame(animate);
}

animate();
