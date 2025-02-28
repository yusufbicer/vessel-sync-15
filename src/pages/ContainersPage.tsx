
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
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  Package2,
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Loader2,
  Filter,
  AlertCircle,
} from 'lucide-react';

const ContainersPage = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [containers, setContainers] = useState<any[]>([]);
  const [filteredContainers, setFilteredContainers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchContainers = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('containers')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setContainers(data || []);
        setFilteredContainers(data || []);
      } catch (error) {
        console.error('Konteynerler yüklenirken hata:', error);
        toast({
          variant: 'destructive',
          title: 'Hata',
          description: 'Konteynerler yüklenirken bir sorun oluştu.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContainers();
  }, [toast]);

  useEffect(() => {
    let result = containers;

    // Status filtresi
    if (statusFilter !== 'all') {
      result = result.filter((container) => container.status === statusFilter);
    }

    // Arama filtresi
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (container) =>
          container.container_number.toLowerCase().includes(searchLower) ||
          container.shipping_line.toLowerCase().includes(searchLower) ||
          (container.vessel_name && container.vessel_name.toLowerCase().includes(searchLower))
      );
    }

    setFilteredContainers(result);
  }, [search, statusFilter, containers]);

  // Status helpers
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: string }> = {
      pending: {
        label: 'Beklemede',
        variant: 'outline',
      },
      loading: {
        label: 'Yükleniyor',
        variant: 'secondary',
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

  const calculateUsagePercentage = (used: number, total: number) => {
    return Math.min(Math.round((used / total) * 100), 100);
  };

  const handleDeleteContainer = async (id: string) => {
    if (!isAdmin) {
      toast({
        variant: 'destructive',
        title: 'Yetki Hatası',
        description: 'Konteyner silme yetkisine sahip değilsiniz.',
      });
      return;
    }
    
    if (!confirm('Bu konteyneri silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const { error } = await supabase.from('containers').delete().eq('id', id);

      if (error) throw error;

      setContainers((prev) => prev.filter((c) => c.id !== id));
      toast({
        title: 'Başarılı',
        description: 'Konteyner başarıyla silindi.',
      });
    } catch (error) {
      console.error('Konteyner silinirken hata:', error);
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Konteyner silinirken bir sorun oluştu.',
      });
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Konteynerler</h1>
            <p className="text-muted-foreground">
              Tüm konteynerleri görüntüleyin ve takip edin.
            </p>
          </div>
          {isAdmin && (
            <Button asChild>
              <Link to="/dashboard/containers/new">
                <Plus className="mr-2 h-4 w-4" /> Yeni Konteyner
              </Link>
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Konteyner ara..."
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
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Duruma Göre Filtrele</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                  Tümü
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                  Beklemede
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('loading')}>
                  Yükleniyor
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('in_transit')}>
                  Taşınıyor
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('customs')}>
                  Gümrükte
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('delivered')}>
                  Teslim Edildi
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Tüm Konteynerler</CardTitle>
              <CardDescription>
                {filteredContainers.length} konteyner listeleniyor.
                {statusFilter !== 'all' && ` (${statusFilter} filtresi aktif)`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex h-60 items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredContainers.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Konteyner No</TableHead>
                        <TableHead>Durum</TableHead>
                        <TableHead>Kalkış</TableHead>
                        <TableHead>Tahmini Varış</TableHead>
                        <TableHead>Hatl/Gemi</TableHead>
                        <TableHead>Hacim Kullanımı</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContainers.map((container) => (
                        <TableRow key={container.id}>
                          <TableCell className="font-medium">
                            {container.container_number}
                          </TableCell>
                          <TableCell>{getStatusBadge(container.status)}</TableCell>
                          <TableCell>{formatDate(container.departure_date)}</TableCell>
                          <TableCell>{formatDate(container.estimated_arrival)}</TableCell>
                          <TableCell>{`${container.shipping_line} ${
                            container.vessel_name ? `/ ${container.vessel_name}` : ''
                          }`}</TableCell>
                          <TableCell>
                            <div className="flex flex-col space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span>
                                  {container.used_volume} / {container.total_volume_capacity} m³
                                </span>
                                <span>
                                  {calculateUsagePercentage(
                                    container.used_volume,
                                    container.total_volume_capacity
                                  )}
                                  %
                                </span>
                              </div>
                              <Progress
                                value={calculateUsagePercentage(
                                  container.used_volume,
                                  container.total_volume_capacity
                                )}
                                className="h-2"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Menü aç</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                  <Link to={`/dashboard/containers/${container.id}`} className="flex cursor-pointer items-center">
                                    <Eye className="mr-2 h-4 w-4" />
                                    Görüntüle
                                  </Link>
                                </DropdownMenuItem>
                                {isAdmin && (
                                  <DropdownMenuItem asChild>
                                    <Link to={`/dashboard/containers/${container.id}/edit`} className="flex cursor-pointer items-center">
                                      <Pencil className="mr-2 h-4 w-4" />
                                      Düzenle
                                    </Link>
                                  </DropdownMenuItem>
                                )}
                                {isAdmin && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                                      onClick={() => handleDeleteContainer(container.id)}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Sil
                                    </DropdownMenuItem>
                                  </>
                                )}
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
                  <Package2 className="h-10 w-10 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">
                    Konteyner bulunamadı
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {search || statusFilter !== 'all'
                      ? 'Arama kriterlerinize uygun konteyner bulunamadı.'
                      : 'Henüz bir konteyner kaydı yok.'}
                  </p>
                  {!search && statusFilter === 'all' && isAdmin && (
                    <Button className="mt-4" asChild>
                      <Link to="/dashboard/containers/new">
                        İlk Konteyneri Ekle
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

export default ContainersPage;
