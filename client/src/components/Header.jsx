import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logoSmall from '../assets/vista-events-logo-small.jpg';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Packages', href: '/packages' },
  { label: 'Client Love', href: '/reviews' },
];

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 200);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`px-6 md:px-10 py-5 ${hidden ? 'nav-hidden' : ''}`}>
        <div className="flex items-center justify-between max-w-[1600px] mx-auto">
          <Link to="/" className="iridescent-sheen flex items-center gap-3" data-cursor="magnetic">
            <img src={logoSmall} alt="Vista Events" className="h-11 md:h-12 w-auto rounded-sm" />
            <span className="hidden md:flex flex-col leading-tight">
              <span className="font-display text-lg tracking-widest">VISTA EVENTS</span>
              <span className="coord-label text-[0.6rem] tracking-[0.2em]">
                Designing Moments | Defining Memories
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10 text-xs tracking-[0.2em] uppercase text-oyster/80">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="hover:text-champagne transition-colors duration-500"
                data-cursor="magnetic"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="magnetic-btn hidden sm:inline-flex px-5 py-2.5 text-xs tracking-[0.2em] uppercase"
              data-cursor="magnetic"
            >
              <span>Book a Consultation</span>
            </Link>
            <button
              className="flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
              aria-label="Open menu"
              data-cursor="magnetic"
              onClick={() => setMenuOpen(true)}
            >
              <span className="block w-6 h-px bg-oyster" />
              <span className="block w-6 h-px bg-oyster" />
            </button>
          </div>
        </div>
      </header>

      <div
        className="fixed inset-0 z-[199] bg-vantage flex flex-col items-center justify-center gap-8"
        style={{
          transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform .7s var(--ease-vista)',
        }}
      >
        <Link to="/" className="font-display text-4xl" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="font-display text-4xl"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link to="/contact" className="font-display text-4xl" onClick={() => setMenuOpen(false)}>
          Contact
        </Link>
        <button
          className="mt-10 text-xs tracking-[0.3em] uppercase text-champagne"
          onClick={() => setMenuOpen(false)}
        >
          Close
        </button>
      </div>
    </>
  );
}