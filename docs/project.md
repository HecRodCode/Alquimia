# Planeación del Prototipo: Menú Interactivo con Generación de Pedido por QR

## 1. Resumen ejecutivo (Elevator Pitch)

Una aplicación web que reemplaza el menú físico de un restaurante por un **menú digital interactivo**. El cliente, desde su propio celular, navega el menú, arma su pedido personalizado y al finalizar genera automáticamente un **código QR** con todo su pedido. El mesero escanea ese QR y recibe el pedido completo, listo para enviarlo a cocina, sin tener que tomar nota a mano ni transcribir nada.

**Problema que resuelve:**

- Errores de comunicación entre cliente → mesero → cocina.
- Tiempos muertos esperando a que el mesero tome el pedido.
- Menús físicos desactualizados, sucios o poco atractivos.
- Falta de información clara (ingredientes, personalización, precios) al momento de pedir.

**Propuesta de valor:**

- Para el restaurante: pedidos más rápidos, más precisos, menú siempre actualizado, mejor experiencia = más rotación de mesas.
- Para el cliente: control total de su pedido, información clara, personalización sin depender de que el mesero recuerde todo.

---

## 2. Alcance de este prototipo (lo que SÍ vamos a construir)

> Este es el punto más importante para la presentación: dejar clarísimo el corte del MVP.

**Incluido:**

1. Visualización del menú digital (categorías, productos, precios, fotos, descripciones).
2. Selección de producto y personalización (tamaño, adiciones, quitar ingredientes, notas especiales).
3. Carrito de pedido (agregar, editar, eliminar, ver total).
4. Botón "Finalizar pedido".
5. Generación automática de un código QR que contiene/representa el pedido completo.
6. Pantalla final mostrando el QR para que el cliente se lo muestre al mesero.

**Fuera de alcance de este prototipo** (se menciona en la presentación como "siguiente fase", pero no se construye ahora):

- App o vista del mesero para escanear el QR.
- Identificación automática de mesa (QR en la mesa, número de mesa, etc.).
- Envío del pedido a cocina / sistema de cocina (KDS).
- Login o cuentas de usuario.
- Pagos en línea.
- Panel de administración del restaurante (editar menú, precios, etc.) — en el prototipo el menú puede ir "hardcodeado" o con datos de prueba.
- Multi-restaurante / multi-sucursal.

Dejar esto explícito es clave: le muestra al inversionista que el equipo entiende el problema completo, pero está siendo estratégico enfocando el prototipo en la parte más visual y demostrable primero.

---

## 3. Actor principal de este prototipo

- **Cliente**: única persona que interactúa con esta parte del sistema. No requiere login, entra directo al menú (como invitado).

_(Actores de fases futuras, solo para contexto de la visión completa: Mesero, Cocina, Administrador del restaurante, SuperAdmin de la plataforma.)_

---

## 4. Flujo de usuario (paso a paso)

1. El cliente abre la aplicación web (en el prototipo, vía link directo — en producción sería vía QR físico en la mesa).
2. Ve el **menú digital** organizado por categorías (Entradas, Platos fuertes, Bebidas, Postres, etc.).
3. Toca un producto → se abre el **detalle del producto**: foto, descripción, precio base, y opciones de personalización (ej: término de la carne, tamaño, extras, ingredientes a quitar, comentario libre).
4. Configura el producto como lo quiere y lo agrega al **carrito**.
5. Repite el proceso con cuantos productos quiera.
6. Abre el **carrito**, revisa su pedido completo (ítems, personalización de cada uno, cantidad, subtotal, total).
7. Puede editar cantidades o eliminar ítems desde el carrito.
8. Cuando está conforme, toca **"Finalizar pedido"**.
9. La app genera un **código QR** que representa ese pedido.
10. Se muestra una pantalla final con el QR grande, lista para que el cliente se la enseñe al mesero.

---

## 5. Funcionalidades detalladas

### 5.1 Menú interactivo

- Listado de categorías de productos.
- Tarjetas de producto con: imagen, nombre, precio, descripción corta.
- Buscador o filtro simple (opcional para el MVP, valor agregado si hay tiempo).

### 5.2 Detalle y personalización de producto

- Vista ampliada del producto.
- Opciones configurables, por ejemplo:
  - Selección única (ej: tamaño: pequeño/mediano/grande).
  - Selección múltiple (ej: toppings o adiciones, cada una puede sumar al precio).
  - Ingredientes removibles ("sin cebolla", "sin picante").
  - Campo de texto libre para notas ("término 3/4", "para llevar", etc.).
- Selector de cantidad.
- Botón "Agregar al carrito" con el precio ya calculado según las opciones elegidas.

### 5.3 Carrito de pedido

- Lista de todos los productos agregados con su configuración específica.
- Edición de cantidad o eliminación de ítems.
- Cálculo automático de subtotal por ítem y total general.
- Botón "Finalizar pedido".

### 5.4 Generación del QR

- Al finalizar, se construye un objeto con todo el pedido (productos, cantidades, personalización, total).
- Ese objeto se codifica en un QR (ya sea el detalle completo, o un identificador que apunte a un pedido guardado — esto se decide en la fase técnica).
- Se muestra el QR en pantalla completa, con un resumen visual del pedido debajo por si el mesero no puede escanear.

---

## 6. Requisitos no funcionales

- **Mobile-first**: se va a usar desde el celular del cliente sentado en la mesa, la prioridad es que se vea y funcione perfecto en pantallas pequeñas.
- **Sin instalación**: es una web app, no una app nativa — el cliente accede directo desde el navegador.
- **Rápido y fluido**: pocos clics entre "ver el menú" y "finalizar pedido".
- **Claridad visual**: precios y personalización siempre visibles, sin letra pequeña ni pasos ocultos.
- **Disponible sin conexión a una cuenta**: cero fricción de entrada (sin registro, sin login).

---

## 7. Historias de usuario (para guiar el desarrollo)

| Como... | Quiero...                                        | Para...                                      |
| ------- | ------------------------------------------------ | -------------------------------------------- |
| Cliente | ver el menú organizado por categorías            | encontrar rápido lo que quiero pedir         |
| Cliente | ver fotos, precio y descripción de cada producto | decidir con información completa             |
| Cliente | personalizar mi producto (tamaño, extras, notas) | pedir exactamente lo que quiero              |
| Cliente | agregar varios productos a un carrito            | armar mi pedido completo antes de confirmar  |
| Cliente | editar o quitar productos del carrito            | corregir errores antes de confirmar          |
| Cliente | ver el total de mi pedido antes de confirmar     | saber cuánto voy a pagar                     |
| Cliente | generar un QR con mi pedido                      | mostrárselo al mesero sin tener que dictarlo |

---

## 8. Criterios de aceptación del prototipo (Definición de "Listo")

El prototipo se considera terminado cuando un usuario puede, sin ayuda:

1. Abrir la app y ver el menú con al menos 3 categorías y varios productos de ejemplo.
2. Entrar al detalle de un producto y personalizarlo con al menos un tipo de opción (ej. tamaño o extras).
3. Agregarlo al carrito y ver el precio reflejado correctamente.
4. Agregar más de un producto distinto.
5. Ver el carrito completo con el total correcto.
6. Editar/eliminar un producto del carrito y ver el total actualizarse.
7. Tocar "Finalizar pedido" y ver un QR generado que represente ese pedido.

---

## 9. Pantallas necesarias (para wireframes / diseño)

1. **Pantalla Home / Menú** — categorías + listado de productos.
2. **Modal/Pantalla de Detalle de Producto** — personalización + agregar al carrito.
3. **Pantalla/Panel de Carrito** — resumen editable del pedido.
4. **Pantalla de Confirmación / QR** — QR grande + resumen del pedido.

---

## 10. Visión a futuro (para mencionar en la presentación, no para construir ahora)

Mostrarle al inversionista el panorama completo ayuda a que entienda que este prototipo es el primer paso de un producto más grande:

- App/vista del mesero que escanea el QR y ve el pedido para pasarlo a cocina.
- Pantalla de cocina (KDS) con los pedidos en cola.
- Identificación automática de mesa vía QR físico.
- Panel de administración para que el restaurante gestione su propio menú, precios y disponibilidad.
- Pagos integrados (pasarela de pago desde la misma app).
- Modelo SaaS multi-restaurante (cada restaurante con su propio menú y marca).

---

## 11. Riesgos y consideraciones a mencionar

- Al no manejar identificación de mesa en este prototipo, hay que ser claros en la demo de que ese pedido "no sabe a qué mesa pertenece" todavía — es una limitación consciente, no un olvido.
- El contenido del QR (qué tan detallado va el pedido codificado ahí) es una decisión técnica que se resuelve en la siguiente fase (stack).
- Se recomienda usar datos de ejemplo (menú ficticio o de un restaurante real que sirva de caso de estudio) para que la demo se sienta real.

---

_Documento de planeación — listo para la fase de definición de stack tecnológico y arquitectura._
