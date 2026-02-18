export type MenuSection = {
  title: string
  items: string[]
}

export const megaMenuData: Record<string, MenuSection[]> = {
  '/parfums': [
    { title: 'Parfum Femme', items: ['Eau de Toilette', 'Eau de Parfum', 'Le Parfum'] },
    { title: 'Parfum Homme', items: ['Eau de Toilette', 'Eau de Parfum', 'Le Parfum'] },
    { title: 'Parfum Arabe', items: [] },
    { title: 'Les Coffrets', items: ['Femme', 'Homme'] },
  ],
  '/maquillage': [
    {
      title: 'Teint',
      items: ['Base de teint et Fixateur', 'Fond de teint', 'Anti cernes et Correcteurs', 'Poudre', 'BB Crème', 'Fard à Joue', 'Highlighter', 'Contouring'],
    },
    {
      title: 'Yeux',
      items: ['Mascara', 'Eyeliner', 'Crayon yeux et Khôl', 'Fard à Paupières & Base à Paupières', 'Faux Cils'],
    },
    {
      title: 'Sourcils',
      items: ['Crayon Sourcils', 'Gel et Mascara Sourcils', 'Kits Sourcils', 'Poudre Sourcils'],
    },
    {
      title: 'Lèvres',
      items: ['Rouge à Lèvres', 'Gloss', 'Crayon à Lèvres', 'Baume à Lèvres & Repulpeur'],
    },
    {
      title: 'Ongles',
      items: ['Vernis à ongle', 'Nail Art', 'Soin des Ongles', 'Top & Base Coat', 'Accessoires Ongles'],
    },
    {
      title: 'Palette Maquillage',
      items: ['Palette Highlighter', 'Palette Contouring', 'Palette Fard à Paupières', 'Palette Sourcils'],
    },
    {
      title: 'Pinceau & Accessoires',
      items: ['Beauty Blender', 'Pinceau Teint', 'Pinceau Yeux & Sourcils', 'Kit Pinceaux', 'Trousse', 'Accessoires'],
    },
  ],
  '/cheveux': [
    {
      title: 'Soins Cheveux',
      items: ['Shampoing', 'Shampoing sans sulfate', 'Shampoing sec', 'Après shampoing', 'Masque Cheveux', 'Serum Cheveux', 'Huile cheveux', 'Soin sans rinçage', 'Spray Cheveux'],
    },
    {
      title: 'Type de Cheveux',
      items: ['Cheveux Sec & Très Sec', 'Cheveux Abîmés', 'Cheveux Gras', 'Cheveux Colorés', 'Cheveux à Pellicules', 'Cheveux Bouclés', 'Cheveux Fins', 'Cheveux blonds et éclaircis'],
    },
    {
      title: 'Coloration',
      items: ['Excellence', 'Garnier', 'Wella Koleston', 'Wella Kadus', 'Igora royal', 'Gen us', 'Majirel', 'Magic Retouch'],
    },
    {
      title: 'Coloration sans ammoniaque',
      items: ['Casting', 'Inoa', 'Olia'],
    },
  ],
  '/soin-visage': [
    {
      title: 'Type de Soin',
      items: ['Crème de jour', 'Crème de nuit', 'Masque et Gommage', 'Sérum', 'Contour Des Yeux', 'Baume à Lèvres'],
    },
    {
      title: 'Nettoyant & Démaquillant',
      items: ['Eau Micellaire', 'Lait Démaquillant', 'Gel Nettoyant et Mousse', 'Huile Démaquillante', 'Démaquillant Yeux', 'Lotion Tonique', 'Accessoires Démaquillage'],
    },
    {
      title: 'Type de Peau',
      items: ['Soin peau normal ou mixte', 'Soin peau grasse', 'Soin peau sèche', 'Soin peau sensible', 'Soin peau anti-imperfection', 'Soin peau mature', 'Tous types de peau'],
    },
    {
      title: 'Soin Anti-Âge',
      items: ['Soin anti-rides', 'Soin anti-tâches', 'Soin anti-âge'],
    },
  ],
  '/corps-douche': [
    {
      title: 'Soin du Corps',
      items: ['Spray & Brume', 'Lait Hydratant', 'Crème Mains', 'Soin des Pieds & Jambes', 'Déodorant', 'Huile & Soin Réparateur'],
    },
    {
      title: 'Bain & Douche',
      items: ['Crème de Douche', 'Gel de Douche', 'Hygiène intime', 'Savon', 'Dentifrice', 'Accessoire Bain'],
    },
    {
      title: 'Bébé',
      items: ['Change (Crème-Talc-Liniment)', 'Lingettes', 'Bain et Toilette Bébé', 'Eau de Toilette Bébé', 'Soin Corps Bébé', 'Cheveux et Cuir Chevelu Bébé'],
    },
    {
      title: 'Épilation',
      items: ['Rasoir', 'Crème Dépilatoire', 'Cire Froide', 'Cire Cartouche', 'Cire Wax', 'Cire Pot', 'Bandes de Cire', 'Huile Post Épilation', 'Épilateur Électrique', 'Appareil Cartouche', 'Appareil Wax'],
    },
  ],
  '/appareils': [
    {
      title: 'Type de Produit',
      items: ['Brosses Soufflantes', 'Lisseur', 'Fer a boucler', 'Sèche cheveux'],
    },
  ],
}