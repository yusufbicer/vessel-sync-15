
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
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  ShoppingBag,
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Loader2,
} from 'lucide-react';

const VendorsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [vendors, setVendors] = useState<any[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchVendors = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('vendors')
          .select('*')
          .eq('user_id', user.id)
          .order('name');

        if (error) throw error;
        setVendors(data || []);
        setFilteredVendors(data || []);
      } catch (error) {
        console.error('Tedarikçiler yüklenirken hata:', error);
        toast({
          variant: 'destructive',
          title: 'Hata',
          description: 'Tedarikçiler yüklenirken bir sorun oluştu.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchVendors();
  }, [user, toast]);

  useEffect(() => {
    if (search) {
      const searchLower = search.toLowerCase();
      const filtered = vendors.filter(
        (vendor) =>
          vendor.name.toLowerCase().includes(searchLower) ||
          vendor.contact_person.toLowerCase().includes(searchLower) ||
          vendor.email.toLowerCase().includes(searchLower) ||
          vendor.city.toLowerCase().includes(searchLower) ||
          vendor.country.toLowerCase().includes(searchLower)
      );
      setFilteredVendors(filtered);
    } else {
      setFilteredVendors(vendors);
    }
  }, [search, vendors]);

  const handleDeleteVendor = async (id: string) => {
    if (!confirm('Bu tedarikçiyi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const { error } = await supabase.from('vendors').delete().eq('id', id);

      if (error) throw error;

      setVendors((prev) => prev.filter((v) => v.id !== id));
      toast({
        title: 'Başarılı',
        description: 'Tedarikçi başarıyla silindi.',
      });
    } catch (error) {
      console.error('Tedarikçi silinirken hata:', error);
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Tedarikçi silinirken bir sorun oluştu.',
      });
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tedarikçiler</h1>
            <p className="text-muted-foreground">
              Türk tedarikçilerinizi yönetin ve takip edin.
            </p>
          </div>
          <Button asChild>
            <Link to="/dashboard/vendors/new">
              <Plus className="mr-2 h-4 w-4" /> Yeni Tedarikçi
            </Link>
          </Button>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tedarikçi ara..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Tedarikçileriniz</CardTitle>
              <CardDescription>
                {filteredVendors.length} tedarikçi listeleniyor.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex h-60 items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredVendors.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tedarikçi</TableHead>
                        <TableHead>İletişim Kişisi</TableHead>
                        <TableHead>E-posta</TableHead>
                        <TableHead>Telefon</TableHead>
                        <TableHead>Konum</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVendors.map((vendor) => (
                        <TableRow key={vendor.id}>
                          <TableCell className="font-medium">{vendor.name}</TableCell>
                          <TableCell>{vendor.contact_person}</TableCell>
                          <TableCell>{vendor.email}</TableCell>
                          <TableCell>{vendor.phone}</TableCell>
                          <TableCell>{`${vendor.city}, ${vendor.country}`}</TableCell>
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
                                  <Link to={`/dashboard/vendors/${vendor.id}`} className="flex cursor-pointer items-center">
                                    <Eye className="mr-2 h-4 w-4" />
                                    Görüntüle
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link to={`/dashboard/vendors/${vendor.id}/edit`} className="flex cursor-pointer items-center">
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Düzenle
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                                  onClick={() => handleDeleteVendor(vendor.id)}
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
                  <ShoppingBag className="h-10 w-10 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">
                    Tedarikçi bulunamadı
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {search
                      ? 'Arama kriterlerinize uygun tedarikçi bulunamadı.'
                      : 'Henüz bir tedarikçi eklemediniz.'}
                  </p>
                  {!search && (
                    <Button className="mt-4" asChild>
                      <Link to="/dashboard/vendors/new">
                        İlk Tedarikçiyi Ekle
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

export default VendorsPage;
