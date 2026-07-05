import { WorldId } from '../../core/models';

/** Identidad visual/editorial de cada "mundo" para su hero de sección. */
export interface WorldTheme {
  /** Antesala manuscrita (Permanent Marker), ej. "Del mar". */
  readonly eyebrow: string;
  /** Título grande de la sección (Bungee). */
  readonly title: string;
  readonly subtitle: string;
  /** Emoji-mascota decorativo de la sección. */
  readonly mascot: string;
  /** Nota manuscrita junto a la mascota. */
  readonly note: string;
}

/**
 * Copy temático por mundo, derivado de la "sensación" de cada categoría
 * definida en el sistema de diseño §2 (mar/limón, parrilla/brasa, etc.).
 */
export const WORLD_THEMES: Record<WorldId, WorldTheme> = {
  mariscos: {
    eyebrow: 'Del mar',
    title: 'Mariscos frescos',
    subtitle: 'Recetas irresistibles con el sabor del mar.',
    mascot: '🦐',
    note: '¡Frescura garantizada!',
  },
  hamburguesas: {
    eyebrow: 'A la parrilla',
    title: 'Hamburguesas al carbón',
    subtitle: 'Carne jugosa, pan suave y salsas de la casa.',
    mascot: '🍔',
    note: '¡Doble carne!',
  },
  rapida: {
    eyebrow: 'Rápido y rico',
    title: 'Comida rápida',
    subtitle: 'Antojos crocantes, listos en minutos.',
    mascot: '🍟',
    note: '¡Recién hecho!',
  },
  bebidas: {
    eyebrow: 'Para refrescar',
    title: 'Bebidas heladas',
    subtitle: 'Burbujas, hielo y frescura para acompañar.',
    mascot: '🥤',
    note: '¡Bien frío!',
  },
  postres: {
    eyebrow: 'El final feliz',
    title: 'Postres de la casa',
    subtitle: 'Dulce, cremoso y hecho para compartir.',
    mascot: '🍰',
    note: '¡Date el gusto!',
  },
};
