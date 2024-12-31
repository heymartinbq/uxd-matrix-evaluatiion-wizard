import React from 'react';
import type { Direction } from '../types/matrix';
import EnhancedRadarChart from './charts/EnhancedRadarChart';

interface Response {
  name: string;
  role: string;
  values: Record<string, number>;
}

interface MatrixResultsProps {
  directions: Direction[];
  responses: Response[];
}

export default function MatrixResults({ directions, responses }: MatrixResultsProps) {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Resultados</h2>
        <EnhancedRadarChart
          directions={directions}
          responses={responses}
          scale={{ min: 1, max: 9 }}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Respuestas Individuales</h2>
        <div className="space-y-4">
          {responses.map((response, index) => (
            <div key={index} className="border-t pt-4 first:border-t-0 first:pt-0">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-medium">{response.name}</h3>
                  <p className="text-sm text-gray-600">{response.role}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {directions.map(direction => (
                  <div key={direction.id} className="text-sm">
                    <span className="font-medium">{direction.label}:</span>{' '}
                    {response.values[direction.id]}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}