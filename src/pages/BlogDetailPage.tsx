
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  Pencil, 
  Share2,
  ChevronRight,
  Loader2,
} from 'lucide-react';

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    
    const fetchBlogPost = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        if (!data || (data.status !== 'published' && !isAdmin)) {
          navigate('/blog');
          toast({
            variant: 'destructive',
            title: 'Hata',
            description: 'Blog yazısı bulunamadı veya yayında değil.',
          });
          return;
        }
        
        setPost(data);
        
        // Fetch related posts from the same category
        const { data: relatedData, error: relatedError } = await supabase
          .from('blog_posts')
          .select('id, title, category, image_url, publish_date')
          .eq('category', data.category)
          .eq('status', 'published')
          .neq('id', id)
          .limit(3);
          
        if (!relatedError) {
          setRelatedPosts(relatedData || []);
        }
      } catch (error) {
        console.error('Blog yazısı yüklenirken hata:', error);
        toast({
          variant: 'destructive',
          title: 'Hata',
          description: 'Blog yazısı yüklenirken bir sorun oluştu.',
        });
        navigate('/blog');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPost();

    return () => {
      // Cleanup if needed
    };
  }, [id, isAdmin, navigate, toast]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
      .catch((error) => console.error('Share error:', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Bağlantı kopyalandı',
        description: 'Blog yazısı bağlantısı panoya kopyalandı.',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col dark">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : post ? (
          <>
            {/* Hero section */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/70 to-background z-10"></div>
              <div className="relative h-[50vh] w-full">
                <img
                  src={post.image_url || '/placeholder.svg'}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="container mx-auto px-4 lg:px-8 relative z-20 -mt-32">
                <div className="max-w-3xl mx-auto bg-card rounded-xl shadow-lg p-6 md:p-10 border">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-3 items-center">
                      <Badge variant="secondary">{post.category}</Badge>
                      {isAdmin && post.status !== 'published' && (
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
                          {post.status === 'draft' ? 'Taslak' : 'Arşivlenmiş'}
                        </Badge>
                      )}
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
                      {post.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author_name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.publish_date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.read_time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content section */}
            <div className="container mx-auto px-4 py-10 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8">
                  <div className="prose prose-dark max-w-none">
                    {post.content.split('\n').map((paragraph: string, i: number) => (
                      paragraph.trim() ? <p key={i}>{paragraph}</p> : <br key={i} />
                    ))}
                  </div>
                  
                  <div className="mt-10 flex flex-wrap gap-4">
                    <Button variant="outline" asChild>
                      <Link to="/blog" className="flex items-center gap-1">
                        <ArrowLeft className="h-4 w-4" /> Tüm Yazılar
                      </Link>
                    </Button>
                    
                    <Button variant="outline" onClick={handleShare}>
                      <Share2 className="mr-2 h-4 w-4" /> Paylaş
                    </Button>
                    
                    {isAdmin && (
                      <Button variant="outline" asChild>
                        <Link to={`/dashboard/blog/${post.id}/edit`} className="flex items-center gap-1">
                          <Pencil className="h-4 w-4" /> Düzenle
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="lg:col-span-4">
                  <div className="rounded-xl border bg-card overflow-hidden">
                    <div className="p-4 md:p-6">
                      <h3 className="text-xl font-semibold mb-4">İlgili Yazılar</h3>
                      
                      {relatedPosts.length > 0 ? (
                        <div className="space-y-4">
                          {relatedPosts.map((related) => (
                            <Link
                              key={related.id}
                              to={`/blog/${related.id}`}
                              className="group block"
                            >
                              <div className="flex gap-3">
                                <div className="w-20 h-16 rounded overflow-hidden flex-shrink-0 bg-muted">
                                  <img
                                    src={related.image_url || '/placeholder.svg'}
                                    alt={related.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                                    {related.title}
                                  </h4>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {formatDate(related.publish_date)}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">
                          İlgili yazı bulunamadı.
                        </p>
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div className="p-4 bg-primary/5">
                      <Link
                        to="/blog"
                        className="text-sm font-medium text-primary flex items-center hover:underline"
                      >
                        Tüm blog yazılarını görüntüle 
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="container mx-auto px-4 py-32 text-center">
            <h1 className="text-3xl font-bold mb-4">Blog yazısı bulunamadı</h1>
            <p className="mb-8 text-muted-foreground">
              Aradığınız blog yazısı mevcut değil veya kaldırılmış olabilir.
            </p>
            <Button asChild>
              <Link to="/blog">Tüm Yazılara Dön</Link>
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
