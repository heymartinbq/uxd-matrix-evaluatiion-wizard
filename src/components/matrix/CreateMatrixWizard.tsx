import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Direction, Scale } from '../../types/matrix';

interface Step {
  title: string;
  description: string;
  component: React.ReactNode;
}

interface CreateMatrixWizardProps {
  onSubmit: (data: {
    name: string;
    directions: Direction[];
    scale: Scale;
  }) => void;
}

export default function CreateMatrixWizard({ onSubmit }: CreateMatrixWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    directions: [] as Direction[],
    scale: { min: 1, max: 9 } as Scale
  });

  const steps: Step[] = [
    {
      title: 'Información Básica',
      description: 'Define el nombre y propósito de tu matriz',
      component: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre de la Matriz
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="ej. Matriz de Cultura Organizacional"
            />
          </div>
          <p className="text-sm text-gray-500">
            El nombre debe ser descriptivo y reflejar el propósito de la evaluación.
          </p>
        </div>
      )
    },
    {
      title: 'Configuración de la Escala',
      description: 'Define la escala de evaluación',
      component: (
        <div className="space-y-4">
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Valor Mínimo
              </label>
              <input
                type="number"
                value={formData.scale.min}
                onChange={(e) => setFormData({
                  ...formData,
                  scale: { ...formData.scale, min: parseInt(e.target.value) }
                })}
                className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Valor Máximo
              </label>
              <input
                type="number"
                value={formData.scale.max}
                onChange={(e) => setFormData({
                  ...formData,
                  scale: { ...formData.scale, max: parseInt(e.target.value) }
                })}
                className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Define el rango de valores que los participantes podrán seleccionar.
          </p>
        </div>
      )
    }
    // Más pasos según sea necesario
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handleBack = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="relative">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            />
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900">
          {steps[currentStep].title}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {steps[currentStep].description}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        {steps[currentStep].component}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Anterior
        </button>
        <button
          onClick={handleNext}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          {currentStep === steps.length - 1 ? 'Crear Matriz' : 'Siguiente'}
          {currentStep < steps.length - 1 && <ChevronRight className="h-4 w-4 ml-2" />}
        </button>
      </div>
    </div>
  );
}