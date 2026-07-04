import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SilenceScene() {
  const textRef = useRef(null);

  useEffect(() => {
    // Breathing animation for emotional contrast
    gsap.to(textRef.current, {
      opacity: 0.5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <section className="scene" style={{ 
      minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(circle at center, rgba(10,13,20,0) 0%, var(--ink) 80%)'
    }}>
      <div className="reveal-up" style={{ textAlign: 'center', maxWidth: '700px', padding: '0 20px', zIndex: 10 }}>
        <div style={{ 
          width: '1px', 
          height: '120px', 
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)', 
          margin: '0 auto 60px auto' 
        }}></div>
        <h2 ref={textRef} style={{ 
          fontFamily: 'Syne', 
          fontSize: '1.5rem', 
          fontWeight: 400, 
          color: 'var(--cold)', 
          letterSpacing: '0.02em', 
          lineHeight: '2',
          textShadow: '0 0 20px rgba(255,255,255,0.1)'
        }}>
          "The best systems don't just solve problems.<br/>
          <span style={{ color: 'var(--cold2)', fontStyle: 'italic', fontSize: '1.2rem' }}>They are remembered.</span>"
        </h2>
        <div style={{ 
          width: '1px', 
          height: '120px', 
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)', 
          margin: '60px auto 0 auto' 
        }}></div>
      </div>
    </section>
  );
}
