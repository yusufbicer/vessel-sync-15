
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Package, ArrowRight, Loader2 } from 'lucide-react';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    
    if (password !== confirmPassword) {
      setPasswordError('Şifreler eşleşmiyor');
      return;
    }

    if (password.length < 6) {
      setPasswordError('Şifre en az 6 karakter olmalıdır');
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await signUp(email, password, {
        fullName,
        companyName,
        phoneNumber: ''  // Basitleştirilmiş kayıt için telefon numarası boş bırakılır
      });
      
      if (error) {
        console.error('Kayıt sırasında hata:', error);
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

      <div className="flex flex-1 items-center justify-center p-4 py-10">
        <div className="w-full max-w-md space-y-8 rounded-2xl border bg-card p-8 shadow-xl">
          <div className="space-y-2 text-center">
            <h1 className="font-display text-3xl font-bold tracking-tight">Hesap Oluşturun</h1>
            <p className="text-muted-foreground">Türk tedarikçilerinizden ithalatı kolaylaştırın</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Ad Soyad</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Ad Soyad"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName">Şirket Adı</Label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Şirket Adı"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>

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
                <Label htmlFor="password">Şifre</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {passwordError && (
                  <p className="text-sm text-destructive">{passwordError}</p>
                )}
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
              Hesap Oluştur
            </Button>
          </form>

          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Zaten hesabınız var mı?{' '}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Giriş Yapın
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
