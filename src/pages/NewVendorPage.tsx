
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Building, Save, ArrowLeft, Loader2 } from 'lucide-react';

const NewVendorPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact_person: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Türkiye',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

      const { data, error } = await supabase.from('vendors').insert({
        ...formData,
        user_id: user.id,
      }).select();

      if (error) throw error;

      toast({
        title: 'Başarılı',
        description: 'Tedarikçi başarıyla eklendi.',
      });

      navigate('/dashboard/vendors');
    } catch (error) {
      console.error('Tedarikçi eklenirken hata:', error);
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Tedarikçi eklenirken bir sorun oluştu.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Yeni Tedarikçi</h1>
            <p className="text-muted-foreground">
              Yeni bir tedarikçi kaydı oluşturun.
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard/vendors')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Geri Dön
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Tedarikçi Bilgileri</CardTitle>
              <CardDescription>
                Tedarikçi ile ilgili bilgileri doldurun.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Şirket Adı</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="ABC Tekstil Ltd."
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_person">İletişim Kişisi</Label>
                  <Input
                    id="contact_person"
                    name="contact_person"
                    placeholder="Ahmet Yılmaz"
                    value={formData.contact_person}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="info@abctekstil.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+90 212 123 4567"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adres</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Merkez Mah. İstanbul Cad. No:123"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Şehir</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="İstanbul"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Ülke</Label>
                  <Input
                    id="country"
                    name="country"
                    placeholder="Türkiye"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notlar</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Tedarikçi hakkında notlar"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard/vendors')}
              >
                İptal
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Ekleniyor
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Kaydet
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </DashboardShell>
  );
};

export default NewVendorPage;
