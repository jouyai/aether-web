// src/pages/UserProfilePage.jsx

import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 1. Impor hook useAuth
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Data dummy untuk item dan transaksi (bisa diganti dengan data dari Supabase nanti)
const itemsForSale = [
  {
    id: 1,
    name: "Pedang Kristal",
    game: "Fantasy Kingdom",
    price: "Rp 500.000",
    status: "Aktif",
  },
  {
    id: 2,
    name: "Skin Senjata Neon",
    game: "Cyberpunk Realms",
    price: "Rp 250.000",
    status: "Aktif",
  },
];
const transactionHistory = [
  {
    id: 1,
    name: "Dragonfire Wand",
    price: "Rp 750.000",
    date: "2023-10-26",
    status: "Selesai",
  },
];

export default function UserProfilePage() {
  const { user } = useAuth(); // 2. Panggil hook untuk mendapatkan data user

  // 3. Jika tidak ada user yang login, arahkan ke halaman login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 4. Hapus objek userProfile yang hardcoded dan gunakan data dari `user`
  const userDisplayName = user.email.split("@")[0];
  const userAvatarFallback = user.email.slice(0, 2).toUpperCase();

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
            <BreadcrumbPage>Profil Saya</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* User Info Card */}
      <Card className="mb-8">
        <CardContent className="pt-6 flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-24 h-24">
            {/* <AvatarImage src={userProfile.avatarUrl} alt={userDisplayName} /> */}
            <AvatarFallback>{userAvatarFallback}</AvatarFallback>
          </Avatar>
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-2xl font-bold">{userDisplayName}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/profile/edit">Edit Profil</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Tabs for User Activity */}
      <Tabs defaultValue="selling">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="selling">Item Dijual</TabsTrigger>
          <TabsTrigger value="history">Riwayat Transaksi</TabsTrigger>
        </TabsList>
        <TabsContent value="selling">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Item yang Anda Jual</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Game</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {itemsForSale.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.game}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Pembelian Anda</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
