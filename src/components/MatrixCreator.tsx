import React, { useState } from 'react';
import { PlusCircle, MinusCircle, Save } from 'lucide-react';
import type { Direction, Scale } from '../types/matrix';
import { exampleDirections, scaleLabels } from '../data/exampleMatrix';

export default function MatrixCreator() {
  const [name, setName] = useState('Matriz de Cultura Organizacional');
  const [directions, setDirections] = useState<Direction[]>(exampleDirections);
  const [scale, setScale] = useState<Scale>({ min: 1, max: 9, labels: scaleLabels });

  const addDirection = () => {
    const newDirection: Direction = {
      id: crypto.randomUUID(),
      label: '',
      description: '',
      questions: ['']
    };
    setDirections([...directions, newDirection]);
  };

  const removeDirection = (id: string) => {
    setDirections(directions.filter(d => d.id !== id));
  };

  const updateDirection = (id: string, field: keyof Direction, value: string | string[]) => {
    setDirections(directions.map(d => 
      d.id === id ? { ...d, [field]: value } : d
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, directions, scale });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Matriz de Ejemplo</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre de la Matriz</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Escala</label>
          <div className="flex gap-4 mt-1">
            <input
              type="number"
              value={scale.min}
              onChange={(e) => setScale({ ...scale, min: parseInt(e.target.value) })}
              className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="self-center">a</span>
            <input
              type="number"
              value={scale.max}
              onChange={(e) => setScale({ ...scale, max: parseInt(e.target.value) })}
              className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-700">Direcciones</label>
            <button
              type="button"
              onClick={addDirection}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Agregar Dirección
            </button>
          </div>

          <div className="space-y-4">
            {directions.map((direction) => (
              <div key={direction.id} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex justify-between mb-4">
                  <input
                    type="text"
                    value={direction.label}
                    onChange={(e) => updateDirection(direction.id, 'label', e.target.value)}
                    placeholder="Nombre de la Dirección"
                    className="w-full mr-4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeDirection(direction.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <MinusCircle className="h-5 w-5" />
                  </button>
                </div>
                
                <textarea
                  value={direction.description}
                  onChange={(e) => updateDirection(direction.id, 'description', e.target.value)}
                  placeholder="Descripción"
                  className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={2}
                />

                <div className="mt-2 space-y-2">
                  {direction.questions.map((question, index) => (
                    <input
                      key={index}
                      type="text"
                      value={question}
                      onChange={(e) => {
                        const newQuestions = [...direction.questions];
                        newQuestions[index] = e.target.value;
                        updateDirection(direction.id, 'questions', newQuestions);
                      }}
                      placeholder={`Pregunta ${index + 1}`}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="h-4 w-4 mr-2" />
          Guardar Matriz
        </button>
      </form>
    </div>
  );
}