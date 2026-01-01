"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "reception" | "cashier" | "chef" | "delivery" | "customer";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  userRole: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const router = useRouter();

  // Charger l'utilisateur depuis localStorage au démarrage
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('la-fourchette-user');
      if (saved) {
        try {
          const parsedUser = JSON.parse(saved);
          setUser(parsedUser);
        } catch (e) {
          console.error('Error parsing user from localStorage:', e);
          localStorage.removeItem('la-fourchette-user');
        }
      }
    }
  }, []);

  // Sauvegarder l'utilisateur dans localStorage à chaque changement
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('la-fourchette-user', JSON.stringify(user));
      } else {
        localStorage.removeItem('la-fourchette-user');
      }
    }
  }, [user]);

  const login = (email: string, password: string) => {
    if (email && password) {
      // Déterminer le rôle en fonction de l'email
      let userRole:
        | "admin"
        | "reception"
        | "cashier"
        | "chef"
        | "delivery"
        | "customer" = "customer";

      if (email === "admin@gmail.com") {
        // Changed to match user request
        userRole = "admin";
      } else if (email === "reception@lafourchette.com") {
        userRole = "reception";
      } else if (email === "cashier@lafourchette.com") {
        userRole = "cashier";
      } else if (email === "chef@lafourchette.com") {
        userRole = "chef";
      } else if (email === "delivery@lafourchette.com") {
        userRole = "delivery";
      } else if (email === "client@lafourchette.com" || email === "customer@lafourchette.com") {
        userRole = "customer";
      }

      const newUser = {
        id: "1",
        name: "Invité Prestigieux",
        email,
        role: userRole,
      };

      setUser(newUser);
      
      // Sauvegarder immédiatement dans localStorage
      localStorage.setItem('la-fourchette-user', JSON.stringify(newUser));

      // Redirection based on role - utiliser window.location pour forcer la navigation
      setTimeout(() => {
        switch (userRole) {
          case "admin":
            window.location.href = "/dashboard/admin";
            break;
          case "reception":
            window.location.href = "/dashboard/reception";
            break;
          case "cashier":
            window.location.href = "/dashboard/cashier";
            break;
          case "chef":
            window.location.href = "/dashboard/chef";
            break;
          case "delivery":
            window.location.href = "/dashboard/delivery";
            break;
          default:
            window.location.href = "/";
            break;
        }
      }, 100);

      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('la-fourchette-user');
    router.push("/login");
  };

  const isAuthenticated = !!user;
  const userRole = user?.role || null;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, userRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
