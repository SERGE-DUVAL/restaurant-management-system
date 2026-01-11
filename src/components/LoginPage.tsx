"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useNotification } from "@/contexts/NotificationContext";
import BackendStatus from "./BackendStatus";
import Icon from "./Icon";
import { authService } from "@/services/authService";

const LoginPage: React.FC = () => {
  const { login, user, logout, loading } = useAuth();
  const router = useRouter();
  const { showNotification } = useNotification();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [telephone, setTelephone] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const success = await login(email, password);
      if (!success) {
        // Vérifier si c'est une erreur de connexion au backend
        showNotification(
          'error',
          'Erreur de connexion',
          'Impossible de se connecter au serveur. Vérifiez que le backend Laravel est démarré sur http://localhost:8000'
        );
      }
    } catch (error: any) {
      showNotification(
        'error',
        'Erreur',
        error.message || 'Une erreur est survenue lors de la connexion'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!nom || !prenom || !email || !password || !passwordConfirmation) {
      showNotification(
        'error',
        'Champs manquants',
        'Veuillez remplir tous les champs obligatoires'
      );
      return;
    }

    if (password !== passwordConfirmation) {
      showNotification(
        'error',
        'Mots de passe différents',
        'Les mots de passe ne correspondent pas'
      );
      return;
    }

    if (password.length < 6) {
      showNotification(
        'error',
        'Mot de passe trop court',
        'Le mot de passe doit contenir au moins 6 caractères'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await authService.register({
        nom,
        prenom,
        email,
        password,
        password_confirmation: passwordConfirmation,
        telephone: telephone || undefined,
      });

      // Connecter automatiquement l'utilisateur après l'inscription
      const success = await login(email, password);
      if (success) {
        showNotification(
          'success',
          'Inscription réussie',
          'Votre compte a été créé avec succès. Vous êtes maintenant connecté.'
        );
      }
    } catch (error: any) {
      console.error('Register error:', error);
      const errorMessage = error.message || 'Une erreur est survenue lors de l\'inscription';
      
      // Messages d'erreur plus spécifiques
      if (errorMessage.includes('email') && (errorMessage.includes('already') || errorMessage.includes('déjà'))) {
        showNotification(
          'error',
          'Email déjà utilisé',
          'Cet email est déjà associé à un compte. Veuillez vous connecter.'
        );
      } else if (errorMessage.includes('Impossible de se connecter') || errorMessage.includes('Database connection failed')) {
        showNotification(
          'error',
          'Erreur de base de données',
          'Impossible de se connecter à la base de données Supabase. Vérifiez la configuration avec votre collègue.'
        );
      } else if (errorMessage.includes('Timeout') || errorMessage.includes('timeout')) {
        showNotification(
          'error',
          'Timeout',
          'La requête a pris trop de temps. Le serveur essaie probablement de se connecter à Supabase. Vérifiez la configuration de la base de données.'
        );
      } else {
        showNotification(
          'error',
          'Erreur d\'inscription',
          errorMessage
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDashboardUrl = (role: string) => {
    switch (role) {
      case "admin":
        return "/dashboard/admin";
      case "reception":
        return "/dashboard/reception";
      case "cashier":
        return "/dashboard/cashier";
      case "chef":
        return "/dashboard/chef";
      case "delivery":
        return "/dashboard/delivery";
      default:
        return "/";
    }
  };

  // Si l'utilisateur est déjà connecté, afficher ses informations
  if (user) {
    return (
      <>
        <BackendStatus />
        <div className="container section-padding flex-center fade-in">
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            padding: "3rem",
            border: "1px solid rgba(197, 160, 89, 0.2)",
            borderRadius: "12px",
            background: "var(--color-bg-card)",
          }}
        >
          <h2
            className="text-center"
            style={{
              marginBottom: "2rem",
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              color: "var(--color-accent)",
            }}
          >
            Vous êtes déjà connecté
          </h2>
          
          <div
            style={{
              padding: "2rem",
              background: "var(--color-bg)",
              borderRadius: "8px",
              marginBottom: "2rem",
            }}
          >
            <div style={{ marginBottom: "1.5rem" }}>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--color-text-muted)",
                  marginBottom: "0.5rem",
                }}
              >
                Nom
              </p>
              <p
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "var(--color-text)",
                }}
              >
                {user.name}
              </p>
            </div>
            
            <div style={{ marginBottom: "1.5rem" }}>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--color-text-muted)",
                  marginBottom: "0.5rem",
                }}
              >
                Email
              </p>
              <p
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "var(--color-text)",
                }}
              >
                {user.email}
              </p>
            </div>
            
            <div>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--color-text-muted)",
                  marginBottom: "0.5rem",
                }}
              >
                Rôle
              </p>
              <p
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "var(--color-accent)",
                  textTransform: "capitalize",
                }}
              >
                {user.role}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <button
              onClick={() => router.push(getDashboardUrl(user.role))}
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              Aller au tableau de bord
            </button>
            <button
              onClick={logout}
              className="btn"
              style={{
                width: "100%",
                background: "transparent",
                border: "1px solid var(--color-accent)",
                color: "var(--color-accent)",
              }}
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      <BackendStatus />
      <div className="container section-padding flex-center fade-in">
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "3rem",
            border: "1px solid rgba(197, 160, 89, 0.2)",
          }}
        >
          <h2
            className="text-center"
            style={{
              marginBottom: "2rem",
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
            }}
          >
            {isRegister ? "Créer un compte" : "Connexion"}
          </h2>
          <form onSubmit={isRegister ? handleRegister : handleLogin}>
            {isRegister && (
              <>
                <div className="form-group">
                  <label className="form-label">Nom</label>
                  <input
                    type="text"
                    className="form-input"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Prénom</label>
                  <input
                    type="text"
                    className="form-input"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    placeholder="Votre prénom"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Téléphone (optionnel)</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    placeholder="0123456789"
                  />
                </div>
              </>
            )}
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Mot de passe</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            {isRegister && (
              <div className="form-group">
                <label className="form-label">Confirmer le mot de passe</label>
                <input
                  type="password"
                  className="form-input"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", marginBottom: "1.5rem" }}
              disabled={isSubmitting || loading}
            >
              {isSubmitting 
                ? (isRegister ? "Inscription..." : "Connexion...") 
                : (isRegister ? "S'inscrire" : "Entrer")}
            </button>
          </form>
          <p
            className="text-center"
            style={{
              fontSize: "0.85rem",
              cursor: "pointer",
              color: "var(--color-accent)",
              fontStyle: "italic",
            }}
            onClick={() => {
              setIsRegister(!isRegister);
              // Réinitialiser les champs lors du changement de mode
              setNom("");
              setPrenom("");
              setPasswordConfirmation("");
              setTelephone("");
            }}
          >
            {isRegister
              ? "Déjà client ? Se connecter"
              : "Nouveau client ? S'inscrire"}
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
