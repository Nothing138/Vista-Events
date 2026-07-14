import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useSmoothScroll(enabled) {
  useEffect(() => {
    if (!enabled) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let current = 0;
    let target = 0;
    const ease = 0.085;
    let rafId;

    function raf() {
      target = window.scrollY;
      current += (target - current) * ease;
      if (Math.abs(target - current) < 0.05) current = target;
      ScrollTrigger.update();
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => cancelAnimationFrame(rafId);
  }, [enabled]);
}