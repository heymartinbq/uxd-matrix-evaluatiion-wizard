import React from 'react';

interface WizardStepProps {
  currentStep: number;
  totalSteps: number;
  title: string;
}

export function WizardStep({ currentStep, totalSteps, title }: WizardStepProps) {
  return (
    <div>
      <div className="mb-4">
        <div className="text-xs font-medium text-gray-500">
          Paso {currentStep + 1} de {totalSteps}
        </div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
      
      <div className="relative">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
          <div
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
}