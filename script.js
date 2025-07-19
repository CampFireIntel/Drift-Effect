<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>The Drift Effect</title>
    <link rel="stylesheet" href="style.css" />
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', sans-serif;
            background-color: #0d0d0d;
            color: #f97316;
            height: 100vh;
            overflow: hidden;
            position: relative;
        }

        .background-logo {
            background: url('logo.png') no-repeat center center;
            background-size: 60%;
            opacity: 0.06;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 0;
        }

        .content {
            z-index: 2;
            position: absolute;
            top: 30px;
            width: 100%;
            text-align: center;
        }

        #emberCanvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
        }
    </style>
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
                width: Math.random() * 4 + 1,
                height: Math.random() * 20 + 10,
                speed: Math.random() * 0.8 + 0.5,
                alpha: Math.random() * 0.5 + 0.5,
                color: getFlameColor()
            };
        }

        function getFlameColor() {
            const colors = [
                'rgba(255, 69, 0, ALPHA)',     // red-orange
                'rgba(255, 140, 0, ALPHA)',    // orange
                'rgba(255, 215, 0, ALPHA)',    // yellow
                'rgba(30, 144, 255, ALPHA)',   // blue
                'rgba(0, 191, 255, ALPHA)'     // light blue
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        function drawEmber(ember) {
            ctx.beginPath();
            ctx.ellipse(ember.x, ember.y, ember.width, ember.height, Math.PI / 8, 0, 2 * Math.PI);
            ctx.fillStyle = ember.color.replace('ALPHA', ember.alpha);
            ctx.fill();
        }

        function updateEmbers() {
            if (embers.length < 120) {
                embers.push(createEmber());
            }

            for (let i = embers.length - 1; i >= 0; i--) {
                embers[i].y -= embers[i].speed;
                embers[i].alpha -= 0.003;

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
