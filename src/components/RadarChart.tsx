import React, { useEffect, useRef } from 'react';
import type { Direction } from '../types/matrix';

interface RadarChartProps {
  directions: Direction[];
  values: Record<string, number>;
  scale: { min: number; max: number };
}

export default function RadarChart({ directions, values, scale }: RadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || directions.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw axes
    ctx.beginPath();
    directions.forEach((_, i) => {
      const angle = (i * 2 * Math.PI) / directions.length - Math.PI / 2;
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + radius * Math.cos(angle),
        centerY + radius * Math.sin(angle)
      );
    });
    ctx.strokeStyle = '#e5e7eb';
    ctx.stroke();

    // Draw values
    ctx.beginPath();
    directions.forEach((direction, i) => {
      const value = values[direction.id] || scale.min;
      const normalizedValue = (value - scale.min) / (scale.max - scale.min);
      const angle = (i * 2 * Math.PI) / directions.length - Math.PI / 2;
      const x = centerX + radius * normalizedValue * Math.cos(angle);
      const y = centerY + radius * normalizedValue * Math.sin(angle);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.fill();
    ctx.strokeStyle = 'rgb(59, 130, 246)';
    ctx.stroke();

    // Draw labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    directions.forEach((direction, i) => {
      const angle = (i * 2 * Math.PI) / directions.length - Math.PI / 2;
      const x = centerX + (radius + 20) * Math.cos(angle);
      const y = centerY + (radius + 20) * Math.sin(angle);
      ctx.fillText(direction.label, x, y);
    });
  }, [directions, values, scale]);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      className="w-full max-w-xl mx-auto"
    />
  );
}