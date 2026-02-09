// Interactive Hero Background Component
class HeroBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.mousePosition = { x: 0, y: 0 };
        this.animationFrame = null;
        this.init();
    }

    init() {
        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'hero-background-canvas';
        this.ctx = this.canvas.getContext('2d');
        
        // Insert canvas before hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.parentNode.insertBefore(this.canvas, hero);
        }
        
        // Set canvas size
        this.resizeCanvas();
        
        // Create particles
        this.createParticles();
        
        // Event listeners
        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // Start animation
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = Math.min(window.innerHeight * 1.2, 900);
    }

    createParticles() {
        const particleCount = window.innerWidth > 768 ? 35 : 20;
        
        // Educational symbols and shapes
        const shapes = ['book', 'pencil', 'atom', 'lightbulb', 'graduation', 'star', 'circle'];
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 4 + 2,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                shape: shapes[Math.floor(Math.random() * shapes.length)],
                opacity: Math.random() * 0.3 + 0.1,
                pulseSpeed: Math.random() * 0.02 + 0.01,
                pulsePhase: Math.random() * Math.PI * 2,
                connections: []
            });
        }
    }

    handleMouseMove(e) {
        this.mousePosition.x = e.clientX;
        this.mousePosition.y = e.clientY;
    }

    drawParticle(particle) {
        const pulse = Math.sin(Date.now() * particle.pulseSpeed + particle.pulsePhase) * 0.3 + 0.7;
        const size = particle.size * pulse;
        
        this.ctx.save();
        this.ctx.globalAlpha = particle.opacity;
        this.ctx.fillStyle = '#7877C6';
        this.ctx.strokeStyle = '#7877C6';
        this.ctx.lineWidth = 1.5;
        
        switch(particle.shape) {
            case 'book':
                this.drawBook(particle.x, particle.y, size);
                break;
            case 'pencil':
                this.drawPencil(particle.x, particle.y, size);
                break;
            case 'atom':
                this.drawAtom(particle.x, particle.y, size);
                break;
            case 'lightbulb':
                this.drawLightbulb(particle.x, particle.y, size);
                break;
            case 'graduation':
                this.drawGraduation(particle.x, particle.y, size);
                break;
            case 'star':
                this.drawStar(particle.x, particle.y, size);
                break;
            default:
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
                this.ctx.fill();
        }
        
        this.ctx.restore();
    }

    drawBook(x, y, size) {
        const width = size * 3;
        const height = size * 2;
        this.ctx.fillRect(x - width/2, y - height/2, width, height);
        this.ctx.strokeRect(x - width/2, y - height/2, width, height);
        this.ctx.strokeRect(x - width/2 + 2, y - height/2 + 2, width - 4, height - 4);
    }

    drawPencil(x, y, size) {
        this.ctx.beginPath();
        this.ctx.moveTo(x - size * 2, y - size);
        this.ctx.lineTo(x + size * 2, y - size);
        this.ctx.lineTo(x + size * 2.5, y);
        this.ctx.lineTo(x + size * 2, y + size);
        this.ctx.lineTo(x - size * 2, y + size);
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawAtom(x, y, size) {
        // Nucleus
        this.ctx.beginPath();
        this.ctx.arc(x, y, size * 0.8, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Orbits
        for (let i = 0; i < 3; i++) {
            this.ctx.save();
            this.ctx.translate(x, y);
            this.ctx.rotate((i * Math.PI * 2) / 3);
            this.ctx.beginPath();
            this.ctx.ellipse(0, 0, size * 2.5, size * 1.2, 0, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.restore();
        }
    }

    drawLightbulb(x, y, size) {
        // Bulb
        this.ctx.beginPath();
        this.ctx.arc(x, y - size, size * 1.5, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Base
        this.ctx.fillRect(x - size, y + size * 0.5, size * 2, size);
    }

    drawGraduation(x, y, size) {
        // Cap top
        this.ctx.beginPath();
        this.ctx.moveTo(x - size * 2.5, y - size);
        this.ctx.lineTo(x + size * 2.5, y - size);
        this.ctx.lineTo(x + size * 2, y);
        this.ctx.lineTo(x - size * 2, y);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Cap bottom
        this.ctx.fillRect(x - size * 1.5, y, size * 3, size * 1.5);
    }

    drawStar(x, y, size) {
        this.ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
            const radius = i % 2 === 0 ? size * 2 : size;
            const px = x + Math.cos(angle) * radius;
            const py = y + Math.sin(angle) * radius;
            if (i === 0) {
                this.ctx.moveTo(px, py);
            } else {
                this.ctx.lineTo(px, py);
            }
        }
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    this.ctx.save();
                    this.ctx.globalAlpha = (1 - distance / 150) * 0.15;
                    this.ctx.strokeStyle = '#7877C6';
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            }
        }
    }

    updateParticles() {
        this.particles.forEach(particle => {
            // Move particle
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Mouse interaction
            const dx = this.mousePosition.x - particle.x;
            const dy = this.mousePosition.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                particle.x -= (dx / distance) * force * 0.5;
                particle.y -= (dy / distance) * force * 0.5;
            }
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.speedX *= -1;
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.speedY *= -1;
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }
        });
    }

    animate() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections first (background)
        this.drawConnections();
        
        // Update and draw particles
        this.updateParticles();
        this.particles.forEach(particle => this.drawParticle(particle));
        
        // Continue animation
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        window.removeEventListener('resize', () => this.resizeCanvas());
        window.removeEventListener('mousemove', (e) => this.handleMouseMove(e));
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HeroBackground();
});
