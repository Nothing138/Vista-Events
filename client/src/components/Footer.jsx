import { Link } from 'react-router-dom';
import logoSmall from '../assets/vista-events-logo-small.jpg';

const COT360_URL = '#';

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/EventsByVista',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M13.5 21v-8.2h2.75l.41-3.19h-3.16V7.55c0-.92.26-1.55 1.58-1.55h1.68V3.14C15.98 3.1 15.02 3 13.9 3c-2.34 0-3.94 1.43-3.94 4.05v2.56H7.2v3.19h2.76V21h3.54Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/eventsbyvista',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@vista.events4',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M16.5 3c.4 2.2 1.8 3.7 4 3.9v2.6c-1.4 0-2.8-.4-4-1.2v6.4c0 3-2.4 5.3-5.3 5.3S5.9 17.7 5.9 14.7c0-2.9 2.3-5.3 5.2-5.3.3 0 .6 0 .9.1v2.7c-.3-.1-.6-.2-.9-.2-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7 2.8-1.1 2.8-2.7V3h2.6Z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/8801345601310',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Zm0 1.8a7.2 7.2 0 0 1 6.2 10.9l-.3.5.6 2.3-2.3-.6-.5.3A7.2 7.2 0 1 1 12 4.8Zm-3.1 3.4c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.8 4.5 3.8 2.2.8 2.7.7 3.1.6.6-.1 1.8-.7 2.1-1.4.2-.7.2-1.2.2-1.4l-.3-.2c-.2-.1-1.2-.6-1.4-.7-.2-.1-.4-.1-.5.1-.2.2-.6.7-.7.9-.1.1-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.4c.1-.2.1-.3.2-.5v-.5c-.1-.2-.6-1.4-.8-1.9-.2-.5-.4-.4-.5-.4h-.5Z" />
      </svg>
    ),
  },
  {
    label: 'Call',
    href: 'tel:+8801345601310',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M6.6 10.8c1.3 2.5 3.3 4.5 5.8 5.8l1.9-1.9c.2-.2.6-.3.9-.2 1 .3 2.1.5 3.2.5.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 3.9c0-.6.4-1 1-1h3.9c.6 0 1 .4 1 1 0 1.1.2 2.2.5 3.2.1.3 0 .7-.2.9L6.6 10.8Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative px-6 md:px-10 pt-20 pb-10 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12">
          <h2 className="font-display footer-headline text-[clamp(2.25rem,6vw,4.5rem)] font-medium">
            Ready to build<br />something unforgettable<span className="text-champagne">?</span>
          </h2>
          <Link
            to="/contact"
            className="btn-liquid px-8 py-3.5 text-xs tracking-[0.2em] uppercase w-fit"
            data-cursor="magnetic"
          >
            <span>Begin the Commission</span>
          </Link>
        </div>

        {/* Social row */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              data-cursor="magnetic"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-300"
              style={{
                border: '1px solid rgba(227,200,116,0.4)',
                color: 'var(--color-champagne)',
                background: 'rgba(227,200,116,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-champagne)';
                e.currentTarget.style.color = 'var(--color-vantage)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(227,200,116,0.06)';
                e.currentTarget.style.color = 'var(--color-champagne)';
              }}
            >
              {s.icon}
            </a>
          ))}
        </div>

        <div className="divider-gold mb-10" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-oyster/40 tracking-wide">
          <img src={logoSmall} alt="Vista Events" className="h-9 w-auto rounded-sm" />
          <span>© 2026 Vista Events. Designing Moments | Defining Memories.</span>
          
          <a
            href={COT360_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-champagne transition-colors"
            data-cursor="magnetic"
          >
            Built by<span className="text-champagne"> COT360</span>
          </a>
        </div>
      </div>
    </footer>
  );
}