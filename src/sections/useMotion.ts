import { useEffect, useRef, useState } from 'react';

const REVEAL_OPTIONS: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Adds the `visible` class to every `.observe` element inside the ref'd
 * container once it scrolls into view. Replaces the observer block that was
 * copy-pasted in every section. With reduced motion (or no IntersectionObserver)
 * everything is shown immediately.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>('.observe'));

    if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) {
      targets.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }, REVEAL_OPTIONS);

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return ref;
}

/** True once the element has been on screen. Used to start bar animations
 *  when the bars themselves are visible, not just the section heading. */
export function useInViewOnce<T extends HTMLElement = HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/** Counts from 0 to `target` (ease-out) once `active` is true. */
export function useCountUp(target: number, active: boolean, delay = 0, duration = 1000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }

    let raf = 0;
    let start = 0;

    const timer = window.setTimeout(() => {
      const tick = (now: number) => {
        if (!start) start = now;
        const t = Math.min((now - start) / duration, 1);
        setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [target, active, delay, duration]);

  return value;
}
