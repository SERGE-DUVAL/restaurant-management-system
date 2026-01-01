'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';

const MOCK_MENU = [
  { id: 1, name: "Le Homard Bleu Royal", category: "plats", price: 125, desc: "Bisque de homard, caviar Osciètre, émulsion au Champagne.", img: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "Le Bœuf Wagyu", category: "plats", price: 180, desc: "Filet mignon grillé, jus truffé, légumes racines glacés.", img: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "Le Foie Gras de Canard", category: "entrees", price: 48, desc: "Mi-cuit, toast brioché aux noisettes, compotée de figues violets.", img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Saint-Jacques Rôties", category: "entrees", price: 55, desc: "Beurre fermier, sauce vin blanc, cresson de fontaine.", img: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80" },
  { id: 5, name: "L'Exposition Chocolat", category: "desserts", price: 28, desc: "Ganache 70%, praliné noisette, éclats de caramel beurre salé.", img: "https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=800&q=80" },
  { id: 6, name: "Soufflé au Grand Marnier", category: "desserts", price: 24, desc: "Flambé à table, accompagné de sa glace vanille de Madagascar.", img: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=800&q=80" },
];

const MenuPage: React.FC = () => {
  const { addToCart } = useCart();
  const [filter, setFilter] = useState<'all' | 'entrees' | 'plats' | 'desserts'>('all');
  const [visible, setVisible] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const filteredItems = filter === 'all' ? MOCK_MENU : MOCK_MENU.filter(item => item.category === filter);

  return (
    <div className="container section-padding" style={{ minHeight: '100vh' }}>
      <div className={`text-center ${visible ? 'fade-in' : ''}`} style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>La Carte</h2>
        <p style={{ marginBottom: '3rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>Sélection du Chef</p>
        
        <div className="flex flex-center" style={{ gap: '1.5rem', flexWrap: 'wrap' }}>
          {(['all', 'entrees', 'plats', 'desserts'] as const).map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              style={{ 
                background: 'none', 
                border: 'none', 
                borderBottom: filter === cat ? '1px solid var(--color-accent)' : '1px solid transparent',
                color: filter === cat ? 'var(--color-accent)' : 'var(--color-text-muted)',
                padding: '5px 15px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontSize: '0.75rem',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              {cat === 'all' ? 'Tout' : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '3rem' }}>
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            className={`card ${visible ? 'fade-in' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <img src={item.img} alt={item.name} className="card-img" />
            <div className="card-body">
              <h3 className="card-title">{item.name}</h3>
              <p className="card-price">{item.price} €</p>
              <p className="card-desc">{item.desc}</p>
              <button 
                className="btn" 
                style={{ width: '100%' }}
                onClick={() => addToCart(item)}
              >
                Commander
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;