import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Users, Share2 } from 'lucide-react';
import MatrixResults from '../components/MatrixResults';
import MatrixWizard from '../components/wizard/MatrixWizard';
import BackButton from '../components/layout/BackButton';
import { TabButton } from '../components/ui/TabButton';
import { exampleDirections } from '../data/exampleMatrix';

export default function MatrixDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'form' | 'results'>('form');
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [responses, setResponses] = useState<Array<{
    name: string;
    role: string;
    values: Record<string, number>;
  }>>([]);

  // TODO: Obtener datos reales de la matriz
  const matrix = {
    id,
    name: 'Matriz de Cultura Organizacional',
    createdAt: new Date(),
    directions: exampleDirections,
    responses
  };

  const handleNewResponse = (response: {
    name: string;
    role: string;
    values: Record<string, number>;
  }) => {
    setResponses(prev => [...prev, response]);
    setActiveTab('results');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <BackButton />
            <h1 className="text-3xl font-bold text-gray-900">{matrix.name}</h1>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Creada el {matrix.createdAt.toLocaleDateString()}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowShareDialog(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Share2 className="h-5 w-5 mr-2 text-gray-500" />
                Compartir
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <Users className="h-5 w-5 mr-2" />
                {matrix.responses.length} Participantes
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-4 border-b mb-6">
          <TabButton
            active={activeTab === 'form'}
            onClick={() => setActiveTab('form')}
          >
            Completar Matriz
          </TabButton>
          <TabButton
            active={activeTab === 'results'}
            onClick={() => setActiveTab('results')}
          >
            Ver Resultados ({responses.length})
          </TabButton>
        </div>

        {activeTab === 'form' ? (
          <MatrixWizard
            directions={matrix.directions}
            onComplete={handleNewResponse}
          />
        ) : (
          <MatrixResults
            directions={matrix.directions}
            responses={responses}
          />
        )}
      </main>

      {showShareDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Compartir Matriz</h3>
            <div className="mb-4">
              <input
                type="text"
                value={`${window.location.origin}/matrices/${id}`}
                readOnly
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowShareDialog(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}