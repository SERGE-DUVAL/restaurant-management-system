'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const DeliveryPage: React.FC = () => {
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
          Espace Livreur
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          Gestion des commandes à livrer, {user?.name}
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
            }}>Livraisons aujourd'hui</h2>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>12</p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>+4 vs hier</p>
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
            }}>En cours de livraison</h2>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>3</p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Sur la route</p>
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
            }}>Livraisons terminées</h2>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>9</p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Avec succès</p>
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
          }}>Livraisons en cours</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ 
              padding: '0.75rem 0', 
              borderBottom: '1px solid rgba(197, 160, 89, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>Commande #CMD-005</p>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Paul Durand - 123 Rue de la Paix, 75000 Paris</p>
              </div>
              <span style={{ 
                padding: '0.25rem 0.75rem', 
                backgroundColor: 'blue', 
                color: 'white', 
                fontSize: '0.8rem',
                borderRadius: '4px'
              }}>En route</span>
            </li>
            <li style={{ 
              padding: '0.75rem 0', 
              borderBottom: '1px solid rgba(197, 160, 89, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>Commande #CMD-008</p>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Camille Petit - 22 Place de la République, 75003 Paris</p>
              </div>
              <span style={{ 
                padding: '0.25rem 0.75rem', 
                backgroundColor: 'blue', 
                color: 'white', 
                fontSize: '0.8rem',
                borderRadius: '4px'
              }}>En route</span>
            </li>
            <li style={{ 
              padding: '0.75rem 0', 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>Commande #CMD-012</p>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Luc Bernard - 5 Avenue des Champs, 75008 Paris</p>
              </div>
              <span style={{ 
                padding: '0.25rem 0.75rem', 
                backgroundColor: 'yellow', 
                color: 'black', 
                fontSize: '0.8rem',
                borderRadius: '4px'
              }}>Prêt à livrer</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;