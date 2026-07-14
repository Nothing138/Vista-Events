import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onComplete }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete });

    tl.to('#preloader-text', { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' })
      .to('#preloader-tagline', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .to('#preloader-text', { opacity: 0, scale: 1.15, duration: 0.7, ease: 'power2.in' }, '+=0.35')
      .to('#preloader-tagline', { opacity: 0, duration: 0.4, ease: 'power2.in' }, '<')
      .to(rootRef.current, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '-=0.3');

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div id="preloader" ref={rootRef}>
      <h1 className="font-display" id="preloader-text">VISTA</h1>
      <p id="preloader-tagline">Designing Moments | Defining Memories</p>
    </div>
  );
}