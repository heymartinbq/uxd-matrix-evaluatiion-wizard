import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateMatrixWizard from '../components/matrix/CreateMatrixWizard';
import BackButton from '../components/layout/BackButton';

export default function CreateMatrix() {
  const navigate = useNavigate();

  const handleCreate = (matrix: any) => {
    // TODO: Implementar creación real de matriz
    console.log('Nueva matriz:', matrix);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-3xl font-bold text-gray-900">Crear Nueva Matriz</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <CreateMatrixWizard onSubmit={handleCreate} />
      </main>
    </div>
  );
}