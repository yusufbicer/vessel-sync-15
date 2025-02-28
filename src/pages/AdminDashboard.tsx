
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
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  Users,
  Truck,
  Package2,
  BarChart3,
  FileText,
  FileEdit,
  UserPlus,
  Plus,
  Loader2,
  DollarSign,
  TrendingUp,
  ClipboardList,
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    usersCount: 0,
    shipmentsCount: 0,
    containersCount: 0,
    blogPostsCount: 0,
  });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [recentShipments, setRecentShipments] = useState<any[]>([]);
  const [recentBlogPosts, setRecentBlogPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      if (!user || !isAdmin) return;

      try {
        setIsLoading(true);

        // Fetch stats
        const { count: usersCount } = await supabase
          .from('profiles')
          .select('id', { count: 'exact', head: true });

        const { count: shipmentsCount } = await supabase
          .from('shipments')
          .select('id', { count: 'exact', head: true });

        const { count: containersCount } = await supabase
          .from('containers')
          .select('id', { count: 'exact', head: true });

        const { count: blogPostsCount } = await supabase
          .from('blog_posts')
          .select('id', { count: 'exact', head: true });

        // Fetch recent users
        const { data: recentUsersData } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        // Fetch recent shipments
        const { data: recentShipmentsData } = await supabase
          .from('shipments')
          .select(`
            id,
            created_at,
            order_number,
            status,
            profiles(full_name, email),
            vendors(name)
          `)
          .order('created_at', { ascending: false })
          .limit(5);

        // Fetch recent blog posts
        const { data: recentBlogPostsData } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        setStats({
          usersCount: usersCount || 0,
          shipmentsCount: shipmentsCount || 0,
          containersCount: containersCount || 0,
          blogPostsCount: blogPostsCount || 0,
        });

        setRecentUsers(recentUsersData || []);
        setRecentShipments(recentShipmentsData || []);
        setRecentBlogPosts(recentBlogPostsData || []);

      } catch (error) {
        console.error('Admin verisi yüklenirken hata:', error);
        toast({
          variant: 'destructive',
          title: 'Hata',
          description: 'Admin verileri yüklenirken bir sorun oluştu.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, [user, isAdmin, toast]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  if (!isAdmin) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center h-96 text-center">
          <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Yetkisiz Erişim</h1>
          <p className="text-muted-foreground mb-6">
            Yönetici paneline erişmek için admin yetkisine sahip olmanız gerekiyor.
          </p>
          <Button variant="outline" asChild>
            <Link to="/dashboard">Dashboard'a Dön</Link>
          </Button>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Yönetici Paneli</h1>
          <p className="text-muted-foreground">
            Tüm kullanıcıları, sevkiyatları ve sistem verilerini görüntüleyin ve yönetin.
          </p>
        </div>

        {isLoading ? (
          <div className="flex h-60 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Kullanıcılar</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.usersCount}</div>
                  <p className="text-xs text-muted-foreground">
                    Toplam kayıtlı kullanıcı
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Sevkiyatlar</CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.shipmentsCount}</div>
                  <p className="text-xs text-muted-foreground">
                    Toplam sevkiyat
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Konteynerler</CardTitle>
                  <Package2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.containersCount}</div>
                  <p className="text-xs text-muted-foreground">
                    Toplam konteyner
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Blog Yazıları</CardTitle>
                  <FileEdit className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.blogPostsCount}</div>
                  <p className="text-xs text-muted-foreground">
                    Toplam blog yazısı
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="users" className="w-full">
              <TabsList className="w-full grid grid-cols-3 md:w-auto">
                <TabsTrigger value="users">Kullanıcılar</TabsTrigger>
                <TabsTrigger value="shipments">Sevkiyatlar</TabsTrigger>
                <TabsTrigger value="blog">Blog</TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Son Eklenen Kullanıcılar</CardTitle>
                      <CardDescription>
                        Son 5 kayıtlı kullanıcı
                      </CardDescription>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link to="/dashboard/users">
                        <Users className="mr-2 h-4 w-4" /> Tüm Kullanıcılar
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {recentUsers.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Kullanıcı</TableHead>
                            <TableHead>Şirket</TableHead>
                            <TableHead>Rol</TableHead>
                            <TableHead>Kayıt Tarihi</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentUsers.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium">
                                <div className="flex flex-col">
                                  <span>{user.full_name}</span>
                                  <span className="text-xs text-muted-foreground">{user.email}</span>
                                </div>
                              </TableCell>
                              <TableCell>{user.company_name}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={user.role === 'admin' ? 'default' : 'outline'}
                                >
                                  {user.role === 'admin' ? 'Admin' : 'Müşteri'}
                                </Badge>
                              </TableCell>
                              <TableCell>{formatDate(user.created_at)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="py-8 text-center text-muted-foreground">
                        Henüz kullanıcı bulunmuyor.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shipments" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Son Sevkiyatlar</CardTitle>
                      <CardDescription>
                        Son 5 eklenen sevkiyat
                      </CardDescription>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link to="/dashboard/shipments">
                        <Truck className="mr-2 h-4 w-4" /> Tüm Sevkiyatlar
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {recentShipments.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Sipariş No</TableHead>
                            <TableHead>Müşteri</TableHead>
                            <TableHead>Tedarikçi</TableHead>
                            <TableHead>Durum</TableHead>
                            <TableHead>Tarih</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentShipments.map((shipment) => (
                            <TableRow key={shipment.id}>
                              <TableCell className="font-medium">
                                <Link
                                  to={`/dashboard/shipments/${shipment.id}`}
                                  className="text-primary hover:underline"
                                >
                                  {shipment.order_number}
                                </Link>
                              </TableCell>
                              <TableCell>
                                {shipment.profiles?.full_name || 'Bilinmiyor'}
                              </TableCell>
                              <TableCell>
                                {shipment.vendors?.name || 'Bilinmiyor'}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    shipment.status === 'delivered'
                                      ? 'success'
                                      : ['in_transit', 'customs'].includes(shipment.status)
                                      ? 'warning'
                                      : 'outline'
                                  }
                                >
                                  {shipment.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{formatDate(shipment.created_at)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="py-8 text-center text-muted-foreground">
                        Henüz sevkiyat bulunmuyor.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="blog" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Son Blog Yazıları</CardTitle>
                      <CardDescription>
                        Son 5 eklenen blog yazısı
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link to="/dashboard/blog">
                          <FileEdit className="mr-2 h-4 w-4" /> Tüm Yazılar
                        </Link>
                      </Button>
                      <Button asChild size="sm">
                        <Link to="/dashboard/blog/new">
                          <Plus className="mr-2 h-4 w-4" /> Yeni Yazı
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {recentBlogPosts.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Başlık</TableHead>
                            <TableHead>Kategori</TableHead>
                            <TableHead>Yazar</TableHead>
                            <TableHead>Durum</TableHead>
                            <TableHead>Tarih</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentBlogPosts.map((post) => (
                            <TableRow key={post.id}>
                              <TableCell className="font-medium">
                                <Link
                                  to={`/dashboard/blog/${post.id}/edit`}
                                  className="hover:text-primary hover:underline"
                                >
                                  {post.title}
                                </Link>
                              </TableCell>
                              <TableCell>{post.category}</TableCell>
                              <TableCell>{post.author_name}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    post.status === 'published'
                                      ? 'success'
                                      : post.status === 'draft'
                                      ? 'outline'
                                      : 'secondary'
                                  }
                                >
                                  {post.status === 'published'
                                    ? 'Yayında'
                                    : post.status === 'draft'
                                    ? 'Taslak'
                                    : 'Arşivlenmiş'}
                                </Badge>
                              </TableCell>
                              <TableCell>{formatDate(post.created_at)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="py-8 text-center text-muted-foreground">
                        Henüz blog yazısı bulunmuyor.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </DashboardShell>
  );
};

export default AdminDashboard;
