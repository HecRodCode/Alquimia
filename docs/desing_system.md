# Sistema de Diseño: Menú Interactivo

## Concepto: "La Comanda" — el ticket de cocina como lenguaje visual

## 0. El concepto

El restaurante vende de todo: mariscos, hamburguesas, comida rápida. En vez de forzar una sola estética que le quede bien a un mundo y mal a otro, la marca se construye alrededor de algo que **todos esos mundos comparten**: la comanda, el ticket de pedido, el papel de registradora. Es el objeto físico que ya conecta al cliente con la cocina en cualquier restaurante, sin importar qué se cocine ahí.

Esa idea se vuelve el hilo conductor: tipografía tipo máquina de escribir/registradora para precios y cantidades, sellos de goma para destacar (🔥 Picante, ⭐ Top ventas), y una lógica de **"mundos" de color** — cada categoría del menú (Mariscos, Hamburguesas, Comida Rápida, Bebidas, Postres) tiene su propia paleta de acento dentro de un mismo sistema estructural, como si cada sección del menú fuera una estación distinta de un mercado de comida.

**Signature del diseño:** la pantalla final de pedido es un **recibo de registradora real** — papel con borde de corte en zigzag (como cuando arrancas un ticket), tipografía monoespaciada, y un sello rojo diagonal de "PEDIDO LISTO" como si lo hubiera timbrado la caja.

---

## 1. Tipografía

Se abandona por completo la dupla "serif con carácter + sans neutra" — es la fórmula que usa cualquier generador de sitios con IA. En su lugar, tres roles con una razón de ser física y funcional:

| Rol                                                                    | Fuente                                                            | Por qué                                                                                                                    | Peso/uso                                                                                                           |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Marquesina** (nombre del restaurante, encabezado de categoría, hero) | **Bungee**                                                        | Bloque, geométrica, estilo letrero de food-truck/luminoso de esquina — tiene presencia sin ser una serif elegante genérica | Un solo peso (400, la fuente ya es bold por diseño). Uso limitado: 1–2 apariciones por pantalla, nunca en párrafos |
| **Registradora** (precios, cantidades, totales, todo lo numérico)      | **Space Mono** (Bold para totales, Regular para precios de línea) | Monoespaciada — se ve literalmente como una caja registradora o ticket impreso, refuerza el concepto                       | 700 para el total del pedido, 400 para precios individuales                                                        |
| **Cuerpo** (nombres de producto, descripciones, botones, labels)       | **Instrument Sans**                                               | Sans humanista con calidez pero sin ser Inter/Work Sans/Manrope — texto legible en pantallas chicas sin sentirse genérica  | 400 texto, 500 botones/labels, 600 nombres de producto                                                             |
| **Sello/acento** (badges puntuales: "Nuevo", "Picante", "Más pedido")  | **Permanent Marker**                                              | Efecto de marcador escrito a mano sobre el menú, como cuando el cocinero agrega algo con marcador en la pizarra            | Solo en badges pequeños, nunca más de 2–3 por pantalla — es condimento, no plato principal                         |

### Escala tipográfica (móvil → desktop)

| Token               | Uso                                              | Móvil                    | Desktop (≥1024px) | Line-height |
| ------------------- | ------------------------------------------------ | ------------------------ | ----------------- | ----------- |
| `text-marquee`      | Nombre del restaurante / encabezado hero         | 26px Bungee              | 34px              | 1.1         |
| `text-category`     | Título de categoría ("Mariscos", "Hamburguesas") | 20px Bungee              | 24px              | 1.2         |
| `text-product-name` | Nombre de producto                               | 16px Instrument Sans 600 | 17px              | 1.3         |
| `text-body`         | Descripciones                                    | 14px Instrument Sans 400 | 15px              | 1.5         |
| `text-total`        | Total del pedido                                 | 24px Space Mono 700      | 30px              | 1           |
| `text-price`        | Precio individual de producto                    | 15px Space Mono 400      | 16px              | 1           |
| `text-stamp`        | Texto de badges tipo marcador                    | 13px Permanent Marker    | 14px              | 1           |

**Regla dura:** los números de dinero **siempre** van en Space Mono, en todo el producto, sin excepción — así el ojo aprende a leer "esto es un precio" por la forma de la letra, no solo por el símbolo `$`.

---

## 2. Paleta de colores

### Base neutra (estructura, en todas las pantallas)

| Token             | Hex       | Uso                                                                                                                    |
| ----------------- | --------- | ---------------------------------------------------------------------------------------------------------------------- |
| `color-paper`     | `#EFEAE0` | Fondo general — textura de papel kraft/bolsa de comida rápida, no blanco ni crema de repostería                        |
| `color-surface`   | `#FBF9F4` | Tarjetas, hojas, superficies elevadas                                                                                  |
| `color-ink`       | `#241C15` | Texto principal — negro cálido tipo tinta de sello, no negro puro                                                      |
| `color-ink-soft`  | `#6B5E4F` | Texto secundario/descripciones                                                                                         |
| `color-line`      | `#D8CFC0` | Bordes, divisores, líneas de corte de ticket                                                                           |
| `color-cta`       | `#D6392B` | Rojo "salsa de tomate" — la ÚNICA acción primaria en toda la app: agregar, finalizar pedido. Igual en las 5 categorías |
| `color-cta-hover` | `#B32E22` | CTA presionado                                                                                                         |
| `color-stamp`     | `#B32E22` | Color del sello de "pedido listo"                                                                                      |

### Mundos por categoría (acento, solo en headers/chips/detalles de esa sección — nunca reemplaza el CTA)

| Mundo            | Acento fuerte                                 | Acento suave (fondo de chip) | Sensación                      |
| ---------------- | --------------------------------------------- | ---------------------------- | ------------------------------ |
| 🦐 Mariscos      | `#0E7C86` (teal profundo)                     | `#DCEEEF`                    | Mar, limón, fresco             |
| 🍔 Hamburguesas  | `#8B4A1E` (cuero/asado) + `#E3A72E` (mostaza) | `#F3E3C4`                    | Parrilla, brasa, mostaza       |
| 🍟 Comida Rápida | `#E4572E` (ketchup-naranja)                   | `#FBDFC9`                    | Frituras, rapidez, grasa feliz |
| 🥤 Bebidas       | `#7A3F8C` (soda de uva/berry)                 | `#EBDDF0`                    | Burbujas, hielo, dulce         |
| 🍰 Postres       | `#C74B78` (frutos rojos)                      | `#F6DDE6`                    | Dulce, cremoso                 |

**Regla de aplicación:** el color del "mundo" tiñe el chip de categoría activo, el borde izquierdo de las tarjetas de esa sección, y el fondo del header cuando el usuario está navegando esa categoría. El botón de acción (agregar/finalizar) **siempre es `color-cta` rojo**, sin importar en qué categoría esté el cliente — así el usuario nunca duda de cuál es el botón que avanza su pedido.

Contraste verificado: `color-ink` sobre `color-paper` = 13.1:1 (AAA). `color-cta` sobre `color-surface` = 5.1:1 (AA para texto y botones).

---

## 3. Espaciado

Base 4px, igual de disciplinado que cualquier sistema serio:

| Token      | Valor                                                       |
| ---------- | ----------------------------------------------------------- |
| `space-1`  | 4px                                                         |
| `space-2`  | 8px                                                         |
| `space-3`  | 12px                                                        |
| `space-4`  | 16px (padding estándar de tarjetas y márgenes en móvil)     |
| `space-5`  | 20px                                                        |
| `space-6`  | 24px                                                        |
| `space-8`  | 32px (separación entre categorías/estaciones del "mercado") |
| `space-10` | 40px (márgenes laterales en desktop)                        |

---

## 4. Bordes, radios y sombras

### Radios

| Token         | Valor | Uso                          |
| ------------- | ----- | ---------------------------- |
| `radius-sm`   | 6px   | Chips, badges                |
| `radius-md`   | 10px  | Botones, inputs              |
| `radius-lg`   | 14px  | Tarjetas de producto         |
| `radius-xl`   | 20px  | Hojas modales (bottom sheet) |
| `radius-full` | 999px | FAB del carrito              |

El ticket final es la única excepción: no usa radio uniforme, usa el **borde de corte en zigzag** descrito en la sección 6.6 — es parte del signature, no un descuido.

### Sombras

| Token           | CSS                               | Uso                          |
| --------------- | --------------------------------- | ---------------------------- |
| `shadow-sm`     | `0 1px 2px rgba(36,28,21,0.08)`   | Tarjetas en reposo           |
| `shadow-md`     | `0 6px 16px rgba(36,28,21,0.12)`  | Hover desktop, chips activos |
| `shadow-lg`     | `0 10px 28px rgba(36,28,21,0.18)` | Bottom sheet, FAB            |
| `shadow-ticket` | `0 14px 32px rgba(36,28,21,0.22)` | Ticket final del QR          |

---

## 5. Breakpoints y grid (mobile-first, sin excepción)

| Breakpoint     | Ancho   | Grid de productos                          | Carrito                                    | Navegación de categorías                                    |
| -------------- | ------- | ------------------------------------------ | ------------------------------------------ | ----------------------------------------------------------- |
| Base (móvil)   | 0–639px | 1 columna, tarjeta horizontal              | FAB flotante + bottom sheet                | Chips horizontales con scroll-snap, sticky arriba           |
| `sm`           | ≥640px  | 1 columna, tarjeta un poco más ancha       | Igual que base                             | Igual que base                                              |
| `md` (tablet)  | ≥768px  | 2 columnas, tarjeta vertical               | Igual que base                             | Chips en 2 filas si no caben, o scroll                      |
| `lg` (desktop) | ≥1024px | 3 columnas                                 | Panel lateral fijo (340px) siempre visible | Barra lateral fija de categorías, o chips arriba sin scroll |
| `xl`           | ≥1280px | 4 columnas, contenido centrado máx. 1240px | Igual que `lg`                             | Igual que `lg`                                              |

Todo el CSS se escribe con estilos base = móvil, y `min-width` media queries hacia arriba. Nunca al revés.

---

## 6. Componentes clave

### 6.1 Header

- Móvil: 56px de alto, fondo `color-paper`, nombre del restaurante en `text-marquee` (Bungee) a la izquierda, ícono de búsqueda opcional a la derecha.
- Al hacer scroll se compacta a 48px y gana `shadow-sm`.

### 6.2 Chips de categoría ("estaciones")

- Altura 40px, `radius-full`, ícono del mundo (🦐🍔🍟🥤🍰) + texto.
- Inactivo: fondo `color-surface`, borde `color-line`, texto `color-ink-soft`.
- Activo: fondo = acento suave del mundo correspondiente, borde = acento fuerte del mundo, texto en el mismo acento fuerte, peso 600.
- Scroll horizontal con `scroll-snap-type: x mandatory` en móvil.

### 6.3 Tarjeta de producto

- Franja de color de 4px en el borde izquierdo con el acento fuerte del mundo al que pertenece (así aunque el usuario haga scroll y pierda de vista el chip activo, sabe visualmente en qué sección está).
- Móvil: layout horizontal, imagen 84×84px `radius-md` a la izquierda.
- Tablet/Desktop: layout vertical, imagen 4:3 arriba.
- Nombre en `text-product-name`, descripción truncada 2 líneas en `text-body` color `color-ink-soft`, precio en `text-price` (Space Mono).
- Badge opcional en `text-stamp` (Permanent Marker) rotado -4°, ej. "🔥 Picante" o "⭐ Top", posicionado como una etiqueta pegada sobre la esquina superior de la imagen — como si alguien la hubiera escrito a mano sobre una foto pegada en el menú.

### 6.4 Hoja de detalle de producto

- Bottom sheet en móvil (92% de alto, handle superior para cerrar deslizando), modal centrado en desktop (máx. 560px).
- Imagen 16:9 arriba, nombre en `text-product-name` a 20px, descripción completa.
- Opciones de selección única: segmented control con el acento del mundo activo.
- Opciones múltiples (extras): filas con checkbox + precio adicional en Space Mono (`+$X`).
- Stepper de cantidad: botones circulares 44×44px mínimo, número central en Space Mono.
- Botón inferior fijo: **"Agregar · $XX.XXX"** en `color-cta`, texto blanco, con el precio recalculado en vivo (en Space Mono dentro del mismo botón).

### 6.5 Carrito

- FAB circular en móvil (`color-cta`, ícono de bolsa/canasta), contador de ítems en badge blanco con número en Space Mono.
- Desktop: panel lateral fijo de 340px, siempre visible, fondo `color-surface`.
- Cada ítem: nombre, resumen breve de personalización en `color-ink-soft`, stepper, precio (Space Mono), ícono de eliminar.
- Total en `text-total` (Space Mono 700, color `color-cta`), fijo en la parte inferior del panel/hoja.
- Botón "Finalizar pedido" ancho completo, `color-cta`.

### 6.6 Pantalla de confirmación — el Ticket

Este es el elemento signature, y se construye deliberadamente como un recibo físico:

- Fondo `color-surface` recortado con **borde de corte en zigzag** arriba y abajo (se logra con un `clip-path` de triángulos repetidos o un SVG de mask, simulando el borde perforado de un rollo de ticket).
- Ancho máximo 320px en cualquier breakpoint (un ticket real no es ancho) — centrado en pantalla con `color-paper` de fondo alrededor.
- Contenido, todo en fuente Space Mono (simulando impresión de registradora):
  - Encabezado: nombre del restaurante centrado.
  - Línea punteada.
  - Lista de ítems del pedido en formato de recibo: `2x  Ceviche mixto ......... $38.000`
  - Línea punteada.
  - Total en `text-total`.
  - El **código QR** centrado, mínimo 240×240px, con quiet zone adecuada para que escanee bien.
- Sobre el ticket, un **sello rotado -8°** en `color-stamp`, con textura ligeramente irregular (como sello de goma real, no un rectángulo perfecto), texto "PEDIDO LISTO" en Bungee mayúsculas.
- Animación de entrada: el ticket "cae" desde arriba con un pequeño rebote (`translateY(-24px) → 0` con `ease-out` + leve overshoot), como si acabara de salir de la impresora.

---

## 7. Iconografía

- Estilo: **outline**, grosor 1.75px, esquinas ligeramente redondeadas.
- Set base: **Lucide Icons** para toda la interfaz funcional (carrito, buscar, eliminar, cerrar, stepper).
- Los emojis de mundo (🦐🍔🍟🥤🍰) se usan **solo** en chips de categoría y como acento decorativo — nunca como reemplazo de un ícono funcional (no se usa un emoji para "cerrar" o "eliminar").

---

## 8. Estados interactivos y accesibilidad

| Estado          | Tratamiento                                                             |
| --------------- | ----------------------------------------------------------------------- |
| Hover (desktop) | Sombra `shadow-md` + el borde del mundo se intensifica 10%              |
| Presionado      | `scale(0.97)` + oscurecer color base                                    |
| Focus (teclado) | Contorno 2px en `color-cta`, offset 2px, nunca se remueve sin reemplazo |
| Disabled        | Opacidad 40%, sin sombra, cursor `not-allowed`                          |

- Toda área tocable ≥ 44×44px, en cualquier breakpoint.
- Contraste AA mínimo verificado (ver sección 2).
- Imágenes de producto con `alt` descriptivo.
- El estado "agregado al carrito" se comunica con texto + ícono + el rebote del FAB — nunca solo con color, para accesibilidad ante daltonismo.
- Reduced motion: si `prefers-reduced-motion` está activo, se elimina el rebote del ticket y del FAB, dejando solo un fade de 100ms.

---

## 9. Movimiento

| Interacción                         | Duración | Curva                                             |
| ----------------------------------- | -------- | ------------------------------------------------- |
| Chips, botones, micro-interacciones | 180ms    | ease-out                                          |
| Apertura de bottom sheet            | 300ms    | ease-out, `translateY(100%) → 0`                  |
| Rebote del FAB al agregar           | 260ms    | overshoot leve (`cubic-bezier(0.34,1.56,0.64,1)`) |
| Caída del ticket final              | 420ms    | overshoot leve, mismo cubic-bezier                |

Un solo momento de "espectáculo" (el ticket cayendo) — todo lo demás se mantiene discreto para no competir con él.

---

## 10. Voz y microcopy

- Tono: directo, cercano, con el sabor de un mercado de comida — nunca corporativo.
- El botón siempre dice lo mismo en todo el flujo: **"Agregar"** en el detalle, **"Finalizar pedido"** en el carrito — nunca cambia a "Confirmar" o "Enviar" a medio camino.
- Carrito vacío: _"Tu bandeja está vacía todavía — elige algo del mercado"_ en vez de un genérico "No hay productos".
- Confirmación final: _"Pedido listo — muéstraselo al mesero"_, no un frío "Transacción completada".
- Badges de marcador con lenguaje de barrio: "Top ventas", "Recomendado del chef", "🔥 Picante" — no "Best seller" ni "Featured".

---

## 11. Assets técnicos

- **Fuentes (Google Fonts, gratuitas):** Bungee, Space Mono, Instrument Sans, Permanent Marker.
- **Íconos:** Lucide Icons (SVG).
- **Imágenes de producto:** proporción 4:3 (desktop) / recorte horizontal (móvil), mínimo 800×600px, formato WebP.
- **QR:** SVG vectorial, con quiet zone estándar, generado a partir de los datos del pedido.
- **Textura de papel del ticket:** un `clip-path` de zigzag repetido (no una imagen), para que se escale nítido en cualquier resolución sin pesar la carga.

---

## 12. Tabla resumen de tokens (para desarrollo)

```
--color-paper: #EFEAE0;
--color-surface: #FBF9F4;
--color-ink: #241C15;
--color-ink-soft: #6B5E4F;
--color-line: #D8CFC0;
--color-cta: #D6392B;
--color-cta-hover: #B32E22;
--color-stamp: #B32E22;

/* Mundos por categoría */
--world-mariscos: #0E7C86;      --world-mariscos-soft: #DCEEEF;
--world-hamburguesas: #8B4A1E;  --world-hamburguesas-accent: #E3A72E; --world-hamburguesas-soft: #F3E3C4;
--world-rapida: #E4572E;        --world-rapida-soft: #FBDFC9;
--world-bebidas: #7A3F8C;       --world-bebidas-soft: #EBDDF0;
--world-postres: #C74B78;       --world-postres-soft: #F6DDE6;

--font-marquee: 'Bungee', sans-serif;
--font-register: 'Space Mono', monospace;
--font-body: 'Instrument Sans', -apple-system, sans-serif;
--font-stamp: 'Permanent Marker', cursive;

--space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
--space-5: 20px; --space-6: 24px; --space-8: 32px; --space-10: 40px;

--radius-sm: 6px; --radius-md: 10px; --radius-lg: 14px; --radius-xl: 20px; --radius-full: 999px;

--shadow-sm: 0 1px 2px rgba(36,28,21,0.08);
--shadow-md: 0 6px 16px rgba(36,28,21,0.12);
--shadow-lg: 0 10px 28px rgba(36,28,21,0.18);
--shadow-ticket: 0 14px 32px rgba(36,28,21,0.22);

--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
```

---

_Documento de sistema de diseño v2 — concepto "La Comanda", con temas por categoría para mariscos, hamburguesas y comida rápida bajo una sola identidad coherente._
