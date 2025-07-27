import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom"; // ⬅️ Tambah Navigate
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext"; // ⬅️ Tambah useAuth

export default function RegisterPage() {
  const navigate = useNavigate();
  const { user } = useAuth(); // ⬅️ Ambil user dari context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  // ⛔ Redirect jika sudah login
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { data: existingProfile, error: usernameError } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username)
        .single();

      if (existingProfile) {
        toast.error("Username ini sudah digunakan. Silakan pilih yang lain.");
        setLoading(false);
        return;
      }

      if (usernameError && usernameError.code !== "PGRST116") {
        throw usernameError;
      }
    } catch (error) {
      toast.error("Gagal memvalidasi username. Coba lagi.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
        },
      },
    });

    if (error) {
      if (error.message.includes("User already registered")) {
        toast.error("Email ini sudah terdaftar. Silakan gunakan email lain.");
      } else {
        toast.error(error.message);
      }
    } else {
      await supabase.auth.signOut();
      toast.success(
        "Registrasi berhasil! Silakan masuk dengan akun baru Anda."
      );
      navigate("/login");
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-16 flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Buat Akun Baru</CardTitle>
          <CardDescription>
            Bergabunglah dengan Aether dan mulai berpetualang.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Minimal 6 karakter"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Memproses..." : "Daftar"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="font-semibold text-primary hover:underline"
              >
                Masuk di sini
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
