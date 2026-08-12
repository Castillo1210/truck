// ============================================================
//  data.js — Datos mock del restaurante Cara Negra
//  Cuando conectes el backend, los servicios en /services/
//  harán fetch() a la API en lugar de importar desde aquí.
// ============================================================

export const tablesData = [
  { id: 1,  pax: 4, status: 'occupied', name: 'Carlos',  location: 'Salón'   },
  { id: 2,  pax: 2, status: 'free',     location: 'Salón'   },
  { id: 3,  pax: 4, status: 'free',     location: 'Salón'   },
  { id: 4,  pax: 6, status: 'reserved', location: 'Salón'   },
  { id: 5,  pax: 2, status: 'occupied', name: 'Ana',      location: 'Terraza' },
  { id: 6,  pax: 4, status: 'free',     location: 'Terraza' },
  { id: 7,  pax: 2, status: 'free',     location: 'Terraza' },
  { id: 8,  pax: 4, status: 'reserved', name: 'Pérez',    location: 'Terraza' },
  { id: 9,  pax: 8, status: 'occupied', name: 'García',   location: 'Salón'   },
  { id: 10, pax: 2, status: 'free',     location: 'Barra'   },
  { id: 11, pax: 2, status: 'free',     location: 'Barra'   },
  { id: 12, pax: 6, status: 'free',     location: 'Salón'   },
];

export const menuCategories = [
  { id: 'entradas',   label: 'Entradas',    icon: '🥗' },
  { id: 'principales', label: 'Principales', icon: '🍖' },
  { id: 'postres',    label: 'Postres',     icon: '🍮' },
  { id: 'bebidas',    label: 'Bebidas',     icon: '🥂' },
];

export const menuItems = [
  // ─── ENTRADAS ───────────────────────────────────────────
  {
    id: 101,
    category: 'entradas',
    name: 'Croquetas de jamón ibérico',
    description: '12 uds · bechamel artesana · jamón 100% ibérico',
    price: 12.50,
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=200&h=200&fit=crop',
  },
  {
    id: 102,
    category: 'entradas',
    name: 'Tabla de quesos curados',
    description: 'Manchego · Idiazábal · Roncal · mermelada y nueces',
    price: 16.00,
    image: 'https://images.unsplash.com/photo-1546961326-a3c9f391a887?w=200&h=200&fit=crop',
  },
  {
    id: 103,
    category: 'entradas',
    name: 'Pan tumaca con anchoas',
    description: 'Masa madre · tomate fresco · AOVE · anchoas del Cantábrico',
    price: 9.50,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop',
  },
  {
    id: 104,
    category: 'entradas',
    name: 'Ensalada de temporada',
    description: 'Mezclum · tomate cherry · cebolla morada · vinagreta de miel',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop',
  },
  {
    id: 105,
    category: 'entradas',
    name: 'Pulpo a la gallega',
    description: 'Pulpo cocido · pimentón de la Vera · AOVE · patata',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=200&h=200&fit=crop',
  },

  // ─── PRINCIPALES ────────────────────────────────────────
  {
    id: 201,
    category: 'principales',
    name: 'Entrecot de ternera gallega',
    description: '300 g · madurado 21 días · guarnición de patatas bravas',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=200&h=200&fit=crop',
  },
  {
    id: 202,
    category: 'principales',
    name: 'Merluza al horno',
    description: 'Merluza del norte · almejas · salsa verde · verduras',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop',
  },
  {
    id: 203,
    category: 'principales',
    name: 'Paella valenciana',
    description: 'Arroz bomba · pollo · conejo · judía verde · garrofó',
    price: 18.50,
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=200&h=200&fit=crop',
  },
  {
    id: 204,
    category: 'principales',
    name: 'Carrillera de cerdo ibérico',
    description: 'Estofada al vino tinto · puré de patata · chips de ajo',
    price: 19.00,
    image: 'https://images.unsplash.com/photo-1544025162-d76594e00fec?w=200&h=200&fit=crop',
  },
  {
    id: 205,
    category: 'principales',
    name: 'Risotto de setas y trufa',
    description: 'Arroz arbóreo · setas de temporada · trufa negra · parmesano',
    price: 16.50,
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=200&h=200&fit=crop',
  },

  // ─── POSTRES ─────────────────────────────────────────────
  {
    id: 301,
    category: 'postres',
    name: 'Tarta de queso La Viña',
    description: 'Receta original · base de galleta · mermelada de frutos rojos',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=200&h=200&fit=crop',
  },
  {
    id: 302,
    category: 'postres',
    name: 'Torrija caramelizada',
    description: 'Pan brioche · leche infusionada · helado de vainilla',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=200&h=200&fit=crop',
  },
  {
    id: 303,
    category: 'postres',
    name: 'Coulant de chocolate',
    description: 'Corazón fundente · helado de frambuesa · polvo de cacao',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200&h=200&fit=crop',
  },
  {
    id: 304,
    category: 'postres',
    name: 'Helado artesano (3 bolas)',
    description: 'Vainilla · chocolate · fresa · toppings a elegir',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=200&h=200&fit=crop',
  },

  // ─── BEBIDAS ─────────────────────────────────────────────
  {
    id: 401,
    category: 'bebidas',
    name: 'Vino tinto Ribera del Duero',
    description: 'Copa · Crianza · D.O. Ribera del Duero',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=200&h=200&fit=crop',
  },
  {
    id: 402,
    category: 'bebidas',
    name: 'Agua mineral (50 cl)',
    description: 'Con o sin gas',
    price: 2.00,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop',
  },
  {
    id: 403,
    category: 'bebidas',
    name: 'Cerveza artesana',
    description: 'Caña de 40 cl · Cara Negra Lager · elaboración propia',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=200&h=200&fit=crop',
  },
  {
    id: 404,
    category: 'bebidas',
    name: 'Refresco',
    description: 'Coca-Cola · Fanta naranja · Fanta limón · agua tónica',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=200&h=200&fit=crop',
  },
  {
    id: 405,
    category: 'bebidas',
    name: 'Café solo / cortado',
    description: 'Blend arábica de especialidad',
    price: 1.80,
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=200&h=200&fit=crop',
  },
];