import type { Metadata } from 'next';
import { FloatingNav } from '@/components/FloatingNav';
import { Menu } from '@/components/Menu';
import { Footer } from '@/components/Footer';
import { getMenu } from '@/lib/menuDoc';
import { breadcrumbJsonLd, menuJsonLd } from '@/lib/schema';
import { absoluteUrl } from '@/lib/site';

// ── SEO local : « carte pizza », « menu pizzeria », « pizza Saint-Denis » + prix.
export const metadata: Metadata = {
  title: 'Carte & Menus du Snack',
  description:
    "La carte complète de la pizzeria One Pizza à Saint-Denis (93200) : pizzas classiques et signatures cuites au feu de bois, calzones, desserts maison et boissons. Pizza halale à emporter ou en livraison.",
  alternates: {
    canonical: '/carte',
  },
  openGraph: {
    title: "Carte de la pizzeria One Pizza — pizzas au feu de bois à Saint-Denis",
    description:
      "Découvrez toute la carte de la pizzeria One Pizza Saint-Denis : pizzas classiques et signatures au feu de bois, calzones, desserts maison. À emporter ou en livraison.",
    url: absoluteUrl('/carte'),
  },
};

// ISR : la page (et donc la lecture Firestore) est revalidée toutes les 5 min.
export const revalidate = 300; // = MENU_REVALIDATE_SECONDS (littéral requis)

export default async function CartePage() {
  const products = await getMenu();

  // Données structurées : carte (Menu + sections + prix) et fil d'Ariane.
  const menuSchema = menuJsonLd();
  const breadcrumb = breadcrumbJsonLd([
    { name: 'La Carte', path: '/carte' },
  ]);

  return (
    <>
      {/* JSON-LD rendus dans le flux de la page (lus par Google, corps ou
          <head> indifféremment — pas de <head> manuel en App Router). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <FloatingNav />
      <main>
        {/* Menu servi par le cache ISR : plus aucun fetch client de rattrapage. */}
        <Menu initialProducts={products} />
      </main>
      <Footer />
    </>
  );
}
