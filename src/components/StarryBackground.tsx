import React, { useEffect, useRef } from 'react';

const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;
      
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
      
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;
      maxOpacity: number;
      direction: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.2;
        this.opacity = Math.random();
        this.speed = 0.005 + Math.random() * 0.008;
        this.maxOpacity = 0.4 + Math.random() * 0.4;
        this.direction = Math.random() > 0.5 ? 1 : -1;
      }

      update() {
        this.opacity += this.speed * this.direction;
        
        if (this.opacity <= 0) {
          this.direction = 1;
          this.opacity = 0;
        } else if (this.opacity >= this.maxOpacity) {
          this.direction = -1;
          this.opacity = this.maxOpacity;
        }
      }

      draw() {
        ctx!.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const starCount = Math.floor((canvas.width * canvas.height) / 4000);
    const stars: Star[] = Array.from({ length: starCount }, () => new Star());
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        star.update();
        star.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="starry-background" />;
};

export default React.memo(StarryBackground);