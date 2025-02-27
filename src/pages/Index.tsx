
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Blog from "@/components/Blog";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Set dark mode as default
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen flex flex-col dark">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
        <Blog />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
