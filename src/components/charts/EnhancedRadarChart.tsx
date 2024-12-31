import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { Direction } from '../../types/matrix';

interface Response {
  name: string;
  role: string;
  values: Record<string, number>;
}

interface EnhancedRadarChartProps {
  directions: Direction[];
  responses: Response[];
  scale: { min: number; max: number };
}

const COLORS = [
  '#3B82F6', // blue
  '#EF4444', // red
  '#10B981', // green
  '#F59E0B', // yellow
  '#6366F1', // indigo
  '#EC4899', // pink
  '#8B5CF6', // purple
  '#14B8A6', // teal
];

export default function EnhancedRadarChart({ directions, responses, scale }: EnhancedRadarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeResponses, setActiveResponses] = useState<Set<number>>(new Set(responses.map((_, i) => i)));

  useEffect(() => {
    if (!svgRef.current || directions.length === 0) return;

    // Limpiar el SVG
    d3.select(svgRef.current).selectAll('*').remove();

    // Configuración
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;
    
    // Crear el SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${width/2 + margin.left},${height/2 + margin.top})`);

    // Escalas
    const angleScale = d3.scaleLinear()
      .domain([0, directions.length])
      .range([0, 2 * Math.PI]);

    const radiusScale = d3.scaleLinear()
      .domain([scale.min, scale.max])
      .range([0, radius]);

    // Dibujar círculos de fondo y etiquetas
    const levels = d3.range(scale.min, scale.max + 1);
    levels.forEach(level => {
      const r = radiusScale(level);
      
      // Círculo
      svg.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', r)
        .attr('class', 'fill-none stroke-gray-200');
      
      // Etiqueta del nivel
      svg.append('text')
        .attr('x', 0)
        .attr('y', -r)
        .attr('dy', '0.35em')
        .attr('text-anchor', 'middle')
        .attr('class', 'text-xs fill-gray-400')
        .text(level.toString());
    });

    // Dibujar ejes
    directions.forEach((direction, i) => {
      const angle = angleScale(i) - Math.PI / 2;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      
      // Línea
      svg.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', y)
        .attr('class', 'stroke-gray-300');
      
      // Etiqueta
      const labelRadius = radius + 20;
      svg.append('text')
        .attr('x', labelRadius * Math.cos(angle))
        .attr('y', labelRadius * Math.sin(angle))
        .attr('text-anchor', Math.cos(angle) > 0 ? 'start' : 'end')
        .attr('dominant-baseline', 'middle')
        .attr('class', 'text-sm fill-gray-700 font-medium')
        .text(direction.label);
    });

    // Dibujar áreas para cada respuesta activa
    Array.from(activeResponses).forEach(index => {
      const response = responses[index];
      const color = COLORS[index % COLORS.length];
      
      const points = directions.map((direction, i) => {
        const value = response.values[direction.id] || scale.min;
        const angle = angleScale(i) - Math.PI / 2;
        return {
          x: radiusScale(value) * Math.cos(angle),
          y: radiusScale(value) * Math.sin(angle)
        };
      });

      // Área
      const lineGenerator = d3.lineRadial<{ angle: number; radius: number }>()
        .angle(d => d.angle)
        .radius(d => d.radius)
        .curve(d3.curveLinearClosed);

      const radialData = directions.map((direction, i) => ({
        angle: angleScale(i),
        radius: radiusScale(response.values[direction.id] || scale.min)
      }));

      svg.append('path')
        .datum(radialData)
        .attr('d', lineGenerator as any)
        .attr('fill', `${color}20`)
        .attr('stroke', color)
        .attr('stroke-width', 2);

      // Puntos
      svg.selectAll(`.points-${index}`)
        .data(points)
        .join('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 4)
        .attr('fill', color);
    });

  }, [directions, responses, scale, activeResponses]);

  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center bg-white p-4 rounded-lg">
        <svg ref={svgRef} className="w-full max-w-xl" />
      </div>

      <div className="flex flex-wrap gap-2">
        {responses.map((response, index) => (
          <button
            key={index}
            onClick={() => setActiveResponses(prev => {
              const next = new Set(prev);
              if (next.has(index)) {
                next.delete(index);
              } else {
                next.add(index);
              }
              return next;
            })}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              activeResponses.has(index)
                ? `bg-${COLORS[index % COLORS.length]}/10 text-${COLORS[index % COLORS.length]}`
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {response.name}
          </button>
        ))}
      </div>
    </div>
  );
}