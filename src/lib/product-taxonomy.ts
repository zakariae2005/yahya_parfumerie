// lib/product-taxonomy.ts
// Single source of truth for categories, subcategories, mega-categories, and per-category brands

export const CATEGORIES = [
  'PARFUMS',
  'MAQUILLAGE',
  'CHEVEUX',
  'SOIN DE VISAGE',
  'CORPS & DOUCHE',
  'HOMME',
  'Appareils Électriques',
] as const

export type Category = (typeof CATEGORIES)[number]

// ─── Subcategories per category ───────────────────────────────────────────────
export const SUBCATEGORIES: Record<string, string[]> = {
  'PARFUMS': ['Parfums Femme', 'Parfums Homme', 'Parfums Arabe', 'Les Coffrets'],
  'MAQUILLAGE': ['Teint', 'Yeux', 'Sourcils', 'Lèvres', 'Ongles', 'Palette Maquillage', 'Pinceau & Accessoires'],
  'CHEVEUX': ['Soins Cheveux', 'Type de Cheveux', 'Coloration', 'Coloration sans ammoniaque'],
  'SOIN DE VISAGE': ['Type de Soin', 'Nettoyant & Démaquillant', 'Type de Peau', 'Soin Anti-Âge'],
  'CORPS & DOUCHE': ['Soin du Corps', 'Bain & Douche', 'Bébé', 'Épilation'],
  'HOMME': ['Soin Visage Homme', 'Soin Corps Homme', 'Rasage', 'Appareils Homme'],
  'Appareils Électriques': ['Type de Produit'],
}

// ─── Mega-categories (3rd level) per subcategory ─────────────────────────────
export const MEGACATEGORIES: Record<string, string[]> = {
  // PARFUM
  'Parfums Femme':  ['Eau de Toilette', 'Eau de Parfum', 'Le Parfum'],
  'Parfums Homme':  ['Eau de Toilette', 'Eau de Parfum', 'Le Parfum'],
  'Parfums Arabe':  [],
  'Les Coffrets':  ['Femme', 'Homme'],

  // MAQUILLAGE
  'Teint':     ['Base de teint et Fixateur', 'Fond de teint', 'Anti cernes et Correcteurs', 'Poudre', 'BB Crème', 'Fard à Joue', 'Highlighter', 'Contouring'],
  'Yeux':      ['Mascara', 'Eyeliner', 'Crayon yeux et Khôl', 'Fard à Paupières & Base à Paupières', 'Faux Cils'],
  'Sourcils':  ['Crayon Sourcils', 'Gel et Mascara Sourcils', 'Kits Sourcils', 'Poudre Sourcils'],
  'Lèvres':    ['Rouge à Lèvres', 'Gloss', 'Crayon à Lèvres', 'Baume à Lèvres & Repulpeur'],
  'Ongles':    ['Vernis à ongle', 'Nail Art', 'Soin des Ongles', 'Top & Base Coat', 'Accessoires Ongles'],
  'Palette Maquillage':    ['Palette Highlighter', 'Palette Contouring', 'Palette Fard à Paupières', 'Palette Sourcils'],
  'Pinceau & Accessoires': ['Beauty Blender', 'Pinceau Teint', 'Pinceau Yeux & Sourcils', 'Kit Pinceaux', 'Trousse', 'Accessoires'],

  // CHEVEUX
  'Soins Cheveux':  ['Shampoing', 'Shampoing sans sulfate', 'Shampoing sec', 'Après shampoing', 'Masque Cheveux', 'Serum Cheveux', 'Huile cheveux', 'Soin sans rinçage', 'Spray Cheveux'],
  'Type de Cheveux': ['Cheveux Sec & Très Sec', 'Cheveux Abîmés', 'Cheveux Gras', 'Cheveux Colorés', 'Cheveux à Pellicules', 'Cheveux Bouclés', 'Cheveux Fins', 'Cheveux blonds et éclaircis'],
  'Coloration':     ['Excellence', 'Garnier', 'Wella Koleston', 'Wella Kadus', 'Igora royal', 'Gen us', 'Majirel', 'Magic Retouch'],
  'Coloration sans ammoniaque': ['Casting', 'Inoa', 'Olia'],

  // SOIN DE VISAGE
  'Type de Soin':            ['Crème de jour', 'Crème de nuit', 'Masque et Gommage', 'Sérum', 'Contour Des Yeux', 'Baume à Lèvres'],
  'Nettoyant & Démaquillant':['Eau Micellaire', 'Lait Démaquillant', 'Gel Nettoyant et Mousse', 'Huile Démaquillante', 'Démaquillant Yeux', 'Lotion Tonique', 'Accessoires Démaquillage'],
  'Type de Peau':            ['Soin peau normal ou mixte', 'Soin peau grasse', 'Soin peau sèche', 'Soin peau sensible', 'Soin peau anti-imperfection', 'Soin peau mature', 'Tous types de peau'],
  'Soin Anti-Âge':           ['Soin anti-rides', 'Soin anti-tâches', 'Soin anti-âge'],

  // CORPS & DOUCHE
  'Soin du Corps': ['Spray & Brume', 'Lait Hydratant', 'Crème Mains', 'Soin des Pieds & Jambes', 'Déodorant', 'Huile & Soin Réparateur'],
  'Bain & Douche': ['Crème de Douche', 'Gel de Douche', 'Hygiène intime', 'Savon', 'Dentifrice', 'Accessoire Bain'],
  'Bébé':          ['Change (Crème-Talc-Liniment)', 'Lingettes', 'Bain et Toilette Bébé', 'Eau de Toilette Bébé', 'Soin Corps Bébé', 'Cheveux et Cuir Chevelu Bébé'],
  'Épilation':     ['Rasoir', 'Crème Dépilatoire', 'Cire Froide', 'Cire Cartouche', 'Cire Wax', 'Cire Pot', 'Bandes de Cire', 'Huile Post Épilation', 'Épilateur Électrique', 'Appareil Cartouche', 'Appareil Wax'],

  // HOMME
  'Soin Visage Homme': ['Crème de jour', 'Sérum', 'Gel Nettoyant', 'Contour des Yeux'],
  'Soin Corps Homme':  ['Déodorant', 'Gel de Douche', 'Lait Hydratant'],
  'Rasage':            ['Mousse à Raser', 'Gel à Raser', 'Après Rasage', 'Rasoir'],
  'Appareils Homme':   ['Tondeuse', 'Rasoir Électrique', 'Épilateur'],

  // Appareils Électriques
  'Type de Produit': ['Brosses Soufflantes', 'Lisseur', 'Fer a boucler', 'Sèche cheveux'],
}

// ─── Brands per category ──────────────────────────────────────────────────────
export const BRANDS_BY_CATEGORY: Record<string, string[]> = {
  'PARFUM': [
    'BOSS', 'DIOR', 'DOLCE & GABBANA', 'ELIE SAAB', 'GIORGIO ARMANI',
    'GIVENCHY', 'HERMÈS', 'JEAN PAUL GAULTIER', 'LANCÔME', 'VALENTINO',
    'YVES SAINT LAURENT', 'SAPHIR', 'MONT BLANC', 'PRADA', 'VERSACE', 'CAROLINA HERRERA', 
    'NARCISO RODRIGUEZ', 'GUERLAIN', 'DIESEL', 'ZADIG & VOLTAIRE', 'EISENBERG', 
    'PACO RABANNE', 'MAUBOUSSIN', 'BURBERRY',
  ],
  'MAQUILLAGE': [
  'REVOLUTION',
  'BE',
  'DOUGLAS',
  'GABRINI',
  'TOPFACE',
  'ESSENCE',
  'ITSTYLE',
  'BBROSE',
  'KIKO',
  'CATRICE',
  'MAYBELLINE',
],

  'CHEVEUX': [
    'GARNIER', 'GOLDEN ROSE', 'JAQUES DESSANGE', 'KIRKLAND',
    "L'ORÉAL", "L'ORÉAL PROFESSIONNEL", 'MIXA BÉBÉ',
    'REVOX', 'ROSE BAIE', 'SHISEIDO', 'WELLA PROFESSIONALS',
  ],
  'SOIN DE VISAGE': [
    'ACURE', 'CeraVe', 'GARNIER', "L'ORÉAL", "L'ORÉAL PROFESSIONNEL",
    'LA ROCHE POSAY', 'LANCÔME', 'MELA', 'MIXA EXPERT', 'VICHY', 'THE ORDINARY',
  ],
  'CORPS & DOUCHE': [
    "L'ORÉAL", "L'ORÉAL PROFESSIONNEL", 'LE PETIT MARSEILLAIS',
    'MIXA BÉBÉ', 'MIXA EXPERT',
  ],
  'HOMME': [
    'BABYLISS PARIS', 'BABYLISS PRO', 'BRAUN', 'PHILIPS', 'WAHL PROFESSIONAL',
    'CRYSTAL', 'ELSEVE', 'ULTRA DOUX', 'KIM', 'DERCOS', 'PANTENE',
    'HEAD & SHOULDERS', 'DOVE', 'GARNIER', 'HABAL ESSENCE', 'CLEAR',
    'KÉRASTASE', "L'ORÉAL PARIS", 'TRESEMMÉ', 'AUSSIE', 'AVEENO', 'BATISTE',
    'AVEDA', 'AVON', 'RAHUA', 'MACADAMIA', 'LORÉAL', 'REDONE',
    'PALMERS', 'AGONIST', 'ROSE BAIE', 'ALEA', 'CRIOXIDIL', 'BALIRENE',
    'ORGANIC', 'TOP CARE', 'Ô LONDON', 'JOHNSON', 'DB DEODARANT', 'NIVEA',
    'REXONA', 'TULIPANE', 'FOREA', 'BALEA', 'AXE', "L'ORÉAL",
  ],
  'Appareils Électriques': [
    'BABYLISS PARIS', 'BABYLISS PRO', 'BRAUN', 'PHILIPS', 'WAHL PROFESSIONAL', 'IVANO', 'KEIMI',
  ],
}

// Fallback for categories with no specific brand list
export const ALL_BRANDS = Array.from(
  new Set(Object.values(BRANDS_BY_CATEGORY).flat())
).sort()