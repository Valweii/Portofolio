import { useEffect, useRef } from "react";

// Ribbon Particle logic mimicking the 3D flowing wave in the image
class Particle {
    xOffset: number; 
    yOffset: number; 
    zOffset: number; 
    size: number;
    alpha: number;
    speed: number;
    
    constructor() {
        // Distribute along the wave path (-1.2 to 1.2 to cover edges smoothly)
        this.xOffset = (Math.random() * 2.4) - 1.2;
        
        // Gaussian-like distribution to concentrate particles in the center of the ribbon
        const u = Math.random();
        const r = Math.pow(u, 2) * 100; // Radius of the ribbon tube
        
        const theta = Math.random() * Math.PI * 2;
        this.yOffset = r * Math.sin(theta);
        this.zOffset = r * Math.cos(theta);
        
        // Fine, bright particles
        this.size = Math.random() * 1.2 + 0.3;
        this.alpha = Math.random() * 0.7 + 0.1;
        
        // Speed of flowing along the wave
        this.speed = Math.random() * 0.0004 + 0.0001; 
    }

    update() {
        this.xOffset += this.speed;
        if (this.xOffset > 1.2) {
            this.xOffset -= 2.4; // Loop back
        }
    }
}

export default function ParticleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;
        
        let animationFrameId: number;
        let particles: Particle[] = [];
        let width = window.innerWidth;
        let height = window.innerHeight;
        
        const init = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            
            particles = [];
            // Create a dense cloud of particles for the ribbon
            const particleCount = Math.min(Math.floor((width * height) / 1000), 4000); 
            
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };
        
        const animate = (time: number) => {
            // Dark solid background for sharp particles
            ctx.fillStyle = '#0A0A0C';
            ctx.fillRect(0, 0, width, height);
            
            const t = time * 0.0005;
            
            particles.forEach(p => {
                p.update();
                
                // Map logical position to screen width
                const normalizedX = (p.xOffset + 1.2) / 2.4; 
                const x = normalizedX * width;
                
                // Complex wave equations for Y and Z to create the undulating ribbon shape
                const waveY = 
                    Math.sin(p.xOffset * 2.5 + t * 0.8) * (height * 0.25) +
                    Math.cos(p.xOffset * 4.2 - t * 0.6) * (height * 0.15) +
                    Math.sin(p.xOffset * 8.0 + t * 1.2) * (height * 0.05);
                
                const waveZ = 
                    Math.cos(p.xOffset * 3.1 + t * 1.1) * 150 +
                    Math.sin(p.xOffset * 6.3 - t * 0.7) * 80;
                
                const pY = height / 2 + waveY + p.yOffset;
                const pZ = waveZ + p.zOffset;
                
                // Pseudo-3D Perspective projection
                const perspective = 800 / (800 + pZ);
                const finalX = width / 2 + (x - width / 2) * perspective;
                const finalY = height / 2 + (pY - height / 2) * perspective;
                
                // Fade out edges smoothly
                let edgeAlpha = 1;
                if (p.xOffset < -0.8) edgeAlpha = (p.xOffset + 1.2) / 0.4;
                if (p.xOffset > 0.8) edgeAlpha = (1.2 - p.xOffset) / 0.4;
                
                // Ensure edgeAlpha is within bounds
                edgeAlpha = Math.max(0, Math.min(1, edgeAlpha));
                
                // Draw particle
                ctx.fillStyle = `rgba(230, 240, 255, ${p.alpha * edgeAlpha * perspective})`;
                ctx.beginPath();
                ctx.arc(finalX, finalY, p.size * perspective, 0, Math.PI * 2);
                ctx.fill();
            });
            
            animationFrameId = requestAnimationFrame(animate);
        };
        
        init();
        animationFrameId = requestAnimationFrame(animate);
        
        const handleResize = () => {
            init();
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);
    
    return (
        <canvas 
            ref={canvasRef} 
            className="fixed top-0 left-0 w-screen h-screen z-[-1] pointer-events-none"
            style={{ backgroundColor: '#0A0A0C' }}
        />
    );
};