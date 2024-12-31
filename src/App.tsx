import React, { useState } from 'react';
import Header from './components/Header';
import MatrixViewer from './components/MatrixViewer';
import { exampleDirections } from './data/exampleMatrix';

export default function App() {
  const [responses, setResponses] = useState<Array<{
    name: string;
    role: string;
    values: Record<string, number>;
  }>>([]);

  const handleNewResponse = (response: {
    name: string;
    role: string;
    values: Record<string, number>;
  }) => {
    setResponses(prev => [...prev, response]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <MatrixViewer
          directions={exampleDirections}
          responses={responses}
          onNewResponse={handleNewResponse}
        />
      </main>
    </div>
  );
}