import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from './Reveal';
import { LINKS } from '@/lib/links';

// Page « Histoire de la pizza » — contenu éditorial accrocheur reliant des
// siècles d'histoire de la pizza au positionnement feu de bois d'One Pizza.

const STATS = [
  { num: '1889', label: 'naissance de la\nPizza Margherita' },
  { num: '1905', label: '1ʳᵉ pizzeria\ndes États-Unis' },
  { num: '5 Mds', label: 'pizzas mangées\nchaque année en France' },
  { num: '484°', label: 'la chaleur d\'un\nvrai four à bois' },
];

const ERAS = [
  {
    year: 'Antiquité',
    title: 'Des galettes avant la lettre',
    text:
      'À Pompéi comme en Perse, on garnit déjà des galettes cuites sur pierre chaude. Les soldats perses de Darius mangent du pain plat couronné de fromage et de dattes : l’ancêtre lointain de notre pizza.',
  },
  {
    year: 'XVIIIᵉ siècle',
    title: 'Naples donne ses lettres',
    text:
      'La pizza naît vraiment dans les rues de Naples : pâte plate, tomate rapportée des Amériques, un plat du peuple vendu à la minute sur les étals du port. On la mange pliée, en marchant, pour quelques sous.',
  },
  {
    year: '1889',
    title: 'La Margherita royale',
    text:
      'Le pizzaiolo Raffaele Esposito crée pour la reine Margherita une pizza aux couleurs de l’Italie : tomate rouge, mozzarella blanche, basilic vert. La plus célèbre pizza du monde est née — et n’a jamais vieilli.',
  },
  {
    year: '1905',
    title: 'La conquête du Nouveau Monde',
    text:
      'Gennaro Lombardi ouvre la première pizzeria américaine à New York. Les migrants napolitains emportent leur four dans la valise : la pizza devient un langage universel, de Naples au Bronx.',
  },
  {
    year: '1945 — 1990',
    title: 'La planète pizza',
    text:
      'Les GI’s rapportent le goût de Naples, les chaînes industrialisent la pâte, les livreurs s’élancent sur tous les continents. Vite, partout, pareil — mais le four à bois, lui, ne s’est jamais laissé industrialiser.',
  },
  {
    year: 'Aujourd’hui',
    title: 'Le retour du feu de bois',
    text:
      'Pizzas artisanales, pâtes maison, produits vrais : la pizza redevient un métier de pizzaiolo. On veut toujours la rapidité — mais avec la braise, la meule et le geste. La qualité reprend ses droits.',
  },
];

export function History() {
  return (
    <section className="history section-pad" id="histoire-content">
      <div className="container">
        <Reveal className="section-label" as="div">Culture Pizza</Reveal>

        <header className="history-head">
          <h1 className="history-title">
            L’Histoire
            <br />
            de la <span className="accent">Pizza.</span>
            <span className="sr-only">
              {' '}
              — de Naples à la pizzeria One Pizza de Saint-Denis
            </span>
          </h1>
          <p className="history-lead">
            La pizza n’est pas née hier. De l’Antiquité à notre feu de bois,
            voici des siècles d’obsession pour la pâte parfaite, le tomate et
            la braise.
          </p>
        </header>

        <div className="history-figure">
          <Image
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1400&auto=format&fit=crop&q=80"
            alt="Pizza artisanale, symbole de la pizzeria moderne au feu de bois"
            fill
            sizes="(max-width: 900px) 100vw, 1200px"
          />
        </div>

        <Reveal className="history-stats" as="div">
          {STATS.map((s) => (
            <div className="history-stat" key={s.num}>
              <div className="num">{s.num}</div>
              <div className="label">{s.label}</div>
            </div>
          ))}
        </Reveal>

        <ol className="history-timeline">
          {ERAS.map((era) => (
            <Reveal as="li" className="era" key={era.year}>
              <div className="era-year">{era.year}</div>
              <div className="era-body">
                <h3 className="era-title">{era.title}</h3>
                <p className="era-text">{era.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal as="div" className="history-quote">
          « La pizza n’a jamais été une question de vitesse.
          C’est une question de feu — et de goût. »
        </Reveal>

        <div className="history-torcy">
          <Reveal className="section-label" as="div">Et à Saint-Denis ?</Reveal>
          <h2 className="history-torcy-title">
            La suite de l’histoire,
            <br />
            on l’écrit <span className="accent">au feu de bois.</span>
          </h2>
          <p className="history-torcy-text">
            C’est exactement cette idée que l’on défend chez One Pizza : la
            vraie pizza napolitaine, halale et sans compromis. Pâte fraîche du
            jour, mozzarella fondue, garnitures généreuses — tout est cuit
            minute dans la flamme de notre four à bois. Cent trente ans après
            la Margherita, la recette n’a pas changé : du bon, vite fait.
          </p>
          <div className="history-torcy-ctas">
            <Link href="/carte" className="btn" data-cursor-hover>
              Découvrir la carte <span className="btn-arrow">→</span>
            </Link>
            <a href={LINKS.phoneHref} className="btn" data-cursor-hover>
              Appeler · {LINKS.phone} <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
