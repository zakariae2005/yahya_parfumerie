// lib/products.ts

export interface Product {
  id: string
  name: string
  brand?: string
  price: number
  description?: string
  category?: string
  subcategory?: string
  images: string[]
  rating: number
  reviews: number
  createdAt: Date
  updatedAt: Date
}

export const CATEGORIES = [
  'PARFUM',
  'MAQUILLAGE',
  'CHEVEUX',
  'SOIN DE VISAGE',
  'CORPS & DOUCHE',
  'Appareils Électriques'
]

export const SUBCATEGORIES: Record<string, string[]> = {
  'PARFUM': ['Parfum Femme', 'Parfum Homme'],
  'MAQUILLAGE': ['Teint', 'Yeux', 'Sourcils', 'Lèvres', 'Ongles', 'Palette Maquillage'],
  'CHEVEUX': ['Soins Cheveux', 'Coloration'],
  'SOIN DE VISAGE': [],
  'CORPS & DOUCHE': [],
  'Appareils Électriques': []
}

export const BRANDS = [
  "Hugo Boss",
  "Dior",
  "Dolce & Gabbana",
  "Elie Saab",
  "Giorgio Armani",
  "Givenchy",
  "Hermès",
  "Jean Paul Gaultier",
  "Lancôme",
  "Valentino",
  "Yves Saint Laurent",
  "Saphir",
  "Montblanc",
  "Prada",
];


// Sample products
export const products: Product[] = [
  {
    id: '1',
    name: 'J\'adore Eau de Parfum',
    brand: 'Dior',
    price: 135,
    rating: 5,
    reviews: 24,
    category: 'PARFUM',
    subcategory: 'Parfum Femme',
    images: ['/images/products/dior-jadore.jpg'],
    description: 'Un parfum floral et sensuel pour femme.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Sauvage Eau de Toilette',
    brand: 'Dior',
    price: 120,
    rating: 5,
    reviews: 42,
    category: 'PARFUM',
    subcategory: 'Parfum Homme',
    images: ['/images/products/dior-sauvage.jpg'],
    description: 'Un parfum masculin frais et épicé.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Rouge Coco Lipstick',
    brand: 'Chanel',
    price: 45,
    rating: 4.8,
    reviews: 31,
    category: 'MAQUILLAGE',
    subcategory: 'Lèvres',
    images: ['/images/products/chanel-lipstick.jpg'],
    description: 'Un rouge à lèvres hydratant et longue tenue.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Le Teint Ultra Foundation',
    brand: 'Chanel',
    price: 68,
    rating: 4.7,
    reviews: 56,
    category: 'MAQUILLAGE',
    subcategory: 'Teint',
    images: ['/images/products/chanel-foundation.jpg'],
    description: 'Fond de teint léger avec couverture parfaite.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Shampoing Réparateur',
    brand: "L'Oréal",
    price: 25,
    rating: 4.5,
    reviews: 89,
    category: 'CHEVEUX',
    subcategory: 'Soins Cheveux',
    images: ['/images/products/loreal-shampoo.jpg'],
    description: 'Shampoing pour cheveux abîmés.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]