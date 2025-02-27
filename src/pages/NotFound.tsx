
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Set dark mode
    document.documentElement.classList.add('dark');
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background dark">
      <div className="text-center max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Package className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! We couldn't find the page you're looking for.
        </p>
        
        <Button asChild className="flex items-center gap-2">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Return to home
          </Link>
        </Button>
        
        <div className="mt-12 text-sm text-muted-foreground">
          <Link to="/" className="flex items-center justify-center gap-2 hover:text-primary transition-colors">
            <span className="font-display font-bold">Groop</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
