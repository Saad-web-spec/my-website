import React, { useEffect, useRef } from 'react';

export const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let stars = [];
    const numStars = 180;
    
    // Mouse offset tracking
    const targetOffset = { x: 0, y: 0 };
    const currentOffset = { x: 0, y: 0 };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      initStars(rect.width, rect.height);
    };

    const initStars = (width, height) => {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 0.5 + Math.random() * 2.0,
          depth: 0.2 + Math.random() * 1.8, // Parallax depth factor
          baseAlpha: 0.3 + Math.random() * 0.7,
          alpha: 0,
          twinkleSpeed: 0.005 + Math.random() * 0.015,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate inverse translation target
      targetOffset.x = -(e.clientX - centerX) * 0.04;
      targetOffset.y = -(e.clientY - centerY) * 0.04;
    };

    // Listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    // Initial setup
    resizeCanvas();

    // Render loop
    const render = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      // Smooth interpolation for parallax
      currentOffset.x += (targetOffset.x - currentOffset.x) * 0.08;
      currentOffset.y += (targetOffset.y - currentOffset.y) * 0.08;

      stars.forEach((star) => {
        // Draw position with depth parallax + automatic drift
        let sx = (star.x + currentOffset.x * star.depth) % width;
        let sy = (star.y + currentOffset.y * star.depth) % height;

        // Auto-drift upwards
        star.y -= 0.15 * star.depth;
        
        // Wrap around bounds
        if (sx < 0) sx += width;
        if (sy < 0) sy += height;
        if (star.y < 0) star.y += height;

        // Gentle twinkling
        star.twinklePhase += star.twinkleSpeed;
        star.alpha = star.baseAlpha * (0.4 + 0.6 * Math.sin(star.twinklePhase));

        // Draw star
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
};
