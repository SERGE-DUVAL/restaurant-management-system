'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const CashierPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container section-padding fade-in">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          marginBottom: '2rem', 
          fontFamily: 'var(--font-display)', 
          fontSize: '2.5rem',
          color: 'var(--color-accent)'
        }}>
          Espace Caissier
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          Gestion des paiements et des transactions, {user?.name}
        </p>
        
        <div className="grid" style={{ 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            padding: '2rem', 
            border: '1px solid rgba(197, 160, 89, 0.2)',
            backgroundColor: 'rgba(197, 160, 89, 0.05)'
          }}>
            <h2 style={{ 
              color: 'var(--color-accent)', 
              marginBottom: '1rem',
              fontFamily: 'var(--font-display)'
            }}>Total aujourd'hui</h2>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>€1,420</p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>+12% vs hier</p>
          </div>
          
          <div style={{ 
            padding: '2rem', 
            border: '1px solid rgba(197, 160, 89, 0.2)',
            backgroundColor: 'rgba(197, 160, 89, 0.05)'
          }}>
            <h2 style={{ 
              color: 'var(--color-accent)', 
              marginBottom: '1rem',
              fontFamily: 'var(--font-display)'
            }}>Paiements reçus</h2>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>18</p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>sur 20 commandes</p>
          </div>
          
          <div style={{ 
            padding: '2rem', 
            border: '1px solid rgba(197, 160, 89, 0.2)',
            backgroundColor: 'rgba(197, 160, 89, 0.05)'
          }}>
            <h2 style={{ 
              color: 'var(--color-accent)', 
              marginBottom: '1rem',
              fontFamily: 'var(--font-display)'
            }}>Méthode principale</h2>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>CB</p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>65% des paiements</p>
          </div>
        </div>
        
        <div style={{ 
          padding: '2rem', 
          border: '1px solid rgba(197, 160, 89, 0.2)',
          backgroundColor: 'rgba(197, 160, 89, 0.05)'
        }}>
          <h2 style={{ 
            color: 'var(--color-accent)', 
            marginBottom: '1rem',
            fontFamily: 'var(--font-display)'
          }}>Paiements récents</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ 
              padding: '0.75rem 0', 
              borderBottom: '1px solid rgba(197, 160, 89, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>Commande #CMD-001</p>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Carte bancaire - €45.50</p>
              </div>
              <span style={{ 
                padding: '0.25rem 0.75rem', 
                backgroundColor: 'green', 
                color: 'white', 
                fontSize: '0.8rem',
                borderRadius: '4px'
              }}>Réussi</span>
            </li>
            <li style={{ 
              padding: '0.75rem 0', 
              borderBottom: '1px solid rgba(197, 160, 89, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>Commande #CMD-002</p>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Espèces - €32.00</p>
              </div>
              <span style={{ 
                padding: '0.25rem 0.75rem', 
                backgroundColor: 'green', 
                color: 'white', 
                fontSize: '0.8rem',
                borderRadius: '4px'
              }}>Réussi</span>
            </li>
            <li style={{ 
              padding: '0.75rem 0', 
              borderBottom: '1px solid rgba(197, 160, 89, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>Commande #CMD-003</p>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Mobile Money - €58.75</p>
              </div>
              <span style={{ 
                padding: '0.25rem 0.75rem', 
                backgroundColor: 'green', 
                color: 'white', 
                fontSize: '0.8rem',
                borderRadius: '4px'
              }}>Réussi</span>
            </li>
            <li style={{ 
              padding: '0.75rem 0', 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>Commande #CMD-004</p>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Carte bancaire - €28.50</p>
              </div>
              <span style={{ 
                padding: '0.25rem 0.75rem', 
                backgroundColor: 'yellow', 
                color: 'black', 
                fontSize: '0.8rem',
                borderRadius: '4px'
              }}>En attente</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CashierPage;