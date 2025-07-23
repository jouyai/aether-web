import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const allItems = [
  { id: 1, name: "Dragonfire Wand", game: "Fantasy Kingdom", price: 750000, imageUrl: "https://placehold.co/400x300/171717/ffffff?text=Dragonfire+Wand", category: "Weapon" },
  { id: 2, name: "Shadow Cloak", game: "Cyberpunk Realms", price: 1200000, imageUrl: "https://placehold.co/400x300/4f46e5/ffffff?text=Shadow+Cloak", category: "Armor" },
  { id: 3, name: "Gjallarhorn Schematic", game: "Galaxy Raiders", price: 5500000, imageUrl: "https://placehold.co/400x300/be123c/ffffff?text=Gjallarhorn", category: "Blueprint" },
  { id: 4, name: "Ancient Rune Set", game: "Mythic Legends", price: 320000, imageUrl: "https://placehold.co/400x300/166534/ffffff?text=Rune+Set", category: "Material" },
  { id: 5, name: "Vandal Prime", game: "Valorant", price: 217500, imageUrl: "https://placehold.co/400x300/f59e0b/000000?text=Vandal+Prime", category: "Weapon Skin" },
  { id: 6, name: "Genshin Genesis Crystals", game: "Genshin Impact", price: 150000, imageUrl: "https://placehold.co/400x300/3b82f6/ffffff?text=Genesis+Crystals", category: "Currency" },
  { id: 7, name: "Arcana Juggernaut", game: "Dota 2", price: 450000, imageUrl: "https://placehold.co/400x300/ef4444/ffffff?text=Arcana+Juggernaut", category: "Cosmetic" },
  { id: 8, name: "Cybernetic Helmet", game: "Cyberpunk Realms", price: 850000, imageUrl: "https://placehold.co/400x300/8b5cf6/ffffff?text=Cyber+Helmet", category: "Armor" },
];

const games = ["Semua Game", "Fantasy Kingdom", "Cyberpunk Realms", "Galaxy Raiders", "Mythic Legends", "Valorant", "Genshin Impact", "Dota 2"];

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGame, setSelectedGame] = useState("Semua Game");

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGame = selectedGame === "Semua Game" || item.game === selectedGame;
    return matchesSearch && matchesGame;
  });

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      {/* Breadcrumb */}
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

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Jelajahi Semua Item</h1>
        <p className="mt-4 text-lg text-muted-foreground">Temukan item yang Anda butuhkan dari ribuan pilihan.</p>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Cari item..." 
            className="w-full pl-10 h-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedGame} onValueChange={setSelectedGame}>
          <SelectTrigger className="w-full md:w-[280px] h-12">
            <SelectValue placeholder="Pilih Game" />
          </SelectTrigger>
          <SelectContent>
            {games.map(game => <SelectItem key={game} value={game}>{game}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <Link to={`/item/${item.id}`} key={item.id} className="group">
              <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-0">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
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
