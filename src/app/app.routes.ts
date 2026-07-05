import { Routes } from '@angular/router';
import { orderNotEmptyGuard } from './features/order/order-not-empty.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/menu/menu-page.component').then((m) => m.MenuPageComponent),
  },
  {
    path: 'pedido',
    canActivate: [orderNotEmptyGuard],
    loadComponent: () =>
      import('./features/order/order-confirmation.component').then(
        (m) => m.OrderConfirmationComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
