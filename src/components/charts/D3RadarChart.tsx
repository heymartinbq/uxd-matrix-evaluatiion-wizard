import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { Direction } from '../../types/matrix';

interface D3RadarChartProps {
  directions: Direction[];
  values: Record<string, number>;
  scale: { min: number; max: number };
}

export default function D3RadarChart({ directions, values, scale }: D3RadarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

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

    // Crear los ejes
    const axes = directions.map((_, i) => {
      const angle = angleScale(i);
      return {
        x: radius * Math.cos(angle - Math.PI / 2),
        y: radius * Math.sin(angle - Math.PI / 2)
      };
    });

    // Dibujar los círculos de fondo
    const levels = d3.range(scale.min, scale.max + 1);
    levels.forEach(level => {
      const r = radiusScale(level);
      svg.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', r)
        .attr('class', 'fill-none stroke-gray-200');
    });

    // Dibujar los ejes
    svg.selectAll('.axis-line')
      .data(axes)
      .join('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', d => d.x)
      .attr('y2', d => d.y)
      .attr('class', 'stroke-gray-300');

    // Crear el área del radar
    const points = directions.map((direction, i) => {
      const value = values[direction.id] || scale.min;
      const angle = angleScale(i);
      const r = radiusScale(value);
      return {
        x: r * Math.cos(angle - Math.PI / 2),
        y: r * Math.sin(angle - Math.PI / 2)
      };
    });

    // Dibujar el área
    const lineGenerator = d3.lineRadial<{ angle: number; radius: number }>()
      .angle(d => d.angle)
      .radius(d => d.radius)
      .curve(d3.curveLinearClosed);

    const radialData = directions.map((direction, i) => ({
      angle: angleScale(i),
      radius: radiusScale(values[direction.id] || scale.min)
    }));

    svg.append('path')
      .datum(radialData)
      .attr('d', lineGenerator as any)
      .attr('class', 'fill-blue-500/20 stroke-blue-500 stroke-2');

    // Añadir etiquetas
    svg.selectAll('.label')
      .data(directions)
      .join('text')
      .attr('x', (_, i) => {
        const angle = angleScale(i);
        return (radius + 20) * Math.cos(angle - Math.PI / 2);
      })
      .attr('y', (_, i) => {
        const angle = angleScale(i);
        return (radius + 20) * Math.sin(angle - Math.PI / 2);
      })
      .attr('text-anchor', (_, i) => {
        const angle = angleScale(i);
        return Math.cos(angle - Math.PI / 2) > 0 ? 'start' : 'end';
      })
      .attr('dominant-baseline', 'middle')
      .attr('class', 'text-sm fill-gray-700 font-medium')
      .text(d => d.label);

    // Añadir puntos
    svg.selectAll('.point')
      .data(points)
      .join('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 4)
      .attr('class', 'fill-blue-500');

  }, [directions, values, scale]);

  return (
    <div className="flex justify-center items-center bg-white p-4 rounded-lg">
      <svg ref={svgRef} className="w-full max-w-xl" />
    </div>
  );
}