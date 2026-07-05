import { WorldId } from './category.model';

/** Opción de selección única (ej. tamaño). El precio final suma el delta al base. */
export interface ProductSize {
  readonly id: string;
  readonly label: string;
  readonly priceDelta: number;
}

/** Adición de selección múltiple (ej. aguacate extra). */
export interface ProductExtra {
  readonly id: string;
  readonly label: string;
  readonly price: number;
}

/** Ingrediente removible ("sin cebolla"). */
export interface RemovableIngredient {
  readonly id: string;
  readonly label: string;
}

export interface ProductCustomizationOptions {
  readonly sizes: readonly ProductSize[];
  readonly extras: readonly ProductExtra[];
  readonly removableIngredients: readonly RemovableIngredient[];
  readonly allowsNotes: boolean;
}

/** Badge tipo sello de marcador (ver diseño §6.3). */
export type ProductBadge = 'top' | 'picante' | 'nuevo' | 'recomendado';

export interface Product {
  readonly id: string;
  readonly categoryId: WorldId;
  readonly name: string;
  readonly description: string;
  readonly basePrice: number;
  readonly imageUrl: string;
  readonly badge?: ProductBadge;
  readonly customization: ProductCustomizationOptions;
}
