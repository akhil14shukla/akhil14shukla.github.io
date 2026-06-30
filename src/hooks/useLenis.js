import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setProgress as setWindProgress } from '../three/wind';
import { useStore } from '../store';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

// Smoothly scroll to a normalized journey position (0..1).
export function scrollToProgress(p) {
  if (!lenisInstance) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  lenisInstance.scrollTo(Math.max(0, Math.min(1, p)) * max, { duration: 1.6 });
}

// Inertial scroll → journey progress (drives the camera flight + station reveals).
export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisInstance = lenis;
    const setProgress = useStore.getState().setProgress;

    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      const limit = e.limit || 1;
      const p = Math.min(1, Math.max(0, e.scroll / limit));
      setWindProgress(p);
      setProgress(p);
      document.documentElement.style.setProperty('--progress', p.toFixed(4));
    });

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
