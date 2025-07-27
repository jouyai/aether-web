import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { toast } from "sonner";

export default function CheckoutPage() {
  // 👇 1. Ambil fungsi `clearCart` dari hook useCart 👇
  const { cartItems, cartCount, clearCart } = useCart();
  const navigate = useNavigate();

  const parsePrice = (priceValue) => {
    if (typeof priceValue !== 'string' && typeof priceValue !== 'number') return 0;
    return Number(String(priceValue).replace(/[^0-9]/g, ''));
  };

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + parsePrice(item.price) * item.quantity;
  }, 0);

  const platformFee = 5000;
  const total = subtotal + platformFee;

  const handlePayment = () => {
    toast.success("Pembayaran berhasil! Mengarahkan ke konfirmasi...");
    
    // Kirim data pesanan ke halaman konfirmasi
    navigate('/confirmation', { state: { order: cartItems, total } });
    
    // 👇 2. Panggil fungsi clearCart untuk mengosongkan keranjang 👇
    clearCart();
  };

  if (cartCount === 0) {
    return (
        <div className="container mx-auto px-4 pt-24 pb-16 text-center">
            <h1 className="text-3xl font-bold">Keranjang Anda Kosong</h1>
            <p className="text-muted-foreground mt-4">Tidak ada item untuk di-checkout.</p>
            <Button asChild className="mt-6">
                <Link to="/explore">Mulai Belanja</Link>
            </Button>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Beranda</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/explore">Jelajahi</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Checkout</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Kolom Kiri: Detail & Pembayaran */}
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader><CardTitle>Detail Kontak</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" defaultValue="Budi Gamer" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Alamat Email</Label>
                <Input id="email" type="email" defaultValue="budi.gamer@email.com" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader><CardTitle>Metode Pembayaran</CardTitle></CardHeader>
            <CardContent>
              <RadioGroup defaultValue="va-bca" className="space-y-4">
                <Label className="flex items-center gap-4 border rounded-md p-4 cursor-pointer">
                  <RadioGroupItem value="va-bca" id="va-bca" />
                  Virtual Account BCA
                </Label>
                <Label className="flex items-center gap-4 border rounded-md p-4 cursor-pointer">
                  <RadioGroupItem value="gopay" id="gopay" />
                  GoPay / E-Wallet
                </Label>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Kolom Kanan: Ringkasan Pesanan */}
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Ringkasan Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.name} x{item.quantity}</span>
                    <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.price)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Biaya Platform</span>
                  <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(platformFee)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                  <span>Total</span>
                  <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(total)}</span>
                </div>
              </div>
              <Button size="lg" className="w-full mt-4" onClick={handlePayment}>Bayar Sekarang</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}