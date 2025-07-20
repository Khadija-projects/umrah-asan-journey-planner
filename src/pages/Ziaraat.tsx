import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Users } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const Ziaraat = () => {
  const { t } = useLanguage();
  
  const ziaraatSites = [
    {
      name: "Masjid Quba",
      city: "Madinah",
      distance: "3 km",
      details: "Masjid Quba holds the honor of being the first mosque ever built in Islam. When Prophet Muhammad (peace be upon him) migrated from Makkah to Madinah (the Hijrah), he stopped in the area of Quba, a small village at the time. There, he personally laid the foundation stone of this mosque with his own blessed hands. The Prophet (peace be upon him) would often visit Masjid Quba every Saturday, either walking or riding, and would encourage his companions to do so.

Virtue & Hadith:
The virtue of Masjid Quba is clearly mentioned in authentic Hadith. The Prophet (peace be upon him) said:

“Whoever purifies himself in his house, then comes to Masjid Quba and prays in it, he will have a reward like that of Umrah.”
— (Ibn Majah, Book 5, Hadith 1404; Tirmidhi 3234)

Another narration from Sahih Bukhari states that the Prophet (peace be upon him) used to visit Masjid Quba every Saturday to pray two Rak‘ahs.

Importance for Pilgrims:
Praying in Masjid Quba is an easy and beautiful Sunnah. Visitors are encouraged to perform Wudu (ablution) at their accommodation or nearby, then visit Masjid Quba to pray two Rak‘ahs of Nafl prayer and make Dua for acceptance.

Visitor Tips:

The mosque is open to everyone — men and women have designated areas.

Try to visit during early morning hours when it is less crowded and peaceful.

Keep the sanctity of the place in mind: maintain silence, dress modestly, and respect local customs.

Reminder:
Visiting Masjid Quba is not an obligatory ritual of Hajj or Umrah, but a beautiful Sunnah that brings great reward..",
   
    },
    {
      name: "Masjid Qiblatain",
      city: "Madinah", 
      distance: "7 km",
      details: "Where Qibla changed during prayer from Jerusalem to Makkah.",
    },
    {
      name: "Jannat ul Baqi",
      city: "Madinah",
      distance: "500 m",
      details: "Resting place of Prophet's family & Sahaba. Blessing cemetery.",
    },
    {
      name: "Mount Uhud",
      city: "Madinah",
      distance: "5 km", 
      details: "Battle of Uhud site. Mountain that loves us and we love it.",
    },
    {
      name: "Cave Hira",
      city: "Makkah",
      distance: "5 km",
      details: "Where first revelation was sent to Prophet Muhammad ﷺ.",
    },
    {
      name: "Cave Thawr",
      city: "Makkah",
      distance: "7 km",
      details: "Hideout during Hijrah. Protected by Allah's miracle.",
    },
    {
      name: "Jannat al-Mu'alla",
      city: "Makkah", 
      distance: "2 km",
      details: "Family cemetery. Resting place of Prophet's first wife Khadijah RA.",
    },
    {
      name: "Mina",
      city: "Makkah",
      distance: "8 km",
      details: "Ritual site for Hajj. Valley of sacrifice and remembrance.",
    },
    {
      name: "Arafat",
      city: "Makkah",
      distance: "20 km",
      details: "Main standing place for Hajj. Where sins are forgiven.",
    },
    {
      name: "Muzdalifah", 
      city: "Makkah",
      distance: "15 km",
      details: "Pebble collection for Jamaraat. Blessing overnight stay.",
    },
  ];

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ziaraatSites.map((site, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-primary">{site.name}</CardTitle>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{site.city}</span>
                        </span>
                        <span>{site.distance}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{site.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
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