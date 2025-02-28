
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
  FileEdit,
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Loader2,
  Calendar,
  User,
  Clock,
} from 'lucide-react';

const BlogListPage = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchBlogPosts = async () => {
      if (!user || !isAdmin) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBlogPosts(data || []);
        setFilteredPosts(data || []);
      } catch (error) {
        console.error('Blog posts loading error:', error);
        toast({
          variant: 'destructive',
          title: 'Hata',
          description: 'Blog yazıları yüklenirken bir sorun oluştu.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, [user, isAdmin, toast]);

  useEffect(() => {
    if (search) {
      const searchLower = search.toLowerCase();
      const filtered = blogPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.author_name.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.category.toLowerCase().includes(searchLower)
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(blogPosts);
    }
  }, [search, blogPosts]);

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: string }> = {
      draft: {
        label: 'Taslak',
        variant: 'outline',
      },
      published: {
        label: 'Yayında',
        variant: 'success',
      },
      archived: {
        label: 'Arşivlenmiş',
        variant: 'secondary',
      },
    };

    const statusInfo = statusMap[status] || {
      label: 'Bilinmiyor',
      variant: 'destructive',
    };

    return (
      <Badge
        variant={statusInfo.variant as any}
        className="capitalize"
      >
        {statusInfo.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);

      if (error) throw error;

      setBlogPosts((prev) => prev.filter((post) => post.id !== id));
      toast({
        title: 'Başarılı',
        description: 'Blog yazısı başarıyla silindi.',
      });
    } catch (error) {
      console.error('Blog yazısı silinirken hata:', error);
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Blog yazısı silinirken bir sorun oluştu.',
      });
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Blog Yazıları</h1>
            <p className="text-muted-foreground">
              Blog yazılarını yönetin ve yeni yazılar ekleyin.
            </p>
          </div>
          <Button asChild>
            <Link to="/dashboard/blog/new">
              <Plus className="mr-2 h-4 w-4" /> Yeni Yazı
            </Link>
          </Button>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Blog yazısı ara..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Tüm Blog Yazıları</CardTitle>
              <CardDescription>
                {filteredPosts.length} blog yazısı listeleniyor.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex h-60 items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredPosts.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Başlık</TableHead>
                        <TableHead>Yazar</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Durum</TableHead>
                        <TableHead>Yayın Tarihi</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium max-w-[200px] truncate">
                            {post.title}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              {post.author_name}
                            </div>
                          </TableCell>
                          <TableCell>{post.category}</TableCell>
                          <TableCell>{getStatusBadge(post.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              {formatDate(post.publish_date)}
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
                                  <Link to={`/blog/${post.id}`} className="flex cursor-pointer items-center">
                                    <Eye className="mr-2 h-4 w-4" />
                                    Görüntüle
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link to={`/dashboard/blog/${post.id}/edit`} className="flex cursor-pointer items-center">
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Düzenle
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                                  onClick={() => handleDeletePost(post.id)}
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
                  <FileEdit className="h-10 w-10 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">Blog yazısı bulunamadı</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {search
                      ? 'Arama kriterlerinize uygun blog yazısı bulunamadı.'
                      : 'Henüz bir blog yazısı eklemediniz.'}
                  </p>
                  {!search && (
                    <Button className="mt-4" asChild>
                      <Link to="/dashboard/blog/new">
                        İlk Blog Yazısını Ekle
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

export default BlogListPage;
