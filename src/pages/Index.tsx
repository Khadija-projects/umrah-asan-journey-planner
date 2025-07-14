import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { 
  Building2, 
  Car, 
  MapPin, 
  BookOpen, 
  Train, 
  Phone, 
  MessageCircle,
  CreditCard,
  Clock,
  Shield,
  Star
} from "lucide-react";

const Index = () => {
  const services = [
    {
      title: "Premium Hotels",
      description: "Verified hotels close to Haram in Makkah & Madinah",
      icon: Building2,
      features: [
        "Walking distance to Haram",
        "Verified & trusted properties",
        "Instant booking voucher",
        "No hidden fees"
      ],
      buttonText: "Book Hotel Now",
      buttonVariant: "holy" as const,
    },
    {
      title: "Reliable Taxi Service",
      description: "24/7 safe transport for Haram, Airport & Ziaraat",
      icon: Car,
      features: [
        "24/7 availability",
        "Verified drivers",
        "Airport transfers",
        "Family-friendly vehicles"
      ],
      buttonText: "Book Taxi Now",
      buttonVariant: "default" as const,
    },
    {
      title: "Sacred Ziaraat Tours",
      description: "Visit blessed sites with experienced local guides",
      icon: MapPin,
      features: [
        "Cave Hira & Thawr",
        "Masjid Quba & Qiblatain",
        "Jannat ul Baqi",
        "Female-friendly guides"
      ],
      buttonText: "Explore Ziaraat",
      buttonVariant: "gold" as const,
    },
  ];

  const highlights = [
    {
      icon: CreditCard,
      title: "Bank Transfer Only",
      description: "No card needed - secure bank transfer payment"
    },
    {
      icon: Clock,
      title: "4-Hour Payment Window",
      description: "Pay within 4 hours or voucher expires automatically"
    },
    {
      icon: Shield,
      title: "Instant Vouchers",
      description: "Get your booking voucher immediately after payment"
    },
    {
      icon: Star,
      title: "24/7 Support",
      description: "WhatsApp, Call & Email support always available"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-subtle py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 animate-fade-in">
            Book Your Holy Umrah Trip with Umrah Asan
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in">
            Stay closer to Haram with trusted hotels, easy taxi booking & guided ziaraat — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Link to="/hotels">
              <Button variant="holy" size="xl" className="w-full sm:w-auto">
                Book Hotel Now
              </Button>
            </Link>
            <Link to="/taxi">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                Book Taxi Now
              </Button>
            </Link>
            <Link to="/ziaraat">
              <Button variant="gold" size="xl" className="w-full sm:w-auto">
                Explore Ziaraat
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Why Choose Umrah Asan?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <highlight.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{highlight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{highlight.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 px-4 bg-accent/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Our Sacred Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Complete Umrah Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-card transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-8 h-8 text-primary" />
                  <CardTitle>Complete Umrah Guide</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Step-by-step Umrah rituals, visa requirements, and packing checklist.
                </CardDescription>
                <Link to="/guide">
                  <Button variant="outline" className="w-full">
                    Read Guide
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-card transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Train className="w-8 h-8 text-primary" />
                  <CardTitle>Haramain Train</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  High-speed train details, fares, and official booking links.
                </CardDescription>
                <Link to="/train">
                  <Button variant="outline" className="w-full">
                    Train Details
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-card transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-8 h-8 text-primary" />
                  <CardTitle>Need Help?</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  24/7 support via WhatsApp, phone, or email. We're always here.
                </CardDescription>
                <div className="space-y-2">
                  <Button variant="default" className="w-full" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call: +966 123 456 789
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Trusted by Thousands of Pilgrims
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            "No hidden fees, instant vouchers, pay safely via bank transfer, and always reachable support."
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-primary-foreground/80">Happy Pilgrims</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">Verified Hotels</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-primary-foreground/80">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
