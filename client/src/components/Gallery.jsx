import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'The Marlowe Gala',
    meta: 'Corporate Gala — New York, 2025',
    desc: 'A 400-guest brand gala staged inside a converted rail hall, built around a single amber-lit processional moment.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80',
    thumb: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    span: 'col-span-2 row-span-2',
    alt: 'Grand reception hall dressed for a formal gala',
  },
  {
    title: 'Atlas Product Reveal',
    meta: 'Product Launch — San Francisco, 2025',
    desc: "A choreographed reveal sequence for Atlas's flagship device, engineered around a single 90-second lighting cue.",
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80',
    thumb: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80',
    span: 'col-span-2 row-span-1',
    alt: 'Stage lighting design at a live brand activation',
  },
  {
    title: 'Meridian Summit',
    meta: 'Institutional Ceremony — Doha, 2024',
    desc: 'Protocol-grade staging for a three-day diplomatic summit, coordinated across six languages and four venues.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=80',
    thumb: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80',
    span: 'col-span-1 row-span-1',
    alt: 'Formal conference stage setup',
  },
  {
    title: 'Nocturne Series',
    meta: 'Private Celebration — London, 2024',
    desc: "A recurring after-dark salon for a private members' club, built on sound and light rather than décor.",
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80',
    thumb: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80',
    span: 'col-span-1 row-span-1',
    alt: 'Concert-style stage with warm amber lighting',
  },
  {
    title: 'The Hollis Wedding',
    meta: 'Destination Wedding — Tuscany, 2025',
    desc: 'A three-day estate wedding for 180 guests, with every tablescape drawn and approved before a single flower was cut.',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=80',
    thumb: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
    span: 'col-span-2 row-span-1',
    alt: 'Editorial tablescape detail with fine china and candlelight',
  },
  {
    title: 'Private Estate Dinner',
    meta: 'Private Celebration — Hudson Valley, 2024',
    desc: 'A 40-seat anniversary dinner staged across a working orchard at dusk, lit entirely by fire and string light.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80',
    thumb: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    span: 'col-span-2 row-span-1',
    alt: 'Guests mingling at dusk under string lighting',
  },
];

export default function Gallery({ onSelectProject }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll('#gallery .bento-item').forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          scale: 0.94,
          duration: 0.8,
          ease: 'power3.out',
          delay: (i % 4) * 0.05,
          scrollTrigger: { trigger: item, start: 'top 90%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="relative px-6 md:px-10 py-28 md:py-40 max-w-[1600px] mx-auto">
      <div className="flex items-center gap-3 mb-16 fig-label">
        <span className="w-8 h-px bg-champagne inline-block" />
        <span> Curated Works</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
        {projects.map((p) => (
          <div
            key={p.title}
            className={`bento-item blueprint-corners cursor-pointer ${p.span}`}
            data-cursor="magnetic"
            onClick={() => onSelectProject(p)}
          >
            <div className="bc-tl" /><div className="bc-br" />
            <img src={p.thumb} alt={p.alt} />
            <div className="bento-overlay" />
            <div className="bento-caption"><p className="fig-label">{p.title}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}