import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Download, Calendar, MapPin, Users, CreditCard } from 'lucide-react';

interface Booking {
  id: string;
  booking_reference: string;
  check_in_date: string;
  check_out_date: string;
  num_guests: number;
  num_rooms: number;
  total_amount: number;
  payment_status: string;
  voucher_url: string | null;
  hotels: {
    name: string;
    city: string;
  };
  rooms: {
    room_type: string;
  };
}

const GuestDashboard = () => {
  const { user, profile } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!profile?.id) return;

      try {
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            hotels(name, city),
            rooms(room_type)
          `)
          .eq('guest_id', profile.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching bookings:', error);
        } else {
          setBookings(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [profile?.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading your bookings...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Welcome, {profile?.full_name}</h1>
          <p className="text-muted-foreground">Manage your Umrah bookings and download vouchers</p>
        </div>

        {bookings.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
              <p className="text-muted-foreground mb-4">Start planning your Umrah journey today!</p>
              <Button>Book Your Stay</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        {booking.hotels.name}
                      </CardTitle>
                      <CardDescription>
                        {booking.hotels.city} • Booking #{booking.booking_reference}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(booking.payment_status)}>
                      {booking.payment_status.charAt(0).toUpperCase() + booking.payment_status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Check-in</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.check_in_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Check-out</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.check_out_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{booking.num_rooms} Room(s)</p>
                        <p className="text-sm text-muted-foreground">{booking.num_guests} Guests</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Total Amount</p>
                        <p className="text-sm text-muted-foreground">SAR {booking.total_amount}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-sm font-medium">{booking.rooms.room_type}</p>
                      <p className="text-sm text-muted-foreground">
                        {calculateNights(booking.check_in_date, booking.check_out_date)} nights
                      </p>
                    </div>
                    {booking.voucher_url && (
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download Voucher
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default GuestDashboard;