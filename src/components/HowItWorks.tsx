
import { ArrowRight } from "lucide-react";
import containerVisualization from "../assets/container-visualization.png";

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
          {/* Timeline connector */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary/20 -translate-x-1/2 hidden md:block"></div>
          
          <div className="space-y-16 md:space-y-24 relative">
            {/* Step 1 */}
            <div className="md:grid md:grid-cols-2 md:gap-12 relative">
              <div className="md:text-right md:pr-12 mb-12 md:mb-0">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary font-display font-bold text-xl mb-6 md:ml-auto">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Vendor Registration</h3>
                <p className="text-muted-foreground">
                  Add your Turkish suppliers to your vendor network. Upload prior proforma invoices or 
                  add vendor details manually to start tracking.
                </p>
              </div>
              
              {/* Center timeline dot for step 1 */}
              <div className="absolute left-1/2 top-7 w-5 h-5 bg-primary rounded-full -translate-x-1/2 z-10 hidden md:block"></div>
              
              <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
                <div className="h-48 bg-primary/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-block p-3 rounded-full bg-primary/10 mb-3">
                      <svg className="w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <p className="text-sm text-muted-foreground">Vendor dashboard interface</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="md:grid md:grid-cols-2 md:gap-12 relative">
              <div className="order-last md:order-first bg-background rounded-xl border border-border p-6 shadow-sm">
                <div className="h-48 bg-primary/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-block p-3 rounded-full bg-primary/10 mb-3">
                      <svg className="w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <p className="text-sm text-muted-foreground">Order creation interface</p>
                  </div>
                </div>
              </div>
              
              {/* Center timeline dot for step 2 */}
              <div className="absolute left-1/2 top-7 w-5 h-5 bg-primary rounded-full -translate-x-1/2 z-10 hidden md:block"></div>
              
              <div className="md:text-left md:pl-12 mb-12 md:mb-0">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary font-display font-bold text-xl mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Place Orders</h3>
                <p className="text-muted-foreground">
                  Create new orders in the system with full volume details. Link orders to vendors and upload 
                  relevant documentation for each shipment.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="md:grid md:grid-cols-2 md:gap-12 relative">
              <div className="md:text-right md:pr-12 mb-12 md:mb-0">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary font-display font-bold text-xl mb-6 md:ml-auto">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Container Allocation</h3>
                <p className="text-muted-foreground">
                  Our system automatically allocates your shipments to optimal container space. View the container 
                  utilization and projected shipping dates.
                </p>
              </div>
              
              {/* Center timeline dot for step 3 */}
              <div className="absolute left-1/2 top-7 w-5 h-5 bg-primary rounded-full -translate-x-1/2 z-10 hidden md:block"></div>
              
              <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
                <div className="h-48 bg-primary/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-block p-3 rounded-full bg-primary/10 mb-3">
                      <svg className="w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <p className="text-sm text-muted-foreground">Container allocation system</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="md:grid md:grid-cols-2 md:gap-12 relative">
              <div className="order-last md:order-first bg-background rounded-xl border border-border p-6 shadow-sm">
                <div className="h-48 bg-primary/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-block p-3 rounded-full bg-primary/10 mb-3">
                      <svg className="w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <p className="text-sm text-muted-foreground">Tracking and monitoring dashboard</p>
                  </div>
                </div>
              </div>
              
              {/* Center timeline dot for step 4 */}
              <div className="absolute left-1/2 top-7 w-5 h-5 bg-primary rounded-full -translate-x-1/2 z-10 hidden md:block"></div>
              
              <div className="md:text-left md:pl-12 mb-12 md:mb-0">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary font-display font-bold text-xl mb-6">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-3">Track & Receive</h3>
                <p className="text-muted-foreground">
                  Monitor your shipment progress in real-time. View container status, estimated arrival 
                  dates, and receive notifications for each milestone.
                </p>
              </div>
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
                <div className="relative w-full max-w-sm aspect-square bg-background border border-border rounded-xl overflow-hidden shadow-md">
                  <img 
                    src={containerVisualization} 
                    alt="3D Container Visualization" 
                    className="w-full h-full object-cover" 
                  />
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
