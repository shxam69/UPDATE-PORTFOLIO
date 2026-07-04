import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CountUp({ value, duration = 1.5, suffix = '%', prefix = '' }) {
  const elRef = useRef(null);
  const [currentVal, setCurrentVal] = useState(0);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const targetVal = parseFloat(value);
    if (isNaN(targetVal)) {
      // Fallback if not a number
      setCurrentVal(value);
      return;
    }

    const obj = { val: 0 };
    
    const anim = gsap.to(obj, {
      val: targetVal,
      duration: duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 95%', // Trigger count up when element is near bottom
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        // Handle integers vs floats (default to integer floor)
        setCurrentVal(Math.floor(obj.val));
      },
      onComplete: () => {
        setCurrentVal(targetVal); // Ensure exact final value is set
      }
    });

    return () => {
      anim.kill();
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
    };
  }, [value, duration]);

  return (
    <span ref={elRef} className="count-up hud-glow-text" style={{ color: 'var(--amber)', fontWeight: 700 }}>
      {prefix}{currentVal}{suffix}
    </span>
  );
}
