import { useRef, useEffect, useCallback } from 'react';

/**
 * FooterMetaBalls — Apple-keynote-ending aesthetic
 * Chrome / silver orbs, slow drifting, mouse-attracted, no glow, no color.
 * Pure canvas — zero external deps beyond React.
 */
export default function FooterMetaBalls() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Resize handler
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Blob definitions — silver-chrome palette
    const BLOB_COUNT = 6;
    const blobs = Array.from({ length: BLOB_COUNT }, (_, i) => ({
      x: (canvas.width / (BLOB_COUNT + 1)) * (i + 1),
      y: canvas.height * 0.4 + Math.random() * canvas.height * 0.2,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.18,
      r: 80 + Math.random() * 70,      // large radius
      phase: Math.random() * Math.PI * 2,
    }));

    // MetaBall field: sum of 1/r^2 weighted by radius
    // We render via offscreen ImageData for performance
    const THRESHOLD = 1.0;
    const MOUSE_ATTRACT = 0.0018;   // gentle mouse pull

    const draw = (t) => {
      const W = canvas.width;
      const H = canvas.height;
      if (!W || !H) return;

      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update blobs: slow drift + mouse attraction + bounce
      blobs.forEach((b) => {
        // Slow breathing size oscillation
        const breathe = 1 + 0.06 * Math.sin(t * 0.0006 + b.phase);
        b._r = b.r * breathe;

        // Mouse attraction (gentle)
        if (mx > 0 && mx < W) {
          const dx = mx - b.x;
          const dy = my - b.y;
          const d2 = dx * dx + dy * dy + 1;
          b.vx += dx / d2 * MOUSE_ATTRACT * b.r;
          b.vy += dy / d2 * MOUSE_ATTRACT * b.r;
        }

        // Apply velocity with damping
        b.vx *= 0.986;
        b.vy *= 0.986;
        b.x += b.vx;
        b.y += b.vy;

        // Soft boundary bounce
        const margin = b.r * 0.5;
        if (b.x < margin)       { b.vx += 0.25; }
        if (b.x > W - margin)   { b.vx -= 0.25; }
        if (b.y < margin)       { b.vy += 0.25; }
        if (b.y > H - margin)   { b.vy -= 0.25; }
      });

      // ── Render via SVG filter trick (fast, no per-pixel loop) ──
      // Draw each blob as a filled circle, then apply SVG gooey filter
      // The filter is defined in the JSX and referenced here via CSS filter.
      // This gives the classic metaball "merge" look.
      blobs.forEach((b) => {
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b._r);
        // Chrome / silver — no hue, pure luminance gradient
        grad.addColorStop(0,   'rgba(200, 205, 210, 0.9)');
        grad.addColorStop(0.3, 'rgba(160, 168, 178, 0.75)');
        grad.addColorStop(0.65,'rgba(110, 118, 130, 0.45)');
        grad.addColorStop(1,   'rgba(80,  88,  100, 0)');
        ctx.beginPath();
        ctx.arc(b.x, b.y, b._r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '320px',
        overflow: 'hidden',
        // SVG filter for the metaball "gooey merge" effect
        filter: 'url(#footer-metaball-filter)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      {/* SVG filter definition — defines threshold that creates the merge */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="footer-metaball-filter" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              /* threshold at alpha=0.5; keep silver, no color shift */
              values="1 0 0 0 0
                      1 0 0 0 0
                      1 0 0 0 0
                      0 0 0 26 -8"
              result="cm"
            />
            {/* Desaturate fully — enforce chrome/silver, no rainbow */}
            <feColorMatrix
              in="cm"
              type="saturate"
              values="0.05"
            />
          </filter>
        </defs>
      </svg>

      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          background: 'transparent',
        }}
      />
    </div>
  );
}
