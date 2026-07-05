import { useCallback } from 'react';

/**
 * useSpotlight — sets CSS variables --mx / --my on the element
 * so PremiumGlass.css can render a radial gradient spotlight
 * that follows the cursor. Zero JS animation, pure CSS perf.
 */
export function useSpotlight(ref) {
  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--mx', `${x}%`);
      el.style.setProperty('--my', `${y}%`);
    },
    [ref]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '50%');
  }, [ref]);

  return { onMouseMove, onMouseLeave };
}
