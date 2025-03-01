
import { useState, useEffect } from "react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .order('publish_date', { ascending: false })
          .limit(3);

        if (error) throw error;
        setBlogPosts(data || []);
      } catch (error) {
        console.error('Blog posts loading error:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "There was a problem loading blog posts.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, [toast]);

  return (
    <section id="blog" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 -z-10 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px]" />
      <div className="absolute -bottom-40 -left-40 -z-10 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6">
            The Import <span className="text-primary">Intelligence</span> Blog
          </h2>
          <p className="text-lg text-muted-foreground">
            Expert articles, guides, and industry updates to help you master the art of Turkish imports.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="group relative flex flex-col h-full overflow-hidden backdrop-blur-sm rounded-2xl border border-border bg-card animate-pulse">
                <div className="h-48 bg-muted rounded-t-2xl"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                  <div className="h-6 bg-muted rounded"></div>
                  <div className="h-6 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                </div>
              </div>
            ))
          ) : blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <article key={post.id} className="group relative flex flex-col h-full overflow-hidden backdrop-blur-sm rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                {/* Featured Image */}
                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                  <div className="absolute inset-0 bg-primary/20"></div>
                  <img 
                    src={post.image_url || '/placeholder.svg'} 
                    alt={post.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-sm text-white text-xs font-medium rounded-full px-3 py-1">
                    {post.category}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex flex-col flex-grow p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.read_time}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto flex justify-end">
                    <Link to={`/blog/${post.id}`} className="text-primary font-medium text-sm flex items-center hover:underline">
                      Read more <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-3 p-12 text-center bg-card rounded-2xl border border-border">
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">Our team is preparing insightful articles about Turkish imports and containerization.</p>
            </div>
          )}
        </div>
        
        <div className="mt-16 text-center">
          <Button variant="outline" asChild size="lg" className="hover:bg-primary/5">
            <Link to="/blog" className="flex items-center gap-1 mx-auto">
              View all articles <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
