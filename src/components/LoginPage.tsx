"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Icon from "./Icon";

const LoginPage: React.FC = () => {
  const { login, user, logout } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
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
    );
  }

  return (
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
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
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
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginBottom: "1.5rem" }}
          >
            {isRegister ? "S'inscrire" : "Entrer"}
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
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Déjà client ? Se connecter"
            : "Nouveau client ? S'inscrire"}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
