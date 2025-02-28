
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  ArrowRight,
  Calendar,
  Clock,
  Search,
  User,
  Tag,
  Filter,
  Loader2,
} from 'lucide-react';

const BlogListPublicPage = () => {
  const { toast } = useToast();
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    
    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .order('publish_date', { ascending: false });

        if (error) throw error;
        setBlogPosts(data || []);
        setFilteredPosts(data || []);
        
        // Extract unique categories
        if (data) {
          const uniqueCategories = Array.from(new Set(data.map(post => post.category)));
          setCategories(uniqueCategories as string[]);
        }
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
  }, [toast]);

  useEffect(() => {
    let result = blogPosts;
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(post => post.category === selectedCategory);
    }
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        post =>
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.author_name.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredPosts(result);
  }, [search, selectedCategory, blogPosts]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col dark">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero section */}
        <section className="py-10 md:py-16 bg-primary/5">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <Badge variant="outline" className="text-primary mb-6">
                Blog
              </Badge>
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
                İthalat Dünyasından Haberler ve Bilgiler
              </h1>
              <p className="text-xl text-muted-foreground mb-10">
                İthalat, konteyner taşımacılığı ve Türk tedarikçileriyle çalışma konularında uzman içerikler.
              </p>
              
              <div className="w-full max-w-xl relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Blog yazılarında ara..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Category filters */}
        <section className="py-4 border-b">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium flex items-center mr-2">
                <Filter className="mr-1 h-3.5 w-3.5" />
                Filtrele:
              </span>
              
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                size="sm"
                className="rounded-full"
                onClick={() => setSelectedCategory(null)}
              >
                Tümü
              </Button>
              
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Blog posts grid */}
        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="group flex flex-col h-full rounded-xl border overflow-hidden hover:shadow-md transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.image_url || '/placeholder.svg'} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex flex-col flex-grow p-6">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(post.publish_date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.read_time}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        <Link to={`/blog/${post.id}`}>
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-muted-foreground mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-primary" />
                          <span className="text-sm">{post.author_name}</span>
                        </div>
                        
                        <Button variant="ghost" size="sm" asChild className="text-primary">
                          <Link to={`/blog/${post.id}`} className="flex items-center">
                            Devamını oku <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <h3 className="text-2xl font-semibold mb-4">Yazı bulunamadı</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                  {search || selectedCategory 
                    ? 'Arama kriterlerine uygun blog yazısı bulunamadı.' 
                    : 'Henüz blog yazısı bulunmuyor. Daha sonra tekrar kontrol edin.'}
                </p>
                {(search || selectedCategory) && (
                  <Button onClick={() => {
                    setSearch('');
                    setSelectedCategory(null);
                  }}>
                    Filtreleri Temizle
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogListPublicPage;
