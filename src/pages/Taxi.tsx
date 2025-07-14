import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, MapPin, Clock, Shield, Users, Plane } from "lucide-react";

const Taxi = () => {
  const services = [
    {
      icon: Plane,
      title: "Airport Transfers",
      description: "Reliable pickup and drop-off services for King Abdulaziz Airport and all Saudi airports.",
      features: ["Flight tracking", "Meet & greet service", "Luggage assistance", "24/7 availability"]
    },
    {
      icon: MapPin,
      title: "Haram Transfers",
      description: "Comfortable transportation between your hotel and the Holy Haram in Makkah and Madinah.",
      features: ["Prayer time scheduling", "Short waiting times", "Frequent services", "Direct routes"]
    },
    {
      icon: Car,
      title: "Ziaraat Trips",
      description: "Private vehicle for visiting sacred sites with flexible timing and comfortable seating.",
      features: ["Full day tours", "Half day options", "Custom itineraries", "Air-conditioned vehicles"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Reliable Taxi Service for Haram, Airport & Ziaraat
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Safe, comfortable, and trusted transportation with verified drivers who understand 
            the sacred nature of your journey.
          </p>
          <Button variant="holy" size="xl">
            Book Taxi Now
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Why Choose Our Taxi Service?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Verified Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Licensed, experienced drivers who respect pilgrims and Islamic values.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>24/7 Service</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Available around the clock including late-night and early morning transfers.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Family Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Spacious vehicles suitable for families with luggage and comfortable seating.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Car className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Modern Fleet</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Clean, air-conditioned vehicles maintained to highest safety standards.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-accent/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Our Transportation Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <service.icon className="w-12 h-12 text-primary mb-4" />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Info */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-8">
            Transparent Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Standard Routes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span>Airport to Makkah Hotels</span>
                  <span className="font-semibold">80-120 SAR</span>
                </div>
                <div className="flex justify-between">
                  <span>Airport to Madinah Hotels</span>
                  <span className="font-semibold">100-150 SAR</span>
                </div>
                <div className="flex justify-between">
                  <span>Hotel to Haram (one way)</span>
                  <span className="font-semibold">15-30 SAR</span>
                </div>
                <div className="flex justify-between">
                  <span>Makkah to Madinah</span>
                  <span className="font-semibold">400-500 SAR</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ziaraat Packages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span>Half Day Makkah Ziaraat</span>
                  <span className="font-semibold">200-250 SAR</span>
                </div>
                <div className="flex justify-between">
                  <span>Full Day Makkah Ziaraat</span>
                  <span className="font-semibold">350-400 SAR</span>
                </div>
                <div className="flex justify-between">
                  <span>Half Day Madinah Ziaraat</span>
                  <span className="font-semibold">180-220 SAR</span>
                </div>
                <div className="flex justify-between">
                  <span>Full Day Madinah Ziaraat</span>
                  <span className="font-semibold">300-350 SAR</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground mt-6">
            *Prices may vary based on vehicle type, distance, and time. All fares are shown before booking.
          </p>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Book Your Transportation Now
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Secure your reliable transport with our verified drivers. Same bank transfer payment system - 
            pay within 4 hours to confirm your booking.
          </p>
          <div className="space-y-4">
            <Button variant="gold" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Book Taxi Service
            </Button>
            <p className="text-sm text-primary-foreground/80">
              Available 24/7 • Instant confirmation • Verified drivers
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Taxi;