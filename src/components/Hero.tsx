
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Box, ArrowRight, Globe, PackageCheck, Clock, Database } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 gradient-bg opacity-70" />
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Hero content */}
          <div className="flex-1 text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
            <div className="mb-8 inline-flex font-display font-bold px-6 py-2.5 text-sm md:text-base rounded-xl bg-gradient-to-b from-[#9F9EA1] to-[#777777] text-white shadow-lg">
              AI powered shipping consolidation for your Turkish imports
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 text-balance">
              Your One-Stop Shop for{' '}
              <span className="text-primary">Turkish Import Consolidation</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Streamline your Turkish imports with our AI-powered consolidation platform. 
              Manage vendors, track shipments, and optimize container space in one intuitive interface.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild className="text-base">
                <Link to="/signup" className="flex items-center gap-1">
                  Get started <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base">
                <Link to="/#how-it-works" className="flex items-center gap-1">
                  See how it works <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Hero visualization */}
          <div className="flex-1 w-full max-w-xl">
            <div className="relative">
              <div className="relative z-10 bg-card rounded-2xl shadow-2xl overflow-hidden border border-border">
                <div className="bg-primary/10 p-4 border-b border-border flex items-center gap-4">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <div className="text-sm font-medium">Dashboard</div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="col-span-2 md:col-span-1 rounded-xl p-4 bg-primary/5 border border-primary/10">
                      <h3 className="text-sm font-medium mb-1">Active Orders</h3>
                      <div className="text-3xl font-display font-bold">12</div>
                      <div className="mt-2 text-xs text-muted-foreground">+4 from last month</div>
                    </div>
                    <div className="col-span-2 md:col-span-1 rounded-xl p-4 bg-primary/5 border border-primary/10">
                      <h3 className="text-sm font-medium mb-1">Total Volume</h3>
                      <div className="text-3xl font-display font-bold">62.4m³</div>
                      <div className="mt-2 text-xs text-muted-foreground">85% of container capacity</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-border bg-secondary/30 flex items-center gap-3">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Box className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium">Textile Shipment</h3>
                        <p className="text-sm text-muted-foreground truncate">Istanbul • 8.2m³ • 4 vendors</p>
                      </div>
                      <div className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                        In transit
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl border border-border bg-secondary/30 flex items-center gap-3">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Box className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium">Home Goods</h3>
                        <p className="text-sm text-muted-foreground truncate">Ankara • 12.5m³ • 6 vendors</p>
                      </div>
                      <div className="px-2 py-1 rounded-md bg-yellow-500/10 text-yellow-500 text-xs font-medium">
                        Preparing
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-3 rounded-lg bg-secondary/50 border border-border text-center text-sm text-muted-foreground">
                    AI-powered container optimization visualizations
                  </div>
                </div>
              </div>
              
              {/* Background decorations */}
              <div className="absolute -top-6 -left-6 -z-10 h-full w-full rounded-2xl bg-primary/30 blur-2xl" />
              <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl bg-primary/20 blur-xl" />
            </div>
          </div>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-20 md:mt-28">
          <h2 className="text-center text-xl md:text-2xl font-display font-semibold mb-12">
            All-in-one platform for <span className="text-primary">streamlined importing</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="h-12 w-12 rounded-full bg-primary/10 mb-4 flex items-center justify-center">
                <PackageCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Shipment Consolidation</h3>
              <p className="text-muted-foreground">Combine multiple vendor shipments into optimized containers</p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="h-12 w-12 rounded-full bg-primary/10 mb-4 flex items-center justify-center">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Document Management</h3>
              <p className="text-muted-foreground">Centralize all import documentation in one secure location</p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="h-12 w-12 rounded-full bg-primary/10 mb-4 flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Vendor Network</h3>
              <p className="text-muted-foreground">Access our network of trusted Turkish suppliers</p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="h-12 w-12 rounded-full bg-primary/10 mb-4 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Real-time Tracking</h3>
              <p className="text-muted-foreground">Monitor your shipments with live updates at every stage</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
