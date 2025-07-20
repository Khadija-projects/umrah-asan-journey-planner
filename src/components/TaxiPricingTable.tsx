
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TaxiBookingForm from "./TaxiBookingForm";

interface RoutePrice {
  route: string;
  from: string;
  to: string;
  camry: number;
  staria: number;
  gmc: number;
  hiace: number;
}

const TaxiPricingTable = () => {
  const [selectedRoute, setSelectedRoute] = useState<{
    from: string;
    to: string;
    vehicle: string;
    price: number;
  } | null>(null);
  
  const [showBookingForm, setShowBookingForm] = useState(false);

  const routes: RoutePrice[] = [
    {
      route: "Jeddah Airport to Makkah Hotel",
      from: "Jeddah Airport",
      to: "Makkah Hotel",
      camry: 200,
      staria: 250,
      gmc: 350,
      hiace: 300
    },
    {
      route: "Makkah Hotel to Makkah Ziyarah",
      from: "Makkah Hotel",
      to: "Makkah Ziyarah",
      camry: 150,
      staria: 200,
      gmc: 300,
      hiace: 250
    },
    {
      route: "Makkah Hotel to Madinah Hotel",
      from: "Makkah Hotel",
      to: "Madinah Hotel",
      camry: 500,
      staria: 700,
      gmc: 1200,
      hiace: 800
    },
    {
      route: "Madinah Hotel to Madinah Ziyarah",
      from: "Madinah Hotel",
      to: "Madinah Ziyarah",
      camry: 150,
      staria: 200,
      gmc: 300,
      hiace: 250
    },
    {
      route: "Makkah Hotel to Taif & Return",
      from: "Makkah Hotel",
      to: "Taif & Return",
      camry: 400,
      staria: 500,
      gmc: 800,
      hiace: 600
    },
    {
      route: "Makkah Hotel to Jeddah Airport",
      from: "Makkah Hotel",
      to: "Jeddah Airport",
      camry: 200,
      staria: 250,
      gmc: 350,
      hiace: 300
    },
    {
      route: "Jeddah Airport to Madinah Hotel",
      from: "Jeddah Airport",
      to: "Madinah Hotel",
      camry: 600,
      staria: 800,
      gmc: 1300,
      hiace: 900
    },
    {
      route: "Madinah Airport to Madinah Hotel",
      from: "Madinah Airport",
      to: "Madinah Hotel",
      camry: 150,
      staria: 200,
      gmc: 300,
      hiace: 250
    },
    {
      route: "Madinah Hotel to Jeddah Airport",
      from: "Madinah Hotel",
      to: "Jeddah Airport",
      camry: 600,
      staria: 800,
      gmc: 1300,
      hiace: 900
    },
    {
      route: "Madinah Hotel to Makkah Hotel",
      from: "Madinah Hotel",
      to: "Makkah Hotel",
      camry: 500,
      staria: 700,
      gmc: 1200,
      hiace: 800
    },
    {
      route: "Madinah Hotel to Madinah Airport",
      from: "Madinah Hotel",
      to: "Madinah Airport",
      camry: 150,
      staria: 200,
      gmc: 300,
      hiace: 250
    },
    {
      route: "Makkah Hotel to Makkah Train Station",
      from: "Makkah Hotel",
      to: "Makkah Train Station",
      camry: 150,
      staria: 200,
      gmc: 300,
      hiace: 250
    },
    {
      route: "Makkah Train Station to Makkah Hotel",
      from: "Makkah Train Station",
      to: "Makkah Hotel",
      camry: 200,
      staria: 250,
      gmc: 350,
      hiace: 300
    },
    {
      route: "Madinah Train Station to Madinah Hotel",
      from: "Madinah Train Station",
      to: "Madinah Hotel",
      camry: 150,
      staria: 200,
      gmc: 300,
      hiace: 250
    },
    {
      route: "Madinah Hotel to Madinah Train Station",
      from: "Madinah Hotel",
      to: "Madinah Train Station",
      camry: 150,
      staria: 200,
      gmc: 300,
      hiace: 250
    }
  ];

  const handleBookRoute = (route: RoutePrice, vehicle: string, price: number) => {
    setSelectedRoute({
      from: route.from,
      to: route.to,
      vehicle: vehicle,
      price: price
    });
    setShowBookingForm(true);
  };

  const PriceButton = ({ price, vehicle, route }: { price: number; vehicle: string; route: RoutePrice }) => (
    <Button
      variant="ghost"
      className="h-auto p-2 hover:bg-primary/10 hover:text-primary transition-colors"
      onClick={() => handleBookRoute(route, vehicle, price)}
    >
      <span className="font-semibold">{price}</span>
    </Button>
  );

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary text-center">
            Taxi Routes & Pricing
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Click on any price to book that specific route and vehicle
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-white font-semibold">Route</TableHead>
                  <TableHead className="text-white font-semibold text-center">Camry</TableHead>
                  <TableHead className="text-white font-semibold text-center">Staria</TableHead>
                  <TableHead className="text-white font-semibold text-center">GMC</TableHead>
                  <TableHead className="text-white font-semibold text-center">Hiace</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routes.map((route, index) => (
                  <TableRow 
                    key={index} 
                    className={index % 2 === 0 ? "bg-golden/10" : "bg-white"}
                  >
                    <TableCell className="font-medium text-primary">
                      {route.route}
                    </TableCell>
                    <TableCell className="text-center">
                      <PriceButton price={route.camry} vehicle="Camry" route={route} />
                    </TableCell>
                    <TableCell className="text-center">
                      <PriceButton price={route.staria} vehicle="Staria" route={route} />
                    </TableCell>
                    <TableCell className="text-center">
                      <PriceButton price={route.gmc} vehicle="GMC" route={route} />
                    </TableCell>
                    <TableCell className="text-center">
                      <PriceButton price={route.hiace} vehicle="Hiace" route={route} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              * All prices are in Saudi Riyals (SAR)
            </p>
            <p className="text-sm text-muted-foreground">
              * Final prices may vary based on traffic conditions and specific pickup/drop-off locations
            </p>
          </div>
        </CardContent>
      </Card>

      <TaxiBookingForm
        isOpen={showBookingForm}
        onClose={() => setShowBookingForm(false)}
        route={selectedRoute}
      />
    </>
  );
};

export default TaxiPricingTable;
