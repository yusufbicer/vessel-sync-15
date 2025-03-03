
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Package, ArrowRight, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      if (error) {
        console.error('Error during login:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto flex h-20 max-w-screen-xl items-center justify-between p-4">
        <Link to="/" className="flex items-center gap-2 text-foreground group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary/20">
            <Package className="h-5 w-5 text-primary transition-all" />
          </div>
          <span className="font-display text-xl font-bold">Groop</span>
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 rounded-2xl border bg-card p-8 shadow-xl">
          <div className="space-y-2 text-center">
            <h1 className="font-display text-3xl font-bold tracking-tight">Hoş Geldiniz</h1>
            <p className="text-muted-foreground">Hesabınıza giriş yapın</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@sirket.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Şifre</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Şifremi Unuttum
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="mr-2 h-4 w-4" />
              )}
              Giriş Yap
            </Button>
          </form>

          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Hesabınız yok mu?{' '}
              <Link to="/signup" className="font-medium text-primary hover:underline">
                Hemen Kaydolun
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
