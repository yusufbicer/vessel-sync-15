
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Truck, Save, ArrowLeft, Loader2 } from 'lucide-react';

const NewShipmentPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [vendors, setVendors] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    order_number: '',
    description: '',
    vendor_id: '',
    volume: 0,
    weight: 0,
    estimated_arrival: '',
    tracking_number: '',
    notes: '',
    status: 'ordered',
  });

  // Tedarikçileri yükle
  useState(() => {
    const loadVendors = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('vendors')
          .select('id, name')
          .eq('user_id', user.id)
          .order('name');

        if (error) throw error;
        setVendors(data || []);
      } catch (error) {
        console.error('Tedarikçiler yüklenirken hata:', error);
      }
    };

    loadVendors();
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
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

      const { data, error } = await supabase.from('shipments').insert({
        ...formData,
        user_id: user.id,
      }).select();

      if (error) throw error;

      toast({
        title: 'Başarılı',
        description: 'Sevkiyat başarıyla oluşturuldu.',
      });

      navigate('/dashboard/shipments');
    } catch (error) {
      console.error('Sevkiyat oluşturulurken hata:', error);
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Sevkiyat oluşturulurken bir sorun oluştu.',
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
            <h1 className="text-3xl font-bold tracking-tight">Yeni Sevkiyat</h1>
            <p className="text-muted-foreground">
              Yeni bir sevkiyat oluşturun ve takip edin.
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard/shipments')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Geri Dön
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Sevkiyat Bilgileri</CardTitle>
              <CardDescription>
                Sevkiyatla ilgili gerekli bilgileri doldurun.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="order_number">Sipariş Numarası</Label>
                  <Input
                    id="order_number"
                    name="order_number"
                    placeholder="ORD-12345"
                    value={formData.order_number}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vendor_id">Tedarikçi</Label>
                  <Select
                    value={formData.vendor_id}
                    onValueChange={(value) => handleSelectChange('vendor_id', value)}
                    required
                  >
                    <SelectTrigger id="vendor_id">
                      <SelectValue placeholder="Tedarikçi seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {vendors.map((vendor) => (
                        <SelectItem key={vendor.id} value={vendor.id}>
                          {vendor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Durum</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleSelectChange('status', value)}
                    required
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Durum seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ordered">Sipariş Verildi</SelectItem>
                      <SelectItem value="received_at_warehouse">Depoda</SelectItem>
                      <SelectItem value="packed">Paketlendi</SelectItem>
                      <SelectItem value="shipped">Yola Çıktı</SelectItem>
                      <SelectItem value="in_transit">Taşınıyor</SelectItem>
                      <SelectItem value="customs">Gümrükte</SelectItem>
                      <SelectItem value="delivered">Teslim Edildi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tracking_number">Takip Numarası</Label>
                  <Input
                    id="tracking_number"
                    name="tracking_number"
                    placeholder="TRK-12345"
                    value={formData.tracking_number}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="volume">Hacim (m³)</Label>
                  <Input
                    id="volume"
                    name="volume"
                    type="number"
                    placeholder="0.00"
                    value={formData.volume || ''}
                    onChange={handleNumberChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Ağırlık (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="0.00"
                    value={formData.weight || ''}
                    onChange={handleNumberChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimated_arrival">Tahmini Varış Tarihi</Label>
                  <Input
                    id="estimated_arrival"
                    name="estimated_arrival"
                    type="date"
                    value={formData.estimated_arrival}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Sevkiyat hakkında açıklama"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notlar</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Ek notlar"
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
                onClick={() => navigate('/dashboard/shipments')}
              >
                İptal
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Oluşturuluyor
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Oluştur
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

export default NewShipmentPage;
