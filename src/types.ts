export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Direction {
  id: string;
  label: string;
  description: string;
  questions: string[];
}

export interface MatrixConfig {
  directions: Direction[];
  scale: {
    min: number;
    max: number;
  };
  visualizationType: 'radar' | 'bars' | 'table';
}

export interface Response {
  id: string;
  participantName: string;
  role: string;
  values: Record<string, number>;
  projectId: string;
  timestamp: Date;
} 