import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Users } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Ziaraat = () => {
  const { t } = useLanguage();
  
  // Fetch ziaraat locations from Supabase
  const { data: ziaraatSites, isLoading } = useQuery({
    queryKey: ["ziaraat-locations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ziaraat_locations")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {t('ziaraat.title')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {t('ziaraat.subtitle')}
          </p>
          <Button variant="holy" size="xl">
            Book Ziaraat Tour Now
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Expert Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Verified local guides with deep knowledge of Islamic history and blessing sites.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>All Blessing Sites</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Complete coverage of blessed locations in both Makkah and Madinah.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Flexible Timing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Tours scheduled around prayer times with comfortable transportation.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ziaraat Sites Table */}
      <section className="py-16 px-4 bg-accent/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Blessing Sites & Holy Places
          </h2>
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading locations...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ziaraatSites?.map((site) => (
                <Card key={site.id} className="hover:shadow-card transition-all duration-300">
                  <CardHeader>
                    {site.featured_image_url && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img 
                          src={site.featured_image_url} 
                          alt={site.name}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-primary">{site.name}</CardTitle>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{site.city}</span>
                          </span>
                          {site.distance_from_haram && (
                            <span>{site.distance_from_haram} km from Haram</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{site.description}</p>
                    {site.historical_significance && (
                      <p className="text-xs text-blue-600 font-medium">
                        Historical Significance: {site.historical_significance}
                      </p>
                    )}
                    {site.visiting_hours && (
                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <Clock className="w-3 h-3 mr-1" />
                        {site.visiting_hours}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready for Your Blessing Journey?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Book your Ziaraat tour with verified guides and comfortable transportation. 
            Female-friendly options available.
          </p>
          <div className="space-y-4">
            <Button variant="gold" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Book Complete Ziaraat Package
            </Button>
            <p className="text-sm text-primary-foreground/80">
              Same bank transfer payment policy applies - pay within 4 hours to confirm booking
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ziaraat;