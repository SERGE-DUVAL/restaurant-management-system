'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const ReceptionPage: React.FC = () => {
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
          Espace Réceptionniste
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          Gestion des clients et des réservations, {user?.name}
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
            }}>Clients aujourd'hui</h2>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>24</p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>+3 vs hier</p>
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
            }}>Réservations</h2>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>8</p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>12h-14h: 5 tables</p>
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
            }}>Commandes en attente</h2>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>6</p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>En attente de validation</p>
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
          }}>Réservations récentes</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ 
              padding: '0.75rem 0', 
              borderBottom: '1px solid rgba(197, 160, 89, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>Jean Martin</p>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Aujourd'hui à 19h30 - 4 pers</p>
              </div>
              <span style={{ 
                padding: '0.25rem 0.75rem', 
                backgroundColor: 'green', 
                color: 'white', 
                fontSize: '0.8rem',
                borderRadius: '4px'
              }}>Confirmée</span>
            </li>
            <li style={{ 
              padding: '0.75rem 0', 
              borderBottom: '1px solid rgba(197, 160, 89, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>Sophie Laurent</p>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Demain à 12h30 - 2 pers</p>
              </div>
              <span style={{ 
                padding: '0.25rem 0.75rem', 
                backgroundColor: 'yellow', 
                color: 'black', 
                fontSize: '0.8rem',
                borderRadius: '4px'
              }}>En attente</span>
            </li>
            <li style={{ 
              padding: '0.75rem 0', 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>Thomas Bernard</p>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Aujourd'hui à 20h00 - 6 pers</p>
              </div>
              <span style={{ 
                padding: '0.25rem 0.75rem', 
                backgroundColor: 'blue', 
                color: 'white', 
                fontSize: '0.8rem',
                borderRadius: '4px'
              }}>Spéciale</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReceptionPage;