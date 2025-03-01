
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 -z-10 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
      <div className="absolute bottom-0 right-0 -z-10 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px]" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-card rounded-3xl border border-border shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="p-10 md:p-14 lg:p-16 md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6">
                Ready to elevate your Turkish imports?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Join forward-thinking importers who have refined their supply chain and optimized costs with our 
                elegant consolidation platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="shadow-sm">
                  <Link to="/signup" className="flex items-center gap-1">
                    Get started <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Contact sales</Link>
                </Button>
              </div>
              
              <div className="mt-12 grid grid-cols-3 gap-8">
                {metrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-display font-bold text-primary">{metric.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="md:w-2/5 bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center p-10">
              <div className="max-w-xs">
                <div className="text-center mb-8">
                  <div className="inline-block mx-auto h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-5">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Book a demo</h3>
                  <p className="text-sm text-muted-foreground">
                    Experience our platform with a personalized demonstration from our expert team
                  </p>
                </div>
                
                <Button variant="secondary" size="lg" className="w-full shadow-sm">
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

const metrics = [
  {
    value: "25%",
    label: "Lower shipping costs"
  },
  {
    value: "30+",
    label: "Countries served"
  },
  {
    value: "3x",
    label: "Faster processing"
  }
];

export default CTA;
