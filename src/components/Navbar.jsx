import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Gem, Menu, X, ShoppingCart, User, LogOut, Settings, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton"; // Pastikan Anda sudah membuat file Skeleton

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openCart, cartCount } = useCart();
  const { user, signOut, loading } = useAuth(); // Ambil `loading` dari useAuth
  const isLoggedIn = !!user;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; }
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  
  const handleOpenCartFromMenu = () => {
    closeMenu();
    openCart();
  };

  const renderNavActions = () => {
    // Saat masih loading, tampilkan placeholder
    if (loading) {
      return (
        <div className="hidden md:flex items-center gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      );
    }

    // Setelah loading selesai, tampilkan sesuai status login
    return (
      <div className="hidden md:flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative" onClick={openCart}>
          <ShoppingCart className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {cartCount}
            </span>
          )}
        </Button>
        
        {isLoggedIn ? (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {(user.user_metadata?.username || user.email).slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.user_metadata?.username || user.email.split('@')[0]}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link to="/profile"><User className="mr-2 h-4 w-4" /><span>Profil</span></Link></DropdownMenuItem>
              <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /><span>Pengaturan</span></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}><LogOut className="mr-2 h-4 w-4" /><span>Keluar</span></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button variant="outline" asChild><Link to="/login"><LogIn className="mr-2 h-4 w-4" />Masuk</Link></Button>
            <Button asChild><Link to="/register"><UserPlus className="mr-2 h-4 w-4" />Daftar</Link></Button>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMenuOpen ? 'bg-background/80 backdrop-blur-sm border-b' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold" onClick={isMenuOpen ? closeMenu : undefined}>
            <Gem className="h-6 w-6 text-primary" />
            <span>Aether</span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild><Link to="/explore">Jelajahi</Link></Button>
            <Button variant="ghost" asChild><Link to="/sell">Jual Item</Link></Button>
            <Button variant="ghost" asChild><Link to="/about">Tentang Kami</Link></Button>
          </div>

          <div className="flex items-center gap-2">
            {renderNavActions()}
            
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay Menu Mobile */}
      <div className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-sm md:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="container mx-auto px-4 h-full">
          <div className="flex flex-col items-center justify-center h-full gap-8">
              <Link to="/explore" className="text-3xl font-semibold" onClick={closeMenu}>Jelajahi</Link>
              <Link to="/sell" className="text-3xl font-semibold" onClick={closeMenu}>Jual Item</Link>
              <Link to="/about" className="text-3xl font-semibold" onClick={closeMenu}>Tentang Kami</Link>
              
              <button onClick={handleOpenCartFromMenu} className="relative text-3xl font-semibold">
                Keranjang
                {cartCount > 0 && (
                  <span className="absolute top-0 -right-6 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <div className="w-full max-w-xs border-t my-6"></div>

              {isLoggedIn ? (
                <div className="flex flex-col gap-4 w-full max-w-xs">
                  <Button variant="secondary" size="lg" asChild><Link to="/profile" onClick={closeMenu}><User className="mr-2 h-4 w-4" />Profil Saya</Link></Button>
                  <Button variant="destructive" size="lg" onClick={() => { closeMenu(); signOut(); }}><LogOut className="mr-2 h-4 w-4" />Keluar</Button>
                </div>
              ) : (
                <div className="flex flex-col gap-4 w-full max-w-xs">
                    <Button variant="outline" size="lg" asChild><Link to="/login" onClick={closeMenu}><LogIn className="mr-2 h-4 w-4" />Masuk</Link></Button>
                    <Button size="lg" asChild><Link to="/register" onClick={closeMenu}><UserPlus className="mr-2 h-4 w-4" />Daftar</Link></Button>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}