import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Narrative() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll('#narrative [data-scroll-line]').forEach((line) => {
        gsap.to(line, {
          yPercent: -110,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: line, start: 'top 90%' },
        });
      });

      document.querySelectorAll('#narrative .fig-label, #narrative .blueprint-corners').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        });
      });

      document.querySelectorAll('#narrative [data-parallax-y]').forEach((el) => {
        const depth = parseFloat(el.dataset.parallaxY) || 10;
        const img = el.querySelector('img');
        gsap.set(img, { yPercent: -Math.abs(depth) * 0.6, scale: 1.15 });
        gsap.to(img, {
          yPercent: depth,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="narrative"
      ref={sectionRef}
      className="relative px-6 md:px-10 py-28 md:py-40 max-w-[1600px] mx-auto"
    >
      <div className="flex items-center gap-3 mb-16 fig-label">
        <span className="w-8 h-px bg-champagne inline-block" />
        <span> The Narrative</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8 items-start">
        <div className="lg:col-span-5 lg:col-start-1">
          <h2 className="font-display font-medium text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] mb-8">
            <span className="reveal-mask block">
              <span className="reveal-line" data-scroll-line>We don&apos;t plan events.</span>
            </span>
            <span className="reveal-mask block">
              <span className="reveal-line" data-scroll-line>
                We <em className="not-italic text-champagne">architect</em> memory.
              </span>
            </span>
          </h2>

          <div className="space-y-6 text-oyster/70 leading-relaxed text-[15px] md:text-base max-w-xl">
            <p>
              Every commission begins as a set of drawings, not a checklist. Site lines, light, sound,
              and the choreography of arrival are engineered with the same rigor an architect brings to
              a building — because a night, like a structure, either holds its shape or collapses.
            </p>
            <p>
              We are here to turn your celebrations into unforgettable experiences. From weddings to
              grand gatherings, Vista Events promises elegance, creativity, and perfection in every detail.
            </p>
          </div>

          <div className="mt-10 pl-6 border-l border-champagne/60">
            <p className="font-display italic text-xl md:text-2xl text-oyster/90 leading-snug">
              &quot;The best-run event is invisible. What remains is only the feeling.&quot;
            </p>
            <p className="mt-3 coord-label">— Founding Principal, Vista Events</p>
          </div>

          <div className="mt-10 flex justify-between coord-label max-w-xs">
            <span>N 40°44&apos;23&quot;</span>
            <span>W 73°59&apos;08&quot;</span>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 grid grid-cols-2 gap-4 md:gap-5">
          <div
            className="col-span-2 blueprint-corners narr-bento-item aspect-[16/10]"
            data-parallax-y="-8"
          >
            <div className="bc-tl" /><div className="bc-br" />
            <img
              src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1400&q=80"
              alt="Editorial detail of a reception table setting under warm light"
            />
          </div>
          <div
            className="col-span-1 blueprint-corners narr-bento-item aspect-[3/4] mt-10"
            data-parallax-y="10"
          >
            <div className="bc-tl" /><div className="bc-br" />
            <img
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80"
              alt="Guests gathered under warm string lighting at dusk"
            />
          </div>
          <div
            className="col-span-1 blueprint-corners narr-bento-item aspect-[3/4]"
            data-parallax-y="-14"
          >
            <div className="bc-tl" /><div className="bc-br" />
            <img
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1000&q=80"
              alt="Ambient stage lighting design"
            />
          </div>
        </div>
      </div>
    </section>
  );
}