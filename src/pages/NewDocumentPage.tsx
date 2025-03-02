
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { ArrowLeft } from 'lucide-react';
import DocumentForm from '@/components/documents/DocumentForm';

const NewDocumentPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [shipments, setShipments] = useState<any[]>([]);

  // Load shipments
  useEffect(() => {
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
  }, [user]);

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

        {user && <DocumentForm userId={user.id} shipments={shipments} />}
      </div>
    </DashboardShell>
  );
};

export default NewDocumentPage;
