/** Selección cruda de personalización (ids) que emite el formulario de detalle. */
export interface ProductSelection {
  readonly sizeId: string | null;
  readonly extraIds: readonly string[];
  readonly removedIngredientIds: readonly string[];
  readonly notes: string;
}

/** Selección concreta de personalización que hizo el cliente para un ítem. */
export interface CartItemCustomization {
  readonly sizeId: string | null;
  readonly sizeLabel: string | null;
  readonly extraIds: readonly string[];
  readonly extraLabels: readonly string[];
  readonly removedIngredientIds: readonly string[];
  readonly removedIngredientLabels: readonly string[];
  readonly notes: string;
}

export interface CartItem {
  /** Id único de la línea del carrito (no del producto), permite repetir un producto con distinta config. */
  readonly id: string;
  readonly productId: string;
  readonly productName: string;
  readonly imageUrl: string;
  readonly quantity: number;
  /** Precio unitario ya calculado (base + tamaño + extras). */
  readonly unitPrice: number;
  readonly customization: CartItemCustomization;
}
