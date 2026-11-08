/**
 * ── Configuration SEO centrale du site One Pizza Saint-Denis ─────────────────────────
 *
 * ⚠️ DOMAINE : le nom de domaine définitif n'est pas encore connu.
 * Le placeholder ci-dessous est utilisé dans TOUT le site (canonical, Open
 * Graph, JSON-LD, sitemap, robots). Pour le remplacer, DEUX options :
 *   1. Définir la variable d'environnement NEXT_PUBLIC_SITE_URL (recommandé,
 *      aucun changement de code au déploiement) ;
 *   2. Modifier la valeur de SITE_URL ci-dessous.
 * Toutes les URLs absolues du site sont construites via `absoluteUrl()`.
 */

/** Domaine placeholder — à remplacer par le domaine définitif. */
const SITE_URL_PLACEHOLDER = 'https://example.fr';

/** URL canonique du site (sans slash final). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') ??
  SITE_URL_PLACEHOLDER;

/** Construit une URL absolue à partir d'un chemin interne ("/carte"…). */
export const absoluteUrl = (path = '/'): string =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

/** Informations d'identité locale (NAP : Name, Address, Phone). */
export const BUSINESS = {
  name: 'One Pizza',
  alternateName: 'One Pizza Saint-Denis',
  legalName: 'One Pizza',
  /** ⚠️ Vérifier les coordonnées GPS exactes sur Google Maps (clic droit sur
   * l'établissement → coordonnées) et ajuster GEO ci-dessous. */
  streetAddress: '10 Rue Clovis Hugues',
  postalCode: '93200',
  city: 'Saint-Denis',
  region: 'Île-de-France',
  country: 'FR',
  phone: '01 48 21 06 64',
  phoneInternational: '+33148210664',
} as const;

/** Géolocalisation du restaurant (à affiner si besoin — voir BUSINESS). */
export const GEO = {
  latitude: 48.9405,
  longitude: 2.3615,
} as const;

/** Mots-clés locaux ciblés (title, description, contenu, JSON-LD). */
export const SEO_KEYWORDS = [
  'pizza Saint-Denis',
  'pizzeria Saint-Denis',
  'pizza 93200',
  'pizzeria 93200',
  'pizza halal Saint-Denis',
  'pizza feu de bois Saint-Denis',
  'livraison pizza Saint-Denis',
  'pizza à emporter Saint-Denis',
  'fast food Saint-Denis',
  'restauration rapide Saint-Denis',
  'calzone Saint-Denis',
  'pizza basilique Saint-Denis',
  'One Pizza',
  'One Pizza Saint-Denis',
];

/** Zones desservies (livraison Uber Eats / Deliveroo, alentours de Torcy). */
export const SERVICE_AREAS = [
  'Saint-Denis',
  'Aubervilliers',
  'La Courneuve',
  'Stains',
  'Pierrefitte-sur-Seine',
  "L'Île-Saint-Denis",
  'Villetaneuse',
  'Épinay-sur-Seine',
  'Gennevilliers',
];

/**
 * Horaires d'ouverture au format Schema.org (source : lib/opening.ts,
 * SERVICE_RANGES — 11h30–14h30 et 18h00–23h00, 7 j/7).
 */
export const OPENING_HOURS_SCHEMA = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '11:30',
    closes: '14:30',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '18:00',
    closes: '23:00',
  },
];

/** Liste des pages publiques indexables (utilisée par le sitemap). */
export const SITEMAP_PAGES: { path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/carte', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/commander', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/histoire', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/mentions-legales', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/cgv', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/confidentialite', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/cookies', priority: 0.2, changeFrequency: 'yearly' },
];
