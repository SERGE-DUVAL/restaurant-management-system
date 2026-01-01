'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface RoleProtectedLayoutProps {
  children: ReactNode;
  allowedRoles: string[];
  fallback?: ReactNode;
}

const RoleProtectedLayout: React.FC<RoleProtectedLayoutProps> = ({ 
  children, 
  allowedRoles, 
  fallback = <div>Accès refusé</div> 
}) => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Attendre un peu pour que l'utilisateur soit chargé depuis localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return null; // Afficher rien pendant le chargement
  }

  if (!isAuthenticated) {
    return null;
  }

  if (user && !allowedRoles.includes(user.role)) {
    return fallback;
  }

  return children;
};

export default RoleProtectedLayout;