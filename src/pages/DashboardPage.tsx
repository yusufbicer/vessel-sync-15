
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  Truck,
  Package2,
  ShoppingBag,
  FileText,
  ArrowRight,
  Loader2,
  AlertCircle,
  TrendingUp,
  DollarSign,
  CircleCheck,
  Clock
} from 'lucide-react';

const DashboardPage = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    shipments: { total: 0, active: 0 },
    vendors: { total: 0 },
    containers: { total: 0, active: 0 },
    documents: { total: 0 }
  });
  const [recentShipments, setRecentShipments] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // Fetch shipments count
        const { data: shipmentsData, error: shipmentsError } = await supabase
          .from('shipments')
          .select('id, status')
          .eq('user_id', user.id);
        
        if (shipmentsError) throw shipmentsError;
        
        // Fetch vendors count
        const { count: vendorsCount, error: vendorsError } = await supabase
          .from('vendors')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id);
        
        if (vendorsError) throw vendorsError;
        
        // Fetch containers count (active ones)
        const { data: containersData, error: containersError } = await supabase
          .from('containers')
          .select('id, status');
        
        if (containersError) throw containersError;
        
        // Fetch documents count
        const { count: documentsCount, error: documentsError } = await supabase
          .from('documents')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id);
        
        if (documentsError) throw documentsError;
        
        // Fetch recent shipments
        const { data: recentShipmentsData, error: recentShipmentsError } = await supabase
          .from('shipments')
          .select(`
            id, 
            order_number, 
            description, 
            status, 
            estimated_arrival,
            vendors(name)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (recentShipmentsError) throw recentShipmentsError;
        
        // Process the data
        const activeShipments = shipmentsData.filter(s => 
          ['ordered', 'received_at_warehouse', 'packed', 'shipped', 'in_transit', 'customs'].includes(s.status)
        ).length;
        
        const activeContainers = containersData.filter(c => 
          ['pending', 'loading', 'in_transit', 'customs'].includes(c.status)
        ).length;
        
        setStats({
          shipments: { 
            total: shipmentsData.length, 
            active: activeShipments 
          },
          vendors: { 
            total: vendorsCount || 0 
          },
          containers: { 
            total: containersData.length, 
            active: activeContainers 
          },
          documents: { 
            total: documentsCount || 0 
          }
        });
        
        setRecentShipments(recentShipmentsData || []);
        
      } catch (error) {
        console.error('Dashboard veri çekme hatası:', error);
        toast({
          variant: "destructive",
          title: "Hata",
          description: "Dashboard verileri yüklenirken bir sorun oluştu.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, toast]);

  // Sevkiyat durumu gösterimi için yardımcı fonksiyon
  const getStatusInfo = (status: string) => {
    const statusMap: Record<string, { label: string; color: string; icon: any }> = {
      ordered: { 
        label: 'Sipariş Verildi', 
        color: 'text-orange-500 bg-orange-500/10', 
        icon: Clock 
      },
      received_at_warehouse: { 
        label: 'Depoda', 
        color: 'text-blue-500 bg-blue-500/10', 
        icon: Package2 
      },
      packed: { 
        label: 'Paketlendi', 
        color: 'text-indigo-500 bg-indigo-500/10', 
        icon: Package2 
      },
      shipped: { 
        label: 'Yola Çıktı', 
        color: 'text-purple-500 bg-purple-500/10', 
        icon: Truck 
      },
      in_transit: { 
        label: 'Taşınıyor', 
        color: 'text-amber-500 bg-amber-500/10', 
        icon: Truck 
      },
      customs: { 
        label: 'Gümrükte', 
        color: 'text-yellow-500 bg-yellow-500/10', 
        icon: FileText 
      },
      delivered: { 
        label: 'Teslim Edildi', 
        color: 'text-green-500 bg-green-500/10', 
        icon: CircleCheck 
      },
    };

    return statusMap[status] || { 
      label: 'Bilinmiyor', 
      color: 'text-gray-500 bg-gray-500/10', 
      icon: AlertCircle 
    };
  };

  return (
    <DashboardShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hoş Geldiniz, {profile?.full_name || user?.email}</h1>
          <p className="mt-1 text-muted-foreground">
            İthalat operasyonlarınızı takip edin ve yönetin.
          </p>
        </div>

        {isLoading ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Aktif Sevkiyatlar</CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-bold">{stats.shipments.active}</div>
                    <div className="text-xs text-muted-foreground">
                      Toplam: {stats.shipments.total}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-2">
                  <Link to="/dashboard/shipments" className="w-full">
                    <Button variant="ghost" size="sm" className="w-full justify-between">
                      <span>Tüm Sevkiyatlar</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Tedarikçiler</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.vendors.total}</div>
                </CardContent>
                <CardFooter className="p-2">
                  <Link to="/dashboard/vendors" className="w-full">
                    <Button variant="ghost" size="sm" className="w-full justify-between">
                      <span>Tedarikçi Yönetimi</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Aktif Konteynırlar</CardTitle>
                  <Package2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-bold">{stats.containers.active}</div>
                    <div className="text-xs text-muted-foreground">
                      Toplam: {stats.containers.total}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-2">
                  <Link to="/dashboard/containers" className="w-full">
                    <Button variant="ghost" size="sm" className="w-full justify-between">
                      <span>Tüm Konteynırlar</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Belgeler</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.documents.total}</div>
                </CardContent>
                <CardFooter className="p-2">
                  <Link to="/dashboard/documents" className="w-full">
                    <Button variant="ghost" size="sm" className="w-full justify-between">
                      <span>Belgeleri Görüntüle</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-full lg:col-span-4">
                <CardHeader>
                  <CardTitle>Son Sevkiyatlar</CardTitle>
                  <CardDescription>
                    En son eklenen 5 sevkiyat
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {recentShipments.length > 0 ? (
                    <div className="space-y-4">
                      {recentShipments.map((shipment) => {
                        const statusInfo = getStatusInfo(shipment.status);
                        const StatusIcon = statusInfo.icon;
                        
                        return (
                          <div key={shipment.id} className="flex items-center rounded-lg border p-3">
                            <div className={`rounded-full p-2 ${statusInfo.color}`}>
                              <StatusIcon className="h-4 w-4" />
                            </div>
                            <div className="ml-4 flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">{shipment.order_number}</p>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${statusInfo.color}`}>
                                  {statusInfo.label}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <p className="text-xs text-muted-foreground">
                                  Tedarikçi: {shipment.vendors.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {shipment.estimated_arrival ? new Date(shipment.estimated_arrival).toLocaleDateString('tr-TR') : 'Tarih yok'}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <Truck className="h-10 w-10 text-muted-foreground/50" />
                      <h3 className="mt-4 text-lg font-medium">Henüz sevkiyatınız yok</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        İlk sevkiyatınızı oluşturmak için yeni sevkiyat ekleyin.
                      </p>
                      <Button className="mt-4" asChild>
                        <Link to="/dashboard/shipments/new">
                          Sevkiyat Oluştur
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {recentShipments.length > 0 && (
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/dashboard/shipments">
                        Tüm Sevkiyatları Görüntüle
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>

              <Card className="col-span-full lg:col-span-3">
                <CardHeader>
                  <CardTitle>Hızlı İşlemler</CardTitle>
                  <CardDescription>
                    Sık kullanılan işlemler
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link to="/dashboard/shipments/new">
                    <Button variant="outline" className="w-full justify-start">
                      <Truck className="mr-2 h-4 w-4" />
                      Yeni Sevkiyat Oluştur
                    </Button>
                  </Link>
                  <Link to="/dashboard/vendors/new">
                    <Button variant="outline" className="w-full justify-start">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Yeni Tedarikçi Ekle
                    </Button>
                  </Link>
                  <Link to="/dashboard/documents/new">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Yeni Belge Yükle
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </DashboardShell>
  );
};

export default DashboardPage;
