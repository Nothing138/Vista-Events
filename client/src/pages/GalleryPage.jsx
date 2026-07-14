import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function GalleryPage() {
  const rootRef = useRef(null);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch(`${API_URL}/api/gallery`);
        const data = await res.json();
        if (data.success) {
          setImages(data.images);
          setStatus('ready');
        } else {
          setStatus('error');
        }
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    }
    fetchImages();
  }, []);

  useEffect(() => {
    if (status !== 'ready') return;
    const ctx = gsap.context(() => {
      document.querySelectorAll('.gallery-tile').forEach((tile, i) => {
        gsap.from(tile, {
          opacity: 0,
          scale: 0.95,
          duration: 0.7,
          ease: 'power3.out',
          delay: (i % 4) * 0.05,
          scrollTrigger: { trigger: tile, start: 'top 92%' },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [status, activeFilter]);

  const eventTypes = ['All', ...new Set(images.map((img) => img.eventType).filter(Boolean))];
  const filtered = activeFilter === 'All' ? images : images.filter((img) => img.eventType === activeFilter);

  return (
    <div ref={rootRef} className="relative px-6 md:px-10 pt-32 md:pt-44 pb-28 max-w-[1600px] mx-auto min-h-[70vh]">
      <div className="flex items-center gap-3 mb-6 fig-label">
        <span className="w-8 h-px bg-champagne inline-block" />
        <span>Curated Works</span>
      </div>

      <h1 className="font-display font-medium text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05] mb-10 max-w-2xl">
        The full portfolio<span className="text-champagne">.</span>
      </h1>

      {status === 'ready' && images.length > 0 && eventTypes.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-12">
          {eventTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className="px-4 py-2 text-xs tracking-[0.15em] uppercase rounded-sm transition-colors duration-300"
              data-cursor="magnetic"
              style={{
                background: activeFilter === type ? 'rgba(227,200,116,0.12)' : 'transparent',
                border: `1px solid ${activeFilter === type ? 'var(--color-champagne)' : 'rgba(244,244,240,0.15)'}`,
                color: activeFilter === type ? 'var(--color-champagne)' : 'rgba(244,244,240,0.6)',
              }}
            >
              {type}
            </button>
          ))}
        </div>
      )}

      {status === 'loading' && <p className="text-oyster/50 coord-label">Loading gallery…</p>}
      {status === 'error' && <p className="text-oyster/50">Couldn&apos;t load the gallery right now.</p>}

      {status === 'ready' && images.length === 0 && (
        <p className="text-oyster/50 max-w-md">
          Our portfolio is being curated. In the meantime,{' '}
          <Link to="/contact" className="text-champagne underline">get in touch</Link> and we&apos;ll walk you
          through past work directly.
        </p>
      )}

      {status === 'ready' && images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((img) => (
            <button
              key={img._id}
              className="gallery-tile blueprint-corners aspect-square relative overflow-hidden group cursor-pointer"
              data-cursor="magnetic"
              onClick={() => setLightbox(img)}
            >
              <div className="bc-tl" /><div className="bc-br" />
              <img
                src={img.imageUrl}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4"
                style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(30,10,8,0.85) 100%)' }}
              >
                <p className="fig-label text-left">{img.title}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center p-6"
          style={{ background: 'rgba(24,8,6,0.94)', backdropFilter: 'blur(6px)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 btn-outline w-11 h-11 rounded-full flex items-center justify-center"
            data-cursor="magnetic"
            aria-label="Close"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="blueprint-corners aspect-[4/3] max-h-[75vh]">
              <div className="bc-tl" /><div className="bc-br" />
              <img src={lightbox.imageUrl} alt={lightbox.title} className="w-full h-full object-contain" />
            </div>
            <div className="mt-4 text-center">
              <p className="font-display text-xl">{lightbox.title}</p>
              {lightbox.eventType && <p className="coord-label mt-1">{lightbox.eventType}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}