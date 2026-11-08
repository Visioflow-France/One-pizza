export type Category =
  | 'classiques'
  | 'signatures'
  | 'calzones'
  | 'desserts'
  | 'boissons'
  | 'menus';

export interface Product {
  id: string;
  name: string;
  desc: string;
  /** Base price in EUR (price "seul"). */
  price: number;
  /** Optional promotional price. When set, the base price is shown struck-through. */
  promoPrice?: number | null;
  /** Optional "menu" (combo) price in EUR. Shown alongside the base price. */
  priceMenu?: number | null;
  image: string;
  category: Category;
  tag?: string;
  /** Small muted line rendered under the description (e.g. "Accompagné de sauce maison"). */
  note?: string;
  /** Soft toggle: when false the dish is hidden from the public menu (not deleted). */
  available?: boolean;
  /** Soft toggle: when true the dish is promoted as a "Best Seller" on the vitrine. */
  bestseller?: boolean;
  /** Soft toggle: when true the dish wears a "Nouveau" badge and feeds the Nouveautés entry. */
  isNew?: boolean;
  /** Sort order (lower first). */
  order?: number;
}

export const CATEGORY_LABELS: Record<Category | 'all', string> = {
  all: 'Accueil', // vue par défaut de la carte : aucune catégorie pré-sélectionnée
  classiques: 'Pizzas Classiques',
  signatures: 'Pizzas Signatures',
  calzones: 'Calzones',
  desserts: 'Desserts',
  boissons: 'Boissons',
  menus: 'Menus',
};

export const CATEGORIES: (Category | 'all')[] = [
  'all',
  'classiques',
  'signatures',
  'calzones',
  'desserts',
  'boissons',
  'menus',
];

/**
 * Filtres « virtuels » de la barre de la carte : nouveautés (`isNew`), bons
 * plans (promos + formules), pizzas végétariennes (tag du produit) et
 * regroupement desserts & boissons. Ils ne sont pas des `Category` (le
 * stockage Firestore ne change pas), ce sont des vues supplémentaires
 * proposées au client.
 */
export type SpecialFilter =
  | 'nouveautes'
  | 'bons-plans'
  | 'vegetariennes'
  | 'desserts-boissons';

/** Tout ce que la barre de filtres de la carte peut afficher. */
export type Filter = Category | 'all' | SpecialFilter;

export const FILTER_LABELS: Record<Filter, string> = {
  ...CATEGORY_LABELS,
  nouveautes: 'Nouveautés',
  'bons-plans': 'Bons Plans',
  vegetariennes: 'Végétariennes',
  'desserts-boissons': 'Desserts & Boissons',
};

/**
 * Ordre d'affichage des entrées de la carte. « Accueil » (`all`) en premier :
 * vue par défaut, sans catégorie pré-sélectionnée — elle montre les grosses
 * tuiles, pas de plats. Puis les vues « merchandising » (nouveautés, bons
 * plans) et les familles. « Accueil » n'apparaît que dans la rangée de noms,
 * pas parmi les tuiles.
 */
export const MENU_FILTERS: Filter[] = [
  'all',
  'nouveautes',
  'bons-plans',
  'classiques',
  'signatures',
  'vegetariennes',
  'calzones',
  'desserts-boissons',
];

/**
 * Sous-catégories d'une catégorie « parente » : affichées en pastilles sous
 * le titre quand la catégorie est active. Les catégories absentes de cette
 * table mènent directement à leurs plats.
 */
export const FILTER_CHILDREN: Partial<Record<Filter, Filter[]>> = {
  'desserts-boissons': ['desserts', 'boissons'],
};

/** Une pizza est « végétarienne » selon son tag (« Végétarienne »). */
const isVegetarian = (p: Product): boolean => /végétar|vegetar/i.test(p.tag ?? '');

/** Le produit appartient-il au filtre donné ? */
export const matchesFilter = (p: Product, filter: Filter): boolean => {
  if (filter === 'all') return true;
  if (filter === 'nouveautes') return p.isNew === true;
  if (filter === 'bons-plans') return hasPromo(p);
  if (filter === 'vegetariennes') return isVegetarian(p);
  if (filter === 'desserts-boissons')
    return p.category === 'desserts' || p.category === 'boissons';
  return p.category === filter;
};

export const countByFilter = (filter: Filter, list: Product[] = MENU): number =>
  list.filter((p) => matchesFilter(p, filter)).length;

/** Valide une valeur `?cat=` reçue dans l'URL (liens « Découvrir » de l'accueil). */
export const isFilter = (value: string | null): value is Filter =>
  value != null && value in FILTER_LABELS;

/**
 * One-line context shown above the grid when a specific category is selected
 * (dough options, supplements, shared preparation notes…). Avoids repeating
 * the same info on every card.
 */
export const CATEGORY_NOTES: Partial<Record<Category, string>> = {
  classiques:
    'Pâte fraîche maison cuite au feu de bois. Suppléments : Fromage 1,00 € · Chorizo halal 1,50 € · Poulet grillé 1,50 € · Viande hachée halal 1,50 € · Olives 0,80 € · Œuf 0,80 €.',
  signatures:
    'Nos recettes maison, généreusement garnies — pâte fraîche cuite au feu de bois.',
  calzones:
    'Pâte fraîche pliée et cuite au feu de bois, servie avec sa sauce tomate maison.',
  desserts: 'Desserts maison et glaces artisanales.',
  boissons: 'Boissons fraîches et limonades. Supplément sirop : +0,50 €.',
};

/** Notes affichées au-dessus de la grille pour chaque filtre de la barre. */
export const FILTER_NOTES: Partial<Record<Filter, string>> = {
  ...CATEGORY_NOTES,
  all: 'Pizzas classiques et signatures cuites au feu de bois, calzones, desserts maison et boissons fraîches — choisissez une catégorie pour découvrir la carte. Chaque pizza se commande seule ou en formule (boisson incluse).',
  nouveautes: 'Les dernières recettes arrivées chez One Pizza — fraîchement sorties du feu de bois.',
  'bons-plans': 'Promos du moment et formules complètes à prix doux.',
  vegetariennes: 'Toutes nos pizzas sans viande — légumes, fromages et basilic frais.',
  'desserts-boissons':
    'Desserts maison, glaces, boissons fraîches et limonades. Supplément sirop : +0,50 €.',
};

/** True when a promotional price is set and lower than the base price. */
export const hasPromo = (p: Product): boolean =>
  p.promoPrice != null && p.promoPrice > 0 && p.promoPrice < p.price;

/** The price the customer actually pays (promo wins over base). */
export const effectivePrice = (p: Product): number =>
  hasPromo(p) ? (p.promoPrice as number) : p.price;

/** True when a "menu" combo price is set. */
export const hasMenuPrice = (p: Product): boolean =>
  p.priceMenu != null && p.priceMenu > 0;

/** Integer percent off, e.g. 18 for "-18 %". Returns 0 when there is no promo. */
export const promoPercent = (p: Product): number =>
  hasPromo(p) ? Math.round((1 - (p.promoPrice as number) / p.price) * 100) : 0;

/** Whether the dish should be shown to customers. */
export const isAvailable = (p: Product): boolean => p.available !== false;

/**
 * Whether the dish is listed on the public carte. Les formules (« menus »)
 * ne sont pas une catégorie de la carte : chaque plat propose le choix
 * Seul / Menu dans sa bulle de configuration (ItemConfigurator). Les
 * produits de la catégorie `menus` restent en base (éditables dans
 * l'admin) mais n'apparaissent plus sur le site public.
 */
export const isPubliclyListed = (p: Product): boolean =>
  isAvailable(p) && p.category !== 'menus';

/** Whether the dish is flagged as a Best Seller on the vitrine. */
export const isBestSeller = (p: Product): boolean => p.bestseller === true;

/**
 * Stable ids used as Best-Seller fallback. Guarantees the vitrine always shows
 * 3 highlights even before the admin toggles anything, or when the live
 * Firestore data does not yet carry the `bestseller` field.
 */
export const BEST_SELLER_FALLBACK_IDS = ['one-pizza', 'margherita', 'reine'];

/**
 * Pick the Best Sellers to feature on the vitrine.
 * Priority: available items flagged `bestseller === true` (sorted by `order`),
 * then the fallback ids if present, then any remaining item by `order`.
 * The admin can override at any time by toggling `bestseller`.
 */
export const selectBestSellers = (list: Product[], count = 3): Product[] => {
  const byOrder = (a: Product, b: Product) =>
    (a.order ?? 9999) - (b.order ?? 9999) || a.name.localeCompare(b.name, 'fr');

  const flagged = list
    .filter((p) => isPubliclyListed(p) && isBestSeller(p))
    .sort(byOrder);
  if (flagged.length >= count) return flagged.slice(0, count);

  const chosen = new Set(flagged.map((p) => p.id));
  const pool = list.filter((p) => isPubliclyListed(p) && !chosen.has(p.id));

  // Top up with the canonical fallback ids when available.
  const byId = new Map(pool.map((p) => [p.id, p] as const));
  const merged = [...flagged];
  for (const id of BEST_SELLER_FALLBACK_IDS) {
    if (merged.length >= count) break;
    const item = byId.get(id);
    if (item) {
      merged.push(item);
      chosen.add(item.id);
    }
  }

  // Last resort: fill with whatever is available, by order.
  if (merged.length < count) {
    for (const item of pool.filter((p) => !chosen.has(p.id)).sort(byOrder)) {
      if (merged.length >= count) break;
      merged.push(item);
    }
  }

  return merged.slice(0, count);
};

const img = (id: string): string =>
  `https://images.unsplash.com/photo-${id}?w=800&auto=format&fit=crop&q=80`;

// Verified Unsplash photo ids, grouped by what they depict.
const IMG = {
  pizza1: img('1574071318508-1cdbab80d002'),
  pizza2: img('1571997478779-2adcbbe9ab2f'),
  pizza3: img('1595854341625-f33ee10dbf94'),
  pizza4: img('1513104890138-7c749659a591'),
  pizza5: img('1565299624946-b28f40a0ae38'),
  pizza6: img('1590947132387-155cc02f3212'),
  pizza7: img('1604382354936-07c5d9983bd3'),
  pizza8: img('1548369937-47519963cabb'),
  pizza9: img('1593560708920-61dd98c46a4e'),
  pizza10: img('1628840042765-356cda07504e'),
  pizza11: img('1571407970349-bc81e7e96d47'),
  fondant: img('1606313564200-e75d5e30476c'),
  cookie: img('1499636136210-6f4ee915583e'),
  tiramisu: img('1565958011703-44f9829ba187'),
  icecream: img('1488477181946-6428a0291777'),
  coca: img('1622483767028-3f66f32aef97'),
  water: img('1548839140-29a749e1cf40'),
  lemonade: img('1438638531655-25cb4c1f0d3e'),
};

export const MENU: Product[] = [
  // ------------------------- Pizzas classiques -------------------------
  {
    id: 'margherita',
    name: 'Margherita',
    desc: 'Sauce tomate, mozzarella fiordilatte, basilic frais.',
    price: 8.0,
    priceMenu: 10.5,
    image: IMG.pizza1,
    category: 'classiques',
    tag: 'Végétarienne',
    bestseller: true,
    order: 11,
  },
  {
    id: 'reine',
    name: 'Reine',
    desc: 'Sauce tomate, mozzarella, champignons, jambon halal.',
    price: 9.5,
    priceMenu: 12.0,
    image: IMG.pizza7,
    category: 'classiques',
    bestseller: true,
    order: 12,
  },
  {
    id: 'quatre-fromages',
    name: 'Quatre Fromages',
    desc: 'Mozzarella, emmental, chèvre, gorgonzola, miel.',
    price: 10.5,
    priceMenu: 13.0,
    image: IMG.pizza3,
    category: 'classiques',
    tag: 'Végétarienne',
    order: 13,
  },
  {
    id: 'chorizo',
    name: 'Chorizo Halal',
    desc: 'Sauce tomate, mozzarella, chorizo halal, poivrons.',
    price: 10.5,
    priceMenu: 13.0,
    image: IMG.pizza10,
    category: 'classiques',
    tag: 'Épicée',
    order: 14,
  },
  {
    id: 'orientale',
    name: 'Orientale',
    desc: 'Sauce tomate, mozzarella, merguez halal, oignons, poivrons.',
    price: 11.0,
    priceMenu: 13.5,
    image: IMG.pizza5,
    category: 'classiques',
    order: 15,
  },
  {
    id: 'poulet-grille',
    name: 'Poulet Grillé',
    desc: 'Sauce tomate, mozzarella, poulet grillé, poivrons grillés.',
    price: 10.5,
    priceMenu: 13.0,
    image: IMG.pizza6,
    category: 'classiques',
    order: 16,
  },
  {
    id: 'thon',
    name: 'Thon',
    desc: 'Sauce tomate, mozzarella, thon, olives noires, oignons.',
    price: 10.5,
    priceMenu: 13.0,
    image: IMG.pizza8,
    category: 'classiques',
    order: 17,
  },
  {
    id: 'veggie',
    name: 'Végétarienne',
    desc: 'Sauce tomate, mozzarella, légumes grillés, olives, basilic.',
    price: 9.5,
    priceMenu: 12.0,
    image: IMG.pizza8,
    category: 'classiques',
    tag: 'Végétarienne',
    order: 18,
  },
  // ------------------------- Pizzas signatures -------------------------
  {
    id: 'one-pizza',
    name: 'La One Pizza',
    desc: 'Crème, mozzarella, poulet grillé, chorizo halal, poivrons, olives.',
    price: 13.9,
    promoPrice: 11.9,
    priceMenu: 16.5,
    image: IMG.pizza2,
    category: 'signatures',
    tag: 'Signature',
    bestseller: true,
    isNew: true,
    order: 21,
  },
  {
    id: 'truffade',
    name: 'Truffade',
    desc: 'Crème, pommes de terre, reblochon, lardons de dinde fumés.',
    price: 12.9,
    priceMenu: 15.5,
    image: IMG.pizza4,
    category: 'signatures',
    tag: 'Signature',
    order: 22,
  },
  {
    id: 'cheddar-burger',
    name: 'Cheddar Burger',
    desc: 'Sauce tomate, viande hachée halal, cheddar, oignons, sauce burger.',
    price: 12.5,
    priceMenu: 15.0,
    image: IMG.pizza9,
    category: 'signatures',
    tag: 'Signature',
    order: 23,
  },
  {
    id: 'bbq-chicken',
    name: 'BBQ Chicken',
    desc: 'Crème BBQ, poulet grillé, mozzarella, oignons rouges, maïs.',
    price: 12.5,
    priceMenu: 15.0,
    image: IMG.pizza6,
    category: 'signatures',
    tag: 'Signature',
    isNew: true,
    order: 24,
  },
  {
    id: 'kebab',
    name: 'Kebab',
    desc: 'Crème, mozzarella, viande kebab halal, oignons rouges, tomates.',
    price: 11.9,
    priceMenu: 14.5,
    image: IMG.pizza10,
    category: 'signatures',
    order: 25,
  },
  {
    id: 'buffalo',
    name: 'Buffalo',
    desc: 'Crème, poulet pané sauce buffalo, mozzarella, oignons.',
    price: 12.5,
    priceMenu: 15.0,
    image: IMG.pizza2,
    category: 'signatures',
    tag: 'Épicée',
    isNew: true,
    order: 26,
  },
  {
    id: 'tartiflette',
    name: 'Tartiflette',
    desc: 'Crème, pommes de terre, reblochon, lardons de dinde, oignons.',
    price: 12.9,
    priceMenu: 15.5,
    image: IMG.pizza4,
    category: 'signatures',
    order: 27,
  },
  {
    id: 'pepperoni-love',
    name: 'Pepperoni Love',
    desc: 'Sauce tomate, double pepperoni halal, mozzarella, origan.',
    price: 11.9,
    priceMenu: 14.5,
    image: IMG.pizza5,
    category: 'signatures',
    tag: 'Signature',
    order: 28,
  },
  // ---------------------------- Calzones ----------------------------
  {
    id: 'calzone-classique',
    name: 'Calzone Classique',
    desc: 'Jambon halal, champignons, mozzarella, sauce tomate maison.',
    price: 9.9,
    priceMenu: 12.5,
    image: IMG.pizza11,
    category: 'calzones',
    order: 31,
  },
  {
    id: 'calzone-chevre',
    name: 'Calzone Chèvre-Miel',
    desc: 'Chèvre, mozzarella, miel, noix — sauce tomate maison.',
    price: 10.9,
    priceMenu: 13.5,
    image: IMG.pizza3,
    category: 'calzones',
    tag: 'Végétarienne',
    order: 32,
  },
  {
    id: 'calzone-poulet',
    name: 'Calzone Poulet',
    desc: 'Poulet grillé, poivrons, mozzarella, sauce tomate maison.',
    price: 11.5,
    priceMenu: 14.0,
    image: IMG.pizza7,
    category: 'calzones',
    order: 33,
  },
  // ---------------------------- Desserts ----------------------------
  {
    id: 'd-tiramisu',
    name: 'Tiramisu Maison',
    desc: 'Mascarpone, café, cacao — la recette italienne.',
    price: 4.5,
    image: IMG.tiramisu,
    category: 'desserts',
    order: 51,
  },
  {
    id: 'd-fondant',
    name: 'Fondant Chocolat',
    desc: 'Cœur coulant au chocolat noir, servi tiède.',
    price: 4.0,
    image: IMG.fondant,
    category: 'desserts',
    order: 52,
  },
  {
    id: 'd-cookie',
    name: 'Cookie Maison',
    desc: 'Pépites de chocolat, cœur moelleux.',
    price: 2.5,
    image: IMG.cookie,
    category: 'desserts',
    order: 53,
  },
  {
    id: 'd-glace',
    name: 'Glace 2 Boules',
    desc: 'Parfums au choix, chantilly maison.',
    price: 3.5,
    image: IMG.icecream,
    category: 'desserts',
    order: 54,
  },
  // ---------------------------- Boissons ----------------------------
  {
    id: 'boisson-33',
    name: 'Soda 33 cl',
    desc: 'Canette fraîche au choix.',
    price: 2.0,
    image: IMG.coca,
    category: 'boissons',
    order: 61,
  },
  {
    id: 'boisson-2l',
    name: 'Soda 2 L',
    desc: 'Bouteille familiale au choix.',
    price: 4.0,
    image: IMG.coca,
    category: 'boissons',
    order: 62,
  },
  {
    id: 'eau-50',
    name: 'Eau 50 cl',
    desc: 'Eau plate ou gazeuse.',
    price: 1.5,
    image: IMG.water,
    category: 'boissons',
    order: 63,
  },
  {
    id: 'citronnade',
    name: 'Citronnade Maison',
    desc: 'Citron pressé, menthe fraîche, glace pilée.',
    price: 3.5,
    image: IMG.lemonade,
    category: 'boissons',
    order: 64,
  },
  // ------------------- Formules (hors carte publique) -------------------
  {
    id: 'menu-enfant',
    name: 'Menu Enfant',
    desc: 'Pizza ou mini calzone + boisson 33 cl + dessert.',
    price: 6.9,
    image: IMG.pizza1,
    category: 'menus',
    order: 71,
  },
  {
    id: 'menu-duo',
    name: 'Menu Duo',
    desc: '2 pizzas classiques + 2 boissons 33 cl.',
    price: 24.9,
    image: IMG.pizza4,
    category: 'menus',
    order: 72,
  },
];

// NOTE : pour compter les plats d'un filtre de la barre de la carte (y compris
// les filtres virtuels), utiliser `countByFilter`.
