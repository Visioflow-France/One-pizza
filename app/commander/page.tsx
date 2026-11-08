import type { Metadata } from 'next';
import { FloatingNav } from '@/components/FloatingNav';
import { Footer } from '@/components/Footer';
import { CheckoutApp } from '@/components/checkout/CheckoutApp';
import { absoluteUrl } from '@/lib/site';

// ── SEO local : commande pizza en ligne, retrait, livraison Saint-Denis.
export const metadata: Metadata = {
  title: 'Commander en Ligne — Retrait ou Livraison',
  description:
    "Commandez en ligne chez One Pizza, pizzeria halale à Saint-Denis (93200) : pizzas au feu de bois et calzones préparées minute. Paiement au retrait (espèces ou carte), retrait dès 20 min ou livraison à Saint-Denis.",
  alternates: {
    canonical: '/commander',
  },
  openGraph: {
    title: "Commander une pizza en ligne — One Pizza Saint-Denis, paiement au retrait",
    description:
      "Commande de pizza en ligne chez One Pizza Saint-Denis : retrait dès 20 min ou livraison. Paiement en espèces ou par carte au retrait.",
    url: absoluteUrl('/commander'),
  },
};

export default function CommanderPage() {
  return (
    <>
      <FloatingNav />
      <main>
        <CheckoutApp />
      </main>
      <Footer />
    </>
  );
}
