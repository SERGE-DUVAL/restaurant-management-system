'use client';

import React from 'react';

interface HomePageProps {
  setPage?: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
  return (
    <div>
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', paddingTop: '80px', position: 'relative', zIndex: 2 }}>
        <div className="fade-in">
          <span style={{ fontFamily: 'var(--font-body)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--color-accent)', display: 'block', marginBottom: '1rem' }}>
            Restaurant Gastronomique
          </span>
          <h1 style={{ fontSize: 'clamp(3rem, 10vw, 5.5rem)', marginBottom: '1.5rem', lineHeight: 1, color: '#fff' }}>
            L'Art de <br /> <span style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>Savourer</span>
          </h1>
        </div>
        <div className="fade-in fade-in-delay-1" style={{ maxWidth: '600px', margin: '0 auto 3rem auto' }}>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', fontWeight: 300 }}>
            Une expérience culinaire où chaque plat raconte une histoire.
            Bienvenue dans un univers d'élégance intemporelle.
          </p>
        </div>
        <div className="fade-in fade-in-delay-2 flex" style={{ gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => setPage ? setPage('menu') : window.location.href = '/menu'}>Découvrir la carte</button>
          <button className="btn" onClick={() => setPage ? setPage('reservation') : window.location.href = '/reservation'}>Réserver une table</button>
        </div>
      </section>

      <section className="container section-padding">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          <div className="text-center">
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>Héritage</h3>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '1rem', fontStyle: 'italic' }}>
              Une tradition culinaire transmise avec passion depuis 2025.
            </p>
          </div>
          <div className="text-center">
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>Excellence</h3>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '1rem', fontStyle: 'italic' }}>
              Des produits nobles, sublimés par une technique irréprochable.
            </p>
          </div>
          <div className="text-center">
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>Harmonie</h3>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '1rem', fontStyle: 'italic' }}>
              L'accord parfait entre vins rares et mets d'exception.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;