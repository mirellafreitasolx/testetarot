import React, { useEffect, useRef } from 'react';

const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar o canvas para ocupar toda a tela
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Ajustar o canvas quando a janela for redimensionada
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Classe para representar uma estrela
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
        this.size = Math.random() * 1.5;
        this.opacity = Math.random();
        this.speed = 0.005 + Math.random() * 0.01;
        this.maxOpacity = 0.5 + Math.random() * 0.5;
        this.direction = Math.random() > 0.5 ? 1 : -1;
      }

      // Atualizar a opacidade da estrela
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

      // Desenhar a estrela no canvas
      draw() {
        ctx!.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    // Criar estrelas
    const stars: Star[] = [];
    const starCount = Math.floor((canvas.width * canvas.height) / 2000);
    
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    // Animação das estrelas
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Desenhar cada estrela
      stars.forEach(star => {
        star.update();
        star.draw();
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="starry-background" />;
};

export default StarryBackground;