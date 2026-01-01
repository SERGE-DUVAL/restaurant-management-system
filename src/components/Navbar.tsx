'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from './Icon';

interface NavbarProps {
  activePage: string;
  setPage: (page: string) => void;
  cartCount: number;
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, setPage, cartCount, toggleMenu, isMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [localCartCount, setLocalCartCount] = useState(0);

  useEffect(() => {
    setIsClient(true);
    setLocalCartCount(cartCount);
    
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [cartCount]);

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'menu', label: 'La Carte' },
    { id: 'reservation', label: 'Réservation' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <div className="logo" onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>
          LA FOURCHETTE
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <li key={item.id}>
              <a
                className={`nav-link ${activePage === item.id ? 'active' : ''}`}
                onClick={() => { setPage(item.id); toggleMenu(); }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-icons">
          <button className="icon-btn" onClick={() => setPage('cart')}>
            <Icon name="shopping-bag" />
            <span className="cart-badge" style={{ display: isClient && localCartCount > 0 ? 'flex' : 'none' }}>{localCartCount}</span>
          </button>
          <button className="icon-btn" onClick={() => setPage('login')}>
            <Icon name="user" />
          </button>
          <div className="burger-menu" onClick={toggleMenu}>
            <span className="burger-line" style={{ transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
            <span className="burger-line" style={{ opacity: isMenuOpen ? 0 : 1 }}></span>
            <span className="burger-line" style={{ transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }}></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;