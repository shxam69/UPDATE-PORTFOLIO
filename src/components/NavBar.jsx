/**
 * NavBar.jsx — Premium Cinematic Navigation
 * ─────────────────────────────────────────
 * Features:
 *  • Glassmorphism styling consistent with existing design system
 *  • Scroll-hide / scroll-show (hides on scroll down, reveals on scroll up)
 *  • Active section highlighting via IntersectionObserver
 *  • Smooth-scroll navigation (works with Lenis)
 *  • Downloadable Resume CTA button (premium amber style)
 *  • Mobile hamburger menu with animated drawer
 *  • Full keyboard accessibility (aria attributes, focus trapping on mobile)
 *  • Reduced-motion aware
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useStore } from '../store';
import { TRACK_CONTENT } from '../data/trackContent';
import StarBorder from './StarBorder';

// ─── Navigation items ────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'About',          href: '#about',          sectionId: 'about'          },
  { label: 'Skills',         href: '#skills',         sectionId: 'skills'         },
  { label: 'Experience',     href: '#experience',     sectionId: 'experience'     },
  { label: 'Projects',       href: '#projects',       sectionId: 'projects'       },
  { label: 'Certifications', href: '#certifications', sectionId: 'certifications' },
  { label: 'Contact',        href: '#contact',        sectionId: 'contact'        },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

// Fallback resume (used only if track data is ever missing)
const FALLBACK_RESUME_PDF_PATH = '/resume.pdf';
const FALLBACK_RESUME_FILENAME = 'ShyamA_Resume.pdf';

// ─── NavBar component ────────────────────────────────────────────────────────
export default function NavBar() {
  const [visible,      setVisible]      = useState(true);
  const [scrolled,     setScrolled]     = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen,   setMobileOpen]   = useState(false);

  const activeTrack   = useStore((state) => state.activeTrack);
  const setActiveTrack = useStore((state) => state.setActiveTrack);
  const track = TRACK_CONTENT[activeTrack] || TRACK_CONTENT.software;

  const lastScrollY  = useRef(0);
  const ticking      = useRef(false);
  const navRef        = useRef(null);
  const mobileMenuRef = useRef(null);

  // ── Career Mode switch: single entry point for the whole transition ──────
  // Fade current content -> smooth-scroll to top (Lenis) -> swap track
  // (refreshes Projects/Skills/Hero identity/resume reactively) -> fade
  // back in. Hero's entrance animation replays itself via `heroReplayKey`
  // (bumped inside setActiveTrack) — no DOM coupling needed here.
  const handleTrackSwitch = useCallback((nextTrack) => {
    if (nextTrack === activeTrack) return;
    setMobileOpen(false);

    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 0.7 });
    } else if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const content = document.getElementById('main-content');

    if (!content || prefersReducedMotion()) {
      setActiveTrack(nextTrack);
      return;
    }

    gsap.to(content, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setActiveTrack(nextTrack);
        gsap.fromTo(content, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      },
    });
  }, [activeTrack, setActiveTrack]);

  // ── Scroll-hide / scroll-show + glass intensity ──────────────────────────
  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;

    requestAnimationFrame(() => {
      const currentY = window.scrollY;
      const delta    = currentY - lastScrollY.current;

      // Show nav when: scrolling up, or near top of page
      if (currentY < 80 || delta < -8) {
        setVisible(true);
      } else if (delta > 8) {
        setVisible(false);
        setMobileOpen(false); // close menu on scroll-hide
      }

      // Thicken glass once user has scrolled past hero
      setScrolled(currentY > 60);

      lastScrollY.current = currentY;
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // ── Active section via IntersectionObserver ───────────────────────────────
  useEffect(() => {
    const sectionIds = ['hero', ...NAV_LINKS.map(l => l.sectionId)];

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry that is most visible in the viewport
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        // Trigger when the middle 40 % of the section enters the viewport
        rootMargin: '-30% 0px -30% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
      }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ── Smooth-scroll handler (compatible with Lenis) ─────────────────────────
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMobileOpen(false);

    const targetId = href.replace('#', '');
    const target   = document.getElementById(targetId);
    if (!target) return;

    // If Lenis is attached to window.__lenis, use it for smooth scroll
    if (window.__lenis) {
      window.__lenis.scrollTo(target, { offset: -80, duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // ── Mobile menu focus trap ────────────────────────────────────────────────
  useEffect(() => {
    if (!mobileOpen) return;

    const menu = mobileMenuRef.current;
    if (!menu) return;

    const focusable = menu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    function trapFocus(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    function closeOnEsc(e) {
      if (e.key === 'Escape') setMobileOpen(false);
    }

    menu.addEventListener('keydown', trapFocus);
    document.addEventListener('keydown', closeOnEsc);
    first?.focus();

    return () => {
      menu.removeEventListener('keydown', trapFocus);
      document.removeEventListener('keydown', closeOnEsc);
    };
  }, [mobileOpen]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Main navbar ─────────────────────────────────────────────────── */}
      <header
        ref={navRef}
        className={[
          'navbar',
          visible  ? 'navbar--visible'  : 'navbar--hidden',
          scrolled ? 'navbar--scrolled' : '',
        ].join(' ')}
        role="banner"
      >
        {/* Logo */}
        <a
          href="#hero"
          className="navbar__logo magnetic"
          onClick={e => handleNavClick(e, '#hero')}
          aria-label="Shyam A — back to top"
        >
          SH<em>Y</em>AM A
        </a>

        {/* Desktop nav links */}
        <nav className="navbar__links" aria-label="Primary navigation">
          <ul role="list">
            {NAV_LINKS.map(({ label, href, sectionId }) => (
              <li key={sectionId}>
                <a
                  href={href}
                  className={[
                    'navbar__link magnetic',
                    activeSection === sectionId ? 'navbar__link--active' : '',
                  ].join(' ')}
                  onClick={e => handleNavClick(e, href)}
                  aria-current={activeSection === sectionId ? 'page' : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right cluster: career mode + status + resume */}
        <div className="navbar__right">
          {/* Career Mode toggle removed and moved to CareerNotch */}

          {/* Available indicator */}
          <style>{`
            @keyframes status-pulse {
              0% { transform: scale(0.9); opacity: 0.7; }
              50% { transform: scale(1.1); opacity: 1; }
              100% { transform: scale(0.9); opacity: 0.7; }
            }
            @media (prefers-reduced-motion: reduce) {
              .navbar__status-dot {
                animation: none !important;
                transform: scale(1) !important;
                opacity: 1 !important;
              }
            }
          `}</style>
          <div 
            className="navbar__status" 
            aria-label="Availability status: Available"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: '#f8fafc',
            }}
          >
            <span 
              className="navbar__status-dot"
              aria-hidden="true" 
              style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                boxShadow: '0 0 12px rgba(34, 197, 94, 0.4)',
                animation: 'status-pulse 2s ease-in-out infinite'
              }}
            />
            AVAILABLE
          </div>

          {/* Resume CTA — swaps with Career Mode */}
          <a
            href={track.resumeHref || FALLBACK_RESUME_PDF_PATH}
            download={track.resumeFilename || FALLBACK_RESUME_FILENAME}
            className="navbar__resume magnetic"
            aria-label={`Download ${track.shortLabel} resume PDF`}
          >
            <span className="navbar__resume-icon" aria-hidden="true">
              {/* Inline SVG arrow-down icon — no external dependency */}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6 1v7M3 6l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 10h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </span>
            <span>Resume</span>
          </a>

          {/* Mobile hamburger */}
          <button
            className={['navbar__burger', mobileOpen ? 'navbar__burger--open' : ''].join(' ')}
            onClick={() => setMobileOpen(prev => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={['mobile-menu', mobileOpen ? 'mobile-menu--open' : ''].join(' ')}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <nav aria-label="Mobile navigation">
          <ul role="list" className="mobile-menu__list">
            {NAV_LINKS.map(({ label, href, sectionId }, i) => (
              <li
                key={sectionId}
                className="mobile-menu__item"
                style={{ '--item-index': i }}
              >
                <a
                  href={href}
                  className={[
                    'mobile-menu__link',
                    activeSection === sectionId ? 'mobile-menu__link--active' : '',
                  ].join(' ')}
                  onClick={e => handleNavClick(e, href)}
                  aria-current={activeSection === sectionId ? 'page' : undefined}
                  tabIndex={mobileOpen ? 0 : -1}
                >
                  <span className="mobile-menu__index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Resume CTA inside drawer */}
        <div className="mobile-menu__footer">
          {/* Career Mode toggle removed and moved to CareerNotch */}

          <a
            href={track.resumeHref || FALLBACK_RESUME_PDF_PATH}
            download={track.resumeFilename || FALLBACK_RESUME_FILENAME}
            className="navbar__resume navbar__resume--full magnetic"
            tabIndex={mobileOpen ? 0 : -1}
            aria-label={`Download ${track.shortLabel} resume PDF`}
          >
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M6 1v7M3 6l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 10h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Download Resume
          </a>

          <div className="navbar__status mobile-menu__status" aria-label="Availability status: Available">
            <span className="pulse-dot" aria-hidden="true" />
            Available for opportunities
          </div>
        </div>
      </div>

      {/* ── Mobile backdrop ──────────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="mobile-menu__backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
