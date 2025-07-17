import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import CRMNavigation from '@/components/CRMNavigation';
import AddHotelForm from '@/components/partner/AddHotelForm';
import RoomManagement from '@/components/partner/RoomManagement';
import AvailabilityCalendar from '@/components/partner/AvailabilityCalendar';
import AccountingView from '@/components/partner/AccountingView';
import { Building2, CreditCard, Calendar, TrendingUp, Plus, Users, Settings, Bell, DollarSign, BarChart3 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
  booking_status: string;
  guest_name: string;
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
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddHotelOpen, setIsAddHotelOpen] = useState(false);

  const fetchData = async () => {
    if (!profile?.id) return;

    try {
      // Fetch partner hotels
      const { data: hotelsData, error: hotelsError } = await supabase
        .from('hotels')
        .select('*')
        .eq('partner_id', profile.id)
        .order('created_at', { ascending: false });

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
            hotels(name),
            profiles(full_name)
          `)
          .in('hotel_id', hotelIds)
          .order('created_at', { ascending: false });

        if (bookingsError) {
          console.error('Error fetching bookings:', bookingsError);
        } else {
          const processedBookings = (bookingsData || []).map(booking => ({
            ...booking,
            guest_name: (booking.profiles as any)?.full_name || 'Unknown Guest',
          }));
          
          setBookings(processedBookings);
          
          // Calculate stats
          const totalRevenue = processedBookings.reduce((sum, booking) => sum + Number(booking.total_amount), 0);
          const pendingBookings = processedBookings.filter(booking => booking.payment_status === 'pending').length;
          
          setStats({
            totalHotels: hotelsData?.length || 0,
            totalBookings: processedBookings.length,
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

  useEffect(() => {
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

  const handleAddHotelSuccess = () => {
    setIsAddHotelOpen(false);
    fetchData(); // Refresh data
  };

  const handleManageRooms = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setActiveTab('rooms');
  };

  const handleManageCalendar = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setActiveTab('calendar');
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
      <CRMNavigation title="Partner Portal" />
      
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name || 'Partner'}</h1>
          <p className="text-muted-foreground">Manage your hotels, rooms, and bookings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="hotels" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Hotels
            </TabsTrigger>
            <TabsTrigger value="rooms" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Rooms
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="accounting" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Accounting
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Hotels</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalHotels}</div>
                  <p className="text-xs text-muted-foreground">Active properties</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalBookings}</div>
                  <p className="text-xs text-muted-foreground">All time bookings</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
                  <Bell className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{stats.pendingBookings}</div>
                  <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">SAR {stats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">All time earnings</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Dialog open={isAddHotelOpen} onOpenChange={setIsAddHotelOpen}>
                    <DialogTrigger asChild>
                      <Button className="h-20 flex flex-col gap-2">
                        <Plus className="w-6 h-6" />
                        Add New Hotel
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Add New Hotel</DialogTitle>
                      </DialogHeader>
                      <AddHotelForm 
                        onSuccess={handleAddHotelSuccess}
                        onCancel={() => setIsAddHotelOpen(false)}
                      />
                    </DialogContent>
                  </Dialog>

                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setActiveTab('bookings')}
                  >
                    <Bell className="w-6 h-6" />
                    View Bookings
                  </Button>

                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setActiveTab('accounting')}
                  >
                    <DollarSign className="w-6 h-6" />
                    View Payments
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Latest booking activity for your hotels</CardDescription>
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
                              #{booking.booking_reference} • {booking.guest_name} • {booking.num_guests} guests
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
          </TabsContent>

          {/* Hotels Tab */}
          <TabsContent value="hotels" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Hotel Management</h2>
                <p className="text-muted-foreground">Add and manage your hotel listings</p>
              </div>
              <Dialog open={isAddHotelOpen} onOpenChange={setIsAddHotelOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Hotel
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Hotel</DialogTitle>
                  </DialogHeader>
                  <AddHotelForm 
                    onSuccess={handleAddHotelSuccess}
                    onCancel={() => setIsAddHotelOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {hotels.length === 0 ? (
              <Card>
                <CardContent className="text-center py-16">
                  <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No hotels listed yet</h3>
                  <p className="text-muted-foreground mb-6">Add your first hotel to start receiving bookings</p>
                  <Button onClick={() => setIsAddHotelOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Hotel
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {hotels.map((hotel) => (
                  <Card key={hotel.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{hotel.name}</CardTitle>
                          <CardDescription>
                            {hotel.city} • {hotel.category} Star • {hotel.distance_from_haram}m from Haram
                          </CardDescription>
                        </div>
                        <Badge variant={hotel.is_active ? "default" : "secondary"}>
                          {hotel.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleManageRooms(hotel)}
                        >
                          <Users className="w-4 h-4 mr-1" />
                          Manage Rooms
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleManageCalendar(hotel)}
                        >
                          <Calendar className="w-4 h-4 mr-1" />
                          Availability
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="w-4 h-4 mr-1" />
                          Edit Hotel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Rooms Tab */}
          <TabsContent value="rooms" className="space-y-6">
            {selectedHotel ? (
              <RoomManagement 
                hotelId={selectedHotel.id} 
                hotelName={selectedHotel.name}
              />
            ) : (
              <Card>
                <CardContent className="text-center py-16">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Select a hotel to manage rooms</h3>
                  <p className="text-muted-foreground">Choose a hotel from the Hotels tab to manage its room types and pricing</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            {selectedHotel ? (
              <AvailabilityCalendar 
                hotelId={selectedHotel.id} 
                hotelName={selectedHotel.name}
              />
            ) : (
              <Card>
                <CardContent className="text-center py-16">
                  <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Select a hotel to manage availability</h3>
                  <p className="text-muted-foreground">Choose a hotel from the Hotels tab to manage its availability calendar</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Booking Management</h2>
              <p className="text-muted-foreground">View and manage all bookings for your hotels</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>Complete list of bookings for your properties</CardDescription>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No bookings found</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Booking Reference</TableHead>
                        <TableHead>Guest</TableHead>
                        <TableHead>Hotel</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead>Guests</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">#{booking.booking_reference}</TableCell>
                          <TableCell>{booking.guest_name}</TableCell>
                          <TableCell>{booking.hotels.name}</TableCell>
                          <TableCell>
                            {new Date(booking.check_in_date).toLocaleDateString()} - {new Date(booking.check_out_date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{booking.num_guests}</TableCell>
                          <TableCell>SAR {booking.total_amount}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(booking.payment_status)}>
                              {booking.payment_status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accounting Tab */}
          <TabsContent value="accounting" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Accounting & Payments</h2>
              <p className="text-muted-foreground">Track your revenue and payment status</p>
            </div>
            <AccountingView />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PartnerDashboard;