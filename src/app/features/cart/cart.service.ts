import { Injectable, computed, signal } from '@angular/core';
import {
  CartItem,
  CartItemCustomization,
  Product,
  ProductSelection,
} from '../../core/models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<readonly CartItem[]>([]);

  // Exposición pública siempre de solo lectura (ver arquitectura §4).
  readonly items = this._items.asReadonly();

  readonly total = computed(() =>
    this._items().reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
  );

  readonly itemCount = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0),
  );

  /** Precio unitario = base + delta del tamaño + suma de extras. Lógica de negocio centralizada. */
  computeUnitPrice(product: Product, selection: ProductSelection): number {
    const size = product.customization.sizes.find((s) => s.id === selection.sizeId);
    const sizeDelta = size?.priceDelta ?? 0;
    const extrasTotal = product.customization.extras
      .filter((e) => selection.extraIds.includes(e.id))
      .reduce((sum, e) => sum + e.price, 0);
    return product.basePrice + sizeDelta + extrasTotal;
  }

  add(product: Product, selection: ProductSelection, quantity: number): void {
    this._items.update((items) => [
      ...items,
      this.buildCartItem(product, selection, quantity),
    ]);
  }

  remove(itemId: string): void {
    this._items.update((items) => items.filter((i) => i.id !== itemId));
  }

  setQuantity(itemId: string, quantity: number): void {
    if (quantity < 1) {
      this.remove(itemId);
      return;
    }
    this._items.update((items) =>
      items.map((i) => (i.id === itemId ? { ...i, quantity } : i)),
    );
  }

  clear(): void {
    this._items.set([]);
  }

  private buildCartItem(
    product: Product,
    selection: ProductSelection,
    quantity: number,
  ): CartItem {
    const size = product.customization.sizes.find((s) => s.id === selection.sizeId);
    const extras = product.customization.extras.filter((e) =>
      selection.extraIds.includes(e.id),
    );
    const removed = product.customization.removableIngredients.filter((r) =>
      selection.removedIngredientIds.includes(r.id),
    );

    const customization: CartItemCustomization = {
      sizeId: size?.id ?? null,
      sizeLabel: size?.label ?? null,
      extraIds: extras.map((e) => e.id),
      extraLabels: extras.map((e) => e.label),
      removedIngredientIds: removed.map((r) => r.id),
      removedIngredientLabels: removed.map((r) => r.label),
      notes: selection.notes.trim(),
    };

    return {
      id: crypto.randomUUID(),
      productId: product.id,
      productName: product.name,
      imageUrl: product.imageUrl,
      quantity,
      unitPrice: this.computeUnitPrice(product, selection),
      customization,
    };
  }
}
