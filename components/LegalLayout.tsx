import Link from 'next/link';
import { SocialFollow } from './SocialFollow';

/**
 * Wrapper de mise en page pour les pages légales (mentions, CGV,
 * confidentialité, cookies). Fournit une barre supérieure de navigation
 * et un pied de page minimal, dans le style de One Pizza Saint-Denis.
 */
export function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="legal-page">
      <header className="legal-bar">
        <Link href="/" className="legal-logo" data-cursor-hover>
          ONE PIZZA <span>SAINT-DENIS</span>
        </Link>
        <nav className="legal-nav" aria-label="Pages légales">
          <Link href="/mentions-legales" data-cursor-hover>Mentions légales</Link>
          <Link href="/cgv" data-cursor-hover>CGV</Link>
          <Link href="/confidentialite" data-cursor-hover>Confidentialité</Link>
          <Link href="/cookies" data-cursor-hover>Cookies</Link>
        </nav>
      </header>

      <main className="legal-main">{children}</main>

      <SocialFollow />

      <footer className="legal-foot">
        <Link href="/" data-cursor-hover>← Retour à l&apos;accueil</Link>
        <div>© 2026 One Pizza Saint-Denis · Tous droits réservés</div>
      </footer>
    </div>
  );
}
