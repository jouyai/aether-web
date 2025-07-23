import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { MoreHorizontal } from 'lucide-react';

const userProfile = {
  name: "Budi Gamer",
  email: "budi.gamer@email.com",
  avatarUrl: "https://placehold.co/100x100/E0F2FE/333?text=BG",
};

const itemsForSale = [
  { id: 1, name: "Pedang Kristal", game: "Fantasy Kingdom", price: "Rp 500.000", status: "Aktif" },
  { id: 2, name: "Skin Senjata Neon", game: "Cyberpunk Realms", price: "Rp 250.000", status: "Aktif" },
  { id: 3, name: "Helm Ksatria", game: "Fantasy Kingdom", price: "Rp 300.000", status: "Terjual" },
];

const transactionHistory = [
    { id: 1, name: "Dragonfire Wand", price: "Rp 750.000", date: "2023-10-26", status: "Selesai" },
    { id: 2, name: "Vandal Prime", price: "Rp 217.500", date: "2023-10-22", status: "Selesai" },
];

export default function UserProfilePage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild><Link to="/">Beranda</Link></BreadcrumbLink>
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
            <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
            <AvatarFallback>{userProfile.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-2xl font-bold">{userProfile.name}</h1>
            <p className="text-muted-foreground">{userProfile.email}</p>
          </div>
          <Button variant="outline">Edit Profil</Button>
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
