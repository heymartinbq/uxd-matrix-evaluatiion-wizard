import React, { useState } from 'react';
import type { Direction } from '../types/matrix';
import { scaleLabels } from '../data/exampleMatrix';

interface ParticipantFormProps {
  directions: Direction[];
  onSubmit: (values: { name: string; role: string; values: Record<string, number> }) => void;
}

export default function ParticipantForm({ directions, onSubmit }: ParticipantFormProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [values, setValues] = useState<Record<string, number>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, role, values });
    setName('');
    setRole('');
    setValues({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rol</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        {directions.map((direction) => (
          <div key={direction.id} className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-medium text-lg mb-2">{direction.label}</h3>
            <p className="text-sm text-gray-600 mb-4">{direction.description}</p>
            
            <div className="space-y-2">
              {direction.questions.map((question, index) => (
                <p key={index} className="text-sm text-gray-700">{question}</p>
              ))}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor (1-9)
              </label>
              <select
                value={values[direction.id] || ''}
                onChange={(e) => setValues({
                  ...values,
                  [direction.id]: Number(e.target.value)
                })}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Seleccionar valor</option>
                {Object.entries(scaleLabels).map(([value, { label }]) => (
                  <option key={value} value={value}>
                    {value} - {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Enviar Respuestas
      </button>
    </form>
  );
}