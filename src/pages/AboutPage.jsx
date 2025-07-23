import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const teamMembers = [
  { name: "Andi Wijaya", role: "Founder & CEO", imageUrl: "https://placehold.co/100x100/EFEFEF/333?text=AW" },
  { name: "Bunga Citra", role: "Lead Developer", imageUrl: "https://placehold.co/100x100/E0F2FE/333?text=BC" },
  { name: "Candra Perkasa", role: "Head of Marketing", imageUrl: "https://placehold.co/100x100/D1FAE5/333?text=CP" },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild><Link to="/">Beranda</Link></BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tentang Kami</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Tentang Aether</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Marketplace terpercaya untuk semua kebutuhan item game Anda.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-12 space-y-12">
        <Card>
          <CardHeader>
            <CardTitle>Misi Kami</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              Misi kami di Aether adalah untuk menyediakan platform yang aman, cepat, dan mudah bagi para gamer di seluruh Indonesia untuk membeli dan menjual item digital. Kami percaya bahwa setiap item dalam game memiliki nilai, dan kami ingin membantu para pemain mendapatkan nilai maksimal dari waktu dan usaha yang mereka investasikan.
            </p>
            <p>
              Kami berkomitmen untuk menjaga integritas transaksi, melindungi pengguna dari penipuan, dan membangun komunitas yang saling percaya dan mendukung.
            </p>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Tim Kami</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {teamMembers.map(member => (
              <Card key={member.name} className="text-center">
                <CardContent className="pt-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={member.imageUrl} alt={member.name} />
                    <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
