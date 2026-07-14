import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logoSmall from '../assets/vista-events-logo-small.jpg';

export default function Hero({ ready }) {
  useEffect(() => {
    if (!ready) return;

    gsap.set('[data-hero-fade]', { opacity: 0, y: 16 });

    const tl = gsap.timeline();
    tl.to('[data-hero-crest]', { opacity: 1, duration: 1, ease: 'power2.out' })
      .to('[data-hero-line]', { yPercent: -110, duration: 1.1, stagger: 0.12, ease: 'expo.out' }, '-=0.5')
      .to('[data-hero-fade]', { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, '-=0.6');

    gsap.to('#hero-bg', {
      yPercent: 12,
      scale: 1.28,
      ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
    });

    return () => tl.kill();
  }, [ready]);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-end">
      <div
        className="hero-bg"
        id="hero-bg"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2400&q=80')",
        }}
      />
      <div className="hero-overlay" />

      <div
        className="relative z-10 w-full px-6 md:px-10 pb-16 md:pb-20 pt-10 max-w-[1600px] mx-auto"
        style={{
          backdropFilter: 'blur(2px) saturate(115%)',
          background: 'linear-gradient(180deg, transparent, rgba(30,10,8,0.22))',
        }}
      >
        <div className="flex items-center gap-3 mb-6 fig-label">
          <span className="w-8 h-px bg-champagne inline-block" />
          <span>Designing Moments | Defining Memories</span>
        </div>

        <h1 className="font-display font-medium text-[clamp(2.75rem,8.5vw,8rem)] leading-[0.92] tracking-tight">
          <span className="reveal-mask"><span className="reveal-line" data-hero-line>Architects of the</span></span>
          <span className="reveal-mask"><span className="reveal-line" data-hero-line>Unforgettable<span className="text-champagne">.</span></span></span>
        </h1>

        <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <p className="max-w-md text-oyster/70 text-base leading-relaxed" data-hero-fade>
            Vista Events turns celebrations into unforgettable experiences — from weddings to grand
            gatherings, with elegance, creativity, and perfection in every detail.
          </p>
          
          <a
            href="#narrative"
            className="btn-outline inline-flex items-center gap-3 px-6 py-3 text-xs tracking-[0.2em] uppercase w-fit"
            data-cursor="magnetic"
            data-hero-fade
          >
            <span>Scroll the Story</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}