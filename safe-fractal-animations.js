/**
 * Safe Fractal Animation System - Performance Optimized
 * Prevents all freezing issues with aggressive limits
 */

class SafeFractalAnimator {
    constructor() {
        this.maxAnimationTime = 2000; // 2 seconds max
        this.maxIterations = 8; // Very low max iterations
        this.animationSpeed = 300; // Slower but safer
        this.isAnimating = false;
    }

    startSafeAnimation(type) {
        if (this.isAnimating) {
            console.log('Animation already running, skipping');
            return;
        }

        this.isAnimating = true;
        const canvas = document.getElementById('fractal-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const startTime = Date.now();
        let currentIteration = 1;
        
        // Super safe iteration limits by fractal type
        const safeIterations = {
            'fern': 6,
            'tree': 5,
            'tree-winter': 5,
            'tree-oak': 5,
            'constellation': 8,
            'neural': 6,
            'koch': 4,
            'sierpinski': 5,
            'spiral': 6,
            'seed-of-life': 6,
            'flower-of-life': 8,
            'merkaba': 6,
            'sri-yantra': 8
        };

        const maxIter = Math.min(safeIterations[type] || 5, this.maxIterations);
        
        const animate = () => {
            // Emergency timeout
            if (Date.now() - startTime > this.maxAnimationTime) {
                console.log('Animation timeout - stopping');
                this.isAnimating = false;
                return;
            }

            // Clear and draw
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Progress indicator
            ctx.fillStyle = '#00d2ff';
            ctx.font = '16px Arial';
            ctx.fillText(`Safe Mode: ${currentIteration}/${maxIter}`, 10, 25);
            
            // Draw simplified fractal
            this.drawSafeFractal(ctx, type, currentIteration);
            
            currentIteration++;
            
            if (currentIteration <= maxIter) {
                setTimeout(animate, this.animationSpeed);
            } else {
                this.isAnimating = false;
                ctx.fillStyle = '#7cff50';
                ctx.fillText('Animation Complete!', 10, 50);
            }
        };

        animate();
    }

    drawSafeFractal(ctx, type, iterations) {
        const centerX = ctx.canvas.width / 2;
        const centerY = ctx.canvas.height / 2;
        const colors = ['#00d2ff', '#7cff50', '#ff6b35', '#e74c3c'];

        // Only safe, simple fractals
        switch(type) {
            case 'fern':
                this.drawSafeFern(ctx, centerX, centerY, iterations, colors);
                break;
            case 'tree':
                this.drawSafeTree(ctx, centerX, centerY + 100, iterations, colors);
                break;
            case 'constellation':
                this.drawSafeConstellation(ctx, centerX, centerY, iterations, colors);
                break;
            default:
                this.drawSafeSpiral(ctx, centerX, centerY, iterations, colors);
        }
    }

    drawSafeFern(ctx, x, y, iterations, colors) {
        ctx.strokeStyle = colors[iterations % colors.length];
        ctx.lineWidth = 2;
        
        // Simple fern pattern - no complex calculations
        for (let i = 0; i < iterations * 3; i++) {
            const stemY = y - i * 8;
            const leafSize = 20 - i * 2;
            
            if (leafSize > 5) {
                ctx.beginPath();
                ctx.moveTo(x, stemY);
                ctx.lineTo(x - leafSize, stemY - 10);
                ctx.moveTo(x, stemY);
                ctx.lineTo(x + leafSize, stemY - 10);
                ctx.stroke();
            }
        }
    }

    drawSafeTree(ctx, x, y, iterations, colors) {
        if (iterations <= 0) return;
        
        ctx.strokeStyle = colors[iterations % colors.length];
        ctx.lineWidth = iterations;
        
        const branchLength = 40;
        const angle = Math.PI / 6;
        
        // Draw trunk
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - branchLength);
        ctx.stroke();
        
        // Simple branching - limited depth
        if (iterations > 1 && iterations < 6) {
            const newY = y - branchLength;
            const newLength = branchLength * 0.7;
            
            // Left branch
            ctx.beginPath();
            ctx.moveTo(x, newY);
            ctx.lineTo(x - newLength * Math.sin(angle), newY - newLength * Math.cos(angle));
            ctx.stroke();
            
            // Right branch
            ctx.beginPath();
            ctx.moveTo(x, newY);
            ctx.lineTo(x + newLength * Math.sin(angle), newY - newLength * Math.cos(angle));
            ctx.stroke();
        }
    }

    drawSafeConstellation(ctx, x, y, iterations, colors) {
        const stars = iterations + 3;
        ctx.fillStyle = colors[0];
        
        for (let i = 0; i < stars; i++) {
            const angle = (i / stars) * 2 * Math.PI;
            const radius = 50 + i * 10;
            const starX = x + radius * Math.cos(angle);
            const starY = y + radius * Math.sin(angle);
            
            // Draw star
            ctx.beginPath();
            ctx.arc(starX, starY, 3, 0, 2 * Math.PI);
            ctx.fill();
            
            // Connect to center if not first star
            if (i > 0) {
                ctx.strokeStyle = colors[i % colors.length];
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(starX, starY);
                ctx.stroke();
            }
        }
    }

    drawSafeSpiral(ctx, x, y, iterations, colors) {
        ctx.strokeStyle = colors[0];
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        const maxPoints = iterations * 10;
        for (let i = 0; i < maxPoints; i++) {
            const angle = i * 0.1;
            const radius = i * 2;
            const spiralX = x + radius * Math.cos(angle);
            const spiralY = y + radius * Math.sin(angle);
            
            if (i === 0) ctx.moveTo(spiralX, spiralY);
            else ctx.lineTo(spiralX, spiralY);
        }
        ctx.stroke();
    }
}

// Create global instance
window.safeFractalAnimator = new SafeFractalAnimator();

// Override the existing animation function
window.animateFractal = (type) => {
    window.safeFractalAnimator.startSafeAnimation(type);
};