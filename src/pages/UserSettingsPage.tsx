
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { User, Settings, Save, Key, Loader2, LogOut } from 'lucide-react';

const UserSettingsPage = () => {
  const { user, profile, logout, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  
  const [userInfo, setUserInfo] = useState({
    full_name: '',
    company_name: '',
    phone_number: '',
    email: '',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Load user information
  useEffect(() => {
    if (profile) {
      setUserInfo({
        full_name: profile.full_name || '',
        company_name: profile.company_name || '',
        phone_number: profile.phone_number || '',
        email: profile.email || '',
      });
    }
  }, [profile]);

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const updateUserInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Oturum açmanız gerekiyor.',
      });
      return;
    }

    try {
      setIsLoading(true);

      // Log the update attempt for debugging
      console.log('Attempting to update profile with data:', {
        full_name: userInfo.full_name,
        company_name: userInfo.company_name,
        phone_number: userInfo.phone_number,
        userId: user.id
      });

      const { data, error } = await supabase
        .from('profiles')
        .update({
          full_name: userInfo.full_name,
          company_name: userInfo.company_name,
          phone_number: userInfo.phone_number,
        })
        .eq('id', user.id);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Profile update response:', data);

      // Refresh profile information
      await refreshProfile();

      toast({
        title: 'Başarılı',
        description: 'Profil bilgileriniz güncellendi.',
      });
    } catch (error) {
      console.error('Profil güncellenirken hata:', error);
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Profil güncellenirken bir sorun oluştu.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Oturum açmanız gerekiyor.',
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Yeni şifreler eşleşmiyor.',
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Şifre en az 6 karakter olmalıdır.',
      });
      return;
    }

    try {
      setIsPasswordChanging(true);

      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      toast({
        title: 'Başarılı',
        description: 'Şifreniz başarıyla güncellendi.',
      });

      // Clear password form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Şifre güncellenirken hata:', error);
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Şifre güncellenirken bir sorun oluştu.',
      });
    } finally {
      setIsPasswordChanging(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Başarılı',
        description: 'Oturumunuz kapatıldı.',
      });
    } catch (error) {
      console.error('Oturum kapatılırken hata:', error);
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Oturum kapatılırken bir sorun oluştu.',
      });
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hesap Ayarları</h1>
          <p className="text-muted-foreground">
            Hesap bilgilerinizi ve şifrenizi yönetin.
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Profil
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Key className="h-4 w-4" /> Güvenlik
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <Card>
              <form onSubmit={updateUserInfo}>
                <CardHeader>
                  <CardTitle>Profil Bilgileri</CardTitle>
                  <CardDescription>
                    Kişisel ve şirket bilgilerinizi güncelleyin.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Ad Soyad</Label>
                      <Input
                        id="full_name"
                        name="full_name"
                        placeholder="Ad Soyad"
                        value={userInfo.full_name}
                        onChange={handleInfoChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="E-posta"
                        value={userInfo.email}
                        disabled
                      />
                      <p className="text-xs text-muted-foreground">
                        E-posta adresiniz değiştirilemez.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company_name">Şirket Adı</Label>
                      <Input
                        id="company_name"
                        name="company_name"
                        placeholder="Şirket Adı"
                        value={userInfo.company_name}
                        onChange={handleInfoChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone_number">Telefon</Label>
                      <Input
                        id="phone_number"
                        name="phone_number"
                        placeholder="+90 5XX XXX XX XX"
                        value={userInfo.phone_number}
                        onChange={handleInfoChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Çıkış Yap
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Güncelleniyor
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Kaydet
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="mt-6">
            <Card>
              <form onSubmit={updatePassword}>
                <CardHeader>
                  <CardTitle>Şifre Değiştir</CardTitle>
                  <CardDescription>
                    Hesabınızın güvenliği için düzenli olarak şifrenizi değiştirin.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      placeholder="••••••••"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Yeni Şifre</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      placeholder="••••••••"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Şifreniz en az 6 karakter uzunluğunda olmalıdır.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Yeni Şifre (Tekrar)</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="ml-auto"
                    disabled={isPasswordChanging}
                  >
                    {isPasswordChanging ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Değiştiriliyor
                      </>
                    ) : (
                      <>
                        <Key className="mr-2 h-4 w-4" /> Şifremi Değiştir
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
};

export default UserSettingsPage;
