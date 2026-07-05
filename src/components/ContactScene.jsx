import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PremiumGlass.css';
import { useSpotlight } from '../hooks/useSpotlight';
import FooterMetaBalls from './FooterMetaBalls';
import FallingText from './FallingText';

/**
 * CONTACT SCENE v2 — Immersive finale with interactive elements
 * 
 * Features:
 * - Animated section transitions
 * - Interactive email/social buttons
 * - Floating accent animations
 * - Premium footer with stats
 */

export default function ContactScene() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const ctaRef = useRef(null);
  const contactCardRef = useRef(null);
  const { onMouseMove: spotlightMove, onMouseLeave: spotlightLeave } = useSpotlight(contactCardRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reset',
        },
      });



      // Description fade in
      tl.to(
        '.contact-description',
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        },
        0.2
      );

      // CTA buttons stagger
      tl.to(
        '.contact-cta-btn',
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        },
        0.5
      );

      // Floating accent animation
      gsap.to('.contact-accent', {
        y: -20,
        duration: 3.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const title = 'GET IN TOUCH';

  return (
    <section
      id="contact"
      className="scene"
      ref={sectionRef}
      style={{
        paddingBottom: 'var(--space-16)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="sec-wrap"
        style={{
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {/* Section header */}
        <div
          style={{
            marginBottom: 'var(--space-12)',
          }}
        >
          <div
            className="reveal-up"
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: 'var(--text-xs)',
              color: 'var(--amber)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-4)',
              fontWeight: 700,
            }}
          >
            CONTACT ME
          </div>

          {/* Title with FallingText effect */}
          <div style={{
            fontFamily: 'Bebas Neue',
            fontSize: 'clamp(3rem, 12vw, 6.5rem)',
            marginBottom: 'var(--space-8)',
            lineHeight: 0.95,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            textShadow: '0 0 30px rgba(255, 51, 68, 0.2)',
            height: '150px',
            position: 'relative'
          }}>
            <FallingText
              text="GET IN TOUCH"
              highlightWords={["IN", "TOUCH"]}
              highlightClass="contact-highlight"
              trigger="scroll"
              backgroundColor="transparent"
              wireframes={false}
              gravity={0.56}
              fontSize="inherit"
              mouseConstraintStiffness={0.9}
            />
          </div>
        </div>

        <div
          ref={contactCardRef}
          className="glass-card-premium"
          style={{ padding: 'var(--space-12) var(--space-8)' }}
          onMouseMove={spotlightMove}
          onMouseLeave={spotlightLeave}
        >
          {/* Description */}
          <div
            className="contact-description reveal-up"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--cold2)',
              marginBottom: 'var(--space-12)',
              lineHeight: 1.8,
              opacity: 0,
              transform: 'translateY(30px)',
            }}
          >
            <p style={{ marginBottom: 'var(--space-6)' }}>
              Systems do not succeed by chance. They survive through flawless orchestration, strategic fail-safes, and absolute structural precision under pressure.
            </p>

            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
                fontFamily: 'DM Mono, monospace',
                color: 'var(--cold)',
                fontSize: 'var(--text-base)',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <span style={{ color: 'var(--amber)' }}>▸</span>
                High-Throughput Backend Infrastructures & System Orchestration
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <span style={{ color: 'var(--amber)' }}>▸</span>
                Low-Latency Optimization & High-Fidelity Data Pipelines
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <span style={{ color: 'var(--amber)' }}>▸</span>
                Full-Stack System Assembly with Obsessive Refinement
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'var(--space-4)',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="mailto:shyam666fg@gmail.com"
              className="btn-amber magnetic contact-cta-btn"
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
              }}
            >
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/shxam"
              target="_blank"
              rel="noreferrer"
              className="btn-outline magnetic contact-cta-btn"
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
              }}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/shxam69"
              target="_blank"
              rel="noreferrer"
              className="btn-outline magnetic contact-cta-btn"
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
              }}
            >
              GitHub Profile
            </a>
            <a
              href="https://wa.me/919543204277"
              target="_blank"
              rel="noreferrer"
              className="btn-outline magnetic contact-cta-btn"
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
              }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Accent elements */}
      <div className="contact-accent" style={{ position:'absolute', bottom:'20%', left:'10%', width:'250px', height:'250px', borderRadius:'50%', background:'radial-gradient(circle at 40% 40%, rgba(255, 51, 68, 0.1), transparent)', filter:'blur(50px)', pointerEvents:'none' }} />
      <div className="contact-accent" style={{ position:'absolute', top:'30%', right:'5%', width:'180px', height:'180px', borderRadius:'50%', background:'radial-gradient(circle, rgba(245, 166, 35, 0.08), transparent)', filter:'blur(40px)', pointerEvents:'none', animation:'float 4s ease-in-out infinite', animationDelay:'0.5s' }} />
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   FOOTER — Galaxy finale  (outside the contact section)
   ────────────────────────────────────────────────────────────── */
export { FooterMetaBalls };
