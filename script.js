const canvas = document.getElementById("emberCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

const emberCount = 120;
const embers = [];

class Ember {
  constructor() {
    this.reset(true);
  }

  reset(first = false) {
    this.x = Math.random() * canvas.width;
    this.y = first ? Math.random() * canvas.height : canvas.height + 10;
    this.radius = Math.random() * 2 + 1;
    this.speedY = Math.random() * -1.5 - 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.alpha = Math.random() * 0.5 + 0.3;
  }

  update() {
    // Pull embers slightly toward cursor
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    let force = Math.min(100 / dist, 1);

    this.x += this.speedX + (dx / dist) * force * 0.5;
    this.y += this.speedY + (dy / dist) * force * 0.02;

    if (this.y < -10 || this.x < -50 || this.x > canvas.width + 50) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 120, 0, ${this.alpha})`;
    ctx.shadowColor = "orange";
    ctx.shadowBlur = 12;
    ctx.fill();
  }
}

for (let i = 0; i < emberCount; i++) {
  embers.push(new Ember());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  embers.forEach((ember) => {
    ember.update();
    ember.draw();
  });
  requestAnimationFrame(animate);
}

animate();
