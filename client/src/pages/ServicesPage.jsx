import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: '01',
    title: 'Wedding Ceremonies',
    tagline: 'Every ceremony engineered like a story, not a schedule.',
    description:
      'From the first procession to the final toast, we treat the wedding day as a single continuous narrative. Staging, timing, and atmosphere are planned down to the minute so the day feels unhurried — even when every second is accounted for.',
    inclusions: ['Venue styling & décor', 'Ceremony staging & procession design', 'Vendor & catering coordination', 'Photography & cinematography liaison', 'Full day-of management'],
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80',
  },
  {
    num: '02',
    title: 'Corporate Events',
    tagline: 'Brand moments engineered at scale, without losing intimacy.',
    description:
      'From product anniversaries to investor evenings, we design corporate events as precisely as a stage production — guest flow, lighting cues, and brand storytelling choreographed into a single evening that feels effortless from the inside.',
    inclusions: ['Venue sourcing & site engineering', 'Stage & AV production', 'Guest flow choreography', 'Brand integration & signage', 'Full production management'],
    image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1600&q=80',
  },
  {
    num: '03',
    title: 'Birthday & Private Celebrations',
    tagline: 'Milestones staged with the warmth of a private commission.',
    description:
      'Birthdays and family milestones deserve the same rigor as a public event — without ever feeling staged. We build celebrations that feel personal, unhurried, and quietly extraordinary, for every age and every scale.',
    inclusions: ['Theme & concept design', 'Décor & styling', 'Entertainment coordination', 'Catering & cake coordination', 'On-the-day management'],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
  },
  {
    num: '04',
    title: 'Cultural Programs & Concerts',
    tagline: 'Stage, sound, and light choreographed for a live audience.',
    description:
      'From cultural showcases to full concerts, we manage the discipline a live audience demands — artist logistics, sound and lighting design, and seating that keeps every seat feeling like a good one.',
    inclusions: ['Stage & sound production', 'Artist & performer logistics', 'Lighting design', 'Audience flow & seating', 'Full show-day management'],
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80',
  },
  {
    num: '05',
    title: 'Hall & Venue Booking',
    tagline: 'The right room, secured and styled before a single guest arrives.',
    description:
      'We source, negotiate, and book the venue itself — matching capacity, acoustics, and character to the occasion, then handle the layout planning so the room works for you long before doors open.',
    inclusions: ['Venue sourcing & shortlisting', 'Booking & contract negotiation', 'Layout & seating planning', 'On-site walkthroughs', 'Vendor access coordination'],
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=80',
  },
  {
    num: '06',
    title: 'Photography & Cinematography',
    tagline: 'The moments that outlast the evening itself.',
    description:
      'A dedicated photography and film team documents the day as it actually unfolds — candid and staged, wide and intimate — so what remains afterward is as considered as the event itself.',
    inclusions: ['Pre-event shoot planning', 'Full-day photography coverage', 'Cinematic highlight film', 'Same-day edit options', 'Archival & delivery'],
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80',
  },
  {
    num: '07',
    title: 'Event Rental Services',
    tagline: 'Furniture, décor, and equipment — sourced, styled, struck.',
    description:
      'Furniture, lighting, tableware, and staging equipment, delivered and installed to spec, then cleared without a trace once the last guest leaves. One line item instead of a dozen vendors.',
    inclusions: ['Furniture & décor rental', 'Lighting & AV equipment', 'Tableware & linens', 'Delivery & setup', 'Post-event strike'],
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1600&q=80',
  },
  {
    num: '08',
    title: 'Catering Services',
    tagline: 'A menu designed around the occasion, not the other way round.',
    description:
      'From plated dinners to live counters, our catering is built around the shape of the event itself — dietary needs, cultural traditions, and service pacing all considered before a single dish is planned.',
    inclusions: ['Custom menu design', 'Dietary & cultural accommodation', 'Service staff coordination', 'Live counters & stations', 'Full kitchen-to-table execution'],
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=80',
  },
];

export default function ServicesPage() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll('.service-block').forEach((block) => {
        gsap.from(block, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: block, start: 'top 85%' },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative px-6 md:px-10 pt-32 md:pt-44 pb-28 max-w-[1600px] mx-auto">
      <div className="flex items-center gap-3 mb-6 fig-label">
        <span className="w-8 h-px bg-champagne inline-block" />
        <span>Capabilities</span>
      </div>

      <h1 className="font-display font-medium text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05] mb-24 max-w-2xl">
        Eight disciplines<span className="text-champagne">.</span> One standard of precision.
      </h1>

      <div className="space-y-24 md:space-y-32">
        {services.map((s, i) => (
          <div
            key={s.num}
            className="service-block grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            <div className={`lg:col-span-6 blueprint-corners aspect-[4/3] ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="bc-tl" /><div className="bc-br" />
              <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
            </div>

            <div className={`lg:col-span-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
              <span className="coord-label">{s.num} / 08</span>
              <h2 className="font-display text-3xl md:text-4xl mt-2 mb-3">{s.title}</h2>
              <p className="text-champagne text-sm tracking-wide mb-5">{s.tagline}</p>
              <p className="text-oyster/70 text-sm leading-relaxed mb-7 max-w-lg">{s.description}</p>

              <ul className="space-y-2 mb-8">
                {s.inclusions.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-oyster/60 text-sm">
                    <span className="text-champagne mt-0.5">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="btn-outline inline-flex items-center gap-2 px-6 py-3 text-xs tracking-[0.2em] uppercase"
                data-cursor="magnetic"
              >
                <span>Enquire About This</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}