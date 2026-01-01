'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/contexts/NotificationContext';
import Icon from './Icon';

const ReservationPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({ date: '', time: '', guests: 2 });

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Validation plus robuste
    const dateValue = formData.date?.trim();
    const timeValue = formData.time?.trim();

    if (!dateValue || !timeValue) {
      showNotification(
        'warning',
        'Informations manquantes',
        'Veuillez sélectionner une date et une heure pour votre réservation.'
      );
      return;
    }

    // Formater la date pour l'affichage
    const dateObj = new Date(dateValue);
    const formattedDate = dateObj.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Simuler la création de la réservation
    showNotification(
      'success',
      'Réservation confirmée',
      `Nous vous réservons le plaisir de vous accueillir le ${formattedDate} à ${timeValue} pour ${formData.guests} personne${formData.guests > 1 ? 's' : ''}.`
    );

    // Réinitialiser le formulaire
    setFormData({ date: '', time: '', guests: 2 });
  };

  if (!isAuthenticated) {
    return (
      <div className="container section-padding text-center">
        <div className="text-accent" style={{ marginBottom: '2rem' }}><Icon name="lock" /></div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1rem' }}>Espace Réservé</h2>
        <p style={{ marginBottom: '3rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
          Connectez-vous pour réserver votre table privilège.
        </p>
        <button onClick={() => window.dispatchEvent(new CustomEvent('go-to-login'))} className="btn">
          Se connecter
        </button>
      </div>
    );
  }

  return (
    <div className="container section-padding fade-in" style={{ maxWidth: '600px' }}>
      <h2 className="text-center" style={{ marginBottom: '3rem', fontFamily: 'var(--font-display)', fontSize: '2.5rem' }}>Réservation</h2>
      <form onSubmit={handleSubmit} style={{ padding: '3rem', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="form-group">
          <label className="form-label">Date</label>
          <input 
            type="date" 
            className="form-input" 
            value={formData.date} 
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Heure</label>
          <input 
            type="time" 
            className="form-input" 
            value={formData.time} 
            onChange={(e) => setFormData({...formData, time: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Convives</label>
          <select 
            className="form-input" 
            value={formData.guests} 
            onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
            required
          >
            {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Personne{n > 1 ? 's' : ''}</option>)}
          </select>
        </div>
        <div className="text-center" style={{ marginTop: '3rem' }}>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Valider
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationPage;