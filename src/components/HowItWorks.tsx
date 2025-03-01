
import { ArrowRight, Box, Package, BarChart3 } from "lucide-react";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform makes consolidating Turkish imports simple and efficient, with a
            streamlined process from order to delivery.
          </p>
        </div>
        
        <div className="relative">
          {/* Step connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            <div className="bg-background rounded-xl border border-border p-6 relative z-10 h-full flex flex-col">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary font-display font-bold text-xl mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Vendor Registration</h3>
              <p className="text-muted-foreground mb-5 flex-grow">
                Add your Turkish suppliers to your vendor network. Upload prior proforma invoices or 
                add vendor details manually to start tracking.
              </p>
              <div className="mt-auto hidden lg:flex justify-end">
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
            </div>
            
            <div className="bg-background rounded-xl border border-border p-6 relative z-10 h-full flex flex-col">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary font-display font-bold text-xl mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Place Orders</h3>
              <p className="text-muted-foreground mb-5 flex-grow">
                Create new orders in the system with full volume details. Link orders to vendors and upload 
                relevant documentation for each shipment.
              </p>
              <div className="mt-auto hidden lg:flex justify-end">
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
            </div>
            
            <div className="bg-background rounded-xl border border-border p-6 relative z-10 h-full flex flex-col">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary font-display font-bold text-xl mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Container Allocation</h3>
              <p className="text-muted-foreground mb-5 flex-grow">
                Our system automatically allocates your shipments to optimal container space. View the container 
                utilization and projected shipping dates.
              </p>
              <div className="mt-auto hidden lg:flex justify-end">
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
            </div>
            
            <div className="bg-background rounded-xl border border-border p-6 relative z-10 h-full flex flex-col">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary font-display font-bold text-xl mb-6">
                4
              </div>
              <h3 className="text-xl font-semibold mb-3">Track & Receive</h3>
              <p className="text-muted-foreground mb-5 flex-grow">
                Monitor your shipment progress in real-time. View container status, estimated arrival 
                dates, and receive notifications for each milestone.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-20 bg-primary/5 rounded-2xl border border-primary/10 p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-display font-semibold mb-4">Advanced Container Visualization</h3>
              <p className="text-lg mb-6">
                Our platform provides detailed visualization of how your shipments are arranged within each container, 
                allowing you to understand space utilization and optimize packing.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <span className="text-primary text-xs font-semibold">✓</span>
                  </div>
                  <span>3D visualization of container space usage</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <span className="text-primary text-xs font-semibold">✓</span>
                  </div>
                  <span>Individual shipment volumetric tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <span className="text-primary text-xs font-semibold">✓</span>
                  </div>
                  <span>AI-powered packing optimization for maximum efficiency</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <span className="text-primary text-xs font-semibold">✓</span>
                  </div>
                  <span>Weight distribution analysis for safer transportation</span>
                </li>
              </ul>
            </div>
            
            <div className="lg:col-span-1">
              <div className="h-full flex items-center justify-center">
                <div className="relative w-full max-w-sm aspect-square p-4 border border-primary/30 rounded-xl bg-background">
                  <div className="absolute inset-0 rounded-xl overflow-hidden flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/20 p-6">
                      <div className="relative h-full w-full flex flex-col items-center justify-center">
                        {/* Container outline */}
                        <div className="w-full h-full border-2 border-primary/40 rounded-md relative flex items-center justify-center">
                          {/* Container items */}
                          <div className="absolute top-[10%] left-[15%] w-[30%] h-[25%] bg-primary/30 rounded-sm border border-primary/60 flex items-center justify-center">
                            <Box className="h-8 w-8 text-primary/70" />
                          </div>
                          <div className="absolute top-[40%] left-[20%] w-[25%] h-[35%] bg-primary/40 rounded-sm border border-primary/60 flex items-center justify-center">
                            <Package className="h-8 w-8 text-primary/70" />
                          </div>
                          <div className="absolute top-[20%] right-[15%] w-[35%] h-[30%] bg-primary/25 rounded-sm border border-primary/60 flex items-center justify-center">
                            <Box className="h-10 w-10 text-primary/70" />
                          </div>
                          <div className="absolute bottom-[15%] right-[20%] w-[40%] h-[25%] bg-primary/35 rounded-sm border border-primary/60 flex items-center justify-center">
                            <Package className="h-8 w-8 text-primary/70" />
                          </div>
                          
                          {/* Usage meter */}
                          <div className="absolute -bottom-10 left-0 right-0 flex items-center justify-center">
                            <div className="text-xs text-primary/80 font-semibold">85% utilized</div>
                          </div>
                          
                          {/* 3D effect lines */}
                          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary/40"></div>
                          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary/40"></div>
                          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary/40"></div>
                          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary/40"></div>
                        </div>
                        
                        {/* Analytics overlay */}
                        <div className="absolute -top-3 -right-3 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
                          <BarChart3 className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
