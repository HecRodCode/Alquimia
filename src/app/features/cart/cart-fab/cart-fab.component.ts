import { Component, effect, inject, output, signal } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-fab',
  templateUrl: './cart-fab.component.html',
  styleUrl: './cart-fab.component.css',
  host: {
    '[class.cart-fab-host--bounce]': 'bouncing()',
  },
})
export class CartFabComponent {
  protected readonly cart = inject(CartService);
  readonly open = output<void>();

  protected readonly bouncing = signal(false);

  private previousCount = this.cart.itemCount();

  constructor() {
    // Rebote al agregar (comunica el cambio con movimiento, no solo color — ver diseño §8).
    effect(() => {
      const count = this.cart.itemCount();
      if (count > this.previousCount) {
        this.bouncing.set(true);
        setTimeout(() => this.bouncing.set(false), 260);
      }
      this.previousCount = count;
    });
  }
}
