
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
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Upload } from 'lucide-react';
import DocumentTypeSelect from './DocumentTypeSelect';
import ShipmentSelect from './ShipmentSelect';
import DocumentDescriptionField from './DocumentDescriptionField';
import DocumentFileUpload from './DocumentFileUpload';

interface DocumentFormProps {
  userId: string;
  shipments: any[];
}

const DocumentForm = ({ userId, shipments }: DocumentFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    document_type: '',
    description: '',
    shipment_id: '',
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
    
    if (!userId) {
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

      // Sanitize file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${crypto.randomUUID()}.${fileExt}`;
      
      // Upload file to Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Storage error:', uploadError);
        throw uploadError;
      }

      // Get file URL
      const { data: urlData } = await supabase.storage
        .from('documents')
        .getPublicUrl(fileName);

      const fileUrl = urlData.publicUrl;

      // Add document record to database
      const { data, error } = await supabase.from('documents').insert({
        document_type: formData.document_type,
        description: formData.description,
        shipment_id: formData.shipment_id || null,
        file_name: file.name,
        file_url: fileUrl,
        user_id: userId,
      }).select();

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      toast({
        title: 'Başarılı',
        description: 'Belge başarıyla yüklendi.',
      });

      navigate('/dashboard/documents');
    } catch (error: any) {
      console.error('Belge yüklenirken hata:', error);
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: `Belge yüklenirken bir sorun oluştu: ${error.message || 'Bilinmeyen hata'}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
            <DocumentTypeSelect 
              value={formData.document_type}
              onValueChange={(value) => handleSelectChange('document_type', value)}
            />
            <ShipmentSelect 
              value={formData.shipment_id}
              onValueChange={(value) => handleSelectChange('shipment_id', value)}
              shipments={shipments}
            />
          </div>

          <DocumentDescriptionField
            value={formData.description}
            onChange={handleChange}
          />

          <DocumentFileUpload
            onChange={handleFileChange}
            file={file}
          />
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
  );
};

export default DocumentForm;
