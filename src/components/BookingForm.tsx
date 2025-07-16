import { useState } from "react";
import { Calendar, CalendarDays, MapPin, Star, Users, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const BookingForm = () => {
  const { t } = useLanguage();
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDistance, setSelectedDistance] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [rooms, setRooms] = useState("1");
  const [guests, setGuests] = useState("2");

  const cities = [
    { 
      value: "makkah", 
      label: t('home.bookingForm.makkah'),
      subtitle: "Holy Kaaba"
    },
    { 
      value: "madina", 
      label: t('home.bookingForm.madina'),
      subtitle: "Prophet's Mosque"
    }
  ];

  const categories = [
    { value: "3", label: "3 Star", price: "SAR 150-300" },
    { value: "4", label: "4 Star", price: "SAR 300-500" },
    { value: "5", label: "5 Star", price: "SAR 500+" }
  ];

  const distances = [
    { value: "200", label: "200m from Haram" },
    { value: "500", label: "500m from Haram" },
    { value: "800", label: "800m from Haram" },
    { value: "1000", label: "1km+ from Haram" }
  ];

  const roomTypes = [
    { 
      value: "double", 
      label: t('home.bookingForm.doubleRoom'),
      guests: "2 guests"
    },
    { 
      value: "quad", 
      label: t('home.bookingForm.quadRoom'),
      guests: "4 guests"
    },
    { 
      value: "multi", 
      label: t('home.bookingForm.multiSharing'),
      guests: "up to 8 guests"
    }
  ];

  const handleSearch = () => {
    console.log("Search hotels with:", {
      selectedCity,
      selectedCategory,
      selectedDistance,
      selectedRoomType,
      checkInDate,
      checkOutDate,
      rooms,
      guests
    });
    // TODO: Implement hotel search logic
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('home.bookingForm.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            Find the perfect accommodation for your spiritual journey
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* City Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Destination
                </label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.value} value={city.value}>
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{city.label}</span>
                          <span className="text-xs text-muted-foreground">{city.subtitle}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Hotel Category */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Star className="w-4 h-4 text-golden" />
                  Hotel Category
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{category.label}</span>
                          <span className="text-xs text-muted-foreground">{category.price}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Distance from Haram */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Distance from Haram
                </label>
                <Select value={selectedDistance} onValueChange={setSelectedDistance}>
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Select distance" />
                  </SelectTrigger>
                  <SelectContent>
                    {distances.map((distance) => (
                      <SelectItem key={distance.value} value={distance.value}>
                        {distance.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Room Type */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Bed className="w-4 h-4 text-primary" />
                  Room Type
                </label>
                <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map((roomType) => (
                      <SelectItem key={roomType.value} value={roomType.value}>
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{roomType.label}</span>
                          <span className="text-xs text-muted-foreground">{roomType.guests}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Check-in Date */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  {t('home.bookingForm.checkin')}
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full h-12 px-3 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>

              {/* Check-out Date */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-primary" />
                  {t('home.bookingForm.checkout')}
                </label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full h-12 px-3 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>

              {/* Number of Rooms */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Bed className="w-4 h-4 text-primary" />
                  Rooms
                </label>
                <Select value={rooms} onValueChange={setRooms}>
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Select rooms" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Room" : "Rooms"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Number of Guests */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Guests
                </label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Select guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-8 text-center">
              <Button 
                onClick={handleSearch}
                size="lg"
                className="bg-gradient-holy hover:bg-gradient-holy/90 text-white px-12 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t('home.bookingForm.searchHotels')}
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t('hero.noAdvancePayment')} • {t('hero.instantVoucher')} • {t('hero.support247')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookingForm;