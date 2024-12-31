import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';
import MatrixMiniChart from './MatrixMiniChart';
import type { Matrix } from '../../types/matrix';

interface MatrixCardProps {
  matrix: Matrix & { 
    responsesCount: number;
    responses: Array<{ values: Record<string, number> }>;
  };
}

export default function MatrixCard({ matrix }: MatrixCardProps) {
  return (
    <Link
      to={`/matrices/${matrix.id}`}
      className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{matrix.name}</h2>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Users className="w-3 h-3 mr-1" />
            {matrix.responsesCount}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="w-4 h-4 mr-1" />
          {matrix.createdAt.toLocaleDateString()}
        </div>
      </div>

      <div className="h-48 bg-gray-50 border-t">
        <MatrixMiniChart
          directions={matrix.directions}
          responses={matrix.responses}
        />
      </div>
    </Link>
  );
}