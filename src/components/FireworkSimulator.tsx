import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  opacity: number;
  lifespan: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
}

const colors = ['#FFD700', '#FFA500', '#FF69B4', '#00FFFF', '#FF1493'];

export function FireworkSimulator() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPositionRef = useRef<{ x: number; y: number } | null>(null);

  const createStar = (x: number, y: number) => {
    const lastPos = lastPositionRef.current;
    const velocityX = lastPos ? (x - lastPos.x) * 0.1 : 0;
    const velocityY = lastPos ? (y - lastPos.y) * 0.1 : 0;

    const newParticle = {
      id: particleIdRef.current++,
      x,
      y,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 8,
      opacity: 1,
      lifespan: 120,
      rotation: Math.random() * 360,
      velocityX,
      velocityY
    };

    lastPositionRef.current = { x, y };
    setParticles(prev => [...prev.slice(-40), newParticle]);
  };

  const updateParticles = () => {
    setParticles(prev =>
      prev
        .map(p => ({
          ...p,
          x: p.x + p.velocityX,
          y: p.y + p.velocityY,
          velocityX: p.velocityX * 0.98,
          velocityY: p.velocityY * 0.98,
          opacity: p.opacity - 1 / p.lifespan,
          rotation: p.rotation + 2,
          lifespan: p.lifespan - 1,
          size: p.size * 0.99
        }))
        .filter(p => p.lifespan > 0)
    );
  };

  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    Array.from(e.touches).forEach(touch => {
      const x = ((touch.clientX - rect.left) / rect.width) * 100;
      const y = ((touch.clientY - rect.top) / rect.height) * 100;
      createStar(x, y);
    });
  };

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    createStar(x, y);
  };

  useEffect(() => {
    const animate = () => {
      updateParticles();
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleEnd = () => {
    lastPositionRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="relative h-96 bg-gray-900 rounded-lg overflow-hidden touch-none"
      onMouseMove={e => e.buttons === 1 && handleMouse(e)}
      onMouseDown={handleMouse}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={handleTouch}
      onTouchStart={handleTouch}
      onTouchEnd={handleEnd}
    >
      <div className="absolute inset-0">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              pointerEvents: 'none',
              transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="100%"
              height="100%"
              style={{
                filter: `drop-shadow(0 0 ${p.size / 2}px ${p.color})`
              }}
            >
              <path
                fill={p.color}
                d="M12 0 L14 8 L22 8 L16 13 L18 21 L12 16 L6 21 L8 13 L2 8 L10 8 Z"
              />
            </svg>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-lg p-4">
        <div className="flex items-center space-x-2 text-white">
          <Sparkles className="w-5 h-5" />
          <span>Touch to create magic!</span>
        </div>
      </div>
    </div>
  );
}

export default FireworkSimulator;