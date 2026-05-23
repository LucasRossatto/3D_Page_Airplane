"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Destination } from "@/components/destinations/destinationsData";

export interface CartItem {
  dest: Destination;
  passengers: number;
  cabinClass: "economy" | "business" | "first";
  addedAt: number;
}

interface CartContextValue {
  items: CartItem[];
  add: (dest: Destination, passengers: number, cabinClass: CartItem["cabinClass"]) => void;
  remove: (city: string) => void;
  updatePassengers: (city: string, passengers: number) => void;
  updateCabin: (city: string, cabin: CartItem["cabinClass"]) => void;
  clear: () => void;
  total: number;
  count: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const add = useCallback((dest: Destination, passengers: number, cabinClass: CartItem["cabinClass"]) => {
    setItems(prev => {
      const exists = prev.find(i => i.dest.city === dest.city);
      if (exists) {
        return prev.map(i => i.dest.city === dest.city ? { ...i, passengers, cabinClass } : i);
      }
      return [...prev, { dest, passengers, cabinClass, addedAt: Date.now() }];
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback((city: string) => {
    setItems(prev => prev.filter(i => i.dest.city !== city));
  }, []);

  const updatePassengers = useCallback((city: string, passengers: number) => {
    setItems(prev => prev.map(i => i.dest.city === city ? { ...i, passengers } : i));
  }, []);

  const updateCabin = useCallback((city: string, cabin: CartItem["cabinClass"]) => {
    setItems(prev => prev.map(i => i.dest.city === city ? { ...i, cabinClass: cabin } : i));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => {
    const multiplier = i.cabinClass === "first" ? 2.8 : i.cabinClass === "business" ? 1.7 : 1;
    return sum + i.dest.price * multiplier * i.passengers;
  }, 0);

  const count = items.length;

  return (
    <CartContext.Provider value={{
      items, add, remove, updatePassengers, updateCabin, clear,
      total, count, isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
