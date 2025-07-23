import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Star, ShoppingCart } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Skeleton } from '@/components/ui/skeleton';
import ColorThief from 'colorthief';

export default function ItemDetailPage() {
  const { itemId } = useParams();
  const { addToCart } = useCart();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [palette, setPalette] = useState([]);
  const imgRef = useRef(null);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      setError(null);
      setPalette([]);

      // PERBAIKAN FINAL: Nama tabel diubah menjadi 'items' (jamak)
      const { data, error } = await supabase
        .from('item') 
        .select(`
          *,
          profiles ( username )
        `)
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

  const handleImageLoad = () => {
    if (!imgRef.current) return;
    const colorThief = new ColorThief();
    const img = imgRef.current;
    if (img.complete) {
      try {
        const colorPalette = colorThief.getPalette(img, 3);
        setPalette(colorPalette);
      } catch (e) {
        console.error("Error getting color palette from image:", e);
      }
    }
  };
  
  const backgroundStyle = palette.length > 0 ? {
    backgroundImage: `radial-gradient(circle, rgba(${palette[0].join(',')}, 0.2), rgba(${palette[1].join(',')}, 0.1) 50%, rgba(${palette[2].join(',')}, 0.05) 100%)`
  } : {
    backgroundColor: '#f1f5f9'
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <Skeleton className="w-full aspect-square rounded-lg" />
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

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild><Link to="/">Beranda</Link></BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild><Link to="/explore">Jelajahi</Link></BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{item.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div 
          className="w-full rounded-lg shadow-lg overflow-hidden flex justify-center items-center p-4 transition-all duration-500"
          style={backgroundStyle}
        >
          <img
            ref={imgRef}
            crossOrigin="anonymous"
            onLoad={handleImageLoad}
            src={item.image_url}
            alt={item.name}
            className="max-w-full max-h-[500px] object-contain drop-shadow-2xl"
          />
        </div>
        
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