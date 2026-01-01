'use client';

import React, { useState, useEffect } from 'react';
import ThreeBackground from './ThreeBackground';
import Navbar from './Navbar';
import HomePage from './HomePage';
import MenuPage from './MenuPage';
import CartPage from './CartPage';
import ReservationPage from './ReservationPage';
import LoginPage from './LoginPage';
import AdminPage from './AdminPage';
import ReceptionPage from './ReceptionPage';
import CashierPage from './CashierPage';
import ChefPage from './ChefPage';
import DeliveryPage from './DeliveryPage';
import { useCart } from '@/contexts/CartContext';

const App: React.FC = () => {
  const [currentPage, setPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const goHome = () => setPage('home');
    const goLogin = () => setPage('login');
    const goDashboard = () => {
      // Pour les rôles admin, on redirige vers une page externe temporairement
      if (typeof window !== 'undefined') {
        window.location.href = '/dashboard';
      }
    };
    const goAdminDashboard = () => {
      if (typeof window !== 'undefined') {
        window.location.href = '/dashboard/admin';
      }
    };
    const goReceptionDashboard = () => {
      if (typeof window !== 'undefined') {
        window.location.href = '/dashboard/reception';
      }
    };
    const goCashierDashboard = () => {
      if (typeof window !== 'undefined') {
        window.location.href = '/dashboard/cashier';
      }
    };
    const goChefDashboard = () => {
      if (typeof window !== 'undefined') {
        window.location.href = '/dashboard/chef';
      }
    };
    const goDeliveryDashboard = () => {
      if (typeof window !== 'undefined') {
        window.location.href = '/dashboard/delivery';
      }
    };
    // Gestion des redirections spécifiques par rôle
    const goAdminPage = () => setPage('admin');
    const goReceptionPage = () => setPage('reception');
    const goCashierPage = () => setPage('cashier');
    const goChefPage = () => setPage('chef');
    const goDeliveryPage = () => setPage('delivery');
    
    window.addEventListener('go-to-home', goHome);
    window.addEventListener('go-to-login', goLogin);
    window.addEventListener('go-to-dashboard', goDashboard);
    window.addEventListener('go-to-admin-dashboard', goAdminDashboard);
    window.addEventListener('go-to-reception-dashboard', goReceptionDashboard);
    window.addEventListener('go-to-cashier-dashboard', goCashierDashboard);
    window.addEventListener('go-to-chef-dashboard', goChefDashboard);
    window.addEventListener('go-to-delivery-dashboard', goDeliveryDashboard);
    // Écouter les événements de redirection spécifiques
    window.addEventListener('go-to-admin-page', goAdminPage);
    window.addEventListener('go-to-reception-page', goReceptionPage);
    window.addEventListener('go-to-cashier-page', goCashierPage);
    window.addEventListener('go-to-chef-page', goChefPage);
    window.addEventListener('go-to-delivery-page', goDeliveryPage);
    
    return () => {
      window.removeEventListener('go-to-home', goHome);
      window.removeEventListener('go-to-login', goLogin);
      window.removeEventListener('go-to-dashboard', goDashboard);
      window.removeEventListener('go-to-admin-dashboard', goAdminDashboard);
      window.removeEventListener('go-to-reception-dashboard', goReceptionDashboard);
      window.removeEventListener('go-to-cashier-dashboard', goCashierDashboard);
      window.removeEventListener('go-to-chef-dashboard', goChefDashboard);
      window.removeEventListener('go-to-delivery-dashboard', goDeliveryDashboard);
      // Retirer les événements de redirection spécifiques
      window.removeEventListener('go-to-admin-page', goAdminPage);
      window.removeEventListener('go-to-reception-page', goReceptionPage);
      window.removeEventListener('go-to-cashier-page', goCashierPage);
      window.removeEventListener('go-to-chef-page', goChefPage);
      window.removeEventListener('go-to-delivery-page', goDeliveryPage);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [currentPage]);

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage setPage={setPage} />;
      case 'menu': return <MenuPage />;
      case 'cart': return <CartPage />;
      case 'reservation': return <ReservationPage />;
      case 'login': return <LoginPage />;
      case 'admin': return <AdminPage />;
      case 'reception': return <ReceptionPage />;
      case 'cashier': return <CashierPage />;
      case 'chef': return <ChefPage />;
      case 'delivery': return <DeliveryPage />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="app-container">
      <ThreeBackground />
      <Navbar 
        activePage={currentPage} 
        setPage={setPage} 
        cartCount={0} 
        isMenuOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
      />
      
      <main>
        {renderPage()}
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

export default App;