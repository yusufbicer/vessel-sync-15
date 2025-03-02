
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  Truck,
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  AlertCircle,
  Loader2,
  Filter,
  Package2,
  CircleCheck,
  Clock,
  FileText,
} from 'lucide-react';

const ShipmentsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [shipments, setShipments] = useState<any[]>([]);
  const [filteredShipments, setFilteredShipments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchShipments = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('shipments')
          .select(`
            id,
            created_at,
            order_number,
            description,
            status,
            estimated_arrival,
            actual_arrival,
            volume,
            weight,
            tracking_number,
            vendor_id,
            container_id,
            vendors(id, name),
            containers(id, container_number)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setShipments(data || []);
        setFilteredShipments(data || []);
      } catch (error) {
        console.error('Sevkiyatlar yüklenirken hata:', error);
        toast({
          variant: 'destructive',
          title: 'Hata',
          description: 'Sevkiyatlar yüklenirken bir sorun oluştu.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchShipments();
  }, [user, toast]);

  useEffect(() => {
    let result = shipments;

    // Status filter
    if (filter !== 'all') {
      result = result.filter((shipment) => shipment.status === filter);
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (shipment) =>
          shipment.order_number.toLowerCase().includes(searchLower) ||
          shipment.description.toLowerCase().includes(searchLower) ||
          (shipment.vendors?.name && shipment.vendors.name.toLowerCase().includes(searchLower)) ||
          (shipment.containers?.container_number &&
            shipment.containers.container_number.toLowerCase().includes(searchLower))
      );
    }

    setFilteredShipments(result);
  }, [search, filter, shipments]);

  // Status helpers
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: string }> = {
      ordered: {
        label: 'Sipariş Verildi',
        variant: 'warning',
      },
      received_at_warehouse: {
        label: 'Depoda',
        variant: 'default',
      },
      packed: {
        label: 'Paketlendi',
        variant: 'secondary',
      },
      shipped: {
        label: 'Yola Çıktı',
        variant: 'default',
      },
      in_transit: {
        label: 'Taşınıyor',
        variant: 'default',
      },
      customs: {
        label: 'Gümrükte',
        variant: 'warning',
      },
      delivered: {
        label: 'Teslim Edildi',
        variant: 'success',
      },
    };

    const status_info = statusMap[status] || {
      label: 'Bilinmiyor',
      variant: 'destructive',
    };

    return (
      <Badge
        variant={status_info.variant as any}
        className="capitalize"
      >
        {status_info.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  const handleDeleteShipment = async (id: string) => {
    if (!confirm('Bu sevkiyatı silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const { error } = await supabase.from('shipments').delete().eq('id', id);

      if (error) throw error;

      setShipments((prev) => prev.filter((s) => s.id !== id));
      toast({
        title: 'Başarılı',
        description: 'Sevkiyat başarıyla silindi.',
      });
    } catch (error) {
      console.error('Sevkiyat silinirken hata:', error);
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Sevkiyat silinirken bir sorun oluştu.',
      });
    }
  };

  const getStatusIcon = (status: string) => {
    const statusMap: Record<string, any> = {
      ordered: Clock,
      received_at_warehouse: Package2,
      packed: Package2,
      shipped: Truck,
      in_transit: Truck,
      customs: FileText,
      delivered: CircleCheck,
    };

    const Icon = statusMap[status] || AlertCircle;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sevkiyatlar</h1>
            <p className="text-muted-foreground">
              Tüm sevkiyatlarınızı görüntüleyin ve yönetin.
            </p>
          </div>
          <Button asChild>
            <Link to="/dashboard/shipments/new">
              <Plus className="mr-2 h-4 w-4" /> Yeni Sevkiyat
            </Link>
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Sevkiyat ara..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-10 gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filtrele</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-background border border-border shadow-md z-50">
                <DropdownMenuLabel>Duruma Göre Filtrele</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilter('all')}>
                  Tümü
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('ordered')}>
                  Sipariş Verildi
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('received_at_warehouse')}>
                  Depoda
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('packed')}>
                  Paketlendi
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('shipped')}>
                  Yola Çıktı
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('in_transit')}>
                  Taşınıyor
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('customs')}>
                  Gümrükte
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('delivered')}>
                  Teslim Edildi
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Sevkiyatlarınız</CardTitle>
              <CardDescription>
                {filteredShipments.length} sevkiyat listeleniyor.
                {filter !== 'all' && ` (${filter} filtresi aktif)`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex h-60 items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredShipments.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sipariş No</TableHead>
                        <TableHead>Tedarikçi</TableHead>
                        <TableHead>Durum</TableHead>
                        <TableHead>Tahmini Varış</TableHead>
                        <TableHead>Konteyner</TableHead>
                        <TableHead>Hacim/Ağırlık</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredShipments.map((shipment) => (
                        <TableRow key={shipment.id}>
                          <TableCell className="font-medium">
                            {shipment.order_number}
                          </TableCell>
                          <TableCell>{shipment.vendors?.name || '-'}</TableCell>
                          <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                          <TableCell>{formatDate(shipment.estimated_arrival)}</TableCell>
                          <TableCell>
                            {shipment.containers?.container_number || '-'}
                          </TableCell>
                          <TableCell>
                            {shipment.volume} m³ / {shipment.weight} kg
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 relative z-10">
                                  <span className="sr-only">Menü aç</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-background border border-border shadow-md z-50">
                                <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                  <Link to={`/dashboard/shipments/${shipment.id}`} className="flex cursor-pointer items-center">
                                    <Eye className="mr-2 h-4 w-4" />
                                    Görüntüle
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link to={`/dashboard/shipments/${shipment.id}/edit`} className="flex cursor-pointer items-center">
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Düzenle
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                                  onClick={() => handleDeleteShipment(shipment.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Sil
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex h-60 flex-col items-center justify-center text-center">
                  <Truck className="h-10 w-10 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">Sevkiyat bulunamadı</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {search || filter !== 'all'
                      ? 'Arama kriterlerinize uygun sevkiyat bulunamadı.'
                      : 'Henüz bir sevkiyat oluşturmadınız.'}
                  </p>
                  {!search && filter === 'all' && (
                    <Button className="mt-4" asChild>
                      <Link to="/dashboard/shipments/new">
                        İlk Sevkiyatı Oluştur
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
};

export default ShipmentsPage;
