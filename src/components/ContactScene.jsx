import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PremiumGlass.css';
import { useSpotlight } from '../hooks/useSpotlight';
import FooterMetaBalls from './FooterMetaBalls';
import FallingText from './FallingText';
import { SOCIAL_LINKS } from '../data/socialLinks';
import { SiLeetcode } from 'react-icons/si';
import { trackEvent } from '../utils/analytics';

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

  const title = 'GET IN TOUCH';

  return (
    <section
      id="contact"
      className="scene"
      ref={sectionRef}
      style={{
        paddingBottom: 'var(--space-16)',
        position: 'relative'
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
            data-reveal="up"
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


          <div className="falling-heading-container" style={{
            fontFamily: 'Bebas Neue',
            fontSize: 'clamp(3rem, 10vw, 6rem)',
            marginTop: '40px',
            marginBottom: 'var(--space-8)',
            lineHeight: 1,
            fontWeight: 700,
            letterSpacing: '0.02em',
            position: 'relative',
            color: '#F8F8F8',
            zIndex: 10,
            padding: 0
          }}>
            <FallingText
              text="GET IN TOUCH"
              trigger="scroll"
              backgroundColor="transparent"
              wireframes={false}
              gravity={0.35}
              fontSize="inherit"
              mouseConstraintStiffness={0.3}
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
            className="contact-description"
            data-reveal="up"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--cold2)',
              marginBottom: 'var(--space-12)',
              lineHeight: 1.8,
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
              onClick={() => trackEvent('Contact Action Clicked', { type: 'Email' })}
              data-reveal="up"
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
              }}
            >
              EMAIL ME
            </a>
            <a
              href={SOCIAL_LINKS.LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline magnetic contact-cta-btn"
              onClick={() => trackEvent('LinkedIn Profile Clicked')}
              data-reveal="up"
            >
              LinkedIn
            </a>
            <a
              href={SOCIAL_LINKS.GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline magnetic contact-cta-btn"
              onClick={() => trackEvent('GitHub Clicked')}
              data-reveal="up"
            >
              GitHub Profile
            </a>
            <a
              href={SOCIAL_LINKS.LEETCODE}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LeetCode Profile"
              className="btn-outline magnetic contact-cta-btn"
              onClick={() => trackEvent('LeetCode Profile Clicked')}
              data-reveal="up"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <SiLeetcode size={16} />
              LeetCode
            </a>
            <a
              href={SOCIAL_LINKS.WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline magnetic contact-cta-btn"
              onClick={() => trackEvent('Contact Action Clicked', { type: 'WhatsApp' })}
              data-reveal="up"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Accent elements */}
      <div className="contact-accent" data-accent-animate="float" style={{ position:'absolute', bottom:'20%', left:'10%', width:'250px', height:'250px', borderRadius:'50%', background:'radial-gradient(circle at 40% 40%, rgba(255, 51, 68, 0.1), transparent)', filter:'blur(50px)', pointerEvents:'none' }} />
      <div className="contact-accent" data-accent-animate="float" style={{ position:'absolute', top:'30%', right:'5%', width:'180px', height:'180px', borderRadius:'50%', background:'radial-gradient(circle, rgba(245, 166, 35, 0.08), transparent)', filter:'blur(40px)', pointerEvents:'none', animationDelay:'0.5s' }} />
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   FOOTER — Galaxy finale  (outside the contact section)
   ────────────────────────────────────────────────────────────── */
export { FooterMetaBalls };
