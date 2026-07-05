import { Component, computed, input } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { CartItem, Order } from '../../../core/models';

@Component({
  selector: 'app-qr-ticket',
  imports: [QRCodeComponent],
  templateUrl: './qr-ticket.component.html',
  styleUrl: './qr-ticket.component.css',
})
export class QrTicketComponent {
  readonly order = input.required<Order>();

  /** El QR codifica el pedido completo como JSON (decisión de la fase técnica). */
  protected readonly qrData = computed(() => JSON.stringify(this.order()));

  protected readonly totalLabel = computed(
    () => `$${this.order().total.toLocaleString('es-CO')}`,
  );

  linePrice(item: CartItem): string {
    return `$${(item.unitPrice * item.quantity).toLocaleString('es-CO')}`;
  }

  summaryOf(item: CartItem): string {
    const c = item.customization;
    const parts: string[] = [];
    if (c.sizeLabel) parts.push(c.sizeLabel);
    parts.push(...c.extraLabels);
    parts.push(...c.removedIngredientLabels.map((l) => `sin ${l.toLowerCase()}`));
    if (c.notes) parts.push(`“${c.notes}”`);
    return parts.join(' · ');
  }
}
