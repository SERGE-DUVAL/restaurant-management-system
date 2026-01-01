'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const ChefPage: React.FC = () => {
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
          Espace Chef Cuisinier
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          Gestion des commandes en cuisine et des stocks, {user?.name}
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
            }}>Commandes en attente</h2>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>7</p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Préparation en cours</p>
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
            }}>Prêt à servir</h2>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>3</p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>En attente de livraison</p>
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
            }}>Ruptures de stock</h2>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>2</p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>À approvisionner</p>
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
          }}>Commandes en cours</h2>
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
                <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Filet de bœuf grillé x2, Soupe à l'oignon x1</p>
              </div>
              <span style={{ 
                padding: '0.25rem 0.75rem', 
                backgroundColor: 'orange', 
                color: 'white', 
                fontSize: '0.8rem',
                borderRadius: '4px'
              }}>En cours</span>
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
                <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Tarte Tatin x1, Café gourmand x2</p>
              </div>
              <span style={{ 
                padding: '0.25rem 0.75rem', 
                backgroundColor: 'orange', 
                color: 'white', 
                fontSize: '0.8rem',
                borderRadius: '4px'
              }}>En cours</span>
            </li>
            <li style={{ 
              padding: '0.75rem 0', 
              borderBottom: '1px solid rgba(197, 160, 89, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>Commande #CMD-005</p>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Carpaccio de bœuf x1, Tiramisu x1</p>
              </div>
              <span style={{ 
                padding: '0.25rem 0.75rem', 
                backgroundColor: 'blue', 
                color: 'white', 
                fontSize: '0.8rem',
                borderRadius: '4px'
              }}>Prêt</span>
            </li>
            <li style={{ 
              padding: '0.75rem 0', 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>Commande #CMD-007</p>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Risotto aux champignons x2</p>
              </div>
              <span style={{ 
                padding: '0.25rem 0.75rem', 
                backgroundColor: 'green', 
                color: 'white', 
                fontSize: '0.8rem',
                borderRadius: '4px'
              }}>Servie</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChefPage;