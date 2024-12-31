import type { Matrix, Direction, Scale } from '../types/matrix';

export const scaleLabels: Record<number, { label: string; description: string; example: string }> = {
  1: {
    label: 'Desconfianza / Desconexión',
    description: 'Sensación de completa desconfianza o falta de conexión en esta área.',
    example: 'No creo en las decisiones tomadas ni en la sinceridad de la comunicación.'
  },
  2: {
    label: 'Baja Confianza / Aislamiento',
    description: 'El nivel de desconfianza es alto, y hay una clara sensación de desconexión.',
    example: 'Me siento frecuentemente fuera de la información clave, y la confianza es limitada.'
  },
  3: {
    label: 'Inseguridad / Desconfianza Latente',
    description: 'Hay desconfianza en ciertos aspectos, pero no es total. La inseguridad persiste en algunos niveles.',
    example: 'A veces siento que la información no es completamente clara, pero hay algo de confianza.'
  },
  4: {
    label: 'Tensión / Preocupación',
    description: 'Los miembros sienten cierta tensión en la relación, aunque aún existen puntos de acuerdo.',
    example: 'Hay cierto nivel de incertidumbre o tensión en las interacciones, pero trato de seguir adelante.'
  },
  5: {
    label: 'Neutro / Equilibrado',
    description: 'Percepción equilibrada, sin inclinaciones marcadas hacia lo positivo ni lo negativo.',
    example: 'Me siento relativamente neutral, no siento ni mucha conexión ni mucha desconexión.'
  },
  6: {
    label: 'Conexión Moderada / Seguridad Inicial',
    description: 'Los miembros empiezan a sentir algo más de confianza o seguridad, aunque aún hay lugar para mejoras.',
    example: 'Siento que la comunicación es generalmente clara, pero no siempre está completamente abierta.'
  },
  7: {
    label: 'Confianza / Conexión Estable',
    description: 'Existe una conexión y confianza fuertes, aunque aún podrían existir áreas de mejora.',
    example: 'Hay una buena comunicación, y siento que mis opiniones son tomadas en cuenta.'
  },
  8: {
    label: 'Alta Confianza / Empoderamiento',
    description: 'La confianza y la colaboración son altamente eficaces, y los miembros del equipo se sienten empoderados.',
    example: 'Confío plenamente en mis compañeros y en el flujo de información.'
  },
  9: {
    label: 'Plenitud / Sinergia',
    description: 'El ambiente es completamente armonioso y el equipo está alineado en sus objetivos y valores.',
    example: 'Trabajo en un entorno de total confianza y colaboración, donde todos se sienten valorados.'
  }
};

export const exampleDirections: Direction[] = [
  {
    id: '1',
    label: 'Confianza y Transparencia',
    description: 'La medida en que los miembros del equipo sienten que la información es compartida de manera abierta y que pueden confiar en sus colegas y líderes.',
    questions: [
      '¿Siento que la información fluye de forma clara y honesta?',
      '¿Confío en las decisiones que toma el equipo?'
    ]
  },
  {
    id: '2',
    label: 'Reconocimiento y Valoración',
    description: 'La percepción de que los esfuerzos individuales y colectivos son reconocidos y valorados adecuadamente.',
    questions: [
      '¿Me siento reconocido por mis contribuciones?',
      '¿Mi trabajo es apreciado por los demás?'
    ]
  },
  {
    id: '3',
    label: 'Colaboración y Trabajo en Equipo',
    description: 'La calidad de las relaciones interpersonales y la capacidad para trabajar de manera eficaz como equipo.',
    questions: [
      '¿Disfruto trabajando con mis compañeros?',
      '¿Colaboramos de manera efectiva?'
    ]
  },
  {
    id: '4',
    label: 'Respeto y Empatía',
    description: 'El nivel de respeto mutuo entre los miembros del equipo y la capacidad de ponerse en el lugar del otro.',
    questions: [
      '¿Me siento respetado por mis compañeros?',
      '¿Hay espacio para la empatía y la escucha activa?'
    ]
  },
  {
    id: '5',
    label: 'Autonomía y Empoderamiento',
    description: 'La percepción de que los individuos tienen la libertad y el poder para tomar decisiones dentro de sus roles, y que su autonomía es respetada.',
    questions: [
      '¿Tengo la libertad para tomar decisiones dentro de mi rol?',
      '¿Siento que mi opinión tiene peso en las decisiones?'
    ]
  },
  {
    id: '6',
    label: 'Balance y Bienestar',
    description: 'El grado en que los miembros del equipo logran equilibrar su vida profesional y personal, y se sienten apoyados en términos de bienestar general.',
    questions: [
      '¿Tengo un equilibrio saludable entre mi vida personal y profesional?',
      '¿La organización apoya mi bienestar?'
    ]
  },
  {
    id: '7',
    label: 'Innovación y Creatividad',
    description: 'La libertad para proponer nuevas ideas, la receptividad a la innovación y la apertura al cambio dentro del equipo.',
    questions: [
      '¿Puedo proponer ideas nuevas y ser escuchado?',
      '¿El equipo está abierto a la creatividad y la innovación?'
    ]
  },
  {
    id: '8',
    label: 'Propósito y Compromiso',
    description: 'La conexión que sienten los miembros del equipo con los objetivos y misión de la organización, y el compromiso hacia los mismos.',
    questions: [
      '¿Creo en la misión de la empresa?',
      '¿Me siento comprometido con el éxito colectivo del equipo?'
    ]
  }
];