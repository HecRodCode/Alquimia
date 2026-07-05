import { Component, computed, input, output, signal } from '@angular/core';
import { Product, ProductBadge, WorldId } from '../../../core/models';

interface BadgeView {
  readonly label: string;
  readonly icon: string;
}

const BADGE_VIEW: Record<ProductBadge, BadgeView> = {
  top: { label: 'Top ventas', icon: '⭐' },
  picante: { label: 'Picante', icon: '🔥' },
  nuevo: { label: 'Nuevo', icon: '✨' },
  recomendado: { label: 'Recomendado', icon: '👍' },
};

const WORLD_EMOJI: Record<WorldId, string> = {
  mariscos: '🦐',
  hamburguesas: '🍔',
  rapida: '🍟',
  bebidas: '🥤',
  postres: '🍰',
};

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  host: {
    '[attr.data-world]': 'product().categoryId',
    '[attr.data-badge]': 'product().badge ?? null',
  },
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  /** Abrir el detalle (click en la tarjeta). */
  readonly open = output<Product>();
  /** Agregar rápido al carrito (botón +). */
  readonly add = output<Product>();

  protected readonly imageFailed = signal(false);

  protected readonly badge = computed<BadgeView | null>(() => {
    const badge = this.product().badge;
    return badge ? BADGE_VIEW[badge] : null;
  });

  protected readonly placeholderEmoji = computed(() => WORLD_EMOJI[this.product().categoryId]);

  protected readonly priceLabel = computed(
    () => `$${this.product().basePrice.toLocaleString('es-CO')}`,
  );
}
