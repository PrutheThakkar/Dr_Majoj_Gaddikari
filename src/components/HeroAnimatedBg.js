import React, { useEffect, useRef } from "react";
import heroImage from "../images/hero-bg-new.webp";
import heroImagenew from "../images/spine-seperate-img.webp";

const HeroAnimatedBg = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    const getParticleCount = () => {
  const width = window.innerWidth;

  if (width <= 767) return 550;   // mobile
  if (width <= 1024) return 900;  // tablet
  if (width <= 1280) return 1300; // small laptop

  return 2000; // desktop
};

   const createParticles = () => {
  const PARTICLE_COUNT = getParticleCount();

  particlesRef.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const band = i % 5;

    return {
      x: Math.random(),
      y: Math.random(),
      size: 1.2 + Math.random() * 3.8,
      speed: 0.00035 + Math.random() * 0.0009,
      alpha: 0.25 + Math.random() * 0.75,
      phase: Math.random() * Math.PI * 2,
      band,
      glow: 4 + Math.random() * 12,
    };
  });
};

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();

      width = rect.width;
      height = rect.height;
      dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawParticle = (p, time) => {
      p.x += p.speed;

      if (p.x > 1.1) {
        p.x = -0.1;
        p.y = Math.random();
      }

      const x = p.x * width;

      /*
        Main visible wave area.
        These values place particles on the lower wave area
        of your current hero image.
      */
      const baseY =
        height * (0.55 + p.band * 0.055);

      const wave1 =
        Math.sin(p.x * Math.PI * 4.2 + time * 0.0018 + p.phase) *
        height *
        0.045;

      const wave2 =
        Math.sin(p.x * Math.PI * 9 + time * 0.0012 + p.phase) *
        height *
        0.018;

      const bunchPulse =
        Math.sin(p.x * Math.PI * 2.5 - time * 0.002) * 0.5 + 0.5;

      const y = baseY + wave1 + wave2;

      const opacity =
        p.alpha *
        (0.35 + bunchPulse * 0.75) *
        (0.7 + Math.sin(time * 0.003 + p.phase) * 0.3);

      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);

      const gradient = ctx.createRadialGradient(
        x,
        y,
        0,
        x,
        y,
        p.size + p.glow
      );

      gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
      gradient.addColorStop(0.35, `rgba(230, 248, 255, ${opacity * 0.55})`);
      gradient.addColorStop(1, "rgba(230, 248, 255, 0)");

      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const drawWaveGlow = (time) => {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      for (let band = 0; band < 4; band++) {
        ctx.beginPath();

        const yOffset = height * (0.58 + band * 0.065);

        for (let i = 0; i <= 140; i++) {
          const t = i / 140;
          const x = t * width;

          const y =
            yOffset +
            Math.sin(t * Math.PI * 4 + time * 0.0015 + band) *
              height *
              0.04;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 + band * 0.025})`;
        ctx.lineWidth = 18 - band * 3;
        ctx.shadowColor = "rgba(210, 245, 255, 0.8)";
        ctx.shadowBlur = 22;
        ctx.stroke();
      }

      ctx.restore();
    };

    const animate = (time) => {
      ctx.clearRect(0, 0, width, height);

      ctx.globalCompositeOperation = "lighter";

      drawWaveGlow(time);

      particlesRef.current.forEach((particle) => {
        drawParticle(particle, time);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="hero-bg hero-bg-animated" aria-hidden="true">
      <img
        src={heroImage}
        alt=""
        className="hero-bg-img-static"
        loading="eager"
        
      />

      <canvas ref={canvasRef} className="hero-particle-canvas" />

      <div className="hero-soft-overlay" />
    </div>
  );
};

export default HeroAnimatedBg;