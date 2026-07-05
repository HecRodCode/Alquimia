import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../cart/cart.service';

/** Bloquea /pedido si el carrito está vacío (ver arquitectura §11). */
export const orderNotEmptyGuard: CanActivateFn = () => {
  const cart = inject(CartService);
  const router = inject(Router);
  return cart.itemCount() > 0 ? true : router.parseUrl('/');
};
