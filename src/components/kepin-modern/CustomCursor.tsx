import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC<{ isDark?: boolean }> = ({ isDark = false }) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -9999;
    let mouseY = -9999;
    let ringX = -9999;
    let ringY = -9999;
    let isVisible = false;
    let animId: number;

    const pushElements: HTMLElement[] = [];
    const refreshPushElements = () => {
      pushElements.length = 0;
      document.querySelectorAll<HTMLElement>('[data-push]').forEach((el) => {
        pushElements.push(el);
      });
    };
    refreshPushElements();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible && mouseX > 0) {
        isVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      // Check hover on interactive elements
      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest(
        'button, a, input, textarea, [role="button"], .clickable-image'
      );
      if (isInteractive) {
        ring.classList.add('cursor-ring-hot');
      } else {
        ring.classList.remove('cursor-ring-hot');
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      mouseX = -9999;
      mouseY = -9999;
    };

    const updateLoop = () => {
      // Direct placement for dot
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      // Smooth lerp for ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      // Magnetic push calculation on [data-push] elements
      const maxDistance = 140;
      const maxPush = 14;

      for (const el of pushElements) {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = centerX - mouseX;
        const dy = centerY - mouseY;
        const dist = Math.hypot(dx, dy);

        if (dist > maxDistance || dist === 0) {
          if (el.dataset.pushed === 'true') {
            el.style.transform = '';
            el.dataset.pushed = 'false';
          }
          continue;
        }

        const factor = (1 - dist / maxDistance) ** 2;
        const pushDist = maxPush * factor;
        const px = (dx / dist) * pushDist;
        const py = (dy / dist) * pushDist;

        el.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0)`;
        el.dataset.pushed = 'true';
      }

      animId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    animId = requestAnimationFrame(updateLoop);

    const observer = new MutationObserver(refreshPushElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
      observer.disconnect();
      for (const el of pushElements) {
        el.style.transform = '';
      }
    };
  }, []);

  return (
    <>
      {/* Center pinpoint */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full z-[120] transition-opacity duration-300 opacity-0 ${
          isDark ? 'bg-white' : 'bg-black'
        }`}
      />

      {/* Trailing smooth magnetic ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 w-9 h-9 rounded-full border z-[119] transition-[width,height,background-color,border-color,opacity] duration-200 opacity-0 ${
          isDark ? 'border-white/40' : 'border-black/35'
        }`}
      />

      <style>{`
        .cursor-ring-hot {
          width: 52px !important;
          height: 52px !important;
          background-color: rgba(255, 38, 56, 0.18) !important;
          border-color: #ff2638 !important;
          box-shadow: 0 0 20px rgba(255, 38, 56, 0.4) !important;
        }
      `}</style>
    </>
  );
};
