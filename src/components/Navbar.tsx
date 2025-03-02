import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Package, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // Account for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      scrollToSection(sectionId);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md py-3 shadow-md"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-foreground group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary/20">
            <Package className="h-5 w-5 text-primary transition-all" />
          </div>
          <span className="font-display text-xl font-bold">Groop</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-x-8">
          <div className="flex items-center gap-6">
            <a
              href="/#features"
              onClick={(e) => handleNavLinkClick(e, "features")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="/#how-it-works"
              onClick={(e) => handleNavLinkClick(e, "how-it-works")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              How it works
            </a>
            <Link
              to="/blog"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <Button asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup" className="flex items-center gap-1">
                    Get started
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 pt-24 px-4 animate-fade-in md:hidden">
          <nav className="flex flex-col gap-6">
            <a
              href="/#features"
              className="text-xl font-medium py-2 border-b border-border"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("features");
              }}
            >
              Features
            </a>
            <a
              href="/#how-it-works"
              className="text-xl font-medium py-2 border-b border-border"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("how-it-works");
              }}
            >
              How it works
            </a>
            <Link
              to="/blog"
              className="text-xl font-medium py-2 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <div className="flex flex-col gap-4 mt-6">
              {user ? (
                <Button asChild className="w-full">
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </Link>
                </Button>
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      Log in
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link
                      to="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center gap-1"
                    >
                      Get started
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
