import type { Direction } from '../types/matrix';

interface Response {
  name: string;
  role: string;
  values: Record<string, number>;
}

export function calculateAverageResponse(responses: Response[], directions: Direction[]): Response {
  if (responses.length === 0) return { name: 'Promedio', role: '', values: {} };

  const averageValues: Record<string, number> = {};
  
  directions.forEach(direction => {
    const values = responses.map(r => r.values[direction.id] || 0);
    const sum = values.reduce((acc, val) => acc + val, 0);
    averageValues[direction.id] = Math.round((sum / responses.length) * 10) / 10;
  });

  return {
    name: 'Promedio',
    role: `${responses.length} participantes`,
    values: averageValues
  };
}