import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import CRMNavigation from '@/components/CRMNavigation';
import { Building2, CreditCard, Calendar, TrendingUp, Plus } from 'lucide-react';

interface PartnerStats {
  totalHotels: number;
  totalBookings: number;
  totalRevenue: number;
  pendingBookings: number;
}

interface Hotel {
  id: string;
  name: string;
  city: string;
  category: number;
  distance_from_haram: number;
  is_active: boolean;
}

interface Booking {
  id: string;
  booking_reference: string;
  check_in_date: string;
  check_out_date: string;
  num_guests: number;
  total_amount: number;
  payment_status: string;
  hotels: {
    name: string;
  };
}

const PartnerDashboard = () => {
  const { profile } = useAuth();
  const [stats, setStats] = useState<PartnerStats>({
    totalHotels: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingBookings: 0
  });
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!profile?.id) return;

      try {
        // Fetch partner hotels
        const { data: hotelsData, error: hotelsError } = await supabase
          .from('hotels')
          .select('*')
          .eq('partner_id', profile.id);

        if (hotelsError) {
          console.error('Error fetching hotels:', hotelsError);
          return;
        }

        setHotels(hotelsData || []);

        // Fetch bookings for partner hotels
        const hotelIds = hotelsData?.map(hotel => hotel.id) || [];
        
        if (hotelIds.length > 0) {
          const { data: bookingsData, error: bookingsError } = await supabase
            .from('bookings')
            .select(`
              *,
              hotels(name)
            `)
            .in('hotel_id', hotelIds)
            .order('created_at', { ascending: false });

          if (bookingsError) {
            console.error('Error fetching bookings:', bookingsError);
          } else {
            setBookings(bookingsData || []);
            
            // Calculate stats
            const totalRevenue = bookingsData?.reduce((sum, booking) => sum + Number(booking.total_amount), 0) || 0;
            const pendingBookings = bookingsData?.filter(booking => booking.payment_status === 'pending').length || 0;
            
            setStats({
              totalHotels: hotelsData?.length || 0,
              totalBookings: bookingsData?.length || 0,
              totalRevenue,
              pendingBookings
            });
          }
        } else {
          setStats({
            totalHotels: 0,
            totalBookings: 0,
            totalRevenue: 0,
            pendingBookings: 0
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <CRMNavigation title="Partner Dashboard" />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CRMNavigation title="Partner Dashboard" />
      
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <p className="text-muted-foreground">Manage your hotels and bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hotels</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalHotels}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingBookings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">SAR {stats.totalRevenue}</div>
            </CardContent>
          </Card>
        </div>

        {/* Hotels Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Your Hotels
                  </CardTitle>
                  <CardDescription>Manage your property listings</CardDescription>
                </div>
                <Button size="sm" className="flex items-center gap-1">
                  <Plus className="w-4 h-4" />
                  Add Hotel
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {hotels.length === 0 ? (
                <div className="text-center py-8">
                  <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No hotels listed yet</p>
                  <Button>Add Your First Hotel</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {hotels.map((hotel) => (
                    <div key={hotel.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{hotel.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {hotel.city} • {hotel.category} Star • {hotel.distance_from_haram}m from Haram
                          </p>
                        </div>
                        <Badge variant={hotel.is_active ? "default" : "secondary"}>
                          {hotel.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">Rooms</Button>
                        <Button size="sm" variant="outline">Bookings</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Recent Bookings
              </CardTitle>
              <CardDescription>Latest bookings for your hotels</CardDescription>
            </CardHeader>
            <CardContent>
              {bookings.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No bookings yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.slice(0, 5).map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-medium">{booking.hotels.name}</h5>
                          <p className="text-sm text-muted-foreground">
                            #{booking.booking_reference} • {booking.num_guests} guests
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(booking.check_in_date).toLocaleDateString()} - {new Date(booking.check_out_date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(booking.payment_status)}>
                            {booking.payment_status}
                          </Badge>
                          <p className="text-sm font-medium mt-1">SAR {booking.total_amount}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;