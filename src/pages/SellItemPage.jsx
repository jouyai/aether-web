import React, { useState, useEffect } from 'react';
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

export default function SellItemPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [itemName, setItemName] = useState('');
  const [game, setGame] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gameList, setGameList] = useState([]); // State untuk daftar game

  // Mengambil daftar game dari Supabase
  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase
        .from('games')
        .select('name')
        .order('name', { ascending: true });

      if (error) {
        console.error("Error fetching games:", error);
      } else {
        setGameList(data);
      }
    };
    fetchGames();
  }, []);

  const resetForm = () => {
    setItemName('');
    setGame('');
    setPrice('');
    setDescription('');
    setImageFiles([]);
    if (document.getElementById('image')) {
      document.getElementById('image').value = "";
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files.length > 5) {
      toast.error("Anda hanya dapat mengunggah maksimal 5 gambar.");
      e.target.value = ""; 
      return;
    }
    setImageFiles(Array.from(e.target.files));
  };

  const handleConfirmSell = async () => {
    if (!user) {
      toast.error("Anda harus login untuk menjual item.");
      return;
    }
    if (!itemName || !game || !price || !description || imageFiles.length === 0) {
        toast.error("Semua field dan minimal satu gambar wajib diisi!");
        return;
    }

    setLoading(true);

    try {
      const imageUrls = await Promise.all(
        imageFiles.map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${user.id}-${Date.now()}-${Math.random()}.${fileExt}`;
          const filePath = `public/${fileName}`;

          let { error: uploadError } = await supabase.storage
            .from('item-images')
            .upload(filePath, file);

          if (uploadError) {
            throw new Error(`Gagal mengunggah gambar: ${uploadError.message}`);
          }

          const { data: { publicUrl } } = supabase.storage
            .from('item-images')
            .getPublicUrl(filePath);
            
          return publicUrl;
        })
      );
      
      const { error: insertError } = await supabase
        .from('items')
        .insert({
          name: itemName,
          game: game,
          price: Number(price),
          description: description,
          image_urls: imageUrls,
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
                <SelectContent>
                  {gameList.map(g => <SelectItem key={g.name} value={g.name}>{g.name}</SelectItem>)}
                </SelectContent>
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
                <Label htmlFor="image">Gambar Item (Maks. 5)</Label>
                <Input 
                  id="image" 
                  type="file" 
                  className="pt-2" 
                  accept="image/png, image/jpeg" 
                  onChange={handleFileChange}
                  multiple
                  required
                />
                <p className="text-sm text-muted-foreground">Pilih 1 hingga 5 gambar untuk item Anda.</p>
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