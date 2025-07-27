import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Skeleton } from '@/components/ui/skeleton';
import ImageSlider from '../components/ImageSlider'; // Impor komponen slider

export default function ItemDetailPage() {
  const { itemId } = useParams();
  const { addToCart } = useCart();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('items')
        .select(`*, profiles ( username )`)
        .eq('id', itemId)
        .single();

      if (error) {
        console.error("Error fetching item:", error);
        setError("Item tidak ditemukan atau terjadi kesalahan.");
      } else {
        setItem(data);
      }
      setLoading(false);
    };

    if (itemId) {
      fetchItem();
    }
  }, [itemId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <Skeleton className="w-full h-[500px] rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-1/3" />
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !item) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">{error || "Item tidak ditemukan!"}</h1>
        <Button asChild className="mt-4">
            <Link to="/explore">Kembali ke Jelajah</Link>
        </Button>
      </div>
    );
  }

  const images = Array.isArray(item.image_urls) && item.image_urls.length > 0
    ? item.image_urls
    : [];

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Beranda</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/explore">Jelajahi</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>{item.name}</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Menggunakan komponen ImageSlider */}
        <ImageSlider slides={images} />
        
        <div className="flex flex-col gap-3 md:gap-4">
          <Badge variant="secondary" className="w-fit">{item.game}</Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{item.name}</h1>
          <div className="text-sm text-muted-foreground">
            Dijual oleh: <span className="font-semibold text-primary">{item.profiles?.username || 'Tanpa Nama'}</span>
          </div>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-2">{item.description}</p>
          <p className="text-3xl md:text-4xl font-bold text-primary my-2 md:my-4">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.price)}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mt-4">
            <Button size="lg" className="w-full sm:flex-1" onClick={() => addToCart(item)}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Tambah ke Keranjang
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:flex-1">Beli Langsung</Button>
          </div>
        </div>
      </div>
    </div>
  );
}