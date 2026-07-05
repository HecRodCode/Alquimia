# Guía Técnica de Arquitectura Angular

## Para uso de IA al generar código de este proyecto

> **Propósito de este documento:** este archivo se le da como contexto a cualquier IA (Claude Code u otro asistente) antes de generar código para este proyecto. No es documentación de negocio — es la referencia técnica de **cómo debe estar escrito el código**, sin importar qué pantalla se esté construyendo. Cualquier código generado que no siga estas reglas se considera incorrecto, aunque funcione.

**Versión asumida de Angular:** 20+ (standalone por defecto, signals estables, zoneless disponible como API estable). Si el proyecto real usa otra versión, ajustar las APIs marcadas como "nuevas" a lo que esté disponible, pero mantener la filosofía general.

> **Importante — este proyecto NO tiene backend.** Es un prototipo puramente visual/frontend. No existe API, no existe `HttpClient` hacia un servidor propio, no hay interceptores de autenticación ni variables de entorno de API. Todos los datos (menú, productos, precios, categorías) viven como **datos mock estáticos** dentro del propio proyecto Angular. Cualquier patrón de este documento que en otros proyectos se apoyaría en una llamada HTTP real, aquí se resuelve con datos locales envueltos en signals.

---

## 1. Filosofía general (no negociable)

1. **Standalone siempre.** Cero `NgModule`. Ningún componente, directiva o pipe se declara dentro de un módulo.
2. **Signals como fuente de verdad del estado**, no RxJS por defecto. RxJS se reserva para streams async reales (WebSockets, eventos del DOM de alta frecuencia, debounce de inputs de búsqueda) — no para guardar estado de UI.
3. **Zoneless.** La app corre sin `zone.js`. Esto implica que la reactividad depende 100% de signals — no se puede asumir que "algo cambió y Angular se va a enterar solo" a menos que ese cambio esté modelado como signal.
4. **`inject()` en vez de inyección por constructor.** En todo el código nuevo.
5. **Nada de `any`.** Tipado estricto en todo el proyecto (`strict: true` en `tsconfig`).
6. **Lazy loading agresivo**, tanto a nivel de rutas como de bloques de UI pesados dentro de una misma página.

---

## 2. Bootstrap y configuración zoneless

```ts
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';

bootstrapApplication(AppComponent, {
  providers: [provideZonelessChangeDetection(), provideRouter(appRoutes)],
});
```

**Consecuencias prácticas de ser zoneless que la IA debe tener siempre presentes:**

- No usar `setTimeout`/`setInterval`/promesas "esperando" que Angular detecte el cambio solo — cualquier valor que deba reflejarse en pantalla tiene que vivir en un `signal`.
- No queda `ChangeDetectorRef.detectChanges()` como muleta para "arreglar" que algo no se actualiza — si algo no se actualiza, es porque no está modelado como signal, no porque falte un truco de detección de cambios.
- Los componentes no necesitan `changeDetection: ChangeDetectionStrategy.OnPush` explícito como en Angular clásico (zoneless ya opera en ese modelo), pero sí deben evitar mutar objetos/arrays en el lugar — siempre se reemplaza la referencia (inmutabilidad) para que `computed`/plantillas detecten el cambio.

---

## 3. Componentes standalone: estructura mínima

```ts
import { Component, inject, signal, computed } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [/* otros componentes/pipes standalone que use, no módulos */],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  private readonly cartService = inject(CartService);

  readonly product = input.required<Product>();
  readonly added = output<void>();

  readonly isInCart = computed(() =>
    this.cartService.items().some((item) => item.productId === this.product().id),
  );

  addToCart(): void {
    this.cartService.add(this.product());
    this.added.emit();
  }
}
```

Notas obligatorias:

- No se escribe `standalone: true` — es el valor por defecto en Angular 19+, escribirlo es ruido.
- Inputs/outputs **siempre** con las funciones nuevas (`input()`, `input.required()`, `output()`, `model()` para two-way binding) — nunca con los decoradores `@Input()`/`@Output()` en código nuevo.
- Nunca lógica de negocio dentro del componente (cálculo de precios, validaciones complejas) — eso vive en servicios. El componente solo orquesta señales y dispara acciones.

---

## 4. Estado con Signals: patrón de servicio de estado por feature

Cada feature (menú, carrito, pedido) tiene un servicio `providedIn: 'root'` (o a nivel de ruta si el estado no debe persistir fuera de esa sección) que expone signals de solo lectura hacia afuera.

```ts
import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>([]);

  // Exposición pública SIEMPRE de solo lectura (readonly signal), nunca el signal mutable directo
  readonly items = this._items.asReadonly();

  readonly total = computed(() =>
    this._items().reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
  );

  readonly itemCount = computed(() => this._items().reduce((sum, item) => sum + item.quantity, 0));

  add(product: Product, customization: ProductCustomization, quantity = 1): void {
    this._items.update((items) => [...items, buildCartItem(product, customization, quantity)]);
  }

  remove(itemId: string): void {
    this._items.update((items) => items.filter((i) => i.id !== itemId));
  }

  clear(): void {
    this._items.set([]);
  }
}
```

**Regla:** ningún componente muta un signal de otro servicio directamente. Todo cambio de estado pasa por un método público del servicio (`add`, `remove`, `clear`), nunca por `service.items.set(...)` desde afuera — por eso se expone `asReadonly()`.

---

## 5. Nuevo control de flujo en templates

Se usa exclusivamente la sintaxis de control de flujo nativa (`@if`, `@for`, `@switch`) — **nunca** `*ngIf`/`*ngFor`/`*ngSwitch` ni `CommonModule` importado para eso.

```html
@if (cartService.itemCount() > 0) {
<app-cart-fab [count]="cartService.itemCount()" />
} @else {
<span class="hint">Explora el menú para armar tu pedido</span>
} @for (category of categories(); track category.id) {
<app-category-chip [category]="category" />
} @empty {
<p>No hay categorías disponibles</p>
}
```

- `track` es **obligatorio** en todo `@for` — nunca `track $index` salvo que la lista literalmente no tenga identificador estable.
- `@switch` para los "mundos" de categoría (renderizar el header temático correcto según la categoría activa).

---

## 6. `@defer`: lazy loading de bloques de UI (no solo de rutas)

Además del lazy loading de rutas, se usa `@defer` para partes pesadas o no críticas de una misma pantalla — muy relevante en este proyecto porque el menú tiene imágenes de producto pesadas y modales de detalle que no siempre se abren.

```html
<!-- La hoja de detalle de producto solo se carga cuando el usuario la abre -->
@defer (on interaction(triggerBtn)) {
<app-product-detail-sheet [product]="selectedProduct()" />
} @placeholder {
<button #triggerBtn>Ver detalle</button>
} @loading (minimum 200ms) {
<app-skeleton-card />
}
```

Usos concretos esperados en este proyecto:

- Imágenes de producto: `@defer (on viewport)` para las tarjetas que están fuera de pantalla en listas largas.
- Modal/hoja de detalle de producto: `@defer (on interaction)`.
- Pantalla de generación de QR: `@defer (on interaction)` desde el botón "Finalizar pedido", ya que la librería de generación de QR no debe ir en el bundle inicial.

---

## 7. Lazy loading de rutas

```ts
// app.routes.ts
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/menu/menu-page.component').then((m) => m.MenuPageComponent),
  },
  {
    path: 'pedido',
    loadComponent: () =>
      import('./features/order/order-confirmation.component').then(
        (m) => m.OrderConfirmationComponent,
      ),
  },
];
```

- `loadComponent` para rutas de un solo componente standalone.
- `loadChildren` apuntando a un array de rutas (`.routes.ts`) solo si la sección crece a varias sub-rutas (ej. si más adelante se agrega un flujo de varias pantallas dentro de "pedido").
- Ningún componente de ruta se importa de forma estática en `app.routes.ts` — todo vía `import()` dinámico.

---

## 8. Signal-based queries (viewChild/contentChild)

```ts
import { Component, viewChild, ElementRef, effect } from '@angular/core';

export class QuantityStepperComponent {
  private readonly input = viewChild.required<ElementRef<HTMLInputElement>>('qtyInput');

  constructor() {
    effect(() => {
      // reacciona automáticamente cuando la referencia esté disponible
    });
  }
}
```

Se usa `viewChild()`/`contentChild()` (versión signal) en vez de `@ViewChild()`/`@ContentChild()` decorador clásico.

---

## 9. Formularios: Reactive Forms tipados

Para la personalización de producto (tamaño, extras, notas) se usan **Reactive Forms tipados**, no template-driven forms ni FormGroups sin tipar.

```ts
import { FormBuilder } from '@angular/forms';

export class ProductCustomizationComponent {
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group({
    size: this.fb.control<'pequeño' | 'mediano' | 'grande'>('mediano'),
    extras: this.fb.control<string[]>([]),
    notes: this.fb.control(''),
    quantity: this.fb.control(1, { nonNullable: true }),
  });
}
```

Para leer el valor del formulario de forma reactiva junto con signals, se usa `toSignal()` del paquete `@angular/core/rxjs-interop`:

```ts
import { toSignal } from '@angular/core/rxjs-interop';

readonly formValue = toSignal(this.form.valueChanges, { initialValue: this.form.getRawValue() });
```

---

## 10. Datos mock (no hay backend, no hay `HttpClient`)

Este proyecto **no consume ninguna API**. No se importa `HttpClient`, no existen interceptores, no hay `environment.apiUrl`. Todo el "menú" es un conjunto de datos estáticos que vive dentro del propio código del frontend.

### 10.1 Dónde viven los datos mock

```
core/
└── mock-data/
    ├── categories.mock.ts   # las 5 categorías/"mundos": mariscos, hamburguesas, etc.
    └── products.mock.ts     # productos de ejemplo, uno o más por categoría
```

```ts
// core/mock-data/products.mock.ts
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'ceviche-mixto',
    categoryId: 'mariscos',
    name: 'Ceviche mixto',
    description: 'Camarón, pulpo y pescado marinados en limón, cilantro y ají.',
    basePrice: 38000,
    imageUrl: '/assets/products/ceviche-mixto.webp',
    customization: {
      sizes: ['individual', 'para compartir'],
      extras: [{ id: 'aguacate', label: 'Aguacate extra', price: 4000 }],
    },
  },
  // ...más productos
];
```

### 10.2 Cómo se exponen como signal (patrón obligatorio)

Aunque no hay red de por medio, el servicio sigue exponiendo los datos como signal — así el resto de la app (componentes, `computed`) no necesita saber si el dato viene de un archivo local o de una API el día que eso cambie.

```ts
@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly _categories = signal<Category[]>(MOCK_CATEGORIES);
  private readonly _products = signal<Product[]>(MOCK_PRODUCTS);

  readonly categories = this._categories.asReadonly();
  readonly products = this._products.asReadonly();

  productsByCategory(categoryId: string) {
    return computed(() => this._products().filter((p) => p.categoryId === categoryId));
  }
}
```

### 10.3 Simular estados de carga (opcional, solo para pulir la demo)

Si se quiere mostrar un skeleton/estado de carga breve para que la demo se sienta "real" (aunque no haya red), se simula con un signal de `isLoading` y un `setTimeout` corto que solo actualiza ese signal — nunca se inventa una llamada HTTP falsa para lograr el mismo efecto:

```ts
readonly isLoading = signal(true);

constructor() {
  setTimeout(() => this.isLoading.set(false), 400); // simulación de carga, no hay red real
}
```

### 10.4 Qué NO hacer

- No crear `environment.ts` con `apiUrl` — no hay API a la cual apuntar.
- No dejar `HttpClientModule`/`provideHttpClient()` en `main.ts` si no se termina usando para nada.
- No simular el backend con `json-server` u otro servidor local a menos que el equipo lo pida explícitamente — el default de este proyecto es datos en memoria, dentro del propio bundle de Angular.

---

## 11. Guards de ruta

Funcionales, no basados en clases:

```ts
export const orderNotEmptyGuard: CanActivateFn = () => {
  const cart = inject(CartService);
  const router = inject(Router);
  return cart.itemCount() > 0 ? true : router.parseUrl('/');
};
```

---

## 12. Estructura de carpetas (feature-based)

```
src/app/
├── app.component.ts
├── app.routes.ts
├── core/
│   ├── mock-data/                # categories.mock.ts, products.mock.ts — no hay backend
│   └── models/                  # interfaces/types compartidos (Product, CartItem, Order)
├── shared/
│   ├── ui/                      # componentes de presentación puros y reutilizables (chip, stepper, fab)
│   └── directives/
├── features/
│   ├── menu/
│   │   ├── menu-page.component.ts
│   │   ├── menu.service.ts
│   │   ├── category-chip/
│   │   └── product-card/
│   ├── product-detail/
│   │   ├── product-detail-sheet.component.ts
│   │   └── product-customization.form.ts
│   ├── cart/
│   │   ├── cart.service.ts
│   │   ├── cart-fab/
│   │   └── cart-panel/
│   └── order/
│       ├── order-confirmation.component.ts
│       └── qr-ticket/
└── assets/
    └── products/                 # imágenes de producto usadas por los mocks
```

Reglas:

- `shared/ui` solo contiene componentes **sin conocimiento de negocio** (un stepper no sabe qué es un "producto", solo recibe número y emite cambios).
- Cada carpeta de `features/` es lazy-loadable de forma independiente.
- Un componente, un archivo. Nunca varios componentes standalone declarados en el mismo archivo salvo que sean triviales y privados de esa misma feature.

---

## 13. Convenciones de nomenclatura

- Selectores de componente: prefijo `app-` + kebab-case (`app-product-card`).
- Archivos: kebab-case + sufijo de tipo (`product-card.component.ts`, `cart.service.ts`, `order-not-empty.guard.ts`).
- Signals privados con `_` al inicio si tienen una versión pública `readonly` expuesta (`_items` → `items`).
- Nada de abreviaturas crípticas (`prodCstm` ❌ → `productCustomization` ✅).

---

## 14. Anti-patrones prohibidos en este proyecto

| ❌ No hacer                                               | ✅ Hacer en su lugar                                                                          |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `NgModule` para cualquier cosa                            | Standalone + `imports: []` en el propio componente                                            |
| `@Input()` / `@Output()` decoradores                      | `input()` / `output()` / `model()`                                                            |
| Constructor injection (`constructor(private x: X)`)       | `inject(X)` como propiedad de clase                                                           |
| `*ngIf`, `*ngFor`, `*ngSwitch`                            | `@if`, `@for` (con `track`), `@switch`                                                        |
| Crear una API/backend/`HttpClient` para este prototipo    | Datos mock estáticos en `core/mock-data/`, expuestos como signal                              |
| `subscribe()` manual guardando en una variable de estado  | `toSignal()` (solo si hay un stream real de RxJS que valga la pena, ej. debounce de búsqueda) |
| Mutar arrays/objetos en el lugar (`this.items.push(...)`) | Reemplazar la referencia (`this._items.update(i => [...i, x])`)                               |
| `localStorage`/`sessionStorage`                           | Estado en memoria vía signals (se pierde al recargar, es aceptable para este prototipo)       |
| Lógica de negocio dentro de un componente                 | Servicio de la feature correspondiente                                                        |
| Importar todo el menú/rutas de forma estática             | `loadComponent`/`loadChildren` + `@defer`                                                     |
| `any`                                                     | Tipos/interfaces explícitos en `core/models`                                                  |

---

## 15. Ejemplo de flujo completo (referencia rápida)

1. `MenuPageComponent` (ruta lazy) inyecta `MenuService`, que expone `categories`/`products` como signals inicializados con los datos mock de `core/mock-data/` — no hay ninguna llamada de red de por medio.
2. El template itera categorías con `@for` y pinta el chip con el color del "mundo" correspondiente según `category.theme`.
3. Al tocar un producto, se abre `ProductDetailSheetComponent` vía `@defer (on interaction)`.
4. El formulario de personalización usa Reactive Forms tipado; al confirmar, llama a `cartService.add(...)`.
5. `CartFabComponent` refleja `cartService.itemCount()` automáticamente (es un signal, no necesita ningún truco de detección de cambios porque la app es zoneless).
6. Al tocar "Finalizar pedido", se navega a `/pedido`, protegida por `orderNotEmptyGuard`.
7. `OrderConfirmationComponent` carga el generador de QR de forma diferida (`@defer`) y renderiza el ticket con los datos de `cartService.items()` y `cartService.total()`.

---

_Documento técnico — referencia obligatoria para cualquier generación de código Angular en este proyecto, humana o asistida por IA._
