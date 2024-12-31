import React from 'react';
import { Plus, Grid } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Matrix {
  id: string;
  name: string;
  createdAt: Date;
  responsesCount: number;
}

const mockMatrices: Matrix[] = [
  { 
    id: '1', 
    name: 'Matriz de Cultura Organizacional', 
    createdAt: new Date('2024-03-10'), 
    responsesCount: 12 
  },
  { 
    id: '2', 
    name: 'Evaluación de Liderazgo', 
    createdAt: new Date('2024-03-15'), 
    responsesCount: 8 
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Grid className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Mis Matrices</h1>
            </div>
            <Link
              to="/matrices/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nueva Matriz
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockMatrices.map((matrix) => (
            <Link
              key={matrix.id}
              to={`/matrices/${matrix.id}`}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
            >
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-gray-900">{matrix.name}</h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {matrix.responsesCount} respuestas
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Creada el {matrix.createdAt.toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}