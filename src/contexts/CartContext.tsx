'use client';

import React, { createContext, useContext, ReactNode, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  desc: string;
  img: string;
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'qty'>) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, delta: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = React.useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('la-fourchette-cart');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('la-fourchette-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, 'qty'>) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => 
      prev.map(i => {
        if (i.id === id) {
          const newQty = Math.max(0, i.qty + delta);
          return newQty === 0 ? null : { ...i, qty: newQty };
        }
        return i;
      }).filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const count = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};