import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";
import { useAuth } from './AuthContext'; // 1. Impor useAuth

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, loading } = useAuth(); // 2. Dapatkan status user dan loading

  // 3. useEffect untuk memuat keranjang dari localStorage saat user berubah atau selesai loading
  useEffect(() => {
    // Jangan lakukan apa-apa jika status auth masih loading
    if (loading) return;

    let cartKey = 'cart-guest'; // Kunci default untuk tamu
    if (user) {
      cartKey = `cart-${user.id}`; // Kunci spesifik untuk user yang login
    }

    try {
      const storedCart = localStorage.getItem(cartKey);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      } else {
        // Jika tidak ada keranjang tersimpan, pastikan state kosong
        setCartItems([]);
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      setCartItems([]);
    }

  }, [user, loading]); // Dijalankan setiap kali user atau status loading berubah

  // 4. useEffect untuk menyimpan keranjang ke localStorage setiap kali ada perubahan
  useEffect(() => {
    // Jangan simpan keranjang kosong saat inisialisasi awal jika user belum dimuat
    if (loading && !cartItems.length) return;
    
    let cartKey = 'cart-guest';
    if (user) {
      cartKey = `cart-${user.id}`;
    }

    try {
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cartItems, user, loading]);


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
    // Hapus juga dari localStorage
    let cartKey = user ? `cart-${user.id}` : 'cart-guest';
    localStorage.removeItem(cartKey);
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