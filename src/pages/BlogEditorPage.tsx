
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import {
  FileEdit,
  Save,
  Clock,
  Image,
  LayoutGrid,
  ArrowLeft,
  ArrowUpRight,
  Loader2,
} from 'lucide-react';

const BlogEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin, profile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author_name: '',
    category: '',
    read_time: '',
    image_url: '/placeholder.svg',
    status: 'draft',
  });

  // If ID is provided, fetch the post data
  useEffect(() => {
    const fetchPost = async () => {
      if (!id || !isAdmin) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (data) {
          setFormData({
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
            author_name: data.author_name,
            category: data.category,
            read_time: data.read_time,
            image_url: data.image_url,
            status: data.status,
          });
        }
      } catch (error) {
        console.error('Blog yazısı yüklenirken hata:', error);
        toast({
          variant: 'destructive',
          title: 'Hata',
          description: 'Blog yazısı yüklenirken bir sorun oluştu.',
        });
        navigate('/dashboard/blog');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, isAdmin, navigate, toast]);

  // Set author name from profile when creating a new post
  useEffect(() => {
    if (!id && profile && !formData.author_name) {
      setFormData((prev) => ({
        ...prev,
        author_name: profile.full_name,
      }));
    }
  }, [id, profile, formData.author_name]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isAdmin) {
      toast({
        variant: 'destructive',
        title: 'Yetki Hatası',
        description: 'Blog yazılarını düzenleme yetkiniz yok.',
      });
      return;
    }

    try {
      setIsSaving(true);

      if (id) {
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update({
            ...formData,
            publish_date: formData.status === 'published' ? new Date().toISOString() : null,
          })
          .eq('id', id);

        if (error) throw error;

        toast({
          title: 'Başarılı',
          description: 'Blog yazısı başarıyla güncellendi.',
        });
      } else {
        // Create new post
        const { error } = await supabase.from('blog_posts').insert({
          ...formData,
          author_id: user.id,
          publish_date: formData.status === 'published' ? new Date().toISOString() : null,
        });

        if (error) throw error;

        toast({
          title: 'Başarılı',
          description: 'Blog yazısı başarıyla oluşturuldu.',
        });
      }

      navigate('/dashboard/blog');
    } catch (error) {
      console.error('Blog yazısı kaydedilirken hata:', error);
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Blog yazısı kaydedilirken bir sorun oluştu.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAdmin) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center h-96 text-center">
          <FileEdit className="h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Yetkisiz Erişim</h1>
          <p className="text-muted-foreground mb-6">
            Blog yazılarını düzenlemek için admin yetkisine sahip olmanız gerekiyor.
          </p>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Dashboard'a Dön
          </Button>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              {id ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı'}
            </h1>
            <p className="text-muted-foreground">
              {id
                ? 'Mevcut blog yazısını düzenleyin ve güncelleyin.'
                : 'Yeni bir blog yazısı oluşturun ve yayınlayın.'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate('/dashboard/blog')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Geri
            </Button>
            {id && (
              <Button variant="outline" asChild>
                <a
                  href={`/blog/${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <ArrowUpRight className="mr-2 h-4 w-4" /> Önizle
                </a>
              </Button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Blog İçeriği</CardTitle>
                    <CardDescription>
                      Blog yazınızın başlık ve içeriğini düzenleyin.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Başlık</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Blog yazısı başlığı"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Özet</Label>
                      <Textarea
                        id="excerpt"
                        name="excerpt"
                        placeholder="Blog yazısının kısa özeti"
                        rows={3}
                        value={formData.excerpt}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">İçerik</Label>
                      <Textarea
                        id="content"
                        name="content"
                        placeholder="Blog yazısının tam içeriği"
                        rows={15}
                        value={formData.content}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Yayın Detayları</CardTitle>
                    <CardDescription>
                      Yazı durumu ve meta bilgilerini ayarlayın.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Durum</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => handleSelectChange('status', value)}
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Durum seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Taslak</SelectItem>
                          <SelectItem value="published">Yayında</SelectItem>
                          <SelectItem value="archived">Arşivlenmiş</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Kategori</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleSelectChange('category', value)}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Kategori seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Technology">Teknoloji</SelectItem>
                          <SelectItem value="Guide">Rehber</SelectItem>
                          <SelectItem value="Industry">Endüstri</SelectItem>
                          <SelectItem value="News">Haberler</SelectItem>
                          <SelectItem value="Case Study">Vaka Çalışması</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="author_name">Yazar</Label>
                      <Input
                        id="author_name"
                        name="author_name"
                        placeholder="Yazar adı"
                        value={formData.author_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="read_time" className="flex items-center gap-1">
                        <Clock className="h-4 w-4" /> Okuma Süresi
                      </Label>
                      <Select
                        value={formData.read_time}
                        onValueChange={(value) => handleSelectChange('read_time', value)}
                      >
                        <SelectTrigger id="read_time">
                          <SelectValue placeholder="Okuma süresi seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2 min read">2 dakika</SelectItem>
                          <SelectItem value="3 min read">3 dakika</SelectItem>
                          <SelectItem value="5 min read">5 dakika</SelectItem>
                          <SelectItem value="7 min read">7 dakika</SelectItem>
                          <SelectItem value="10 min read">10 dakika</SelectItem>
                          <SelectItem value="15 min read">15 dakika</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image_url" className="flex items-center gap-1">
                        <Image className="h-4 w-4" /> Görsel URL
                      </Label>
                      <Input
                        id="image_url"
                        name="image_url"
                        placeholder="https://example.com/image.jpg"
                        value={formData.image_url}
                        onChange={handleInputChange}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Varsayılan: /placeholder.svg
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Önizleme</CardTitle>
                    <CardDescription>
                      Blog yazısının görsel önizlemesi.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video rounded-md border overflow-hidden">
                      <img
                        src={formData.image_url || '/placeholder.svg'}
                        alt="Blog görsel önizlemesi"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                    <div className="mt-3">
                      <h4 className="font-medium text-sm truncate">{formData.title || 'Blog Başlığı'}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {formData.excerpt || 'Blog özeti burada görünecek.'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                type="submit"
                className="min-w-32"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Kaydediliyor
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Kaydet
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </DashboardShell>
  );
};

export default BlogEditorPage;
