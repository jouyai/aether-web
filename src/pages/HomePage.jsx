import { Link } from 'react-router-dom';
import { Search, ShieldCheck, Gem, PackageCheck, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const featuredItems = [
  { id: 1, name: "Dragonfire Wand", game: "Fantasy Kingdom", price: "Rp 750.000", imageUrl: "https://placehold.co/400x300/171717/ffffff?text=Dragonfire+Wand" },
  { id: 2, name: "Shadow Cloak", game: "Cyberpunk Realms", price: "Rp 1.200.000", imageUrl: "https://placehold.co/400x300/4f46e5/ffffff?text=Shadow+Cloak" },
  { id: 3, name: "Gjallarhorn Schematic", game: "Galaxy Raiders", price: "Rp 5.500.000", imageUrl: "https://placehold.co/400x300/be123c/ffffff?text=Gjallarhorn" },
  { id: 4, name: "Ancient Rune Set", game: "Mythic Legends", price: "Rp 320.000", imageUrl: "https://placehold.co/400x300/166534/ffffff?text=Rune+Set" },
];

const popularGames = ["Valorant", "Genshin Impact", "Mobile Legends", "Cyberpunk Realms", "Dota 2"];

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      {/* ===== Hero Section ===== */}
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
            <Button className="absolute right-2 top-1/2 -translate-y-1/2 h-9 rounded-full px-6" size="sm">
              Cari
            </Button>
          </div>
        </div>
      </section>

      {/* ===== Featured Items Section ===== */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Item Unggulan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredItems.map((item) => (
              <Link to={`/item/${item.id}`} key={item.id} className="group">
                <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="p-0">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardDescription>{item.game}</CardDescription>
                    <CardTitle className="text-lg font-semibold mt-1 truncate">{item.name}</CardTitle>
                    <p className="text-xl font-bold text-primary mt-2">{item.price}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full" tabIndex={-1}>Lihat Detail</Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* ===== Browse by Game Section ===== */}
      <section className="py-16 md:py-20 bg-secondary/30 border-t border-b">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Telusuri Berdasarkan Game</h2>
            <p className="max-w-xl mx-auto text-muted-foreground mb-8">
                Langsung masuk ke game favoritmu untuk menemukan item terbaik.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
                {popularGames.map(game => (
                    <Button key={game} variant="outline" size="lg" className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Gamepad2 className="h-4 w-4" />
                        {game}
                    </Button>
                ))}
            </div>
        </div>
      </section>

      {/* ===== Value Propositions Section ===== */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-center">
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Transaksi Aman</h3>
              <p className="text-muted-foreground">Setiap pembelian dilindungi oleh sistem keamanan canggih kami.</p>
            </div>
            <div className="flex flex-col items-center">
              <PackageCheck className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Pengiriman Instan</h3>
              <p className="text-muted-foreground">Item langsung dikirim ke akun Anda setelah pembayaran berhasil.</p>
            </div>
            <div className="flex flex-col items-center">
              <Gamepad2 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ribuan Pilihan</h3>
              <p className="text-muted-foreground">Jelajahi ribuan item dari ratusan game populer di seluruh dunia.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
