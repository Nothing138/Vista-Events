import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ContactPage() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll('#contact-page [data-scroll-line]').forEach((line) => {
        gsap.to(line, {
          yPercent: -110,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: line, start: 'top 90%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section
      id="contact-page"
      ref={sectionRef}
      className="relative px-6 md:px-10 pt-32 md:pt-44 pb-28 max-w-[1600px] mx-auto"
    >
      <div className="flex items-center gap-3 mb-10 fig-label">
        <span className="w-8 h-px bg-champagne inline-block" />
        <span>Begin the Commission</span>
      </div>

      <h1 className="font-display footer-headline text-[clamp(3rem,10vw,8rem)] font-medium mb-16 md:mb-24">
        <span className="reveal-mask block"><span className="reveal-line" data-scroll-line>Let&apos;s Build</span></span>
        <span className="reveal-mask block"><span className="reveal-line" data-scroll-line>It<span className="text-champagne">.</span></span></span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <p className="text-oyster/70 leading-relaxed max-w-sm mb-10">
            Tell us the outline of what you&apos;re imagining. A principal from the studio will respond
            within two business days with next steps.
          </p>
          <div className="space-y-3 coord-label text-oyster/60">
            <p>vistaevents01@gmail.com</p>
            <p>+880 1345 601310</p>
            <p>Sylhet — Moulovibazar — Habiganj — Sunamganj</p>
          </div>
        </div>

        <form className="lg:col-span-6 lg:col-start-7 space-y-8" onSubmit={handleSubmit}>
          <div>
            <input
              className="field"
              type="text"
              placeholder="Full name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <input
              className="field"
              type="email"
              placeholder="Email address"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <textarea
              className="field resize-none"
              rows="3"
              placeholder="Describe the occasion you're envisioning"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <button type="submit" className="btn-liquid px-8 py-3.5 text-xs tracking-[0.2em] uppercase" data-cursor="magnetic">
            <span>{status === 'sending' ? 'Sending...' : 'Submit Inquiry'}</span>
          </button>
          {status === 'success' && (
            <p className="text-champagne text-sm">Thank you — we&apos;ll be in touch soon.</p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  );
}


            