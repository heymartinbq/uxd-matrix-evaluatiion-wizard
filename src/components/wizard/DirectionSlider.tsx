import React from 'react';
import type { Direction } from '../../types/matrix';
import { scaleLabels } from '../../data/exampleMatrix';

interface DirectionSliderProps {
  direction: Direction;
  value: number;
  onChange: (value: number) => void;
}

export function DirectionSlider({ direction, value, onChange }: DirectionSliderProps) {
  const currentLabel = scaleLabels[value];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">{direction.label}</h3>
        <p className="mt-1 text-sm text-gray-500">{direction.description}</p>
      </div>

      <div className="space-y-2">
        {direction.questions.map((question, index) => (
          <p key={index} className="text-sm text-gray-700">{question}</p>
        ))}
      </div>

      <div className="pt-4">
        <input
          type="range"
          min="1"
          max="9"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full"
        />
        
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="font-medium text-gray-900">
            Nivel {value}: {currentLabel.label}
          </div>
          <p className="mt-1 text-sm text-gray-500">{currentLabel.description}</p>
          <p className="mt-2 text-sm text-gray-600 italic">"{currentLabel.example}"</p>
        </div>
      </div>
    </div>
  );
}