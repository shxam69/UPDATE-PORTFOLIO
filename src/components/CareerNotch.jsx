import { useCallback } from 'react';
import gsap from 'gsap';
import { useStore } from '../store';
import StarBorder from './StarBorder';
import './CareerNotch.css';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

export default function CareerNotch() {
  const activeTrack = useStore((state) => state.activeTrack);
  const setActiveTrack = useStore((state) => state.setActiveTrack);

  const handleTrackSwitch = useCallback((nextTrack) => {
    if (nextTrack === activeTrack) return;

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
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        setActiveTrack(nextTrack);
        gsap.fromTo(content, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.out' });
      },
    });
  }, [activeTrack, setActiveTrack]);

  return (
    <div className="career-notch-container">
      <div className="career-notch">
        <StarBorder
          as="button"
          type="button"
          onClick={() => handleTrackSwitch('software')}
          color="var(--amber)"
          speed="10s"
          className={`notch-btn ${activeTrack === 'software' ? 'active' : ''}`}
        >
          <span className="notch-text-desktop">Software Engineer</span>
          <span className="notch-text-mobile">Software</span>
        </StarBorder>
        <StarBorder
          as="button"
          type="button"
          onClick={() => handleTrackSwitch('ml')}
          color="var(--cyan)"
          speed="10s"
          className={`notch-btn ${activeTrack === 'ml' ? 'active ml-active' : ''}`}
        >
          <span className="notch-text-desktop">Machine Learning Engineer</span>
          <span className="notch-text-mobile">Machine Learning</span>
        </StarBorder>
      </div>
    </div>
  );
}
