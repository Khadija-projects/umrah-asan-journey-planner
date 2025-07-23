import { ArrowRight, MapPin, Users, Star, Shield, Clock, Heart, CheckCircle, FileText, CreditCard, Plane, Car } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import BookingForm from "@/components/BookingForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import kaabaWatermark from "@/assets/kaaba-watermark.png";

const Index = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Fetch dynamic services from Supabase
  const { data: dynamicServices } = useQuery({
    queryKey: ["services", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .eq("is_featured", true)
        .order("sort_order", { ascending: true })
        .limit(3);
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch Ziaraat locations for home page
  const { data: ziaraatLocations } = useQuery({
    queryKey: ["ziaraat-locations", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ziaraat_locations")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .limit(6);
      
      if (error) throw error;
      return data;
    },
  });

  // Use dynamic services if available, fallback to static
  const services = dynamicServices?.length ? dynamicServices.map(service => ({
    title: service.name,
    description: service.short_description || service.description,
    icon: service.service_type === 'ziaraat' ? MapPin : 
          service.service_type === 'taxi' ? Users : 
          service.service_type === 'guide' ? Heart : MapPin,
    features: Array.isArray(service.features) ? service.features.map(f => String(f)) : [],
    buttonText: service.service_type === 'ziaraat' ? t('services.explorePlaces') :
                service.service_type === 'taxi' ? t('services.bookTaxi') :
                t('services.readGuide'),
    onClick: () => navigate(`/${service.service_type}`)
  })) : [
    {
      title: t('nav.ziaraat'),
      description: t('services.ziaraatDesc'),
      icon: MapPin,
      features: ["Guided tours", "Historical insights", "Spiritual guidance"],
      buttonText: t('services.explorePlaces'),
      onClick: () => navigate("/ziaraat")
    },
    {
      title: t('nav.taxi'),
      description: t('services.taxiDesc'),
      icon: Users,
      features: ["24/7 availability", "Professional drivers", "Comfortable vehicles"],
      buttonText: t('services.bookTaxi'),
      onClick: () => navigate("/taxi")
    },
    {
      title: t('nav.guide'),
      description: t('services.guideDesc'),
      icon: Heart,
      features: ["Detailed procedures", "Spiritual preparation", "Practical tips"],
      buttonText: t('services.readGuide'),
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
      name: t('home.reviews.review1.name'),
      location: t('home.reviews.review1.country'),
      rating: 5,
      text: t('home.reviews.review1.text')
    },
    {
      name: t('home.reviews.review2.name'), 
      location: t('home.reviews.review2.country'),
      rating: 5,
      text: t('home.reviews.review2.text')
    },
    {
      name: t('home.reviews.review3.name'),
      location: t('home.reviews.review3.country'), 
      rating: 5,
      text: t('home.reviews.review3.text')
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

      {/* Booking Form Section */}
      <BookingForm />

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
              {t('services.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('services.subtitle')}
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
              {t('whyChoose.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('whyChoose.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-gradient-holy rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('whyChoose.trusted')}</h3>
              <p className="text-muted-foreground">{t('whyChoose.trustedDesc')}</p>
            </div>
            
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-gradient-holy rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('whyChoose.support')}</h3>
              <p className="text-muted-foreground">{t('whyChoose.supportDesc')}</p>
            </div>
            
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-gradient-holy rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('whyChoose.spiritual')}</h3>
              <p className="text-muted-foreground">{t('whyChoose.spiritualDesc')}</p>
            </div>
            
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-gradient-holy rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('whyChoose.quality')}</h3>
              <p className="text-muted-foreground">{t('whyChoose.qualityDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('testimonials.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('testimonials.subtitle')}
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


      {/* Ziaraat Locations Section */}
      {ziaraatLocations && ziaraatLocations.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('nav.ziaraat')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover the holy places with spiritual significance
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ziaraatLocations.map((location) => (
                <Card key={location.id} className="animate-fade-in shadow-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    {location.featured_image_url && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img 
                          src={location.featured_image_url} 
                          alt={location.name}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-foreground">{location.name}</h3>
                      <span className="text-sm bg-accent px-2 py-1 rounded">{location.city}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
                      {location.description}
                    </p>
                    {location.distance_from_haram && (
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        {location.distance_from_haram} km from Haram
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">
                        {location.visiting_hours || 'Open 24/7'}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate('/ziaraat')}
                      >
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button 
                onClick={() => navigate('/ziaraat')}
                className="bg-gradient-holy text-white hover:opacity-90"
              >
                View All Ziaraat Places
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-holy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {t('cta.subtitle')}
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
              {t('cta.getStarted')}
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