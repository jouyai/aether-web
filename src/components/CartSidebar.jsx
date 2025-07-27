import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { X, Trash2, Plus, Minus } from 'lucide-react';

export default function CartSidebar() {
  const { isCartOpen, closeCart, cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const parsePrice = (priceString) => {
    if (typeof priceString !== 'string' && typeof priceString !== 'number') return 0;
    return Number(String(priceString).replace(/[^0-9]/g, ''));
  };

  const total = cartItems.reduce((acc, item) => {
    return acc + parsePrice(item.price) * item.quantity;
  }, 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Keranjang Belanja</h2>
            <Button variant="ghost" size="icon" onClick={closeCart}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex-grow p-4 overflow-y-auto">
            {cartItems.length === 0 ? (
              <p className="text-muted-foreground text-center mt-8">Keranjang Anda kosong.</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img src={item.image_urls[0]} alt={item.name} className="w-20 h-20 rounded-md object-cover" />
                    <div className="flex-grow">
                      <p className="font-semibold">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                         <p className="font-bold text-primary">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.price)}</p>
                      </div>
                    </div>
                    <Button variant="destructive" size="icon" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-xl font-bold">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(total)}
                </span>
              </div>
              <Button size="lg" className="w-full" asChild onClick={closeCart}>
                <Link to="/checkout">Lanjut ke Checkout</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}