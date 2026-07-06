import { useEffect, useRef, useState } from 'react';

export default function CinematicQuote() {
  const containerRef = useRef(null);
  
  const line1 = "The best systems don't just solve problems.";
  const line2 = "They are remembered.";
  
  const [visibleText1, setVisibleText1] = useState('');
  const [visibleText2, setVisibleText2] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [cursorFading, setCursorFading] = useState(false);
  
  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false;

    if (prefersReducedMotion) {
      setVisibleText1(line1);
      setVisibleText2(line2);
      setShowCursor(false);
      return;
    }

    let observer;
    let timeouts = [];
    let isTyping = false;

    const clearTimeouts = () => {
      timeouts.forEach(clearTimeout);
      timeouts = [];
    };

    const typeQuote = () => {
      if (isTyping) return;
      isTyping = true;
      clearTimeouts();
      setVisibleText1('');
      setVisibleText2('');
      setShowCursor(true);
      setCursorVisible(true);
      setCursorFading(false);
      
      let delay = 0;
      
      // Type line 1
      for (let i = 0; i <= line1.length; i++) {
        timeouts.push(setTimeout(() => {
          setVisibleText1(line1.substring(0, i));
        }, delay));
        delay += 60; // 60ms per char
      }
      
      delay += 500; // pause
      
      // Type line 2
      for (let i = 0; i <= line2.length; i++) {
        timeouts.push(setTimeout(() => {
          setVisibleText2(line2.substring(0, i));
        }, delay));
        delay += 60;
      }
      
      // End of typing, cursor blinks
      delay += 500;
      
      // Wait for a few blinks, then fade cursor
      timeouts.push(setTimeout(() => {
        setCursorFading(true);
      }, delay + 1500));
      
      timeouts.push(setTimeout(() => {
        isTyping = false;
        setShowCursor(false); // Fully hide after fade
      }, delay + 2500));
    };

    const resetQuote = () => {
      clearTimeouts();
      setVisibleText1('');
      setVisibleText2('');
      setShowCursor(false);
      setCursorFading(false);
      isTyping = false;
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeQuote();
        } else {
          // Reset when completely out of view
          resetQuote();
        }
      });
    }, {
      threshold: 0.1 // triggers when 10% visible
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      clearTimeouts();
      if (observer) observer.disconnect();
    };
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    if (!showCursor || cursorFading) return;
    
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    
    return () => clearInterval(interval);
  }, [showCursor, cursorFading]);

  return (
    <div
      ref={containerRef}
      style={{
        marginBottom: '0',
        fontFamily: 'Syne, sans-serif',
        fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
        color: 'var(--cold)',
        minHeight: '4em',
        lineHeight: '1.6',
        textShadow: '0 0 20px rgba(255,255,255,0.1)',
        fontWeight: 400,
        textAlign: 'center',
        padding: '0 20px'
      }}
    >
      <div style={{ display: 'inline-block', textAlign: 'center' }}>
        <div>
          {visibleText1}
          {showCursor && visibleText2.length === 0 && (
            <span style={{
              color: 'var(--amber)',
              marginLeft: '2px',
              opacity: cursorVisible ? 1 : 0,
              transition: cursorFading ? 'opacity 1s ease' : 'none'
            }}>|</span>
          )}
        </div>
        {visibleText2.length > 0 && (
          <div style={{ color: 'var(--cold2)', fontStyle: 'italic', fontWeight: 400, marginTop: '0.2em' }}>
            {visibleText2}
            {showCursor && (
              <span style={{
                color: 'var(--amber)',
                marginLeft: '2px',
                fontStyle: 'normal',
                opacity: cursorFading ? 0 : (cursorVisible ? 1 : 0),
                transition: cursorFading ? 'opacity 1s ease' : 'none'
              }}>|</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
