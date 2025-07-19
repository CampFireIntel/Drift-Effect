<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>The Drift Effect</title>
    <link rel="stylesheet" href="style.css" />
</head>
<body>
    <div class="background-logo"></div>
    <canvas id="emberCanvas"></canvas>
    <div class="content">
        <h1>The Drift Effect</h1>
        <p>Welcome to the Ember workspace.</p>
    </div>
    <script>
        const canvas = document.getElementById('emberCanvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let embers = [];

        function createEmber() {
            return {
                x: Math.random() * canvas.width,
                y: canvas.height + Math.random() * 100,
                radius: Math.random() * 2 + 1,
                speed: Math.random() * 0.8 + 0.3,
                alpha: Math.random() * 0.5 + 0.5,
                color: getFlameColor()
            };
        }

        function getFlameColor() {
            const colors = [
                'rgba(249, 115, 22, ALPHA)',
                'rgba(255, 204, 0, ALPHA)',
                'rgba(255, 69, 0, ALPHA)',
                'rgba(30, 144, 255, ALPHA)',
                'rgba(70, 130, 180, ALPHA)'
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        function drawEmber(ember) {
            ctx.beginPath();
            ctx.arc(ember.x, ember.y, ember.radius, 0, Math.PI * 2);
            ctx.fillStyle = ember.color.replace('ALPHA', ember.alpha);
            ctx.fill();
        }

        function updateEmbers() {
            if (embers.length < 150) {
                embers.push(createEmber());
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

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        animate();
    </script>
</body>
</html>
