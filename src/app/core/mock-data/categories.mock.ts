import { Category } from '../models';

/** Las 5 categorías/"mundos" del menú (ver sistema de diseño §2). */
export const MOCK_CATEGORIES: readonly Category[] = [
  { id: 'mariscos', name: 'Mariscos', emoji: '🦐' },
  { id: 'hamburguesas', name: 'Hamburguesas', emoji: '🍔' },
  { id: 'rapida', name: 'Comida Rápida', emoji: '🍟' },
  { id: 'bebidas', name: 'Bebidas', emoji: '🥤' },
  { id: 'postres', name: 'Postres', emoji: '🍰' },
];
