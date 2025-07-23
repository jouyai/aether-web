// src/pages/ExplorePage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient'; // 1. Impor Supabase client
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton"; // Impor Skeleton untuk loading

// Hapus array `allItems` yang hardcoded

const games = ["Semua Game", "Fantasy Kingdom", "Cyberpunk Realms", "Galaxy Raiders", "Mythic Legends", "Valorant", "Genshin Impact", "Dota 2"];

export default function ExplorePage() {
  const [items, setItems] = useState([]); // 2. State untuk menyimpan data dari Supabase
  const [loading, setLoading] = useState(true); // State untuk loading
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGame, setSelectedGame] = useState("Semua Game");

  // 3. useEffect untuk mengambil data dari Supabase
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      let { data, error } = await supabase
        .from('item')
        .select('*')
        .order('created_at', { ascending: false }); // Urutkan berdasarkan yang terbaru

      if (error) {
        console.error("Error fetching items:", error);
      } else {
        setItems(data);
      }
      setLoading(false);
    };

    fetchItems();
  }, []); // Jalankan sekali saat komponen dimuat

  // 4. Logika filter sekarang berjalan di atas data dari state `items`
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGame = selectedGame === "Semua Game" || item.game === selectedGame;
    return matchesSearch && matchesGame;
  });

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <Breadcrumb className="mb-8">
        {/* ... Breadcrumb code ... */}
      </Breadcrumb>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Jelajahi Semua Item</h1>
        <p className="mt-4 text-lg text-muted-foreground">Temukan item yang Anda butuhkan dari ribuan pilihan.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* ... Filter Section code ... */}
      </div>

      {/* 5. Tampilkan Skeleton saat loading, atau tampilkan item jika sudah selesai */}
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
                  <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
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