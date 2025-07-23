import React from 'react';
import { Link } from 'react-router-dom';
import { Gem, Twitter, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Kolom Logo & Deskripsi */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold mb-4">
              <Gem className="h-6 w-6 text-primary" />
              <span>Aether</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Platform terpercaya untuk jual beli item game, skin, dan mata uang digital. Dari gamer, untuk gamer.
            </p>
          </div>

          {/* Kolom Tautan Cepat */}
          <div>
            <h3 className="font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li><Link to="/explore" className="text-muted-foreground hover:text-primary">Jelajahi</Link></li>
              <li><Link to="/sell" className="text-muted-foreground hover:text-primary">Jual Item</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary">Tentang Kami</Link></li>
            </ul>
          </div>

          {/* Kolom Sosial Media */}
          <div>
            <h3 className="font-semibold mb-4">Ikuti Kami</h3>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary"><Twitter /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Instagram /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Facebook /></a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Aether. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
