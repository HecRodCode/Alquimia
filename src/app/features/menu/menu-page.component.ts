import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Category, Product, ProductSelection, WorldId } from '../../core/models';
import { CartFabComponent } from '../cart/cart-fab/cart-fab.component';
import { CartPanelComponent } from '../cart/cart-panel/cart-panel.component';
import { CartService } from '../cart/cart.service';
import { ProductDetailSheetComponent } from '../product-detail/product-detail-sheet.component';
import { CategoryChipComponent } from './category-chip/category-chip.component';
import { MenuService } from './menu.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { WORLD_THEMES } from './world-theme';

@Component({
  selector: 'app-menu-page',
  imports: [
    CategoryChipComponent,
    ProductCardComponent,
    ProductDetailSheetComponent,
    CartFabComponent,
    CartPanelComponent,
  ],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.css',
  host: {
    '[attr.data-world]': 'activeCategoryId()',
  },
})
export class MenuPageComponent {
  protected readonly menu = inject(MenuService);
  private readonly cart = inject(CartService);
  private readonly router = inject(Router);

  protected readonly cartOpen = signal(false);
  protected readonly selectedProduct = signal<Product | null>(null);

  protected readonly activeCategoryId = signal<WorldId>(this.menu.categories()[0].id);

  protected readonly activeCategory = computed(
    () => this.menu.categories().find((c) => c.id === this.activeCategoryId())!,
  );

  protected readonly activeTheme = computed(() => WORLD_THEMES[this.activeCategoryId()]);

  protected readonly visibleProducts = computed(() =>
    this.menu.products().filter((p) => p.categoryId === this.activeCategoryId()),
  );

  /** Un producto "gancho" de cada otro mundo para el banner de cross-sell. */
  protected readonly crossSell = computed<Product[]>(() => {
    const active = this.activeCategoryId();
    return this.menu
      .categories()
      .filter((c) => c.id !== active)
      .map((c) => this.menu.products().find((p) => p.categoryId === c.id))
      .filter((p): p is Product => p !== undefined)
      .slice(0, 3);
  });

  /** Siguiente categoría (para el botón del banner). */
  protected readonly nextCategory = computed<Category>(() => {
    const cats = this.menu.categories();
    const idx = cats.findIndex((c) => c.id === this.activeCategoryId());
    return cats[(idx + 1) % cats.length];
  });

  selectCategory(id: WorldId): void {
    this.activeCategoryId.set(id);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  openProduct(product: Product): void {
    this.selectedProduct.set(product);
  }

  quickAdd(product: Product): void {
    const selection: ProductSelection = {
      sizeId: product.customization.sizes[0]?.id ?? null,
      extraIds: [],
      removedIngredientIds: [],
      notes: '',
    };
    this.cart.add(product, selection, 1);
  }

  closeSheet(): void {
    this.selectedProduct.set(null);
  }

  openCart(): void {
    this.cartOpen.set(true);
  }

  closeCart(): void {
    this.cartOpen.set(false);
  }

  finalizeOrder(): void {
    this.cartOpen.set(false);
    void this.router.navigate(['/pedido']);
  }
}
