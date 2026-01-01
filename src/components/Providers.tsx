'use client';

import React, { ReactNode } from 'react';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import NotificationToast from '@/components/NotificationToast';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <NotificationProvider>
      <CartProvider>
        <AuthProvider>
          {children}
          <NotificationToast />
        </AuthProvider>
      </CartProvider>
    </NotificationProvider>
  );
};

export default Providers;