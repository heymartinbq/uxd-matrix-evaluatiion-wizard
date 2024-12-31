import React from 'react';
import { Project } from '../types';

interface ProjectSelectorProps {
  currentProject: Project | null;
  onProjectSelect: (project: Project | null) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ currentProject, onProjectSelect }) => {
  // Por ahora, usaremos datos de ejemplo
  const demoProjects: Project[] = [
    {
      id: '1',
      name: 'Evaluación de Cultura 2024',
      description: 'Evaluación anual de cultura organizacional',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Puedes agregar más proyectos de ejemplo aquí
  ];

  return (
    <div className="mb-6">
      <label htmlFor="project" className="block text-sm font-medium text-gray-700">
        Seleccionar Proyecto
      </label>
      <select
        id="project"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        value={currentProject?.id || ''}
        onChange={(e) => {
          const selected = demoProjects.find(p => p.id === e.target.value);
          onProjectSelect(selected || null);
        }}
      >
        <option value="">Selecciona un proyecto</option>
        {demoProjects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProjectSelector; 