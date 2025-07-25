import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
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
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/ziaraat" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('nav.ziaraat')}
                </Link>
              </li>
              <li>
                <Link to="/taxi" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('nav.taxi')}
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('nav.guide')}
                </Link>
              </li>
              <li>
                <Link to="/train" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('nav.train')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t('footer.legal')}</h3>
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
                <Link to="/admin-login" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Admin Login
                </Link>
              </li>
              <li>
                <Link to="/partner-login" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Partner Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t('footer.contact')}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>{t('footer.phone')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: +966 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{t('footer.email')}</span>
              </div>
              <div className="mt-4 p-3 bg-primary-foreground/10 rounded-lg">
                <p className="text-xs">
                  <strong>24/7 Support:</strong> We're always here to help with your blessing journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/80 text-sm">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;