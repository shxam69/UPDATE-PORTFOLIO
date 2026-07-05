import { useState, useCallback, useEffect, useRef } from 'react';
import { startAmbient, stopAmbient } from '../hooks/useAudio';

const PREF_KEY = 'ambient-music-enabled';

function getStoredPref() {
  try { return localStorage.getItem(PREF_KEY) === 'true'; } catch { return false; }
}
function setStoredPref(val) {
  try { localStorage.setItem(PREF_KEY, val ? 'true' : 'false'); } catch {}
}

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(true);
  const startedRef = useRef(false);

  // On mount: if user had it on before, resume (but only after first interaction)
  useEffect(() => {
    if (getStoredPref()) {
      // Can't autoplay — wait for first user interaction
      const handleFirst = () => {
        if (!startedRef.current) {
          startedRef.current = true;
          startAmbient();
          setPlaying(true);
        }
        window.removeEventListener('click', handleFirst);
        window.removeEventListener('keydown', handleFirst);
      };
      window.addEventListener('click', handleFirst, { once: true });
      window.addEventListener('keydown', handleFirst, { once: true });
    }
  }, []);

  const toggle = useCallback(() => {
    if (playing) {
      stopAmbient();
      setPlaying(false);
      setStoredPref(false);
      startedRef.current = false;
    } else {
      startAmbient();
      setPlaying(true);
      setStoredPref(true);
      startedRef.current = true;
    }
  }, [playing]);

  // Keyboard shortcut: M to toggle
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'm' || e.key === 'M') toggle();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggle]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '8px',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
      aria-label="Ambient music controls"
    >
      {/* Tooltip */}
      <div
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          transition: 'opacity 0.3s',
          textAlign: 'right',
        }}
      >
        {playing ? 'Ambient ON  ·  M to toggle' : '♫ Ambient  ·  M to toggle'}
      </div>

      {/* Pill button */}
      <button
        onClick={toggle}
        aria-label={playing ? 'Pause ambient music' : 'Play ambient music'}
        aria-pressed={playing}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 18px',
          background: playing
            ? 'rgba(245, 166, 35, 0.12)'
            : 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: playing
            ? '1px solid rgba(245, 166, 35, 0.35)'
            : '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '999px',
          cursor: 'pointer',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: playing
            ? '0 0 20px rgba(245, 166, 35, 0.15), 0 4px 16px rgba(0,0,0,0.4)'
            : '0 4px 16px rgba(0,0,0,0.3)',
          color: playing ? 'var(--amber)' : 'var(--cold2)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px) scale(1.04)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
        }}
      >
        {/* Icon */}
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '20px',
            height: '20px',
          }}
        >
          {playing ? (
            /* Equalizer bars animation when playing */
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="1" y="6" width="2.5" height="10" rx="1" fill="currentColor" opacity="0.8">
                <animate attributeName="height" values="10;4;10;7;10" dur="1.2s" repeatCount="indefinite"/>
                <animate attributeName="y" values="6;9;6;7.5;6" dur="1.2s" repeatCount="indefinite"/>
              </rect>
              <rect x="5" y="3" width="2.5" height="13" rx="1" fill="currentColor">
                <animate attributeName="height" values="13;7;13;5;13" dur="0.9s" repeatCount="indefinite"/>
                <animate attributeName="y" values="3;6.5;3;8;3" dur="0.9s" repeatCount="indefinite"/>
              </rect>
              <rect x="9" y="5" width="2.5" height="11" rx="1" fill="currentColor" opacity="0.9">
                <animate attributeName="height" values="11;5;11;8;11" dur="1.05s" repeatCount="indefinite"/>
                <animate attributeName="y" values="5;8;5;7;5" dur="1.05s" repeatCount="indefinite"/>
              </rect>
              <rect x="13" y="7" width="2.5" height="9" rx="1" fill="currentColor" opacity="0.7">
                <animate attributeName="height" values="9;3;9;6;9" dur="0.8s" repeatCount="indefinite"/>
                <animate attributeName="y" values="7;10;7;8;7" dur="0.8s" repeatCount="indefinite"/>
              </rect>
            </svg>
          ) : (
            /* Music note when paused */
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 12V4l7-1.5V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="4.5" cy="12" r="1.5" fill="currentColor"/>
              <circle cx="11.5" cy="10.5" r="1.5" fill="currentColor"/>
            </svg>
          )}
        </span>

        {/* Label */}
        <span
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.62rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          {playing ? 'Ambient' : '♫ Ambient'}
        </span>
      </button>
    </div>
  );
}
