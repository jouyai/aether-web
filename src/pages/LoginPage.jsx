import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom'; // ⬅️ Tambahkan Navigate
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { toast } from "sonner";
import { useAuth } from '@/context/AuthContext'; // ⬅️ Tambahkan ini

export default function LoginPage() {
  const navigate = useNavigate();
  const { user } = useAuth(); // ⬅️ Tambahkan ini
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // ⛔ Kalau user udah login, langsung arahkan ke home
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      toast.error("Email atau password yang Anda masukkan salah.");
    } else {
      toast.success("Login berhasil!");
      navigate('/');
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-16 flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Masuk ke Akun Anda</CardTitle>
          <CardDescription>Selamat datang kembali di Aether!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Memproses...' : 'Masuk'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
