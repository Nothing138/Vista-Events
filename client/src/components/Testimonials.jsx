import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState('loading'); 

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`${API_URL}/api/reviews`);
        const data = await res.json();
        if (data.success && data.reviews.length > 0) {
          setReviews(data.reviews);
          setStatus('ready');
        } else {
          setStatus('empty');
        }
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    }
    fetchReviews();
  }, []);

  if (status === 'loading' || status === 'empty' || status === 'error') return null;

  const repeats = reviews.length < 4 ? 3 : 2;
  const track = Array.from({ length: repeats }, () => reviews).flat();

  return (
    <section id="testimonials" className="relative py-28 md:py-36 overflow-hidden">
      <div className="px-6 md:px-10 max-w-[1600px] mx-auto flex items-center gap-3 mb-14 fig-label">
        <span className="w-8 h-px bg-champagne inline-block" />
        <span> Client Love</span>
      </div>

      <div className="marquee-wrap">
        <div className="marquee-track">
          {track.map((r, i) => (
            <div className="quote-card" key={`${r._id}-${i}`}>
              <p className="font-display italic text-[clamp(1.5rem,3vw,2.5rem)] leading-snug text-oyster/90">
                &ldquo;{r.message}&rdquo;
              </p>
              <p className="mt-5 coord-label">
                — {r.name}{r.eventType ? `, ${r.eventType}` : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}