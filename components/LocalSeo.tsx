import Link from 'next/link';
import { LINKS } from '@/lib/links';
import { SERVICE_AREAS } from '@/lib/site';

/**
 * ── Section contenu local SEO (accueil) ──────────────────────────────────────
 *
 * Composant serveur (0 JS client) : texte ciblé « pizza Saint-Denis »,
 * « pizzeria 93200 », « pizza halal feu de bois » + cocon sémantique local
 * (Basilique de Saint-Denis, marché, métro ligne 13, Stade de France, Plaine
 * Commune…). Structuré en H2/H3 conformes à la hiérarchie : un seul H1 sur la
 * page (hero), H2 de section, H3 détaillés.
 */
export function LocalSeo() {
  return (
    <section className="local-seo section-pad" id="saint-denis">
      <div className="container">
        <p className="section-label">Pizza · Pizzeria · Saint-Denis</p>
        <h2 className="section-title local-seo-title">
          Votre pizzeria halal
          <br />
          au cœur de Saint-Denis.
        </h2>
        <p className="local-seo-intro">
          <strong>One Pizza</strong> est la pizzeria de Saint-Denis où chaque{' '}
          <strong>pizza est cuite au feu de bois</strong>. Située{' '}
          <strong>10 Rue Clovis Hugues à Saint-Denis (93200)</strong>, à deux
          pas de la <strong>Basilique de Saint-Denis</strong> et du marché,
          notre pizzeria halale vous accueille <strong>7 jours sur 7</strong>,
          le midi comme le soir. Pizzas classiques, recettes signatures,
          calzones et desserts maison : tout est préparé minute,{' '}
          <strong>à emporter</strong>, sur place ou en{' '}
          <strong>livraison à Saint-Denis</strong> et dans toute la Plaine
          Commune.
        </p>

        <div className="local-seo-grid">
          <article className="local-seo-block">
            <h3>La carte d&apos;une pizzeria généreuse</h3>
            <p>
              Notre carte de <strong>pizzas à Saint-Denis</strong> couvre toutes
              les envies : Margherita au basilic frais, Reine, Quatre Fromages,
              pizzas signatures comme la One Pizza ou la BBQ Chicken, calzones
              moelleuses, desserts maison et boissons fraîches. De quoi
              déjeuner ou dîner vite — et bien.
            </p>
            <Link href="/carte" className="local-seo-link" data-cursor-hover>
              Découvrir la carte <span className="btn-arrow">→</span>
            </Link>
          </article>

          <article className="local-seo-block">
            <h3>Horaires d&apos;ouverture 7j/7</h3>
            <p>
              Ouvert tous les jours, midi et soir :{' '}
              <strong>11h30 – 14h30</strong> et <strong>18h00 – 23h00</strong>.
              La pizzeria idéale pour une pause déjeuner près du marché, un
              dîner après le travail ou une pizza du soir à Saint-Denis.
              Appelez au {LINKS.phone} ou commandez en ligne en 2 minutes.
            </p>
            <a href={LINKS.phoneHref} className="local-seo-link" data-cursor-hover>
              Appeler la pizzeria <span className="btn-arrow">→</span>
            </a>
          </article>

          <article className="local-seo-block">
            <h3>Livraison à Saint-Denis &amp; retrait en boutique</h3>
            <p>
              Commandez <strong>en ligne</strong> (paiement au retrait, espèces
              ou carte) ou sur <strong>Uber Eats</strong> pour la{' '}
              <strong>livraison à Saint-Denis</strong> et les communes
              voisines : {SERVICE_AREAS.slice(1, 6).join(', ')}… Retrait dès 20
              minutes à la boutique.
            </p>
            <Link href="/carte" className="local-seo-link" data-cursor-hover>
              Commander en ligne <span className="btn-arrow">→</span>
            </Link>
          </article>

          <article className="local-seo-block">
            <h3>Où nous trouver à Saint-Denis&nbsp;?</h3>
            <p>
              <strong>10 Rue Clovis Hugues, 93200 Saint-Denis</strong> — à
              quelques minutes de la <strong>Basilique de Saint-Denis</strong>{' '}
              (métro ligne 13), du marché central et du{' '}
              <strong>Stade de France</strong>. Pizzeria idéale pour les
              Dionysiens, les familles du quartier et les soirs de match.
            </p>
            <a
              href={LINKS.addressQuery}
              target="_blank"
              rel="noreferrer"
              className="local-seo-link"
              data-cursor-hover
            >
              Itinéraire Google Maps <span className="btn-arrow">→</span>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
