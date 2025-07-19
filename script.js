<script>
    const canvas = document.getElementById('emberCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let embers = [];

    function createEmber() {
        return {
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 100,
            width: Math.random() * 6 + 2,
            height: Math.random() * 30 + 15,
            speed: Math.random() * 1.2 + 0.8,
            alpha: Math.random() * 0.3 + 0.7,
            color: getFlameColor()
        };
    }

    function getFlameColor() {
        const colors = [
            'rgba(255, 69, 0, ALPHA)',
            'rgba(255, 140, 0, ALPHA)',
            'rgba(255, 215, 0, ALPHA)',
            'rgba(30, 144, 255, ALPHA)',
            'rgba(0, 191, 255, ALPHA)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function drawEmber(ember) {
        ctx.beginPath();
        ctx.ellipse(ember.x, ember.y, ember.width, ember.height, Math.PI / 6, 0, 2 * Math.PI);
        ctx.fillStyle = ember.color.replace('ALPHA', ember.alpha);
        ctx.fill();
    }

    function updateEmbers() {
        if (embers.length < 150) {
            embers.push(createEmber());
        }

        for (let i = embers.length - 1; i >= 0; i--) {
            embers[i].y -= embers[i].speed;
            embers[i].alpha -= 0.004;

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
</script>
