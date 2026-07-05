import { CartItem } from './cart-item.model';

/** Pedido finalizado que se codifica en el QR (ver planeación §5.4). */
export interface Order {
  readonly items: readonly CartItem[];
  readonly total: number;
  readonly itemCount: number;
  /** ISO timestamp de generación del pedido. */
  readonly createdAt: string;
}
