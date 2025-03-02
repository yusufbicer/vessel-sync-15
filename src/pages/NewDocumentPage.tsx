
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
import { FileUp, Save, ArrowLeft, Loader2, Upload } from 'lucide-react';

const NewDocumentPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [shipments, setShipments] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    document_type: '',
    description: '',
    shipment_id: '',
  });

  // Sevkiyatları yükle
  useState(() => {
    const loadShipments = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('shipments')
          .select('id, order_number')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setShipments(data || []);
      } catch (error) {
        console.error('Sevkiyatlar yüklenirken hata:', error);
      }
    };

    loadShipments();
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
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

    if (!file) {
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Lütfen bir dosya seçin.',
      });
      return;
    }

    try {
      setIsLoading(true);

      // Dosya adını sanitize et
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${crypto.randomUUID()}.${fileExt}`;
      
      // Dosyayı Storage'a yükle
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Dosya URL'ini al
      const { data: urlData } = await supabase.storage
        .from('documents')
        .getPublicUrl(fileName);

      const fileUrl = urlData.publicUrl;

      // Belge kaydını veritabanına ekle
      const { data, error } = await supabase.from('documents').insert({
        document_type: formData.document_type,
        description: formData.description,
        shipment_id: formData.shipment_id || null,
        file_name: file.name,
        file_url: fileUrl,
        user_id: user.id,
      }).select();

      if (error) throw error;

      toast({
        title: 'Başarılı',
        description: 'Belge başarıyla yüklendi.',
      });

      navigate('/dashboard/documents');
    } catch (error) {
      console.error('Belge yüklenirken hata:', error);
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Belge yüklenirken bir sorun oluştu.',
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
            <h1 className="text-3xl font-bold tracking-tight">Yeni Belge</h1>
            <p className="text-muted-foreground">
              Yeni bir belge yükleyin ve ilgili bilgileri ekleyin.
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard/documents')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Geri Dön
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Belge Yükleme</CardTitle>
              <CardDescription>
                Yükleyeceğiniz belge için gerekli bilgileri doldurun.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="document_type">Belge Türü</Label>
                  <Select
                    value={formData.document_type}
                    onValueChange={(value) => handleSelectChange('document_type', value)}
                    required
                  >
                    <SelectTrigger id="document_type">
                      <SelectValue placeholder="Belge türü seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="invoice">Fatura</SelectItem>
                      <SelectItem value="customs_declaration">Gümrük Beyannamesi</SelectItem>
                      <SelectItem value="bill_of_lading">Konşimento</SelectItem>
                      <SelectItem value="packing_list">Çeki Listesi</SelectItem>
                      <SelectItem value="certificate_of_origin">Menşe Şahadetnamesi</SelectItem>
                      <SelectItem value="other">Diğer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shipment_id">İlgili Sevkiyat (Opsiyonel)</Label>
                  <Select
                    value={formData.shipment_id}
                    onValueChange={(value) => handleSelectChange('shipment_id', value)}
                  >
                    <SelectTrigger id="shipment_id">
                      <SelectValue placeholder="Bir sevkiyat seçin (opsiyonel)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">İlişkilendirme Yok</SelectItem>
                      {shipments.map((shipment) => (
                        <SelectItem key={shipment.id} value={shipment.id}>
                          {shipment.order_number}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Belge hakkında açıklama"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Dosya</Label>
                <div className="border border-input rounded-md p-4">
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                    required
                    className="mb-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Maksimum dosya boyutu: 10MB. Desteklenen formatlar: PDF, DOC, DOCX, XLS, XLSX, JPG, JPEG, PNG
                  </p>
                </div>
                {file && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Seçilen dosya: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard/documents')}
              >
                İptal
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Yükleniyor
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" /> Yükle
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

export default NewDocumentPage;
