"use client";

import { ReactLenis } from 'lenis/react';
import { useLenis } from 'lenis/react';
import { ReactNode, useEffect, useRef } from 'react';

const isScrollableInDirection = (target: EventTarget | null, direction: 'top' | 'bottom') => {
  if (!(target instanceof Element)) return false;

  let element: Element | null = target;
  while (element && element !== document.documentElement) {
    const { overflowY } = window.getComputedStyle(element);
    const canScroll = /(auto|scroll|overlay)/.test(overflowY) && element.scrollHeight > element.clientHeight + 1;

    if (canScroll) {
      const scrollable = element as HTMLElement;
      if (direction === 'bottom' && scrollable.scrollTop + scrollable.clientHeight < scrollable.scrollHeight - 1) return true;
      if (direction === 'top' && scrollable.scrollTop > 1) return true;
    }

    element = element.parentElement;
  }

  return false;
};

const OverscrollEffect = () => {
  const lenis = useLenis();
  const effectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lenis) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const effect = effectRef.current;
    if (!effect) return;

    let resetTimer: ReturnType<typeof setTimeout> | undefined;
    const showEdge = (direction: 'top' | 'bottom', amount: number) => {
      if (reducedMotion.matches) return;

      effect.dataset.edge = direction;
      effect.style.setProperty('--overscroll-progress', String(Math.min(1, Math.max(0.4, amount))));
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        effect.style.setProperty('--overscroll-progress', '0');
        delete effect.dataset.edge;
      }, 300);
    };

    const onVirtualScroll = ({ deltaY, event }: { deltaY: number; event: WheelEvent | TouchEvent }) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const direction = deltaY < 0 ? 'top' : 'bottom';
      const atBoundary = direction === 'top' ? window.scrollY <= 1 : window.scrollY >= maxScroll - 1;

      if (deltaY === 0 || !atBoundary || isScrollableInDirection(event.target, direction)) return;
      showEdge(direction, Math.abs(deltaY) / 48);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || target.matches('input, textarea, select, button, a, [role="button"]'))) return;

      const direction = ['ArrowUp', 'PageUp', 'Home'].includes(event.key)
        ? 'top'
        : ['ArrowDown', 'PageDown', 'End', ' '].includes(event.key)
          ? 'bottom'
          : null;
      if (!direction) return;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const atBoundary = direction === 'top' ? window.scrollY <= 1 : window.scrollY >= maxScroll - 1;
      if (atBoundary && !isScrollableInDirection(target, direction)) showEdge(direction, 0.4);
    };

    const unsubscribe = lenis.on('virtual-scroll', onVirtualScroll);
    window.addEventListener('keydown', onKeyDown, { passive: true });

    return () => {
      unsubscribe();
      window.removeEventListener('keydown', onKeyDown);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, [lenis]);

  return (
    <div ref={effectRef} className="overscroll-effect" aria-hidden="true">
      <span className="overscroll-effect__edge overscroll-effect__edge--top" />
      <span className="overscroll-effect__edge overscroll-effect__edge--bottom" />
    </div>
  );
};

export const LenisProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      {children}
      <OverscrollEffect />
    </ReactLenis>
  );
};
