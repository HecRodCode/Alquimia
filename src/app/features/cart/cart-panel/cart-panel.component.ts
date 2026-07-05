import { Component, inject, input, output } from '@angular/core';
import { CartItem } from '../../../core/models';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-panel',
  templateUrl: './cart-panel.component.html',
  styleUrl: './cart-panel.component.css',
  host: {
    '[class.cart-panel-host--open]': 'open()',
  },
})
export class CartPanelComponent {
  protected readonly cart = inject(CartService);

  /** Solo controla la visibilidad en móvil; en desktop el panel siempre se muestra. */
  readonly open = input<boolean>(false);
  readonly close = output<void>();
  readonly finalize = output<void>();

  summaryOf(item: CartItem): string {
    const c = item.customization;
    const parts: string[] = [];
    if (c.sizeLabel) parts.push(c.sizeLabel);
    parts.push(...c.extraLabels);
    parts.push(...c.removedIngredientLabels.map((l) => `Sin ${l.toLowerCase()}`));
    if (c.notes) parts.push(`“${c.notes}”`);
    return parts.join(' · ');
  }

  lineTotal(item: CartItem): string {
    return `$${(item.unitPrice * item.quantity).toLocaleString('es-CO')}`;
  }

  totalLabel(): string {
    return `$${this.cart.total().toLocaleString('es-CO')}`;
  }

  changeQuantity(item: CartItem, delta: number): void {
    this.cart.setQuantity(item.id, item.quantity + delta);
  }
}
