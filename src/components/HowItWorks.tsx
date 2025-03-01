
import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-gradient-to-b from-background to-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform simplifies consolidating Turkish imports with an elegant, efficient process
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Step connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="bg-card rounded-xl border border-border shadow-sm p-8 relative z-10 h-full flex flex-col hover:shadow-md transition-all hover:border-primary/30 hover:translate-y-[-5px] duration-300"
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary font-display font-bold text-xl mb-6 mx-auto">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
                <p className="text-muted-foreground mb-5 flex-grow text-center">
                  {step.description}
                </p>
                {index < 3 && (
                  <div className="mt-auto hidden lg:flex justify-center">
                    <ArrowRight className="h-5 w-5 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-24 bg-card rounded-2xl border border-primary/10 p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-display font-semibold mb-6">Advanced Container Visualization</h3>
              <p className="text-lg mb-8 text-muted-foreground">
                Our platform provides sophisticated visualization of your shipments within each container, 
                allowing you to optimize space utilization with precision and elegance.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <span className="text-primary text-xs font-semibold">✓</span>
                    </div>
                    <span className="text-foreground/90">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:col-span-1">
              <div className="h-full flex items-center justify-center">
                <div className="relative w-full h-72 lg:h-full overflow-hidden rounded-xl border border-primary/20 shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20"></div>
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 p-3">
                    {Array(9).fill(0).map((_, i) => (
                      <div 
                        key={i} 
                        className={`bg-white/10 backdrop-blur-sm rounded-md border border-white/20 transition-all duration-300 ${
                          i === 4 ? 'bg-primary/30' : ''
                        }`}
                        style={{
                          transform: `translateZ(${Math.random() * 20}px)`,
                          opacity: 0.7 + Math.random() * 0.3
                        }}
                      ></div>
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="px-4 py-2 rounded-lg bg-primary text-white backdrop-blur-sm font-medium text-sm shadow-lg">
                      3D Container View
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-lg transition-all hover:border-primary/30 duration-300">
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-4">Optimized Route Planning</h3>
              <p className="text-muted-foreground mb-6">
                Our AI algorithms calculate the most efficient shipping routes from Turkey 
                to your destination, reducing transit time and costs.
              </p>
              <ul className="space-y-3">
                {routePlanning.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary text-xs">✓</span>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-lg transition-all hover:border-primary/30 duration-300">
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-4">Customs Compliance</h3>
              <p className="text-muted-foreground mb-6">
                Stay compliant with all customs requirements with our built-in documentation 
                and regulation guidance for Turkish exports.
              </p>
              <ul className="space-y-3">
                {customs.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary text-xs">✓</span>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const steps = [
  {
    title: "Vendor Registration",
    description: "Add your Turkish suppliers to your network with a few simple steps, uploading prior invoices or adding details manually."
  },
  {
    title: "Place Orders",
    description: "Create streamlined orders with full volume details, linking them to vendors with relevant documentation."
  },
  {
    title: "Container Allocation",
    description: "Our system elegantly allocates shipments to optimal container space with visual utilization insights."
  },
  {
    title: "Track & Receive",
    description: "Monitor shipments in real-time with detailed status updates and milestone notifications."
  }
];

const benefits = [
  "3D visualization of container space usage with elegant interface",
  "Individual shipment volumetric tracking with precision metrics",
  "AI-powered packing optimization for maximum efficiency",
  "Weight distribution analysis for safer transportation"
];

const routePlanning = [
  "Multiple carrier options with comparative analysis",
  "Weather pattern anticipation and route adaptation",
  "Port congestion avoidance algorithms"
];

const customs = [
  "Automated document verification and processing",
  "Duty and tax calculator with regional variations",
  "Connected customs broker network for seamless clearance"
];

export default HowItWorks;
