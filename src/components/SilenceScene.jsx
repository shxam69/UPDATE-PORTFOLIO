import CinematicQuote from './CinematicQuote';

export default function SilenceScene() {
  return (
    <section className="scene" style={{ 
      minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(circle at center, rgba(10,13,20,0) 0%, var(--ink) 80%)'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '700px', padding: '0 20px', zIndex: 10, width: '100%' }}>
        <div style={{ 
          width: '1px', 
          height: '120px', 
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)', 
          margin: '0 auto 60px auto' 
        }}></div>
        <CinematicQuote />
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
