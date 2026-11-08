import { collection, doc, onSnapshot, query, setDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import type { Filter } from './menu';

/** Firestore collection des slides du carrousel de catégories (accueil). */
export const SLIDES_COLLECTION = 'home_slides';

export interface CategorySlide {
  /**
   * Clé stable du slide = filtre de la carte visé par le bouton « Découvrir »
   * (ex. `crepes-salees` → `/carte?cat=crepes-salees`). Non modifiable :
   * c'est ce qui lie chaque slide à sa catégorie de la carte.
   */
  id: Filter;
  /** Titre affiché sur l'image (éditable dans l'admin). */
  title: string;
  /** Image de fond (éditable dans l'admin). */
  image: string;
}

const img = (id: string): string =>
  `https://images.unsplash.com/photo-${id}?w=1600&auto=format&fit=crop&q=80`;

// Slides par défaut (images Unsplash vérifiées, reprises du reste du site).
// Servis immédiatement (SSR sans Firebase) puis fusionnés avec Firestore.
export const DEFAULT_SLIDES: CategorySlide[] = [
  { id: 'classiques', title: 'Nos Pizzas Classiques', image: img('1574071318508-1cdbab80d002') },
  { id: 'signatures', title: 'Nos Pizzas Signatures', image: img('1571997478779-2adcbbe9ab2f') },
  { id: 'calzones', title: 'Nos Calzones', image: img('1571407970349-bc81e7e96d47') },
  { id: 'vegetariennes', title: 'Nos Pizzas Végétariennes', image: img('1595854341625-f33ee10dbf94') },
  { id: 'nouveautes', title: 'Les Nouveautés', image: img('1593560708920-61dd98c46a4e') },
  { id: 'desserts-boissons', title: 'Nos Desserts/Boissons', image: img('1546173159-315724a31696') },
];

/**
 * Subscribe aux slides en temps réel. Les documents Firestore (un par slide,
 * keyés par id) sont fusionnés sur les défauts : la collection peut être vide
 * ou partielle, le site reste toujours complet.
 */
export function subscribeToSlides(cb: (slides: CategorySlide[]) => void): () => void {
  if (!isFirebaseConfigured || !db) {
    cb(DEFAULT_SLIDES);
    return () => {};
  }

  return onSnapshot(
    query(collection(db, SLIDES_COLLECTION)),
    (snap) => {
      const byId = new Map(
        snap.docs.map((d) => [d.id, d.data() as Partial<CategorySlide>] as const),
      );
      cb(
        DEFAULT_SLIDES.map((slide) => ({
          ...slide,
          ...byId.get(slide.id),
          id: slide.id, // l'id ne se modifie jamais
        })),
      );
    },
    (err) => {
      console.error('[slides] subscribe failed, falling back to defaults:', err);
      cb(DEFAULT_SLIDES);
    },
  );
}

/** Modifier le titre et/ou l'image d'un slide (côté dashboard admin). */
export async function updateSlide(
  id: string,
  patch: Partial<Pick<CategorySlide, 'title' | 'image'>>,
): Promise<void> {
  if (!db) throw new Error('Firebase non configuré');
  await setDoc(doc(db, SLIDES_COLLECTION, id), patch, { merge: true });
}
