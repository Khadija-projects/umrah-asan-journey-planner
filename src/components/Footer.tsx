import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold">Umrah Asan</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Making your sacred journey easier than ever with trusted services, 
              transparent pricing, and genuine support.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/ziaraat" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Ziaraat Tours
                </Link>
              </li>
              <li>
                <Link to="/taxi" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Taxi Booking
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Umrah Guide
                </Link>
              </li>
              <li>
                <Link to="/train" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Train Details
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Partner/Agent Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+966 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: +966 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@umrahasan.com</span>
              </div>
              <div className="mt-4 p-3 bg-primary-foreground/10 rounded-lg">
                <p className="text-xs">
                  <strong>24/7 Support:</strong> We're always here to help with your sacred journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/80 text-sm">
            © 2024 Umrah Asan. All rights reserved. | Secure Payment • Instant Vouchers • Trusted Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;