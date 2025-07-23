import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Star, ShoppingCart } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const itemsData = {
  1: { id: 1, name: "Dragonfire Wand", game: "Fantasy Kingdom", price: "Rp 750.000", imageUrl: "https://placehold.co/800x600/171717/ffffff?text=Dragonfire+Wand", description: "Tongkat sihir legendaris yang ditempa dengan nafas naga. Memberikan kekuatan api yang luar biasa kepada penggunanya.", rating: 4.8, seller: "MageMaster" },
  2: { id: 2, name: "Shadow Cloak", game: "Cyberpunk Realms", price: "Rp 1.200.000", imageUrl: "https://placehold.co/800x600/4f46e5/ffffff?text=Shadow+Cloak", description: "Jubah yang ditenun dari bayangan digital, membuat pemakainya hampir tidak terlihat di malam hari.", rating: 4.9, seller: "NightRunner" },
  3: { id: 3, name: "Gjallarhorn Schematic", game: "Galaxy Raiders", price: "Rp 5.500.000", imageUrl: "https://placehold.co/800x600/be123c/ffffff?text=Gjallarhorn", description: "Skema langka untuk membuat senjata pemusnah paling ikonik di galaksi.", rating: 5.0, seller: "StarTrader" },
  4: { id: 4, name: "Ancient Rune Set", game: "Mythic Legends", price: "Rp 320.000", imageUrl: "https://placehold.co/800x600/166534/ffffff?text=Rune+Set", description: "Satu set rune kuno yang berisi kekuatan elemental. Dapat digunakan untuk meningkatkan senjata atau armor.", rating: 4.7, seller: "RuneSeeker" },
  5: { id: 5, name: "Cybernetic Helmet", game: "Cyberpunk Realms", price: "Rp 850.000", imageUrl: "https://placehold.co/800x600/8b5cf6/ffffff?text=Cyber+Helmet", description: "Helm canggih dengan HUD terintegrasi.", rating: 4.6, seller: "TechSavvy" },
};

export default function ItemDetailPage() {
  const { itemId } = useParams();
  const { addToCart } = useCart();
  const item = itemsData[itemId];

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Item tidak ditemukan!</h1>
      </div>
    );
  }

  const relatedItems = Object.values(itemsData).filter(
    relatedItem => relatedItem.game === item.game && relatedItem.id !== item.id
  ).slice(0, 4);

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
        {/* Kolom Gambar */}
        <div>
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-auto aspect-square md:aspect-auto rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Kolom Detail */}
        <div className="flex flex-col gap-3 md:gap-4">
          <Badge variant="secondary" className="w-fit">{item.game}</Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{item.name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="h-5 w-5 fill-current" />
              <span className="font-bold text-lg text-foreground">{item.rating}</span>
            </div>
            <span className="text-muted-foreground">|</span>
            <span className="text-muted-foreground">Penjual: <span className="font-semibold text-primary">{item.seller}</span></span>
          </div>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{item.description}</p>
          <p className="text-3xl md:text-4xl font-bold text-primary my-2 md:my-4">{item.price}</p>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mt-4">
            <Button size="lg" className="w-full sm:flex-1" onClick={() => addToCart(item)}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Tambah ke Keranjang
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:flex-1">Beli Langsung</Button>
          </div>
        </div>
      </div>

      {/* Related Items Section */}
      {relatedItems.length > 0 && (
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8">Item Terkait</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {relatedItems.map(related => (
              <Link to={`/item/${related.id}`} key={related.id} className="group">
                <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="p-0">
                    <img src={related.imageUrl} alt={related.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardDescription>{related.game}</CardDescription>
                    <CardTitle className="text-lg font-semibold mt-1 truncate">{related.name}</CardTitle>
                    <p className="text-xl font-bold text-primary mt-2">{related.price}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
