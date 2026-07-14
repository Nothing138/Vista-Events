import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const activeMagnetic = useRef(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(max-width: 860px)').matches;
    if (isTouch) return;

    const dotPos = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (activeMagnetic.current) {
        const el = activeMagnetic.current;
        const r = el.getBoundingClientRect();
        const relX = e.clientX - (r.left + r.width / 2);
        const relY = e.clientY - (r.top + r.height / 2);
        gsap.to(el, { x: relX * 0.25, y: relY * 0.25, duration: 0.5, ease: 'power3.out' });
      }
    };
    window.addEventListener('mousemove', handleMove);

    const tick = () => {
      dotPos.x += (mouse.x - dotPos.x) * 0.5;
      dotPos.y += (mouse.y - dotPos.y) * 0.5;
      ringPos.x += (mouse.x - ringPos.x) * 0.18;
      ringPos.y += (mouse.y - ringPos.y) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate(${dotPos.x}px, ${dotPos.y}px) translate(-50%,-50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%,-50%)`;
    };
    gsap.ticker.add(tick);

    const handleOver = (e) => {
      const magnetic = e.target.closest('[data-cursor="magnetic"]');
      const view = e.target.closest('[data-cursor="view"]');

      if (magnetic) {
        activeMagnetic.current = magnetic;
        ringRef.current?.classList.add('is-magnetic');
      }
      if (view) {
        ringRef.current?.classList.add('is-view');
      }
    };

    const handleOut = (e) => {
      const magnetic = e.target.closest('[data-cursor="magnetic"]');
      const view = e.target.closest('[data-cursor="view"]');

      if (magnetic) {
        ringRef.current?.classList.remove('is-magnetic');
        gsap.to(magnetic, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
        activeMagnetic.current = null;
      }
      if (view) {
        ringRef.current?.classList.remove('is-view');
      }
    };

    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      gsap.ticker.remove(tick);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}