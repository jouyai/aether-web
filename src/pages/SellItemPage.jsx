// src/pages/SellItemPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { toast } from "sonner";

const games = ["Fantasy Kingdom", "Cyberpunk Realms", "Galaxy Raiders", "Mythic Legends", "Valorant", "Genshin Impact", "Dota 2"];

export default function SellItemPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [itemName, setItemName] = useState('');
  const [game, setGame] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setItemName('');
    setGame('');
    setPrice('');
    setDescription('');
    setImageFile(null);
    if (document.getElementById('image')) {
      document.getElementById('image').value = "";
    }
  };

  const handleConfirmSell = async () => {
    if (!user) {
      toast.error("Anda harus login untuk menjual item.");
      return;
    }
    if (!itemName || !game || !price || !description || !imageFile) {
        toast.error("Semua field, termasuk gambar, wajib diisi!");
        return;
    }

    setLoading(true);

    try {
      // 1. Upload gambar ke Supabase Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `private/${fileName}`; // PERBAIKAN: Upload ke folder 'private'

      let { error: uploadError } = await supabase.storage
        .from('item-images')
        .upload(filePath, imageFile);

      if (uploadError) {
        throw uploadError;
      }

      // 2. Dapatkan URL publik dari gambar yang baru di-upload
      const { data: { publicUrl } } = supabase.storage
        .from('item-images')
        .getPublicUrl(filePath);

      // 3. Masukkan data item ke dalam tabel 'items' di database
      const { error: insertError } = await supabase
        .from('item')
        .insert({
          name: itemName,
          game: game,
          price: Number(price),
          description: description,
          image_url: publicUrl,
          seller_id: user.id,
        });

      if (insertError) {
        throw insertError;
      }
      
      toast.success("Item Anda berhasil didaftarkan!");
      resetForm();
      navigate('/explore');

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild><Link to="/">Beranda</Link></BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Jual Item</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Formulir Penjualan Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="itemName">Nama Item</Label>
              <Input id="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Contoh: Dragonfire Wand" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="game">Game</Label>
              <Select onValueChange={setGame} value={game}>
                <SelectTrigger id="game"><SelectValue placeholder="Pilih game asal item" /></SelectTrigger>
                <SelectContent>{games.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Harga (IDR)</Label>
              <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Contoh: 750000" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi Item</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Jelaskan detail item Anda..." required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Gambar Item</Label>
                <Input id="image" type="file" className="pt-2" accept="image/png, image/jpeg" onChange={(e) => setImageFile(e.target.files[0])} required/>
                <p className="text-sm text-muted-foreground">Unggah screenshot atau gambar item Anda.</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="lg" className="w-full" disabled={loading}>{loading ? 'Memproses...' : 'Jual Item Sekarang'}</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Konfirmasi Penjualan</AlertDialogTitle>
                  <AlertDialogDescription>
                    Apakah Anda yakin ingin mendaftarkan item ini untuk dijual? Pastikan semua data sudah benar.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction onClick={handleConfirmSell}>Ya, Jual Sekarang</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}