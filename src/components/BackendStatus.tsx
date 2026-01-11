'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';

interface BackendStatusProps {
  onStatusChange?: (isOnline: boolean) => void;
}

const BackendStatus: React.FC<BackendStatusProps> = ({ onStatusChange }) => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        setIsChecking(true);
        const response = await fetch('http://localhost:8000/api/test', {
          method: 'GET',
          signal: AbortSignal.timeout(3000),
        });
        
        if (response.ok) {
          setIsOnline(true);
          onStatusChange?.(true);
        } else {
          setIsOnline(false);
          onStatusChange?.(false);
        }
      } catch (error) {
        setIsOnline(false);
        onStatusChange?.(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkBackend();
    // Vérifier toutes les 10 secondes
    const interval = setInterval(checkBackend, 10000);
    
    return () => clearInterval(interval);
  }, [onStatusChange]);

  if (isChecking) {
    return null; // Ne rien afficher pendant la vérification initiale
  }

  if (isOnline === false) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
          color: 'white',
          padding: '1rem',
          zIndex: 10000,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <strong style={{ fontSize: '1.1rem', display: 'block', marginBottom: '0.5rem' }}>
              ⚠️ Backend Laravel non accessible
            </strong>
            <div style={{ fontSize: '0.9rem', opacity: 0.95 }}>
              Le serveur backend n'est pas démarré. Impossible de se connecter à http://localhost:8000
              <br />
              <strong style={{ marginTop: '0.5rem', display: 'block' }}>
                💡 Si vous utilisez Laragon : Vérifiez que PHP 8.2+ est sélectionné (Menu → PHP → Version)
              </strong>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => window.open('http://localhost:8000/api/test', '_blank')}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              }}
            >
              Tester la connexion
            </button>
            <button
              onClick={() => {
                const instructions = `
Pour démarrer le backend Laravel :

⚠️ IMPORTANT : Vérifiez d'abord votre version PHP
- Le projet nécessite PHP 8.2 ou supérieur
- Votre version actuelle : PHP 8.1.10 (incompatible)

📋 Étapes :

1. Installation PHP 8.2 (choisissez une methode) :
   
   METHODE A - Standalone (recommandee) :
   - Telechargez PHP 8.2 depuis windows.php.net/downloads
   - Extrayez dans C:\php82\
   - Ajoutez C:\php82\ au PATH Windows
   - Fermez et rouvrez le terminal
   
   METHODE B - Via Laragon :
   - Ouvrez Laragon
   - Clic droit sur l'icone Laragon (systray) → PHP → Version
   - Ou cherchez les parametres PHP dans Laragon
   - Selectionnez PHP 8.2 ou 8.3
   - Redemarrez Laragon

2. Vérifiez la version :
   php -v

3. Installez les dépendances :
   cd backend
   composer install

4. Démarrez le serveur :
   php artisan serve

Ou utilisez le script : start-backend.bat

📖 Plus de détails : Voir PROBLEME_PHP.md
                `.trim();
                alert(instructions);
              }}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              }}
            >
              Instructions
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null; // Backend en ligne, ne rien afficher
};

export default BackendStatus;

