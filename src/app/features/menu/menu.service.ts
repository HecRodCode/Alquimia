import { Injectable, computed, signal } from '@angular/core';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../../core/mock-data';
import { Category, Product, WorldId } from '../../core/models';

@Injectable({ providedIn: 'root' })
export class MenuService {
  // No hay backend: los datos mock se exponen como signal (ver arquitectura §10.2).
  private readonly _categories = signal<readonly Category[]>(MOCK_CATEGORIES);
  private readonly _products = signal<readonly Product[]>(MOCK_PRODUCTS);

  readonly categories = this._categories.asReadonly();
  readonly products = this._products.asReadonly();

  productsByCategory(categoryId: WorldId) {
    return computed(() => this._products().filter((p) => p.categoryId === categoryId));
  }
}
