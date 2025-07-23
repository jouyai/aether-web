// src/pages/EditProfilePage.jsx

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '../context/AuthContext'; // Impor useAuth
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { toast } from "sonner";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Dapatkan data user

  // State untuk username
  const [username, setUsername] = useState('');
  const [loadingUsername, setLoadingUsername] = useState(false);

  // State untuk password
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loadingPassword, setLoadingPassword] = useState(false);

  // Ambil username saat ini ketika komponen dimuat
  useEffect(() => {
    if (user?.user_metadata?.username) {
      setUsername(user.user_metadata.username);
    } else if (user?.email) {
      setUsername(user.email.split('@')[0]); // Fallback ke nama dari email
    }
  }, [user]);

  // Fungsi untuk update username
  const handleUpdateUsername = async (event) => {
    event.preventDefault();
    setLoadingUsername(true);

    const { data, error } = await supabase.auth.updateUser({
      data: { username: username }
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Username berhasil diperbarui!");
    }
    setLoadingUsername(false);
  };

  // Fungsi untuk update password (sudah ada sebelumnya)
  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password dan konfirmasi password tidak cocok!");
      return;
    }
    if (password.length < 6) {
        toast.error("Password minimal harus 6 karakter.");
        return;
    }
    setLoadingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: password });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password berhasil diperbarui!");
      setPassword('');
      setConfirmPassword('');
    }
    setLoadingPassword(false);
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <Breadcrumb className="mb-8">
          {/* ... Breadcrumb code ... */}
      </Breadcrumb>
      
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Form Edit Username */}
        <Card>
          <CardHeader>
            <CardTitle>Ubah Username</CardTitle>
            <CardDescription>Username ini akan ditampilkan di profil Anda.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateUsername} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loadingUsername}>
                {loadingUsername ? 'Menyimpan...' : 'Simpan Username'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Form Ganti Password */}
        <Card>
          <CardHeader>
            <CardTitle>Ubah Password</CardTitle>
            <CardDescription>Masukkan password baru Anda di bawah ini.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdatePassword} className="space-y-6">
                {/* ... Input password dan konfirmasi password ... */}
              <div className="space-y-2">
                <Label htmlFor="new-password">Password Baru</Label>
                <Input id="new-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
                <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={loadingPassword}>
                {loadingPassword ? 'Menyimpan...' : 'Simpan Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}