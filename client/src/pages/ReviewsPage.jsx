import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1.5" onMouseLeave={() => setHovered(0)}>
      {[1, 2, 3, 4, 5].map((n) => {
        const active = hovered ? n <= hovered : n <= value;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHovered(n)}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            className="text-3xl leading-none transition-transform duration-200 hover:scale-110"
            style={{ color: active ? 'var(--color-champagne)' : 'rgba(244,244,240,0.2)' }}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}

function Avatar({ name }) {
  const initial = name?.trim()?.[0]?.toUpperCase() || '?';
  return (
    <div
      className="w-11 h-11 rounded-full flex items-center justify-center font-display text-lg shrink-0"
      style={{ background: 'rgba(227,200,116,0.12)', border: '1px solid rgba(227,200,116,0.4)', color: 'var(--color-champagne)' }}
    >
      {initial}
    </div>
  );
}

export default function ReviewsPage() {
  const sectionRef = useRef(null);

  const [reviews, setReviews] = useState([]);
  const [loadStatus, setLoadStatus] = useState('loading'); 

  const [form, setForm] = useState({ name: '', eventType: '', rating: 5, message: '' });
  const [submitStatus, setSubmitStatus] = useState('idle'); 

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`${API_URL}/api/reviews`);
        const data = await res.json();
        if (data.success) {
          setReviews(data.reviews);
          setLoadStatus('ready');
        } else {
          setLoadStatus('error');
        }
      } catch (err) {
        console.error(err);
        setLoadStatus('error');
      }
    }
    fetchReviews();
  }, []);

  useEffect(() => {
    if (loadStatus !== 'ready') return;
    const ctx = gsap.context(() => {
      document.querySelectorAll('.review-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: 'power3.out',
          delay: (i % 2) * 0.08,
          scrollTrigger: { trigger: card, start: 'top 92%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [loadStatus, reviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitStatus('success');
        setForm({ name: '', eventType: '', rating: 5, message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    }
  };

  return (
    <section ref={sectionRef} className="relative px-6 md:px-10 pt-32 md:pt-44 pb-28 max-w-[1600px] mx-auto">
      <div className="flex items-center gap-3 mb-6 fig-label">
        <span className="w-8 h-px bg-champagne inline-block" />
        <span>Client Love</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
        <h1 className="font-display font-medium text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05] max-w-2xl">
          Words from the celebrations we&apos;ve built<span className="text-champagne">.</span>
        </h1>
        {loadStatus === 'ready' && reviews.length > 0 && (
          <p className="coord-label text-oyster/50 shrink-0">
            {reviews.length} approved review{reviews.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* LEFT*/}
        <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
          <div
            className="blueprint-corners p-7 md:p-8"
            style={{ background: 'rgba(244,244,240,0.03)', border: '1px solid rgba(244,244,240,0.1)' }}
          >
            <div className="bc-tl" /><div className="bc-br" />

            <h2 className="font-display text-2xl mb-1">Share Your Experience</h2>
            <p className="text-oyster/50 text-sm mb-7">
              Reviews are checked by our team before they go live.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                className="field"
                type="text"
                placeholder="Your name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="field"
                type="text"
                placeholder="Event type (e.g. Wedding, Corporate Gala)"
                value={form.eventType}
                onChange={(e) => setForm({ ...form, eventType: e.target.value })}
              />

              <div>
                <p className="coord-label mb-2">Your rating</p>
                <StarPicker value={form.rating} onChange={(n) => setForm({ ...form, rating: n })} />
              </div>

              <textarea
                className="field resize-none"
                rows="4"
                placeholder="Tell us about your experience with Vista Events"
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />

              <button
                type="submit"
                className="btn-liquid w-full px-8 py-3.5 text-xs tracking-[0.2em] uppercase"
                data-cursor="magnetic"
                disabled={submitStatus === 'sending'}
              >
                <span>{submitStatus === 'sending' ? 'Submitting...' : 'Submit Review'}</span>
              </button>

              {submitStatus === 'success' && (
                <p className="text-champagne text-sm">
                  Thank you! Your review will appear here once approved.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>
        </div>

        {/* RIGHT*/}
        <div className="lg:col-span-8">
          {loadStatus === 'loading' && <p className="text-oyster/50 coord-label">Loading reviews…</p>}
          {loadStatus === 'error' && <p className="text-oyster/50">Couldn&apos;t load reviews right now.</p>}
          {loadStatus === 'ready' && reviews.length === 0 && (
            <p className="text-oyster/50">No reviews yet — be the first to share your experience.</p>
          )}

          {loadStatus === 'ready' && reviews.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {reviews.map((r) => (
                <div
                  key={r._id}
                  className="review-card blueprint-corners p-6 flex flex-col"
                  style={{ background: 'rgba(244,244,240,0.03)', border: '1px solid rgba(244,244,240,0.1)' }}
                >
                  <div className="bc-tl" /><div className="bc-br" />

                  <span className="font-display text-4xl text-champagne/40 leading-none mb-2">&ldquo;</span>

                  <p className="text-oyster/75 text-sm leading-relaxed mb-6 flex-1">{r.message}</p>

                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(244,244,240,0.1)' }}>
                    <Avatar name={r.name} />
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-base truncate">{r.name}</p>
                      {r.eventType && <p className="coord-label truncate">{r.eventType}</p>}
                    </div>
                    <span className="text-champagne text-sm shrink-0">{'★'.repeat(r.rating)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}