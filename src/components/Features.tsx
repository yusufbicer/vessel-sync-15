
import { ChevronRight, BarChart3, Layers, Upload, Database, TrendingUp, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 -z-10 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute top-1/3 left-0 -z-10 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px]" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6">
            Everything you need to manage your Turkish imports
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform brings together all the tools you need to streamline your import operations, 
            from consolidation to delivery tracking.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card rounded-xl border border-border p-8 transition-all hover:shadow-md hover:border-primary/20 group">
            <div className="h-12 w-12 rounded-full bg-primary/10 mb-6 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Vendor Management</h3>
            <p className="text-muted-foreground mb-6">
              Store and manage all your Turkish vendors in one place. Quickly access vendor information 
              and historical shipment data.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>Centralized vendor directory</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>Historical order tracking</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>Vendor performance analytics</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-card rounded-xl border border-border p-8 transition-all hover:shadow-md hover:border-primary/20 group">
            <div className="h-12 w-12 rounded-full bg-primary/10 mb-6 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Container Optimization</h3>
            <p className="text-muted-foreground mb-6">
              Maximize container space usage with AI-powered optimization. Visualize how shipments 
              fit together to reduce costs.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>3D container visualization</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>AI-driven space allocation</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>Volumetric tracking</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-card rounded-xl border border-border p-8 transition-all hover:shadow-md hover:border-primary/20 group">
            <div className="h-12 w-12 rounded-full bg-primary/10 mb-6 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Document Management</h3>
            <p className="text-muted-foreground mb-6">
              Upload and manage all import documents digitally. Track proforma invoices, 
              customs forms, and shipping documents.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>Digital document storage</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>Proforma invoice upload</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>Document sharing with customs</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-card rounded-xl border border-border p-8 transition-all hover:shadow-md hover:border-primary/20 group">
            <div className="h-12 w-12 rounded-full bg-primary/10 mb-6 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Real-time Tracking</h3>
            <p className="text-muted-foreground mb-6">
              Monitor every step of your shipment journey with real-time tracking. Get instant 
              notifications on status changes.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>Live shipment status</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>Automated notifications</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>GPS container tracking</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-card rounded-xl border border-border p-8 transition-all hover:shadow-md hover:border-primary/20 group">
            <div className="h-12 w-12 rounded-full bg-primary/10 mb-6 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Analytics Dashboard</h3>
            <p className="text-muted-foreground mb-6">
              Gain insights into your import operations with comprehensive analytics. 
              Track costs, volumes, and performance metrics.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>Cost analysis by shipment</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>Volume utilization reports</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>Performance benchmarking</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-card rounded-xl border border-border p-8 transition-all hover:shadow-md hover:border-primary/20 group">
            <div className="h-12 w-12 rounded-full bg-primary/10 mb-6 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Payment Consolidation</h3>
            <p className="text-muted-foreground mb-6">
              Simplify your finances by consolidating payments to multiple Turkish vendors, 
              saving time and reducing transfer fees.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>Single payment for multiple vendors</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>Reduced international transfer fees</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>Simplified payment tracking</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white">
            <a href="#how-it-works" className="flex items-center gap-1 mx-auto">
              See how it works <ChevronRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;
