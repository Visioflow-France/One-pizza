import type { Metadata } from 'next';
import { FloatingNav } from '@/components/FloatingNav';
import { History } from '@/components/History';
import { Footer } from '@/components/Footer';
import { absoluteUrl } from '@/lib/site';

// ── SEO : ancrage sémantique « fast food / restauration rapide » via
// l'histoire de la street-food, reliée au snack d'aujourd'hui à Torcy.
export const metadata: Metadata = {
  title: "L'Histoire du Fast Food et de la Street Food",
  description:
    "Des siècles d'histoire de la pizza, des galettes de Pompéi à la Margherita de Naples — et le savoir-faire feu de bois de la pizzeria One Pizza à Saint-Denis (93200).",
  alternates: {
    canonical: '/histoire',
  },
  openGraph: {
    title: "L'Histoire de la Pizza — One Pizza Saint-Denis",
    description:
      "De Naples à Saint-Denis : l'histoire de la pizza et du feu de bois, racontée par One Pizza Saint-Denis.",
    url: absoluteUrl('/histoire'),
  },
};

export default function HistoirePage() {
  return (
    <>
      <FloatingNav />
      <main>
        <History />
      </main>
      <Footer />
    </>
  );
}
