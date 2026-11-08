'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** IntersectionObserver threshold (0..1). */
  threshold?: number;
  /** Render a custom element instead of a div. */
  as?: 'div' | 'section' | 'li' | 'span';
}

/**
 * Generic scroll-reveal wrapper. Adds `.is-visible` (defined in globals.css)
 * once the element enters the viewport, then stops observing.
 */
export function Reveal({ children, className = '', threshold = 0.15, as = 'div' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            observer.disconnect();
          }
        });
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const Tag = as as 'div';
  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()}>
      {children}
    </Tag>
  );
}
