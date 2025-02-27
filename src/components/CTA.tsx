
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 -z-10 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
      <div className="absolute bottom-0 right-0 -z-10 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px]" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-card rounded-3xl border border-border overflow-hidden">
          <div className="md:flex">
            <div className="p-8 md:p-12 lg:p-16 md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6">
                Ready to streamline your Turkish imports?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Join importers who have optimized their supply chain and reduced costs with our 
                consolidated shipping platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/signup" className="flex items-center gap-1">
                    Get started <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Contact sales</Link>
                </Button>
              </div>
              
              <div className="mt-10 flex items-center gap-8">
                <div>
                  <div className="text-3xl font-display font-bold text-primary">25%</div>
                  <div className="text-sm text-muted-foreground">Lower shipping costs</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-primary">30+</div>
                  <div className="text-sm text-muted-foreground">Countries served</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-primary">3x</div>
                  <div className="text-sm text-muted-foreground">Faster processing</div>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/5 bg-primary/10 flex items-center justify-center p-8">
              <div className="max-w-xs">
                <div className="text-center mb-6">
                  <div className="inline-block mx-auto h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <div className="h-8 w-8 rounded-full bg-primary animate-pulse"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Book a demo</h3>
                  <p className="text-sm text-muted-foreground">
                    See how our platform works with a personalized tour from our experts
                  </p>
                </div>
                
                <Button variant="outline" size="lg" className="w-full bg-background">
                  Schedule demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
