"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Circle {
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
  speedX: number;
  speedY: number;
}

export function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const circles: Circle[] = [];
    const colors = ["#0A2342", "#38AECC", "#FF934F", "#8A6FDF"];
    const circleCount = 8;

    // Create initial circles
    for (let i = 0; i < circleCount; i++) {
      circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 300 + 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.05 + Math.random() * 0.05,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background base color (dark mode)
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw circles
      circles.forEach((circle) => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle =
          circle.color +
          Math.floor(circle.alpha * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();

        // Move circle
        circle.x += circle.speedX;
        circle.y += circle.speedY;

        // Bounce from edges
        if (
          circle.x < -circle.radius ||
          circle.x > canvas.width + circle.radius
        ) {
          circle.speedX = -circle.speedX;
        }
        if (
          circle.y < -circle.radius ||
          circle.y > canvas.height + circle.radius
        ) {
          circle.speedY = -circle.speedY;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: "blur(80px)" }}
      />
      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" />
    </motion.div>
  );
}
