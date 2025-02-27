
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "Optimizing Container Space: The Future of Import Consolidation",
    excerpt: "Discover how AI-powered algorithms are revolutionizing container space optimization for Turkish imports.",
    author: "Mehmet Yılmaz",
    date: "May 15, 2023",
    readTime: "5 min read",
    image: "/placeholder.svg",
    category: "Technology"
  },
  {
    id: 2,
    title: "Navigating Turkish Customs: A Complete Guide for Importers",
    excerpt: "Everything you need to know about Turkish customs regulations and how to ensure smooth clearance for your goods.",
    author: "Ayşe Kaya",
    date: "Apr 22, 2023",
    readTime: "8 min read",
    image: "/placeholder.svg",
    category: "Guide"
  },
  {
    id: 3,
    title: "The Rise of Consolidated Shipping from Turkish Suppliers",
    excerpt: "How consolidated shipping is transforming the economics of importing from multiple Turkish vendors.",
    author: "David Chen",
    date: "Mar 10, 2023",
    readTime: "6 min read",
    image: "/placeholder.svg",
    category: "Industry"
  }
];

const Blog = () => {
  return (
    <section id="blog" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 -z-10 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px]" />
      <div className="absolute -bottom-40 -left-40 -z-10 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
            Latest Insights
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6">
            The Import <span className="text-primary">Intelligence</span> Blog
          </h2>
          <p className="text-lg text-muted-foreground">
            Expert articles, guides, and industry updates to help you master the art of Turkish imports.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="group relative flex flex-col h-full overflow-hidden backdrop-blur-sm rounded-2xl border border-border bg-gradient-to-b from-card to-primary/5 hover:shadow-lg transition-all duration-300">
              {/* Featured Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-primary/20" />
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-medium rounded-full px-3 py-1">
                  {post.category}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex flex-col flex-grow p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-sm">{post.author}</span>
                  </div>
                  
                  <Link to={`/blog/${post.id}`} className="text-primary font-medium text-sm flex items-center hover:underline">
                    Read more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="flex flex-col gap-8 mt-16 bg-card border border-border rounded-3xl overflow-hidden shadow-lg mx-auto max-w-5xl">
          <div className="p-8 md:p-12 md:flex justify-between items-center gap-8">
            <div className="md:w-2/3">
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                Admin Access Only
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Share Your Import Expertise
              </h3>
              <p className="text-muted-foreground mb-6 md:mb-0">
                Have valuable insights about Turkish imports? As an admin, you can contribute to our knowledge base and help importers succeed.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-end">
              <Button size="lg" asChild className="w-full md:w-auto bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity">
                <Link to="/admin/blog/new" className="flex items-center gap-1 font-medium">
                  Create Post <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button variant="outline" asChild size="lg">
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
