import { Product } from '../models';

/**
 * Menú ficticio de ejemplo (precios en COP, sin decimales).
 * No hay backend: estos datos viven en el bundle y se exponen como signal
 * desde MenuService. Las imágenes se sirven desde `public/products/`.
 */
export const MOCK_PRODUCTS: readonly Product[] = [
  // ── 🦐 Mariscos ──────────────────────────────────────────────
  {
    id: 'ceviche-mixto',
    categoryId: 'mariscos',
    name: 'Ceviche mixto',
    description: 'Camarón, pulpo y pescado marinados en limón, cilantro y ají.',
    basePrice: 38000,
    imageUrl: '/products/ceviche-mixto.webp',
    badge: 'top',
    customization: {
      sizes: [
        { id: 'individual', label: 'Individual', priceDelta: 0 },
        { id: 'compartir', label: 'Para compartir', priceDelta: 16000 },
      ],
      extras: [
        { id: 'aguacate', label: 'Aguacate extra', price: 4000 },
        { id: 'patacones', label: 'Patacones', price: 6000 },
        { id: 'camaron-extra', label: 'Camarón extra', price: 9000 },
      ],
      removableIngredients: [
        { id: 'cebolla', label: 'Cebolla' },
        { id: 'aji', label: 'Ají' },
        { id: 'cilantro', label: 'Cilantro' },
      ],
      allowsNotes: true,
    },
  },
  {
    id: 'cazuela-mariscos',
    categoryId: 'mariscos',
    name: 'Cazuela de mariscos',
    description: 'Guiso cremoso de mariscos en leche de coco, servido con arroz y patacón.',
    basePrice: 42000,
    imageUrl: '/products/cazuela-mariscos.webp',
    customization: {
      sizes: [],
      extras: [
        { id: 'arroz-coco', label: 'Arroz con coco', price: 5000 },
        { id: 'queso', label: 'Queso gratinado', price: 4000 },
      ],
      removableIngredients: [{ id: 'picante', label: 'Picante' }],
      allowsNotes: true,
    },
  },
  {
    id: 'camarones-ajillo',
    categoryId: 'mariscos',
    name: 'Camarones al ajillo',
    description: 'Camarones salteados en mantequilla de ajo y perejil, con pan tostado.',
    basePrice: 36000,
    imageUrl: '/products/camarones-ajillo.webp',
    badge: 'recomendado',
    customization: {
      sizes: [
        { id: 'porcion', label: 'Porción', priceDelta: 0 },
        { id: 'doble', label: 'Doble', priceDelta: 18000 },
      ],
      extras: [{ id: 'pan-extra', label: 'Pan extra', price: 3000 }],
      removableIngredients: [{ id: 'ajo', label: 'Ajo' }],
      allowsNotes: true,
    },
  },

  // ── 🍔 Hamburguesas ──────────────────────────────────────────
  {
    id: 'hamburguesa-clasica',
    categoryId: 'hamburguesas',
    name: 'Hamburguesa clásica',
    description: 'Carne de res 150g, queso cheddar, lechuga, tomate y salsa de la casa.',
    basePrice: 24000,
    imageUrl: '/products/hamburguesa-clasica.webp',
    badge: 'top',
    customization: {
      sizes: [
        { id: 'sencilla', label: 'Sencilla', priceDelta: 0 },
        { id: 'doble-carne', label: 'Doble carne', priceDelta: 8000 },
      ],
      extras: [
        { id: 'tocineta', label: 'Tocineta', price: 4000 },
        { id: 'huevo', label: 'Huevo', price: 3000 },
        { id: 'queso-extra', label: 'Queso extra', price: 3000 },
      ],
      removableIngredients: [
        { id: 'cebolla', label: 'Cebolla' },
        { id: 'tomate', label: 'Tomate' },
        { id: 'lechuga', label: 'Lechuga' },
      ],
      allowsNotes: true,
    },
  },
  {
    id: 'hamburguesa-bbq',
    categoryId: 'hamburguesas',
    name: 'Hamburguesa BBQ',
    description: 'Carne de res, tocineta, aros de cebolla y salsa BBQ ahumada.',
    basePrice: 28000,
    imageUrl: '/products/hamburguesa-bbq.webp',
    badge: 'picante',
    customization: {
      sizes: [
        { id: 'sencilla', label: 'Sencilla', priceDelta: 0 },
        { id: 'doble-carne', label: 'Doble carne', priceDelta: 8000 },
      ],
      extras: [
        { id: 'aros-extra', label: 'Aros de cebolla extra', price: 4000 },
        { id: 'jalapeno', label: 'Jalapeños', price: 2500 },
      ],
      removableIngredients: [{ id: 'cebolla', label: 'Cebolla' }],
      allowsNotes: true,
    },
  },
  {
    id: 'hamburguesa-pollo',
    categoryId: 'hamburguesas',
    name: 'Hamburguesa de pollo crispy',
    description: 'Pechuga apanada crocante, lechuga, tomate y mayonesa de la casa.',
    basePrice: 23000,
    imageUrl: '/products/hamburguesa-pollo.webp',
    customization: {
      sizes: [],
      extras: [
        { id: 'queso', label: 'Queso', price: 3000 },
        { id: 'tocineta', label: 'Tocineta', price: 4000 },
      ],
      removableIngredients: [{ id: 'mayonesa', label: 'Mayonesa' }],
      allowsNotes: true,
    },
  },

  // ── 🍟 Comida Rápida ─────────────────────────────────────────
  {
    id: 'papas-francesa',
    categoryId: 'rapida',
    name: 'Papas a la francesa',
    description: 'Papas crocantes con sal marina. Elige tu salsa favorita.',
    basePrice: 9000,
    imageUrl: '/products/papas-francesa.webp',
    customization: {
      sizes: [
        { id: 'pequena', label: 'Pequeña', priceDelta: 0 },
        { id: 'mediana', label: 'Mediana', priceDelta: 3000 },
        { id: 'grande', label: 'Grande', priceDelta: 6000 },
      ],
      extras: [
        { id: 'queso-fundido', label: 'Queso fundido', price: 4000 },
        { id: 'tocineta', label: 'Tocineta en trozos', price: 4000 },
      ],
      removableIngredients: [{ id: 'sal', label: 'Sal' }],
      allowsNotes: false,
    },
  },
  {
    id: 'perro-caliente',
    categoryId: 'rapida',
    name: 'Perro caliente especial',
    description: 'Salchicha jumbo, papas trituradas, quesito y salsas de la casa.',
    basePrice: 14000,
    imageUrl: '/products/perro-caliente.webp',
    badge: 'nuevo',
    customization: {
      sizes: [],
      extras: [
        { id: 'salchicha-extra', label: 'Salchicha extra', price: 5000 },
        { id: 'queso-extra', label: 'Queso extra', price: 3000 },
      ],
      removableIngredients: [
        { id: 'papa', label: 'Papa triturada' },
        { id: 'cebolla', label: 'Cebolla' },
      ],
      allowsNotes: true,
    },
  },
  {
    id: 'nuggets-pollo',
    categoryId: 'rapida',
    name: 'Nuggets de pollo x6',
    description: 'Seis nuggets crocantes con salsa a elección.',
    basePrice: 12000,
    imageUrl: '/products/nuggets-pollo.webp',
    customization: {
      sizes: [
        { id: 'x6', label: '6 unidades', priceDelta: 0 },
        { id: 'x10', label: '10 unidades', priceDelta: 7000 },
      ],
      extras: [{ id: 'salsa-extra', label: 'Salsa extra', price: 1500 }],
      removableIngredients: [],
      allowsNotes: false,
    },
  },

  // ── 🥤 Bebidas ───────────────────────────────────────────────
  {
    id: 'limonada-coco',
    categoryId: 'bebidas',
    name: 'Limonada de coco',
    description: 'Limonada cremosa de coco, servida bien fría.',
    basePrice: 9000,
    imageUrl: '/products/limonada-coco.webp',
    badge: 'top',
    customization: {
      sizes: [
        { id: 'vaso', label: 'Vaso', priceDelta: 0 },
        { id: 'jarra', label: 'Jarra', priceDelta: 12000 },
      ],
      extras: [],
      removableIngredients: [{ id: 'azucar', label: 'Azúcar' }],
      allowsNotes: false,
    },
  },
  {
    id: 'gaseosa',
    categoryId: 'bebidas',
    name: 'Gaseosa',
    description: 'Refresco en lata 350ml.',
    basePrice: 5000,
    imageUrl: '/products/gaseosa.webp',
    customization: {
      sizes: [],
      extras: [],
      removableIngredients: [],
      allowsNotes: true,
    },
  },
  {
    id: 'cerveza',
    categoryId: 'bebidas',
    name: 'Cerveza nacional',
    description: 'Botella 330ml bien fría.',
    basePrice: 7000,
    imageUrl: '/products/cerveza.webp',
    customization: {
      sizes: [],
      extras: [],
      removableIngredients: [],
      allowsNotes: false,
    },
  },

  // ── 🍰 Postres ───────────────────────────────────────────────
  {
    id: 'brownie-helado',
    categoryId: 'postres',
    name: 'Brownie con helado',
    description: 'Brownie tibio de chocolate con bola de helado de vainilla y salsa de arequipe.',
    basePrice: 15000,
    imageUrl: '/products/brownie-helado.webp',
    badge: 'recomendado',
    customization: {
      sizes: [],
      extras: [
        { id: 'helado-extra', label: 'Bola de helado extra', price: 4000 },
        { id: 'arequipe', label: 'Arequipe extra', price: 2000 },
      ],
      removableIngredients: [],
      allowsNotes: true,
    },
  },
  {
    id: 'cheesecake',
    categoryId: 'postres',
    name: 'Cheesecake de frutos rojos',
    description: 'Porción cremosa de cheesecake con salsa de frutos rojos.',
    basePrice: 13000,
    imageUrl: '/products/cheesecake.webp',
    customization: {
      sizes: [],
      extras: [{ id: 'frutos-extra', label: 'Frutos rojos extra', price: 3000 }],
      removableIngredients: [],
      allowsNotes: false,
    },
  },
];
