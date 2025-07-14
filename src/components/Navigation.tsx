import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, Phone, Mail } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Ziaraat", path: "/ziaraat" },
    { name: "Taxi Booking", path: "/taxi" },
    { name: "Umrah Guide", path: "/guide" },
    { name: "Train Details", path: "/train" },
    { name: "Blogs", path: "/blogs" },
    { name: "FAQs", path: "/faq" },
    { name: "About Us", path: "/about" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background shadow-card border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-holy rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">Umrah Asan</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Contact & Login */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>+966 123 456 789</span>
            </div>
            <Link to="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>+966 123 456 789</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>info@umrahasan.com</span>
                </div>
                <div className="px-3 py-2">
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="w-full">
                      Partner/Admin Login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;