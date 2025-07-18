import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Shield, Users, Star } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  
  const values = [
    {
      icon: Heart,
      title: t('about.values.spiritualRespect'),
      description: t('about.values.spiritualRespectDesc')
    },
    {
      icon: Shield,
      title: t('about.values.trustTransparency'), 
      description: t('about.values.trustTransparencyDesc')
    },
    {
      icon: Users,
      title: t('about.values.humanSupport'),
      description: t('about.values.humanSupportDesc')
    },
    {
      icon: Star,
      title: t('about.values.excellence'),
      description: t('about.values.excellenceDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* About Us */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-primary text-center">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none text-center">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Umrah Asan was born from a simple belief: every pilgrim deserves a hassle-free, 
                trustworthy experience when planning their blessing journey. We witnessed too many 
                travelers struggling with complicated booking processes, hidden fees, and unreliable services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our platform brings together trusted hotel partners, verified transport providers, 
                and experienced local guides under one roof. We eliminated the need for credit cards, 
                simplified payments through bank transfers, and built a system that puts pilgrims first.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-primary">10,000+</CardTitle>
                <CardDescription>Happy Pilgrims Served</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-primary">500+</CardTitle>
                <CardDescription>Verified Hotel Partners</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-primary">24/7</CardTitle>
                <CardDescription>Support Availability</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-4 bg-accent/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover:shadow-card transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To be the most trusted online platform for every pilgrim planning Umrah — 
                  reliable, easy & honest. We envision a world where spiritual journeys are 
                  supported by technology that serves humanity with dignity and respect.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-card transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To deliver hassle-free bookings, transparent payment options, verified partners 
                  & genuine local help so pilgrims can focus only on worship. Every service we 
                  provide is designed to honor the blessing nature of your journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Our Promise to You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-foreground rounded-full mt-2 flex-shrink-0" />
                <p>No hidden fees or surprise charges - everything is transparent upfront</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-foreground rounded-full mt-2 flex-shrink-0" />
                <p>Instant vouchers delivered immediately after payment confirmation</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-foreground rounded-full mt-2 flex-shrink-0" />
                <p>Secure bank transfer payments without requiring credit cards</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-foreground rounded-full mt-2 flex-shrink-0" />
                <p>24/7 human support always reachable via WhatsApp, phone, or email</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-foreground rounded-full mt-2 flex-shrink-0" />
                <p>Verified partners who share our commitment to serving pilgrims</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-foreground rounded-full mt-2 flex-shrink-0" />
                <p>Respectful service that honors the spiritual nature of your journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;