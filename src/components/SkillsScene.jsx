import { useStore } from '../store';
import LogoLoop from './LogoLoop';

import {
  SiSpringboot,
  SiReact,
  SiVite,
  SiThreedotjs,
  SiGreensock,
  SiTailwindcss,
  SiPostgresql,
  SiFirebase,
  SiGit,
  SiGithub,
  SiDocker,
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiOpencv,
  SiPandas,
  SiNumpy,
  SiJupyter,
  SiHuggingface,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const SKILLS_BY_TRACK = {
  software: {
    accent: 'var(--amber)',
    title: 'Software Engineering Skills',
    items: [
      { label: 'Java', icon: FaJava, color: '#f89820' },
      { label: 'Spring Boot', icon: SiSpringboot, color: '#6db33f' },
      { label: 'React', icon: SiReact, color: '#61dafb' },
      { label: 'Vite', icon: SiVite, color: '#646cff' },
      { label: 'Three.js', icon: SiThreedotjs, color: '#ffffff' },
      { label: 'GSAP', icon: SiGreensock, color: '#88ce02' },
      { label: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4' },
      { label: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
      { label: 'Firebase', icon: SiFirebase, color: '#ffca28' },
      { label: 'Git', icon: SiGit, color: '#f05032' },
      { label: 'GitHub', icon: SiGithub, color: '#ffffff' },
      { label: 'Docker', icon: SiDocker, color: '#2496ed' },
    ],
  },
  ml: {
    accent: 'var(--cyan)',
    title: 'Machine Learning Skills',
    items: [
      { label: 'Python', icon: SiPython, color: '#3776ab' },
      { label: 'TensorFlow', icon: SiTensorflow, color: '#ff6f00' },
      { label: 'PyTorch', icon: SiPytorch, color: '#ee4c2c' },
      { label: 'Scikit-learn', icon: SiScikitlearn, color: '#f7931e' },
      { label: 'OpenCV', icon: SiOpencv, color: '#5c3ee8' },
      { label: 'Pandas', icon: SiPandas, color: '#150458' },
      { label: 'NumPy', icon: SiNumpy, color: '#4dabcf' },
      { label: 'Jupyter', icon: SiJupyter, color: '#f37626' },
      { label: 'Hugging Face', icon: SiHuggingface, color: '#ffd21e' },
    ],
  },
};

export default function SkillsScene() {
  const activeTrack = useStore((state) => state.activeTrack);
  const { accent, title, items } = SKILLS_BY_TRACK[activeTrack] || SKILLS_BY_TRACK.software;

  return (
    <section id="skills" className="scene">
      <div className="sec-wrap">
        <div className="sec-label reveal-up" style={{ color: accent }}>
          {title}
        </div>
        <h2 className="sec-title reveal-up" style={{ fontFamily: 'Bebas Neue', letterSpacing: '2px' }}>
          TECH STACK
        </h2>

        <div data-reveal="left" style={{ marginTop: 'var(--space-12)' }}>
          <LogoLoop items={items} accent={accent} />
        </div>
        <div data-reveal="right" style={{ marginTop: 'var(--space-6)' }}>
          <LogoLoop items={[...items].reverse()} accent={accent} reverse={true} />
        </div>
      </div>
    </section>
  );
}
