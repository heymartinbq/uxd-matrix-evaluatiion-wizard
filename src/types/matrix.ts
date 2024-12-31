export interface Direction {
  id: string;
  label: string;
  description: string;
  questions: string[];
}

export interface Scale {
  min: number;
  max: number;
  labels?: Record<number, string>;
}

export interface Matrix {
  id: string;
  name: string;
  directions: Direction[];
  scale: Scale;
  createdAt: Date;
  updatedAt: Date;
}

export interface Response {
  id: string;
  matrixId: string;
  participantName?: string;
  participantRole?: string;
  values: Record<string, number>; // directionId -> value
  createdAt: Date;
}

export type ChartType = 'radar' | 'bar' | 'table';