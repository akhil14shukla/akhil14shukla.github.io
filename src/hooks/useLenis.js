import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Module-scoped Lenis instance + scroll progress, so the WebGL frame loop and
// the query bar can read/drive scroll without prop-drilling.
let lenisInstance = null;
const seasonRef = { value: 0 }; // 0 = hero (snow) → 1 = bottom (windswept fields)

// Scroll progress 0..1 across the whole document, eased toward by the shader.
export function getSeason() {
  return seasonRef.value;
}

// Smoothly scroll to a section id (e.g. a cluster) from the query bar.
export function scrollToId(id) {
  if (!id || !lenisInstance) return;
  lenisInstance.scrollTo('#' + id, { offset: -40, duration: 1.4 });
}

// Buttery inertial scroll, synced to GSAP's ticker so ScrollTrigger stays in lockstep.
export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisInstance = lenis;

    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      // limit ∈ [0,1] — how far down the document we've scrolled
      const limit = e.limit || 1;
      seasonRef.value = Math.min(1, Math.max(0, e.scroll / limit));
      // expose to CSS so the sky/ridge layers can shift with the season
      document.documentElement.style.setProperty('--season', seasonRef.value.toFixed(3));
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
