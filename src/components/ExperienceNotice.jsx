import { useState, useEffect, useRef } from 'react';
import { useStore } from '../store';
import { trackEvent } from '../utils/analytics';
import { startAmbient } from '../hooks/useAudio';

export default function ExperienceNotice() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const activeTrack = useStore((state) => state.activeTrack);
  const setExperienceUnlocked = useStore((state) => state.setExperienceUnlocked);
  const previousFocusRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Safely check sessionStorage
    let hasConfirmed = 'false';
    try {
      hasConfirmed = window.sessionStorage.getItem('portfolio-privacy-confirmed');
    } catch (err) {
      console.warn('sessionStorage access denied or unavailable.', err);
    }
    
    if (hasConfirmed === 'true') return;

    // Show modal
    previousFocusRef.current = document.activeElement;
    setIsVisible(true);
    
    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';

    // Auto focus the confirm button
    setTimeout(() => {
      if (buttonRef.current) buttonRef.current.focus();
    }, 100);

    return () => {
      // Cleanup scroll lock if component unmounts unexpectedly
      document.body.style.overflow = '';
    };
  }, []);

  const handleConfirm = () => {
    setIsClosing(true);
    
    // Start ambient music and notify UI
    startAmbient();
    window.dispatchEvent(new Event('ambient-started'));
    
    // Restore focus and scroll
    if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
      previousFocusRef.current.focus();
    }
    document.body.style.overflow = '';
    
    trackEvent('Portfolio Entered');

    setTimeout(() => {
      try {
        window.sessionStorage.setItem('portfolio-privacy-confirmed', 'true');
      } catch (err) {
        console.warn('Could not save to sessionStorage', err);
      }
      setExperienceUnlocked(true);
      setIsVisible(false);
    }, 400); // Matches transition duration
  };

  // Keep focus trapped within the modal by preventing Tab away if button is only element
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (buttonRef.current) buttonRef.current.focus();
    }
    // Explicitly NO escape key dismissal based on prompt
  };

  if (!isVisible) return null;

  const accentColor = activeTrack === 'ml' ? 'var(--cyan)' : 'var(--amber)';
  const accentGlow = activeTrack === 'ml' ? 'var(--cyan-glow)' : 'var(--amber-glow)';

  // Handle prefers-reduced-motion via JS
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;
  const transitionStyle = prefersReducedMotion ? 'none' : '0.4s cubic-bezier(0.16, 1, 0.3, 1)';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="experience-notice-title"
      onKeyDown={handleKeyDown}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999999, // Ensure it's above everything including Canvas
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        opacity: isClosing ? 0 : 1,
        transition: `opacity ${transitionStyle}`,
        padding: '24px'
      }}
    >
      <div
        style={{
          background: 'rgba(5, 5, 5, 0.85)',
          border: `1px solid rgba(255, 255, 255, 0.1)`,
          borderRadius: '8px',
          padding: '40px 32px',
          maxWidth: '460px',
          width: '100%',
          textAlign: 'center',
          boxShadow: `0 16px 48px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255,255,255,0.03)`,
          transform: isClosing ? 'scale(0.98) translateY(10px)' : 'scale(1) translateY(0)',
          transition: `transform ${transitionStyle}`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          boxShadow: `0 0 10px ${accentGlow}`
        }} />

        <h2 
          id="experience-notice-title"
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '1rem',
            letterSpacing: '0.15em',
            color: accentColor,
            textTransform: 'uppercase',
            marginBottom: '20px',
            fontWeight: 700
          }}
        >
          PRIVACY & EXPERIENCE NOTICE
        </h2>
        
        <div style={{
          fontSize: '0.95rem',
          color: 'var(--cold2, rgba(255, 255, 255, 0.75))',
          lineHeight: 1.6,
          marginBottom: '32px',
          fontFamily: 'Inter, system-ui, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <p>
            This portfolio uses local browser storage to remember your viewing preferences and selected experience mode, and collects anonymous usage analytics. No sensitive personal information is processed.
          </p>
          <p>
            For the best cinematic experience, use a desktop device. On mobile, landscape orientation is recommended.
          </p>
        </div>

        <button
          ref={buttonRef}
          onClick={handleConfirm}
          style={{
            background: 'transparent',
            border: `1px solid rgba(255,255,255,0.2)`,
            color: 'white',
            padding: '16px 28px',
            borderRadius: '4px',
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: `all 0.3s ease`,
            width: '100%',
            minHeight: '48px', // Mobile touch target size
            outline: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = `1px solid ${accentColor}`;
            e.currentTarget.style.boxShadow = `0 0 15px ${accentGlow}`;
            e.currentTarget.style.color = accentColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.border = `1px solid rgba(255,255,255,0.2)`;
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.color = 'white';
          }}
          onFocus={(e) => {
            e.currentTarget.style.border = `1px solid ${accentColor}`;
            e.currentTarget.style.boxShadow = `0 0 0 2px ${accentColor}`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.border = `1px solid rgba(255,255,255,0.2)`;
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          CONFIRM & ENTER
        </button>
      </div>
    </div>
  );
}
