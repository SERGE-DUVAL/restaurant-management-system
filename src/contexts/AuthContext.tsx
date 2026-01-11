"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { apiClient } from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "reception" | "cashier" | "chef" | "delivery" | "customer";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  userRole: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  // Charger l'utilisateur depuis localStorage et vérifier avec l'API
  React.useEffect(() => {
    const loadUser = async () => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('la-fourchette-user');
        const token = apiClient.getToken();
        
        if (saved && token) {
          try {
            const parsedUser = JSON.parse(saved);
            setUser(parsedUser);
            
            // Vérifier que le token est toujours valide
            try {
              const currentUser = await authService.getCurrentUser();
              // Mettre à jour l'utilisateur avec les données du serveur
              const updatedUser: User = {
                id: currentUser.id.toString(),
                name: `${currentUser.prenom} ${currentUser.nom}`,
                email: currentUser.email,
                role: mapBackendRoleToFrontendRole(currentUser.role),
              };
              setUser(updatedUser);
              localStorage.setItem('la-fourchette-user', JSON.stringify(updatedUser));
            } catch (error) {
              // Token invalide, déconnecter
              console.error('Token invalide:', error);
              setUser(null);
              apiClient.setToken(null);
              localStorage.removeItem('la-fourchette-user');
            }
          } catch (e) {
            console.error('Error parsing user from localStorage:', e);
            localStorage.removeItem('la-fourchette-user');
          }
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // Fonction pour mapper les rôles du backend vers le frontend
  const mapBackendRoleToFrontendRole = (backendRole: string): "admin" | "reception" | "cashier" | "chef" | "delivery" | "customer" => {
    const roleMap: { [key: string]: "admin" | "reception" | "cashier" | "chef" | "delivery" | "customer" } = {
      'admin': 'admin',
      'reception': 'reception',
      'caissier': 'cashier',
      'chef': 'chef',
      'livreur': 'delivery',
      'client': 'customer',
      'customer': 'customer',
    };
    return roleMap[backendRole.toLowerCase()] || 'customer';
  };

  // Fonction pour obtenir l'URL du dashboard selon le rôle
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

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!email || !password) {
      console.error('Email et mot de passe requis');
      return false;
    }

    try {
      setLoading(true);
      const response = await authService.login({ email, password });
      
      // Mapper l'utilisateur du backend vers le format frontend
      const frontendUser: User = {
        id: response.user.id.toString(),
        name: `${response.user.prenom} ${response.user.nom}`,
        email: response.user.email,
        role: mapBackendRoleToFrontendRole(response.user.role),
      };

      setUser(frontendUser);
      localStorage.setItem('la-fourchette-user', JSON.stringify(frontendUser));

      // Redirection selon le rôle
      setTimeout(() => {
        const dashboardUrl = getDashboardUrl(frontendUser.role);
        window.location.href = dashboardUrl;
      }, 500);

      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      // Afficher un message d'erreur plus détaillé dans la console
      if (error.message && error.message.includes('Impossible de se connecter')) {
        console.error('🔴 Backend non accessible:', error.message);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      apiClient.setToken(null);
      localStorage.removeItem('la-fourchette-user');
      router.push("/login");
    }
  };

  const isAuthenticated = !!user;
  const userRole = user?.role || null;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, userRole, loading }}
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
