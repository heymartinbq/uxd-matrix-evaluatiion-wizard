import React, { useState } from 'react';
import type { Direction } from '../../types/matrix';
import { WizardStep } from './WizardStep';
import { DirectionSlider } from './DirectionSlider';

interface MatrixWizardProps {
  directions: Direction[];
  onComplete: (values: { name: string; role: string; values: Record<string, number> }) => void;
}

export default function MatrixWizard({ directions, onComplete }: MatrixWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    values: {} as Record<string, number>
  });

  const steps = [
    {
      title: 'Información Personal',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rol</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      )
    },
    ...directions.map(direction => ({
      title: direction.label,
      content: (
        <DirectionSlider
          direction={direction}
          value={formData.values[direction.id] || 5}
          onChange={(value) => setFormData({
            ...formData,
            values: { ...formData.values, [direction.id]: value }
          })}
        />
      )
    }))
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <WizardStep
        currentStep={currentStep}
        totalSteps={steps.length}
        title={steps[currentStep].title}
      />
      
      <div className="mt-8">
        {steps[currentStep].content}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {currentStep === steps.length - 1 ? 'Completar' : 'Siguiente'}
        </button>
      </div>
    </div>
  );
}