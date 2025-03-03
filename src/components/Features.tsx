
import { ChevronRight, BarChart3, Layers, Cog, Upload, Database, PieChart, Users, TrendingUp, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 -z-10 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute top-1/3 left-0 -z-10 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px]" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6">
            Everything you need to manage your Turkish imports
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform brings together all the tools you need to streamline your import operations, 
            from consolidation to delivery tracking.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-card rounded-xl border border-border p-6 md:p-8 transition-all hover:shadow-md hover:border-primary/20">
            <div className="h-12 w-12 rounded-full bg-primary/10 mb-6 flex items-center justify-center">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Vendor Management</h3>
            <p className="text-muted-foreground mb-6">
              Store and manage all your Turkish vendors in one place. Quickly access vendor information 
              and historical shipment data for easier ordering.
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
          
          <div className="bg-card rounded-xl border border-border p-6 md:p-8 transition-all hover:shadow-md hover:border-primary/20">
            <div className="h-12 w-12 rounded-full bg-primary/10 mb-6 flex items-center justify-center">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Container Optimization</h3>
            <p className="text-muted-foreground mb-6">
              Maximize container space usage with AI-powered optimization. Visualize how shipments 
              fit together to reduce waste and lower costs.
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
          
          <div className="bg-card rounded-xl border border-border p-6 md:p-8 transition-all hover:shadow-md hover:border-primary/20">
            <div className="h-12 w-12 rounded-full bg-primary/10 mb-6 flex items-center justify-center">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Document Management</h3>
            <p className="text-muted-foreground mb-6">
              Upload and manage all import documents digitally. Track proforma invoices, 
              customs forms, and shipping documents in one secure platform.
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
          
          <div className="bg-card rounded-xl border border-border p-6 md:p-8 transition-all hover:shadow-md hover:border-primary/20">
            <div className="h-12 w-12 rounded-full bg-primary/10 mb-6 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Real-time Tracking</h3>
            <p className="text-muted-foreground mb-6">
              Monitor every step of your shipment journey with real-time tracking. Get instant 
              notifications on status changes and potential delays.
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
          
          <div className="bg-card rounded-xl border border-border p-6 md:p-8 transition-all hover:shadow-md hover:border-primary/20">
            <div className="h-12 w-12 rounded-full bg-primary/10 mb-6 flex items-center justify-center">
              <PieChart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Financial Dashboard</h3>
            <p className="text-muted-foreground mb-6">
              View your account balance and financial history at a glance. Track payments, 
              outstanding invoices, and projected costs in one place.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>Current account balance</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>Payment history</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>Cost forecasting</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-card rounded-xl border border-border p-6 md:p-8 transition-all hover:shadow-md hover:border-primary/20">
            <div className="h-12 w-12 rounded-full bg-primary/10 mb-6 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Payment Consolidation</h3>
            <p className="text-muted-foreground mb-6">
              Simplify your finances by consolidating payments to multiple Turkish vendors into a single transaction, 
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
          <Button size="lg" asChild>
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
