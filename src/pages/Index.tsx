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
  Star,
  Calendar,
  Users,
  Home,
  CalendarDays
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      title: "Blessed Ziaraat Tours",
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

  console.log('Index: Component is rendering');
  
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

      {/* Booking Form */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-lg border p-6 shadow-lg">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Select City</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-primary rounded-lg bg-primary/5">
                  <h4 className="font-medium text-primary">Makkah</h4>
                  <p className="text-sm text-muted-foreground">Holy Kaaba</p>
                </div>
                <div className="p-4 border rounded-lg hover:border-primary/50 cursor-pointer transition-colors">
                  <h4 className="font-medium">Madina</h4>
                  <p className="text-sm text-muted-foreground">Prophet's Mosque</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Hotel Category */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-primary" />
                  <label className="font-medium">Hotel Category</label>
                </div>
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg hover:border-primary/50 cursor-pointer transition-colors">
                    <span>3 Star</span>
                  </div>
                  <div className="p-3 border-2 border-primary rounded-lg bg-primary/5">
                    <span className="font-medium text-primary">4 Star</span>
                  </div>
                  <div className="p-3 border rounded-lg hover:border-primary/50 cursor-pointer transition-colors">
                    <span>5 Star</span>
                  </div>
                </div>
              </div>

              {/* Room Type */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Home className="w-4 h-4 text-primary" />
                  <label className="font-medium">Room Type</label>
                </div>
                <div className="space-y-2">
                  <div className="p-3 border-2 border-primary rounded-lg bg-primary/5">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-primary">Double Room</span>
                      <span className="text-xs text-primary">Up to 2 guests</span>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg hover:border-primary/50 cursor-pointer transition-colors">
                    <div className="flex justify-between items-center">
                      <span>Quad Room</span>
                      <span className="text-xs text-muted-foreground">Up to 4 guests</span>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg hover:border-primary/50 cursor-pointer transition-colors">
                    <div className="flex justify-between items-center">
                      <span>Multi-sharing</span>
                      <span className="text-xs text-muted-foreground">Up to 8 guests</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Distance from Haram */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <label className="font-medium">Distance from Haram</label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 border rounded-lg hover:border-primary/50 cursor-pointer transition-colors text-center">
                    <div className="font-medium">200m</div>
                    <div className="text-xs text-muted-foreground">Walking distance</div>
                  </div>
                  <div className="p-3 border-2 border-primary rounded-lg bg-primary/5 text-center">
                    <div className="font-medium text-primary">500m</div>
                    <div className="text-xs text-primary">5-7 min walk</div>
                  </div>
                  <div className="p-3 border rounded-lg hover:border-primary/50 cursor-pointer transition-colors text-center">
                    <div className="font-medium">800m</div>
                    <div className="text-xs text-muted-foreground">8-10 min walk</div>
                  </div>
                  <div className="p-3 border rounded-lg hover:border-primary/50 cursor-pointer transition-colors text-center">
                    <div className="font-medium">1km+</div>
                    <div className="text-xs text-muted-foreground">Shuttle service</div>
                  </div>
                </div>
              </div>

              {/* Dates and Guests */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-medium mb-2 block text-sm">Check-in</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="font-medium mb-2 block text-sm">Check-out</label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-medium mb-2 block text-sm">Rooms</label>
                    <Select defaultValue="1">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Room</SelectItem>
                        <SelectItem value="2">2 Rooms</SelectItem>
                        <SelectItem value="3">3 Rooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="font-medium mb-2 block text-sm">Guests</label>
                    <Select defaultValue="1">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3 Guests</SelectItem>
                        <SelectItem value="4">4 Guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t">
              <div>
                <div className="text-lg text-muted-foreground">Selected: 4 Star Hotel • Double Room</div>
                <div className="text-sm text-muted-foreground">1 Room • 2 Guests</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">Payment Method</div>
                <div className="text-green-600 font-medium">Bank Transfer</div>
              </div>
            </div>
            
            <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white" size="lg">
              Get Quote & Continue
            </Button>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 px-4 bg-accent/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            What Our Pilgrims Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-card transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Excellent service! The hotel was walking distance to Haram and the taxi service was very reliable. Highly recommend!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary font-semibold">AH</span>
                  </div>
                  <div>
                    <div className="font-medium">Ahmed Hassan</div>
                    <div className="text-sm text-muted-foreground">Pakistan</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-card transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Amazing experience! The ziaraat guide was very knowledgeable and the whole process was smooth."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary font-semibold">SF</span>
                  </div>
                  <div>
                    <div className="font-medium">Siti Fatimah</div>
                    <div className="text-sm text-muted-foreground">Indonesia</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-card transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Perfect service from booking to arrival. The instant voucher system made everything easy!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary font-semibold">MA</span>
                  </div>
                  <div>
                    <div className="font-medium">Mohammed Ali</div>
                    <div className="text-sm text-muted-foreground">India</div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
            Our Blessed Services
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

      {/* Floating Contact Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40">
        <a
          href="https://wa.me/966123456789"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          title="WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
        <a
          href="tel:+966123456789"
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          title="Call Us"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
