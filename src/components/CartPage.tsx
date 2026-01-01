'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useNotification } from '@/contexts/NotificationContext';
import Icon from './Icon';

const CartPage: React.FC = () => {
  const { cart, total, updateQty, removeFromCart, clearCart } = useCart();
  const { showNotification } = useNotification();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Afficher une structure vide côté serveur pour éviter les incohérences d'hydratation
  if (!isClient) {
    return (
      <div className="container section-padding">
        <h2 style={{ marginBottom: '3rem', fontFamily: 'var(--font-display)', fontSize: '2.5rem' }}>Votre Panier</h2>
        <div className="text-center" style={{ padding: '6rem 0', color: 'var(--color-text-muted)' }}>
          <div style={{ marginBottom: '1rem', opacity: 0.5 }}><Icon name="shopping-cart" /></div>
          <p>Votre panier est vide.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container section-padding">
      <h2 style={{ marginBottom: '3rem', fontFamily: 'var(--font-display)', fontSize: '2.5rem' }}>Votre Panier</h2>
      {cart.length === 0 ? (
        <div className="text-center" style={{ padding: '6rem 0', color: 'var(--color-text-muted)' }}>
          <div style={{ marginBottom: '1rem', opacity: 0.5 }}><Icon name="shopping-cart" /></div>
          <p>Votre panier est vide.</p>
        </div>
      ) : (
        <div className="grid cart-page-grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '4rem' }}>
          <div style={{ border: '1px solid rgba(255,255,255,0.05)', padding: '2rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-accent)' }}>
                  <th style={{ textAlign: 'left', padding: '1rem', fontFamily: 'var(--font-body)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Plat</th>
                  <th style={{ textAlign: 'right', padding: '1rem', fontFamily: 'var(--font-body)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Prix</th>
                  <th style={{ textAlign: 'center', padding: '1rem', fontFamily: 'var(--font-body)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Qté</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1.5rem 1rem', fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>{item.name}</td>
                  <td style={{ padding: '1.5rem 1rem', textAlign: 'right', color: 'var(--color-accent)' }}>{item.price} €</td>
                  <td style={{ padding: '1.5rem 1rem', textAlign: 'center' }}>
                    <div className="flex" style={{gap: '10px', justifyContent: 'center'}}>
                      <button onClick={() => updateQty(item.id, -1)} style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>+</button>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button onClick={() => removeFromCart(item.id)} style={{color: 'var(--color-accent)'}}>
                      ✕
                    </button>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
            <div style={{ padding: '2rem', border: '1px solid var(--color-accent)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Total</h3>
              <div style={{ marginBottom: '2rem', fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: 'var(--color-accent)' }}>
                {total} €
              </div>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%' }} 
                onClick={() => { 
                  showNotification(
                    'success',
                    'Commande confirmée',
                    `Votre commande d'un montant de ${total} € a été transmise à notre salle. Vous recevrez une confirmation par email.`
                  );
                  clearCart(); 
                }}
              >
                Commander
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;