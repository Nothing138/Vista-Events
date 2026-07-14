import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function PackagesPage() {
  const sectionRef = useRef(null);
  const [packages, setPackages] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch(`${API_URL}/api/packages`);
        const data = await res.json();
        if (data.success) {
          setPackages(data.packages);
          setStatus('ready');
        } else {
          setStatus('error');
        }
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    }
    fetchPackages();
  }, []);

  useEffect(() => {
    if (status !== 'ready') return;
    const ctx = gsap.context(() => {
      document.querySelectorAll('.package-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          delay: (i % 3) * 0.08,
          scrollTrigger: { trigger: card, start: 'top 90%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [status]);

  return (
    <section
      ref={sectionRef}
      className="relative px-6 md:px-10 pt-32 md:pt-44 pb-28 max-w-[1600px] mx-auto min-h-[70vh]"
    >
      <div className="flex items-center gap-3 mb-6 fig-label">
        <span className="w-8 h-px bg-champagne inline-block" />
        <span>Packages</span>
      </div>

      <h1 className="font-display font-medium text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05] mb-16 max-w-2xl">
        Curated starting points<span className="text-champagne">.</span> Every commission is tailored from here.
      </h1>

      {status === 'loading' && (
        <p className="text-oyster/50 coord-label">Loading packages…</p>
      )}

      {status === 'error' && (
        <p className="text-oyster/50">
          Couldn&apos;t load packages right now. Please refresh, or{' '}
          <Link to="/contact" className="text-champagne underline">reach out directly</Link>.
        </p>
      )}

      {status === 'ready' && packages.length === 0 && (
        <p className="text-oyster/50">
          Packages are being finalized. In the meantime,{' '}
          <Link to="/contact" className="text-champagne underline">tell us what you&apos;re envisioning</Link>{' '}
          and we&apos;ll build a proposal around it.
        </p>
      )}

      {status === 'ready' && packages.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className={`package-card blueprint-corners flex flex-col ${
                pkg.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              style={{ background: 'rgba(244,244,240,0.03)', border: '1px solid rgba(244,244,240,0.1)' }}
            >
              <div className="bc-tl" /><div className="bc-br" />

              {pkg.image && (
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="p-6 md:p-7 flex flex-col flex-1">
                {pkg.featured && (
                  <span className="fig-label mb-3 inline-block w-fit">Most Requested</span>
                )}

                <h3 className="font-display text-2xl md:text-3xl mb-2">{pkg.name}</h3>
                <p className="text-champagne text-sm tracking-wide mb-4">{pkg.price}</p>

                {pkg.description && (
                  <p className="text-oyster/70 text-sm leading-relaxed mb-5">{pkg.description}</p>
                )}

                {pkg.inclusions?.length > 0 && (
                  <ul className="space-y-2 mb-8 flex-1">
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-oyster/60 text-sm">
                        <span className="text-champagne mt-0.5">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  to="/contact"
                  className="btn-outline inline-flex items-center justify-center gap-2 px-5 py-3 text-xs tracking-[0.2em] uppercase mt-auto"
                  data-cursor="magnetic"
                >
                  <span>Enquire About This</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}