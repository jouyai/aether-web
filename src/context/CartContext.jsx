import React, { createContext, useContext, useState } from 'react';
import { toast } from "sonner";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
    toast.success(`${item.name} telah ditambahkan ke keranjang!`);
  };

  const removeFromCart = (itemId) => {
    const itemToRemove = cartItems.find(i => i.id === itemId);
    if (itemToRemove) {
      toast.error(`${itemToRemove.name} telah dihapus dari keranjang.`);
    }
    setCartItems(prevItems => prevItems.filter(i => i.id !== itemId));
  };
  
  const clearCart = () => {
    setCartItems([]);
    toast.info("Keranjang telah dikosongkan.");
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    isCartOpen,
    openCart,
    closeCart,
    cartCount: cartItems.reduce((acc, item) => acc + item.quantity, 0),
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
