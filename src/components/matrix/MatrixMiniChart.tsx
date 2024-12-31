import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { Direction } from '../../types/matrix';
import { calculateAverageResponse } from '../../utils/matrixCalculations';

interface MatrixMiniChartProps {
  directions: Direction[];
  responses: Array<{ values: Record<string, number> }>;
}

export default function MatrixMiniChart({ directions, responses }: MatrixMiniChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const averageResponse = calculateAverageResponse(responses, directions);

  useEffect(() => {
    if (!svgRef.current || directions.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const radius = Math.min(width - margin.left - margin.right, height - margin.top - margin.bottom) / 2;

    const g = svg.append('g')
      .attr('transform', `translate(${width/2},${height/2})`);

    // Escalas
    const angleScale = d3.scaleLinear()
      .domain([0, directions.length])
      .range([0, 2 * Math.PI]);

    const radiusScale = d3.scaleLinear()
      .domain([1, 9])
      .range([0, radius]);

    // Dibujar círculos de fondo
    const levels = [3, 6, 9];
    levels.forEach(level => {
      g.append('circle')
        .attr('r', radiusScale(level))
        .attr('class', 'fill-none stroke-gray-200');
    });

    // Dibujar ejes
    directions.forEach((_, i) => {
      const angle = angleScale(i) - Math.PI / 2;
      g.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', radius * Math.cos(angle))
        .attr('y2', radius * Math.sin(angle))
        .attr('class', 'stroke-gray-300');
    });

    // Dibujar área promedio
    const lineGenerator = d3.lineRadial<{ angle: number; radius: number }>()
      .angle(d => d.angle)
      .radius(d => d.radius)
      .curve(d3.curveLinearClosed);

    const radialData = directions.map((direction, i) => ({
      angle: angleScale(i),
      radius: radiusScale(averageResponse.values[direction.id] || 1)
    }));

    g.append('path')
      .datum(radialData)
      .attr('d', lineGenerator as any)
      .attr('class', 'fill-blue-500/20 stroke-blue-500');

  }, [directions, responses, averageResponse]);

  return (
    <svg
      ref={svgRef}
      className="w-full h-full"
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid meet"
    />
  );
}