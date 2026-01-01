'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ThreeBackground from './ThreeBackground';
import Navbar from './Navbar';
import { useCart } from '@/contexts/CartContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { count } = useCart();

  // Extraire le nom de la page à partir du chemin
  const getPageFromPath = () => {
    if (pathname === '/') return 'home';
    return pathname.split('/')[1] || 'home';
  };

  const currentPage = getPageFromPath();

  // Gérer les événements personnalisés
  useEffect(() => {
    const handleGoHome = () => {
      window.location.href = '/';
    };
    
    const handleGoToLogin = () => {
      window.location.href = '/login';
    };

    window.addEventListener('go-to-home', handleGoHome);
    window.addEventListener('go-to-login', handleGoToLogin);

    return () => {
      window.removeEventListener('go-to-home', handleGoHome);
      window.removeEventListener('go-to-login', handleGoToLogin);
    };
  }, []);

  // Fonction pour changer de page (redirige vers l'URL appropriée)
  const setPage = (page: string) => {
    switch(page) {
      case 'home':
        window.location.href = '/';
        break;
      case 'menu':
        window.location.href = '/menu';
        break;
      case 'cart':
        window.location.href = '/cart';
        break;
      case 'reservation':
        window.location.href = '/reservation';
        break;
      case 'login':
        window.location.href = '/login';
        break;
      default:
        window.location.href = '/';
    }
  };

  return (
    <div className="app-container">
      <ThreeBackground />
      <Navbar 
        activePage={currentPage} 
        setPage={setPage} 
        cartCount={count} 
        isMenuOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
      />
      
      <main>
        {children}
      </main>

      <footer style={{ background: '#050505', padding: '4rem 0', borderTop: '1px solid rgba(197, 160, 89, 0.1)', marginTop: 'auto', position: 'relative', zIndex: 2 }}>
        <div className="container text-center">
          <div className="logo" style={{ fontSize: '1.8rem', marginBottom: '1.5rem', opacity: 0.8 }}>LA FOURCHETTE</div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', letterSpacing: 2, textTransform: 'uppercase' }}>
            Haute Gastronomie Française
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;