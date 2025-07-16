import { ArrowRight, MapPin, Users, Star, Shield, Clock, Heart, CheckCircle, FileText, CreditCard, Plane, Car } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { useLanguage } from "@/contexts/LanguageContext";
import kaabaWatermark from "@/assets/kaaba-watermark.png";

const Index = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const services = [
    {
      title: t('nav.ziaraat'),
      description: "Explore blessed places in Makkah and Madinah with guided tours",
      icon: MapPin,
      features: ["Guided tours", "Historical insights", "Spiritual guidance"],
      buttonText: "Explore Places",
      onClick: () => navigate("/ziaraat")
    },
    {
      title: t('nav.taxi'),
      description: "Safe and reliable taxi services for pilgrims",
      icon: Users,
      features: ["24/7 availability", "Professional drivers", "Comfortable vehicles"],
      buttonText: "Book Taxi",
      onClick: () => navigate("/taxi")
    },
    {
      title: t('nav.guide'),
      description: "Complete Umrah guide with step-by-step instructions",
      icon: Heart,
      features: ["Detailed procedures", "Spiritual preparation", "Practical tips"],
      buttonText: "Read Guide",
      onClick: () => navigate("/guide")
    }
  ];

  const stats = [
    { number: "10,000+", label: t('stats.pilgrims') },
    { number: "5", label: t('stats.experience') },
    { number: "24/7", label: t('stats.support') },
    { number: "100%", label: t('stats.satisfaction') }
  ];

  const bookingSteps = [
    {
      icon: FileText,
      title: t('bookingSteps.getVisa'),
      subtitle: t('bookingSteps.visaSubtitle'),
      description: t('bookingSteps.visaDesc')
    },
    {
      icon: Plane,
      title: t('bookingSteps.bookFlight'),
      subtitle: t('bookingSteps.flightSubtitle'), 
      description: t('bookingSteps.flightDesc')
    },
    {
      icon: MapPin,
      title: t('bookingSteps.bookHotel'),
      subtitle: t('bookingSteps.hotelSubtitle'),
      description: t('bookingSteps.hotelDesc')
    },
    {
      icon: Car,
      title: t('bookingSteps.transfers'),
      subtitle: t('bookingSteps.transfersSubtitle'),
      description: t('bookingSteps.transfersDesc')
    }
  ];

  const testimonials = [
    {
      name: "Ahmad Ali",
      location: "Pakistan",
      rating: 5,
      text: "Excellent service! Made our Umrah journey smooth and memorable."
    },
    {
      name: "Fatima Hassan", 
      location: "Egypt",
      rating: 5,
      text: "Very helpful staff and great accommodations. Highly recommended!"
    },
    {
      name: "Mohammed Khan",
      location: "India", 
      rating: 5,
      text: "Professional service with great attention to detail. Thank you!"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-holy">
        {/* Kaaba Watermark Background */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10"
          style={{
            backgroundImage: `url(${kaabaWatermark})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="text-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {t('hero.title')}
                <span className="block text-golden">{t('hero.subtitle')}</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-4xl mx-auto">
                {t('hero.description')}
              </p>
              
              {/* Key Features */}
              <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-golden rounded-full"></div>
                  <span>{t('hero.noAdvancePayment')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-golden rounded-full"></div>
                  <span>{t('hero.instantVoucher')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-golden rounded-full"></div>
                  <span>{t('hero.support247')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-white/90 text-primary font-semibold px-8 py-3 rounded-lg border-2 border-white"
                  onClick={() => navigate('/ziaraat')}
                >
                  {t('hero.hotelBooking')}
                </Button>
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-white/90 text-primary font-semibold px-8 py-3 rounded-lg border-2 border-white"
                  onClick={() => navigate('/taxi')}
                >
                  {t('hero.taxiBooking')}
                </Button>
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-white/90 text-primary font-semibold px-8 py-3 rounded-lg border-2 border-white"
                  onClick={() => navigate('/ziaraat')}
                >
                  {t('hero.exploreZiaraat')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How To Book Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('bookingSteps.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('bookingSteps.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bookingSteps.map((step, index) => (
              <Card key={index} className="text-center animate-fade-in shadow-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-holy rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-primary font-medium mb-2">{step.subtitle}</p>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive Umrah services to make your pilgrimage journey comfortable and spiritually fulfilling
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                features={service.features}
                buttonText={service.buttonText}
                onClick={service.onClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Umrah Asan?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the difference with our dedicated team and comprehensive services
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-gradient-holy rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted & Reliable</h3>
              <p className="text-muted-foreground">Years of experience serving pilgrims with dedication</p>
            </div>
            
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-gradient-holy rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">Round-the-clock assistance for all your needs</p>
            </div>
            
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-gradient-holy rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Spiritual Care</h3>
              <p className="text-muted-foreground">Guidance that nurtures your spiritual journey</p>
            </div>
            
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-gradient-holy rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Service</h3>
              <p className="text-muted-foreground">Premium services at competitive prices</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Pilgrims Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear from thousands of satisfied pilgrims who trusted us with their blessing journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="animate-fade-in shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-holy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Begin Your Blessing Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of pilgrims who have trusted us with their Umrah experience
          </p>
          
          {/* Statistics in CTA */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <Link to="/login">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <FloatingContactButtons />
    </div>
  );
};

export default Index;