
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
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  FileText,
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Download,
  Trash2,
  ExternalLink,
  FileArchive,
  FileClock,
  FilePenLine,
  FileCheck,
  Truck,
  Loader2,
  Filter,
} from 'lucide-react';

const DocumentsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<any[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('documents')
          .select(`
            id,
            created_at,
            document_type,
            file_name,
            file_url,
            description,
            shipment_id,
            shipments(order_number)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setDocuments(data || []);
        setFilteredDocuments(data || []);
      } catch (error) {
        console.error('Belgeler yüklenirken hata:', error);
        toast({
          variant: 'destructive',
          title: 'Hata',
          description: 'Belgeler yüklenirken bir sorun oluştu.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, [user, toast]);

  useEffect(() => {
    let result = documents;

    // Tür filtresi
    if (typeFilter !== 'all') {
      result = result.filter((doc) => doc.document_type === typeFilter);
    }

    // Arama filtresi
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (doc) =>
          doc.file_name.toLowerCase().includes(searchLower) ||
          (doc.description && doc.description.toLowerCase().includes(searchLower)) ||
          (doc.shipments?.order_number && doc.shipments.order_number.toLowerCase().includes(searchLower))
      );
    }

    setFilteredDocuments(result);
  }, [search, typeFilter, documents]);

  // Type helpers
  const getDocumentTypeBadge = (type: string) => {
    const typeMap: Record<string, { label: string; variant: string; icon: any }> = {
      proforma_invoice: {
        label: 'Proforma Fatura',
        variant: 'outline',
        icon: FilePenLine,
      },
      packing_list: {
        label: 'Paket Listesi',
        variant: 'secondary',
        icon: FileArchive,
      },
      bill_of_lading: {
        label: 'Konşimento',
        variant: 'default',
        icon: Truck,
      },
      certificate_of_origin: {
        label: 'Menşe Şehadetnamesi',
        variant: 'warning',
        icon: FileCheck,
      },
      customs_declaration: {
        label: 'Gümrük Beyannamesi',
        variant: 'destructive',
        icon: FileClock,
      },
      other: {
        label: 'Diğer',
        variant: 'default',
        icon: FileText,
      },
    };

    const typeInfo = typeMap[type] || {
      label: 'Bilinmiyor',
      variant: 'destructive',
      icon: FileText,
    };

    const Icon = typeInfo.icon;

    return (
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        <Badge
          variant={typeInfo.variant as any}
          className="capitalize"
        >
          {typeInfo.label}
        </Badge>
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR');
  };

  const handleDeleteDocument = async (id: string) => {
    if (!confirm('Bu belgeyi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const docToDelete = documents.find(d => d.id === id);
      
      // URL'den dosya yolunu al
      const storagePath = docToDelete.file_url.split('/').slice(-2).join('/');
      
      // Önce storage'daki dosyayı sil
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([storagePath]);
      
      if (storageError) {
        console.warn('Dosya silinirken uyarı:', storageError);
        // Dosya silinirken hata olsa bile veritabanı kaydını silmeye devam et
      }
      
      // Veritabanı kaydını sil
      const { error } = await supabase.from('documents').delete().eq('id', id);

      if (error) throw error;

      setDocuments((prev) => prev.filter((d) => d.id !== id));
      toast({
        title: 'Başarılı',
        description: 'Belge başarıyla silindi.',
      });
    } catch (error) {
      console.error('Belge silinirken hata:', error);
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Belge silinirken bir sorun oluştu.',
      });
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Belgelerim</h1>
            <p className="text-muted-foreground">
              İthalat belgelerinizi yönetin ve düzenleyin.
            </p>
          </div>
          <Button asChild>
            <Link to="/dashboard/documents/new">
              <Plus className="mr-2 h-4 w-4" /> Yeni Belge Yükle
            </Link>
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Belge ara..."
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
                <DropdownMenuLabel>Belge Türüne Göre Filtrele</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTypeFilter('all')}>
                  Tümü
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter('proforma_invoice')}>
                  Proforma Fatura
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter('packing_list')}>
                  Paket Listesi
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter('bill_of_lading')}>
                  Konşimento
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter('certificate_of_origin')}>
                  Menşe Şehadetnamesi
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter('customs_declaration')}>
                  Gümrük Beyannamesi
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter('other')}>
                  Diğer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Belgelerim</CardTitle>
              <CardDescription>
                {filteredDocuments.length} belge listeleniyor.
                {typeFilter !== 'all' && ` (${typeFilter} filtresi aktif)`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex h-60 items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredDocuments.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Belge Adı</TableHead>
                        <TableHead>Tür</TableHead>
                        <TableHead>İlgili Sevkiyat</TableHead>
                        <TableHead>Açıklama</TableHead>
                        <TableHead>Eklenme Tarihi</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDocuments.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">
                            {doc.file_name}
                          </TableCell>
                          <TableCell>{getDocumentTypeBadge(doc.document_type)}</TableCell>
                          <TableCell>
                            {doc.shipments?.order_number ? (
                              <Link
                                to={`/dashboard/shipments/${doc.shipment_id}`}
                                className="text-primary hover:underline"
                              >
                                {doc.shipments.order_number}
                              </Link>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {doc.description || '-'}
                          </TableCell>
                          <TableCell>
                            {formatDate(doc.created_at)}
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
                                  <a
                                    href={doc.file_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex cursor-pointer items-center"
                                  >
                                    <Eye className="mr-2 h-4 w-4" />
                                    Görüntüle
                                  </a>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <a
                                    href={doc.file_url}
                                    download
                                    className="flex cursor-pointer items-center"
                                  >
                                    <Download className="mr-2 h-4 w-4" />
                                    İndir
                                  </a>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                                  onClick={() => handleDeleteDocument(doc.id)}
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
                  <FileText className="h-10 w-10 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">
                    Belge bulunamadı
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {search || typeFilter !== 'all'
                      ? 'Arama kriterlerinize uygun belge bulunamadı.'
                      : 'Henüz bir belge yüklemediniz.'}
                  </p>
                  {!search && typeFilter === 'all' && (
                    <Button className="mt-4" asChild>
                      <Link to="/dashboard/documents/new">
                        İlk Belgeyi Yükle
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

export default DocumentsPage;
