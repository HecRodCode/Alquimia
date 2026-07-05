# Alquimia — Menú interactivo con pedido por QR

**Alquimia** es un prototipo de **menú digital interactivo** para un restaurante (mariscos, hamburguesas y comida rápida). El cliente, desde su celular, explora el menú, arma y personaliza su pedido, y al finalizar genera un **código QR** con el pedido completo para mostrárselo al mesero.

> Prototipo **solo frontend**: no hay backend, login, pagos ni cocina. Todos los datos del menú son estáticos (mock) dentro de la app. El pedido vive en memoria y se codifica en el QR.

## Qué incluye

- Menú por categorías, cada sección con su propia identidad temática.
- Detalle de producto con personalización (tamaño, adiciones, quitar ingredientes, notas) y precio en vivo.
- Carrito editable (cantidades, eliminar, total).
- Pantalla final con el **QR** del pedido + resumen para el mesero.

## 🛠️ Stack

- **Angular 20+** standalone y **zoneless**, estado con **Signals**.
- **Tailwind CSS 4** + sistema de diseño propio ("La Comanda").
- Generación de QR con `angularx-qrcode`.
- Empaquetado con **Docker** (build de producción servido por **nginx**).

## Cómo ejecutarlo con Docker (recomendado)

No necesitas tener Node ni Angular instalados, solo **Docker** y **Docker Compose**.

```bash
# 1. Clonar el repositorio
git clone <URL-DEL-REPO> alquimia
cd alquimia

# 2. Levantar la app
docker compose up
```

Abre **http://localhost:4200**

Para detenerla: `Ctrl+C` (o `docker compose down`).
Si cambias el código, reconstruye con `docker compose up --build`.

##  Desarrollo local (opcional, sin Docker)

Requiere **Node 20+** y **pnpm**.

```bash
pnpm install
pnpm start        # servidor de desarrollo en http://localhost:4200
pnpm build        # build de producción en dist/alquimia/browser
```

## Estructura

```
src/app/
├── core/          # modelos y datos mock (menú, productos)
├── shared/ui/     # componentes reutilizables (stepper, sección plegable)
└── features/
    ├── menu/           # menú + tarjetas + hero por categoría
    ├── product-detail/ # modal de personalización
    ├── cart/           # carrito (FAB + panel)
    └── order/          # confirmación + ticket con QR
```
