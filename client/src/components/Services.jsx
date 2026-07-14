import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const services = [
  {
    num: '01',
    title: 'Wedding Ceremonies',
    desc: 'Full-day staging, from procession to the final toast.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    num: '02',
    title: 'Corporate Events',
    desc: 'Brand moments engineered at scale, without losing intimacy.',
    image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1200&q=80',
  },
  {
    num: '03',
    title: 'Birthday & Private Celebrations',
    desc: 'Milestones staged with the warmth of a private commission.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  },
  {
    num: '04',
    title: 'Cultural Programs & Concerts',
    desc: 'Stage, sound, and light choreographed for a live audience.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
  },
  {
    num: '05',
    title: 'Hall & Venue Booking',
    desc: 'The right room, secured and styled before guests arrive.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    num: '06',
    title: 'Photography & Cinematography',
    desc: 'The moments that outlast the evening itself.',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    num: '07',
    title: 'Event Rental Services',
    desc: 'Furniture, décor, and equipment — sourced, styled, struck.',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80',
  },
  {
    num: '08',
    title: 'Catering Services',
    desc: 'A menu designed around the occasion, not the other way round.',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function Services() {
  const trailRef = useRef(null);
  const trailImgRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const trail = trailRef.current;
    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let active = false;

    const handleMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('mousemove', handleMove);

    const tick = () => {
      if (!active) return;
      pos.x += (mouse.x - pos.x) * 0.15;
      pos.y += (mouse.y - pos.y) * 0.15;
      if (trail) trail.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%,-50%) scale(1)`;
    };
    gsap.ticker.add(tick);

    active = !!activeImage;

    return () => {
      window.removeEventListener('mousemove', handleMove);
      gsap.ticker.remove(tick);
    };
  }, [activeImage]);

  return (
    <section id="services" className="relative px-6 md:px-10 py-28 md:py-40 max-w-[1600px] mx-auto">
      <div
        ref={trailRef}
        id="service-image-trail"
        style={{ opacity: activeImage ? 1 : 0 }}
      >
        <img ref={trailImgRef} src={activeImage || ''} alt="" />
      </div>

      <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
        <div className="flex items-center gap-3 fig-label">
          <span className="w-8 h-px bg-champagne inline-block" />
          <span> Capabilities</span>
        </div>
        <p className="text-oyster/60 text-sm max-w-xs">
          Eight disciplines. One standard of precision. Hover to preview the world we build for each.
        </p>
      </div>

      <div id="service-list">
        {services.map((s) => (
          <div
            key={s.num}
            className="service-row py-6 md:py-8 flex items-center justify-between cursor-pointer"
            data-cursor="view"
            onMouseEnter={() => setActiveImage(s.image)}
            onMouseLeave={() => setActiveImage(null)}
          >
            <div className="flex items-center gap-6 md:gap-10">
              <span className="service-num coord-label text-oyster/40">{s.num}</span>
              <h3 className="service-title font-display text-xl md:text-4xl">{s.title}</h3>
            </div>
            <span className="hidden md:block text-oyster/50 text-sm max-w-[220px] text-right">
              {s.desc}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}