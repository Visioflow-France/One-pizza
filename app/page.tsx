import type { Metadata } from 'next';
import { FloatingNav } from '@/components/FloatingNav';
import { Hero } from '@/components/Hero';
import { CategoryGrid } from '@/components/CategoryGrid';
import { LocalSeo } from '@/components/LocalSeo';
import { Footer } from '@/components/Footer';
import { getMenu } from '@/lib/menuDoc';
import { absoluteUrl } from '@/lib/site';

// La page d'accueil suit la structure demandée :
//  1. Hero plein écran (identité O'Snack) — H1 unique avec mots-clés locaux
//  2. Grille des catégories de la carte (gabarit osnackparis.fr : toutes
//     les bulles visibles d'un coup, bouton « Découvrir » vers la section
//     associée de la carte)
//  3. Bannière fidélité (gabarit du bloc « offres exclusives » BK) :
//     points cumulés à chaque commande + compte client
//  4. Section contenu local SEO (H2/H3 : carte, horaires, livraison,
//     localisation — cocon sémantique Torcy)
//  5. Mentions légales & contact (footer)
//
// ISR : le menu vient du document unique (cache serveur 5 min) — 0 lecture
// Firestore côté client.
export const revalidate = 300;

// ── SEO local : requêtes cibles « snack Torcy », « fast food Torcy »,
// « restauration rapide Torcy » placées en tête de title et description.
export const metadata: Metadata = {
  title: {
    absolute: 'Pizza Saint-Denis — Pizzeria Halal au Feu de Bois 93200 | One Pizza',
  },
  description:
    'Pizzeria halal à Saint-Denis : One Pizza, vos pizzas cuites au feu de bois au 10 Rue Clovis Hugues (93200). Pizzas classiques et signatures, calzones, desserts et boissons à emporter ou en livraison — ouvert 7j/7.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Pizza Saint-Denis — Pizzeria Halal au Feu de Bois | One Pizza',
    description:
      'La pizzeria de Saint-Denis (93200) : pizzas au feu de bois, calzones, desserts maison. À emporter, sur place ou en livraison Uber Eats, 7j/7.',
    url: absoluteUrl('/'),
    type: 'website',
  },
};

export default async function Home() {
  const products = await getMenu();
  return (
    <>
      <FloatingNav />
      <main>
        <Hero />
        <CategoryGrid />
        <LocalSeo />
      </main>
      <Footer />
    </>
  );
}
