document.addEventListener('DOMContentLoaded', () => {
    startFireworks();

    function startFireworks() {
        const fireworksContainer = document.getElementById('fireworks-container');
        const canvas = document.createElement('canvas');
        fireworksContainer.appendChild(canvas);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');

        const fireworks = [];
        const particles = [];

        function createFirework() {
            const x = Math.random() * canvas.width;
            const y = canvas.height;
            const targetY = Math.random() * (canvas.height / 2);
            const color = `hsl(${Math.random() * 360}, 100%, 50%)`;

            fireworks.push({ x, y, targetY, color });
        }

        function createParticles(firework) {
            for (let i = 0; i < 100; i++) {
                const angle = Math.random() * 2 * Math.PI;
                const speed = Math.random() * 4 + 2;
                particles.push({
                    x: firework.x,
                    y: firework.y,
                    angle,
                    speed,
                    color: firework.color,
                    alpha: 1,
                });
            }
        }

        function updateFireworks() {
            for (let i = 0; i < fireworks.length; i++) {
                const firework = fireworks[i];
                firework.y -= 4;
                if (firework.y <= firework.targetY) {
                    createParticles(firework);
                    fireworks.splice(i, 1);
                    i--;
                }
            }
        }

        function updateParticles() {
            for (let i = 0; i < particles.length; i++) {
                const particle = particles[i];
                particle.x += Math.cos(particle.angle) * particle.speed;
                particle.y += Math.sin(particle.angle) * particle.speed;
                particle.alpha -= 0.02;
                if (particle.alpha <= 0) {
                    particles.splice(i, 1);
                    i--;
                }
            }
        }

        function drawFireworks() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const firework of fireworks) {
                ctx.fillStyle = firework.color;
                ctx.beginPath();
                ctx.arc(firework.x, firework.y, 3, 0, 2 * Math.PI);
                ctx.fill();
            }
            for (const particle of particles) {
                ctx.fillStyle = `rgba(${particle.color}, ${particle.alpha})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, 2, 0, 2 * Math.PI);
                ctx.fill();
            }
        }

        function animate() {
            updateFireworks();
            updateParticles();
            drawFireworks();
            requestAnimationFrame(animate);
        }

        const interval = setInterval(createFirework, 500);
        animate();

        setTimeout(() => {
            clearInterval(interval);
            canvas.remove();
        }, 15000); // Stop fireworks after 15 seconds
    }
});
