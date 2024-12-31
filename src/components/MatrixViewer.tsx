import React, { useState } from 'react';
import type { Direction } from '../types/matrix';
import MatrixWizard from './wizard/MatrixWizard';
import MatrixResults from './MatrixResults';
import { TabButton } from './ui/TabButton';

interface MatrixViewerProps {
  directions: Direction[];
  responses: Array<{
    name: string;
    role: string;
    values: Record<string, number>;
  }>;
  onNewResponse: (response: {
    name: string;
    role: string;
    values: Record<string, number>;
  }) => void;
}

export default function MatrixViewer({
  directions,
  responses,
  onNewResponse,
}: MatrixViewerProps) {
  const [activeTab, setActiveTab] = useState<'form' | 'results'>('form');

  return (
    <div className="space-y-6">
      <div className="flex gap-4 border-b">
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
          directions={directions}
          onComplete={(values) => {
            onNewResponse(values);
            setActiveTab('results');
          }}
        />
      ) : (
        <MatrixResults
          directions={directions}
          responses={responses}
        />
      )}
    </div>
  );
}