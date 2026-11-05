
import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width;
    let height;
    let animationId;
    let mouse = { x: -1000, y: -1000 };

    const colors = [
      "rgba(155, 60, 255, 0.22)",
      "rgba(255, 50, 150, 0.18)",
      "rgba(80, 60, 255, 0.18)",
      "rgba(255, 100, 190, 0.12)",
    ];

    let blobs = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      blobs = Array.from({ length: 20 }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 100 + Math.random() * 180,
        speedX: (Math.random() - 0.2) * 2,
        speedY: (Math.random() - 0.2) * 2,
        color: colors[i % colors.length],
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const blob of blobs) {
        blob.phase += 0.0001;

        blob.x += blob.speedX + Math.sin(blob.phase) * 2;
        blob.y += blob.speedY + Math.cos(blob.phase) * 2;

        const dx = mouse.x - blob.x;
        const dy = mouse.y - blob.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 350 && distance > 0) {
          blob.x -= (dx / distance) * 3;
          blob.y -= (dy / distance) * 3;
        }

        if (blob.x < -blob.radius) blob.x = width + blob.radius;
        if (blob.x > width + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = height + blob.radius;
        if (blob.y > height + blob.radius) blob.y = -blob.radius;

        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius
        );

        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(0,  blob.color);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI *2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    const handleMouse = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <>

     <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 blur-[100px]"
      aria-hidden="true"
    /></>
   
  );
}
