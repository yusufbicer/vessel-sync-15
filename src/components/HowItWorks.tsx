
import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
            Simplified Process
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6">
            How Groop consolidation works
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
                <div className="relative w-full max-w-sm aspect-square">
                  <div className="absolute inset-0 bg-primary/20 rounded-xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-primary font-medium">
                    Container visualization preview
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
