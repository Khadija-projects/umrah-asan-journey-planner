import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Train, Clock, MapPin, Info, AlertTriangle } from "lucide-react";

const TrainPage = () => {
  const stations = [
    { name: "Makkah", distance: "0 km", time: "0:00" },
    { name: "Jeddah", distance: "79 km", time: "0:30" },
    { name: "KAIA", distance: "93 km", time: "0:35" },
    { name: "KAEC", distance: "184 km", time: "1:10" },
    { name: "Madinah", distance: "450 km", time: "2:30" }
  ];

  const priceTable = [
    { from: "Makkah", to: "Jeddah", business: "70 SAR", economy: "35 SAR" },
    { from: "Makkah", to: "KAIA", business: "85 SAR", economy: "42 SAR" },
    { from: "Makkah", to: "KAEC", business: "165 SAR", economy: "82 SAR" },
    { from: "Makkah", to: "Madinah", business: "275 SAR", economy: "131 SAR" },
    { from: "Jeddah", to: "KAIA", business: "70 SAR", economy: "35 SAR" },
    { from: "Jeddah", to: "KAEC", business: "95 SAR", economy: "47 SAR" },
    { from: "Jeddah", to: "Madinah", business: "205 SAR", economy: "102 SAR" },
    { from: "KAIA", to: "KAEC", business: "85 SAR", economy: "42 SAR" },
    { from: "KAIA", to: "Madinah", business: "195 SAR", economy: "97 SAR" },
    { from: "KAEC", to: "Madinah", business: "165 SAR", economy: "82 SAR" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Haramain High-Speed Railway
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            High-speed train connecting the holy cities of Makkah and Madinah via Jeddah and King Abdulaziz International Airport
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 text-amber-800">
              <Info className="w-5 h-5" />
              <span className="font-medium">Information Only - We Don't Book Train Tickets</span>
            </div>
            <p className="text-sm text-amber-700 mt-2">
              This information is provided for guidance only. Please book directly through official channels.
            </p>
          </div>
        </div>
      </section>

      {/* Train Route */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Distance Between Stations
          </h2>
          
          {/* Visual Route */}
          <div className="relative mb-12">
            <div className="flex justify-between items-center">
              {stations.map((station, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                    <Train className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-primary">{station.name}</h3>
                  <p className="text-sm text-muted-foreground">{station.distance}</p>
                  <p className="text-xs text-muted-foreground">{station.time}</p>
                </div>
              ))}
            </div>
            <div className="absolute top-8 left-8 right-8 h-0.5 bg-primary/30 -z-10"></div>
          </div>

          {/* Train Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardHeader>
                <Train className="w-8 h-8 text-primary mb-2" />
                <CardTitle>High-Speed Service</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Haramain High-Speed Railway provides a swift and comfortable journey between the holy cities with speeds up to 320 km/h.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Journey Time</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Complete journey from Makkah to Madinah takes approximately 2 hours 30 minutes with stops at Jeddah and KAIA.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MapPin className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Strategic Stations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connects holy cities with King Abdulaziz International Airport, making it convenient for pilgrims and travelers.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-16 px-4 bg-accent/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Official Pricing Guide
          </h2>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Train Fares (SAR)</CardTitle>
              <CardDescription className="text-center">
                Prices are subject to change. Please check official sources for current rates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Route</th>
                      <th className="text-center p-3 font-semibold">Business Class</th>
                      <th className="text-center p-3 font-semibold">Economy Class</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceTable.map((route, index) => (
                      <tr key={index} className="border-b hover:bg-accent/10">
                        <td className="p-3 font-medium">{route.from} → {route.to}</td>
                        <td className="p-3 text-center text-green-600 font-semibold">{route.business}</td>
                        <td className="p-3 text-center text-green-600 font-semibold">{route.economy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <CardTitle className="text-red-800">Important Notice</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-red-700 space-y-3">
                <p>
                  <strong>Booking:</strong> Umrah Asan does not provide train ticket booking services. This information is for guidance purposes only.
                </p>
                <p>
                  <strong>Official Booking:</strong> Please book your tickets through the official Haramain High-Speed Railway website or authorized agents.
                </p>
                <p>
                  <strong>Schedules:</strong> Train schedules and availability may vary during Hajj and Umrah seasons. Please check official sources for current information.
                </p>
                <p>
                  <strong>Alternative:</strong> For reliable transportation between Makkah and Madinah, consider our trusted taxi services available 24/7.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrainPage;