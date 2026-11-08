// Liens externes centralisés du restaurant One Pizza Saint-Denis.
// Modifier ici pour mettre à jour tous les boutons du site en un seul endroit.
export const LINKS = {
  address: '10 Rue Clovis Hugues, 93200 Saint-Denis',
  addressQuery: 'https://maps.google.com/?q=10+Rue+Clovis+Hugues+93200+Saint-Denis',
  // Intégration Google Maps sans clé API (paramètre output=embed)
  mapsEmbed:
    'https://maps.google.com/maps?q=10%20Rue%20Clovis%20Hugues%2C%2093200%20Saint-Denis&z=15&output=embed',
  phone: '01 48 21 06 64',
  phoneHref: 'tel:0148210664',

  // Plateformes de commande
  uberEats: 'https://www.ubereats.com/fr/store/one-pizza/yZ0ZJsnTS4aDgmLTarCSag',
  // ⚠️ À confirmer : page Deliveroo exacte. Recherche utilisée en attendant.
  deliveroo: 'https://deliveroo.fr/fr/search?q=One%20Pizza%20Saint-Denis',

  // Réseaux sociaux
  instagram: 'https://www.instagram.com/onepizza93/',
  facebook: 'https://www.facebook.com/onepizza.fr/',
  // ⚠️ À confirmer : compte TikTok exact. Recherche utilisée en attendant.
  tiktok: 'https://www.tiktok.com/search?q=One%20Pizza%20Saint-Denis',
  // ⚠️ À confirmer : compte Snapchat exact. Recherche utilisée en attendant.
  snapchat: 'https://www.snapchat.com/explore/One%20Pizza%20Saint-Denis',
} as const;
