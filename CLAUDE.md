# CLAUDE.md

Contexto para trabajar en este proyecto. Prototipo de **menú interactivo** para un restaurante (mariscos, hamburguesas y comida rápida): el cliente arma su pedido desde el celular y al finalizar genera un **QR** con el pedido completo para mostrárselo al mesero.

## Alcance

- Solo frontend: menú → personalización de producto → carrito → generación de QR.
- **No hay backend.** Nada de `HttpClient`, APIs, ni variables de entorno de API. Los datos del menú son mock estáticos dentro del proyecto.
- Fuera de alcance (no construir): vista del mesero, cocina, pagos, login, multi-mesa, multi-restaurante.

## Stack y reglas técnicas

- Angular 20+, **standalone** siempre (cero `NgModule`).
- **Signals** para todo el estado (`signal`, `computed`, `effect`), no RxJS salvo streams async reales.
- **Zoneless** — todo lo que cambie en pantalla debe vivir en un signal.
- `inject()` en vez de constructor injection.
- `input()`/`output()`/`model()` en vez de `@Input()`/`@Output()`.
- Control de flujo nuevo (`@if`, `@for` con `track`, `@switch`), nunca `*ngIf`/`*ngFor`.
- `@defer` para partes pesadas (imágenes, hoja de detalle, generador de QR).
- Lazy loading de rutas con `loadComponent`.
- Reactive Forms tipados para la personalización de producto.
- Sin `localStorage`, sin `any`.

Detalle completo de patrones y anti-patrones: `guia-tecnica-angular-arquitectura.md`.

## Diseño

Concepto **"La Comanda"** (ticket/registradora como hilo visual). Tokens completos (colores, tipografía, spacing, componentes) en `sistema-de-diseno-menu-interactivo.md` — seguir ese archivo al pie de la letra, no inventar colores/fuentes nuevas.

- Tipografías: Bungee (marquesina/headers), Space Mono (todo lo numérico: precios, totales), Instrument Sans (cuerpo), Permanent Marker (badges puntuales).
- CTA principal siempre en rojo `#D6392B`, sin importar la categoría.
- Cada categoría tiene su color de "mundo" (mariscos/hamburguesas/comida rápida/bebidas/postres) — solo en chips, bordes de tarjeta y headers, nunca reemplaza el CTA.
- Mobile-first obligatorio: todo se diseña primero para ~375px de ancho y escala hacia tablet/desktop.

## Documentos de referencia del proyecto

- `planeacion-prototipo-menu-interactivo.md` — alcance funcional, flujos, historias de usuario.
- `sistema-de-diseno-menu-interactivo.md` — sistema de diseño completo.
- `guia-tecnica-angular-arquitectura.md` — patrones de código y arquitectura.

Ante cualquier duda de negocio o de diseño, revisar estos documentos antes de asumir algo.
