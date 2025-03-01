
import { useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Blog from "@/components/Blog";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  const { user } = useAuth();
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set dark mode as default
    document.documentElement.classList.add('dark');

    // Check if URL has hash to scroll to section after page load
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const targetId = hash.substring(1);
          const element = document.getElementById(targetId);
          if (element) {
            const yOffset = -80; // Account for fixed header
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 100);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    }
  }, []);

  console.log("User status on index page:", user ? "Logged in" : "Not logged in");

  return (
    <div className="min-h-screen flex flex-col dark">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <div id="features" ref={featuresRef}>
          <Features />
        </div>
        <div id="how-it-works" ref={howItWorksRef}>
          <HowItWorks />
        </div>
        <Blog />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
