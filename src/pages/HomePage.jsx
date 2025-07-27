import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Search, ShieldCheck, Gem, PackageCheck, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const popularGames = [
  "Valorant",
  "Genshin Impact",
  "Mobile Legends",
  "Cyberpunk Realms",
  "Dota 2",
  "Fantasy Kingdom",
];

export default function HomePage() {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) {
        console.error("Error fetching featured items:", error);
      } else {
        setFeaturedItems(data);
      }
      setLoading(false);
    };

    fetchFeaturedItems();
  }, []);

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <section className="text-center py-20 md:py-28 bg-secondary/30 border-b">
        <div className="container mx-auto px-4">
          <Gem className="mx-auto h-12 w-12 md:h-16 md:w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            Selamat Datang di Aether
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground mb-8">
            Tempatnya Jual Beli Item Game Terlengkap dan Terpercaya.
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari item atau game..."
              className="w-full pl-12 h-12 text-base rounded-full shadow-lg"
            />
            <Button
              className="absolute right-2 top-1/2 -translate-y-1/2 h-9 rounded-full px-6"
              size="sm"
            >
              Cari
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Item Terbaru</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                ))
              : featuredItems.map((item) => (
                  <Link to={`/item/${item.id}`} key={item.id} className="group">
                    <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                      <CardHeader className="p-0">
                        <img
                          src={item.image_urls[0]}
                          alt={item.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </CardHeader>
                      <CardContent className="p-4 flex-grow">
                        <CardDescription>{item.game}</CardDescription>
                        <CardTitle className="text-lg font-semibold mt-1 truncate">
                          {item.name}
                        </CardTitle>
                        <p className="text-xl font-bold text-primary mt-2">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          }).format(item.price)}
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button className="w-full" tabIndex={-1}>
                          Lihat Detail
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Mengapa Memilih Aether?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold">Transaksi Aman</h3>
              <p className="text-muted-foreground mt-2">
                Setiap transaksi dilindungi dan dijamin keamanannya.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <PackageCheck className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold">Pengiriman Cepat</h3>
              <p className="text-muted-foreground mt-2">
                Item digital Anda dikirimkan secara instan setelah pembayaran.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Gamepad2 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold">Pilihan Terlengkap</h3>
              <p className="text-muted-foreground mt-2">
                Ribuan item dari berbagai game populer tersedia untuk Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Telusuri Berdasarkan Game
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {popularGames.map((game) => (
              <Button key={game} variant="outline" size="lg" asChild>
                <Link to={`/explore?game=${encodeURIComponent(game)}`}>
                  {game}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
