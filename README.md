# One Pizza — Site vitrine 🍕

Maquette frontend complète du site **One Pizza**, pizzeria halal cuite au feu
de bois située **10 Rue Clovis Hugues, 93200 Saint-Denis** (Île-de-France).

L'interface (nav bar flottante, hero plein écran, carrousel de catégories,
carte interactive, tunnel de commande) fonctionne **sans aucun backend** : le
menu est servi depuis les données statiques embarquées (`lib/menu.ts` /
`public/menu.json`).

## Lancer le site en local

```bash
npm install
npm run dev
```

Puis ouvrir **http://localhost:3000**.

## Contenu

- **Accueil** : hero pizza au feu de bois, grille des catégories, section locale
- **Carte** (`/carte`) : 29 produits — pizzas classiques, pizzas signatures,
  calzones, desserts, boissons — avec filtres et configurateur d'article
  (pâte fine/épaisse, suppléments, formule avec boisson)
- **Commander** (`/commander`) : panier, choix du créneau de retrait,
  confirmation de commande (paiement au comptoir)
- **Histoire** (`/histoire`) : l'histoire de la pizza, de Pompéi à Saint-Denis
- **Pages légales** : mentions légales, CGV, confidentialité, cookies

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- GSAP + Lenis (animations, scroll fluide) · Three.js (particules)
- Aucune base de données requise (mode statique intégré)

## Couleurs de la marque

| Usage | Couleur |
| --- | --- |
| Vert italien (fonds) | `#07120B` → `#0E1D14` |
| Rouge tomate (CTA) | `#D6362B` |
| Blanc crème (texte) | `#F3EFE4` |

---

Maquette réalisée pour présentation client — coordonnées issues des
informations publiques de l'établissement.
