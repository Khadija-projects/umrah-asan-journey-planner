import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Download, CheckCircle, Circle, MapPin, Book, Plane, Heart, Clock } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const UmrahGuide = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Fetch Umrah guide steps from Supabase
  const { data: umrahSteps, isLoading } = useQuery({
    queryKey: ["umrah-guide-steps"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("umrah_guide_steps")
        .select("*")
        .eq("is_active", true)
        .order("step_number", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const handleCheck = (item: string) => {
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const generatePDF = () => {
    // In a real application, you would use a library like jsPDF or similar
    alert("PDF download functionality will be implemented with a proper PDF library");
  };

  const checklistSections = [
    {
      title: "1. Travel Documents",
      items: [
        "Passport (valid for at least 6 months)",
        "Umrah Visa (if required)",
        "Flight Tickets (printed and digital copies)",
        "Hotel Booking Confirmations",
        "Vaccination Certificates (if required)",
        "Travel Insurance (with health coverage)",
        "Emergency Contact Information",
        "Copies of Important Documents",
        "Passport-Sized Photos"
      ]
    },
    {
      title: "2. Ihram Essentials",
      items: [
        "Ihram Clothing (2 sets for men: 2 unstitched white sheets)",
        "Ihram Belt (to secure the lower garment)",
        "Safety Pins (to secure Ihram clothing)",
        "Travel-Sized Iron (optional)",
        "Unscented Soap/Shampoo (for Ihram preparation)",
        "Unscented Wet Wipes (for purification)"
      ]
    },
    {
      title: "3. Prayer Essentials",
      items: [
        "Pocket Quran (with translation if needed)",
        "Dua Book (with Umrah-specific supplications)",
        "Tasbih (prayer beads) or digital counter",
        "Prayer Mat (lightweight and foldable)",
        "Compass or Qibla Finder App",
        "Hijab/Scarf (for women, in neutral colors)",
        "Prayer Outfits (modest and comfortable clothing)"
      ]
    },
    {
      title: "4. Personal Hygiene Items",
      items: [
        "Toothbrush and Miswak",
        "Unscented Deodorant",
        "Unscented Lotion/Moisturizer",
        "Travel-Sized Unscented Soap and Shampoo",
        "Nail Clippers (to trim nails before Ihram)",
        "Comb or Hairbrush",
        "Feminine Hygiene Products (if needed)",
        "Disposable Underwear"
      ]
    },
    {
      title: "5. Clothing",
      items: [
        "Comfortable Undergarments",
        "Modest Clothing (loose-fitting and lightweight)",
        "Comfortable Footwear (slip-on sandals)",
        "Socks (for cooler weather)",
        "Jacket or Shawl (for cooler evenings)",
        "Sleepwear (modest and comfortable)"
      ]
    },
    {
      title: "6. Health and Wellness",
      items: [
        "Prescription Medications",
        "Basic First Aid Kit",
        "Pain Relievers",
        "Vitamins or Supplements",
        "Rehydration Sachets",
        "Hand Sanitizer (unscented)",
        "Face Masks (if required)",
        "Sunscreen (unscented)"
      ]
    },
    {
      title: "7. Travel Comfort",
      items: [
        "Neck Pillow (for long flights)",
        "Eye Mask and Earplugs",
        "Reusable Water Bottle",
        "Snacks (dates, nuts, energy bars)",
        "Portable Charger/Power Bank",
        "Universal Travel Adapter",
        "Luggage Locks",
        "Laundry Bag"
      ]
    },
    {
      title: "8. Spiritual Preparation",
      items: [
        "List of Duas and Intentions",
        "Journal or Notebook",
        "Charity Money (for Sadaqah)",
        "Patience and Gratitude mindset"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Complete Umrah Guide & Checklist
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Prepare for Your Spiritual Journey 🕋
          </p>
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 text-left max-w-3xl mx-auto">
            <p className="text-muted-foreground mb-4">
              Embarking on Umrah is a deeply spiritual and life-changing experience. Preparing yourself mentally and educating yourself about what Umrah is and how to perform it is very important.
            </p>
            <p className="text-muted-foreground">
              To ensure your journey is smooth and stress-free, we've created this step-by-step guideline and checklist with all the essentials you'll need. From the meaning of Umrah to important documents, personal care items and religious necessities, this list will help you stay organized and focused on your worship.
            </p>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8 px-4 bg-amber-50 border-y border-amber-200">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">Important Information!</h3>
          <div className="text-sm text-amber-700 space-y-2">
            <p>
              <strong>Documents:</strong> Ensure your passport is valid for minimum 6 months, have your Umrah eVisa, flight tickets, and hotel reservations. Keep copies and store them on cloud storage for emergencies.
            </p>
            <p>
              <strong>Money:</strong> Carry Saudi Riyals and an international debit/credit card (enable international usage). Consider eSim for data and WhatsApp calling.
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic Umrah Guide Steps */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-primary">Step-by-Step Umrah Guide</h2>
            <Button onClick={generatePDF} className="bg-green-600 hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading guide steps...</p>
            </div>
          ) : (
            <div className="space-y-8">
              {umrahSteps?.map((step, index) => (
                <Card key={step.id} className="overflow-hidden">
                  <CardHeader className="bg-primary/5">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        Step {step.step_number}: {step.title}
                      </CardTitle>
                      {step.duration_estimate && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 mr-1" />
                          {step.duration_estimate}
                        </div>
                      )}
                    </div>
                    {step.short_description && (
                      <CardDescription>{step.short_description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="p-6">
                    {step.featured_image_url && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img 
                          src={step.featured_image_url} 
                          alt={step.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="prose prose-sm max-w-none mb-4">
                      <div dangerouslySetInnerHTML={{ __html: step.content }} />
                    </div>

                    {step.important_notes && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-amber-800 mb-2">Important Notes:</h4>
                        <div className="text-sm text-amber-700" dangerouslySetInnerHTML={{ __html: step.important_notes }} />
                      </div>
                    )}

                    {step.common_mistakes && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="font-semibold text-red-800 mb-2">Common Mistakes to Avoid:</h4>
                        <div className="text-sm text-red-700" dangerouslySetInnerHTML={{ __html: step.common_mistakes }} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Checklist */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-primary mb-6">Interactive Umrah Checklist</h3>
            <div className="space-y-8">
              {checklistSections.map((section, sectionIndex) => (
                <Card key={sectionIndex} className="overflow-hidden">
                  <CardHeader className="bg-primary/5">
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {section.items.map((item, itemIndex) => {
                        const itemKey = `${sectionIndex}-${itemIndex}`;
                        const isChecked = checkedItems[itemKey];
                        
                        return (
                          <div 
                            key={itemIndex} 
                            className="flex items-center space-x-3 p-2 rounded hover:bg-accent/50 cursor-pointer transition-colors"
                            onClick={() => handleCheck(itemKey)}
                          >
                            <div className="flex-shrink-0">
                              {isChecked ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <Circle className="w-5 h-5 text-muted-foreground" />
                              )}
                            </div>
                            <span className={`${isChecked ? 'line-through text-muted-foreground' : 'text-foreground'} transition-colors`}>
                              {item}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tips */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">Packing Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-blue-700 space-y-2 text-sm">
                <li>• Pack light and prioritize essentials</li>
                <li>• Use packing cubes to organize your luggage</li>
                <li>• Keep Ihram clothing and travel documents in carry-on</li>
                <li>• Label your luggage with name and contact information</li>
              </ul>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Ready to Book Your Umrah Journey?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Let Umrah Asan help you with trusted hotels, reliable taxis, and expert ziaraat guidance
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="default" size="lg">
                    <MapPin className="w-4 h-4 mr-2" />
                    Book Hotels
                  </Button>
                  <Button variant="outline" size="lg">
                    <Plane className="w-4 h-4 mr-2" />
                    Book Taxi
                  </Button>
                  <Button variant="gold" size="lg">
                    <Heart className="w-4 h-4 mr-2" />
                    Explore Ziaraat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UmrahGuide;