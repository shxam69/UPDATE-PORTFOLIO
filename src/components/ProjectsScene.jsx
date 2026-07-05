import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '../store';
import { getProjectsByTrack } from '../data/projectsData';
import ProjectCard from './projects/ProjectCard';
import CaseStudy from './projects/CaseStudy';

/* ═══════════════════════════════════════════════════════════════════════════
   PROJECTS SCENE — data-driven orchestrator
   No project content lives in this file. Everything renders off
   `projectsData.js`, filtered by the global Career Mode (`activeTrack`).
   Adding, editing, or re-ordering a project never touches this component.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function ProjectsScene() {
  const [activeProject, setActiveProject] = useState(null);
  const activeTrack = useStore((state) => state.activeTrack);
  const cardsContainerRef = useRef(null);

  const projects = getProjectsByTrack(activeTrack);
  const trackColor = activeTrack === 'ml' ? 'var(--cyan)' : 'var(--amber)';

  // Stagger cards in whenever the visible set changes (Career Mode switch or scroll-in)
  useEffect(() => {
    const cards = cardsContainerRef.current ? Array.from(cardsContainerRef.current.children) : [];
    if (!cards.length) return;

    const existingTrigger = ScrollTrigger.getAll().find((t) => t.trigger === cardsContainerRef.current);
    if (existingTrigger) existingTrigger.kill();

    gsap.fromTo(
      cards,
      { opacity: 0, x: (i) => (i % 2 === 0 ? -40 : 40) },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reset',
        },
        onComplete: () => ScrollTrigger.refresh(),
      }
    );
  }, [activeTrack]);

  return (
    <section id="projects" className="scene">
      <div className="sec-wrap">
        {/* Section header — reflects the active Career Mode, no local toggle (Hero owns that control) */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <div
            className="reveal-up"
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: 'var(--text-xs)',
              color: trackColor,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-2)',
            }}
          >
            {activeTrack === 'ml' ? 'Machine Learning Projects' : 'Software Engineering Projects'}
          </div>
          <h2 className="sec-title reveal-up" style={{ fontFamily: 'Bebas Neue', letterSpacing: '2px', marginBottom: 'var(--space-12)' }}>
            SELECTED WORK
          </h2>
        </div>

        {/* Card grid */}
        <div
          ref={cardsContainerRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'var(--space-6)',
            marginBottom: 'var(--space-24)',
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={() => setActiveProject(project)} />
          ))}
        </div>

        {/* Additional sections */}
        <div className="reveal-up" style={{ marginBottom: 'var(--space-24)' }}>
          <div
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: 'var(--text-xs)',
              color: 'var(--amber)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-4)',
            }}
          >
            Engineering Principles
          </div>
          <h3 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-6)', fontFamily: 'Bebas Neue', letterSpacing: '1px' }}>
            Standalone Edge Systems
          </h3>
          <div
            className="glass-card-premium"
            style={{
              padding: 'var(--space-8)',
              borderLeft: `3px solid var(--green)`,
              background: 'rgba(5, 7, 10, 0.4)',
            }}
          >
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--cold)', lineHeight: 1.8, marginBottom: 'var(--space-6)' }}>
              Beyond institutional environments, I build and validate standalone edge nodes outside the standard stack. Custom process scripts and data routing filters keep each deployment isolated, with clean data and high throughput from ingestion to database.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              {['Modular Layouts', 'Edge Processes', 'Throughput Balancing'].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 'var(--text-xs)',
                    padding: 'var(--space-2) var(--space-4)',
                    background: 'var(--ink3)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--amber)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Active development section */}
        <div className="reveal-up">
          <div
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: 'var(--text-xs)',
              color: 'var(--amber)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-4)',
            }}
          >
            Active Initiatives
          </div>
          <h3 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-6)', fontFamily: 'Bebas Neue', letterSpacing: '1px' }}>
            Ongoing Projects
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {[
              {
                tag: 'SaaS Architecture',
                title: 'NIVEROX Platform',
                desc: 'Building a modular, multi-tenant SaaS engine focused on rapid iteration and minimal bundle sizes.',
              },
              {
                tag: 'Automation',
                title: 'AI WhatsApp Pipeline',
                desc: 'Developing an intelligent, language-aware lead capture and conversation summary system.',
              },
              {
                tag: 'Graphics / WebGL',
                title: 'Narrative Engine',
                desc: 'Experimenting with raw WebGL and shader logic to build high-performance visual storytelling tools.',
              },
            ].map((item) => (
              <div key={item.title} className="glass-card-premium" style={{ padding: 'var(--space-8)' }}>
                <div
                  style={{
                    fontFamily: 'DM Mono',
                    color: 'var(--amber)',
                    fontSize: 'var(--text-xs)',
                    textTransform: 'uppercase',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  {item.tag}
                </div>
                <h4 style={{ fontSize: 'var(--text-lg)', color: 'var(--white)', marginBottom: 'var(--space-3)' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--cold2)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case study overlay */}
      {activeProject && <CaseStudy project={activeProject} onClose={() => setActiveProject(null)} />}
    </section>
  );
}
