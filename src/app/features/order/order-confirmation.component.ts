import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../core/models';
import { CartService } from '../cart/cart.service';
import { QrTicketComponent } from './qr-ticket/qr-ticket.component';

@Component({
  selector: 'app-order-confirmation',
  imports: [QrTicketComponent],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css',
})
export class OrderConfirmationComponent {
  private readonly cart = inject(CartService);
  private readonly router = inject(Router);

  /** Snapshot inmutable del pedido en el momento de entrar (el carrito puede cambiar/vaciarse después). */
  protected readonly order = signal<Order>({
    items: this.cart.items(),
    total: this.cart.total(),
    itemCount: this.cart.itemCount(),
    createdAt: new Date().toISOString(),
  });

  newOrder(): void {
    this.cart.clear();
    void this.router.navigate(['/']);
  }

  backToMenu(): void {
    void this.router.navigate(['/']);
  }
}
