import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExplorePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGame, setSelectedGame] = useState("Semua Game");
  const [gameList, setGameList] = useState([]);

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
        setGameList(["Semua Game", ...data.map(g => g.name)]);
      }
    };
    fetchGames();
  }, []);
  
  // Sinkronisasi filter dengan parameter URL
  useEffect(() => {
    const gameFromUrl = searchParams.get('game');
    if (gameFromUrl) {
      setSelectedGame(gameFromUrl);
    } else {
      setSelectedGame("Semua Game");
    }
  }, [searchParams]);

  // Mengambil data item
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching items:", error);
      } else {
        setItems(data);
      }
      setLoading(false);
    };

    fetchItems();
  }, []);

  // Memperbarui URL saat filter diubah
  const handleGameChange = (game) => {
    setSelectedGame(game);
    const newSearchParams = new URLSearchParams(searchParams);
    if (game === "Semua Game") {
      newSearchParams.delete('game');
    } else {
      newSearchParams.set('game', game);
    }
    setSearchParams(newSearchParams);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGame = selectedGame === "Semua Game" || item.game === selectedGame;
    return matchesSearch && matchesGame;
  });

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Beranda</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Jelajahi</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Jelajahi Semua Item</h1>
        <p className="mt-4 text-lg text-muted-foreground">Temukan item yang Anda butuhkan dari ribuan pilihan.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari nama item..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="md:w-1/4">
          <Select value={selectedGame} onValueChange={handleGameChange}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih Game" />
            </SelectTrigger>
            <SelectContent>
              {gameList.map(game => (
                <SelectItem key={game} value={game}>
                  {game}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          ))
        ) : filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <Link to={`/item/${item.id}`} key={item.id} className="group">
              <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-0">
                  <img src={item.image_urls[0]} alt={item.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                </CardHeader>
                <CardContent className="p-4">
                  <CardDescription>{item.game}</CardDescription>
                  <CardTitle className="text-lg font-semibold mt-1 truncate">{item.name}</CardTitle>
                  <p className="text-xl font-bold text-primary mt-2">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.price)}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-xl text-muted-foreground">Tidak ada item yang cocok dengan pencarian Anda.</p>
          </div>
        )}
      </div>
    </div>
  );
}