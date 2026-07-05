/** Identificador de cada "mundo"/estación del menú (ver sistema de diseño §2). */
export type WorldId = 'mariscos' | 'hamburguesas' | 'rapida' | 'bebidas' | 'postres';

export interface Category {
  readonly id: WorldId;
  readonly name: string;
  /** Emoji del mundo, usado solo en chips y acentos decorativos. */
  readonly emoji: string;
}
