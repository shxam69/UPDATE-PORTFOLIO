/**
 * StarBorder — subtle animated glow border for important CTAs only.
 *
 * Renders the wrapped element itself (default: 'button') as the glow
 * container — it does not introduce an extra DOM wrapper, so any GSAP/CSS
 * selector already targeting the original element's className keeps
 * working untouched. Two masked radial-gradient bands sweep slowly along
 * the top/bottom edges, clipped to the element's existing border-radius.
 *
 * Respects prefers-reduced-motion via CSS (see .star-border-glow in
 * index.css) — animation is disabled and the glow fades to a static,
 * low-opacity accent instead.
 */
export default function StarBorder({
  as: Component = 'button',
  color = 'var(--amber)',
  speed = '7s',
  className = '',
  children,
  ...rest
}) {
  const glowStyle = {
    background: `radial-gradient(circle, ${color}, transparent 12%)`,
    animationDuration: speed,
  };

  return (
    <Component className={`star-border-wrapper ${className}`} {...rest}>
      <span className="star-border-glow star-border-glow--bottom" style={glowStyle} aria-hidden="true" />
      <span className="star-border-glow star-border-glow--top" style={glowStyle} aria-hidden="true" />
      <span className="star-border-content">{children}</span>
    </Component>
  );
}
