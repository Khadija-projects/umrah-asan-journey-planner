import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { ContentManagement } from "@/components/admin/ContentManagement";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Users, Building2, UserCheck, CreditCard, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';

interface DashboardStats {
  totalBookings: number;
  totalHotels: number;
  pendingRegistrations: number;
  totalRevenue: number;
  bookingLeads: number;
  pendingPayments: number;
}

interface PartnerRegistration {
  id: string;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
}

interface BookingLead {
  id: string;
  booking_reference: string;
  booking_status: string;
  payment_status: string;
  total_amount: number;
  lead_created_at: string;
  voucher_expiry: string;
  payment_receipt_url: string | null;
  profiles: {
    full_name: string;
    email: string;
  };
}

const AdminDashboard = () => {
  const { profile } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    totalHotels: 0,
    pendingRegistrations: 0,
    totalRevenue: 0,
    bookingLeads: 0,
    pendingPayments: 0
  });
  const [registrations, setRegistrations] = useState<PartnerRegistration[]>([]);
  const [bookingLeads, setBookingLeads] = useState<BookingLead[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Get current tab from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const currentTab = urlParams.get('tab') || 'dashboard';
  const currentSection = urlParams.get('section') || 'blogs';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stats and data
        const [bookingsRes, hotelsRes, registrationsRes, leadsRes] = await Promise.all([
          supabase.from('bookings').select('total_amount, booking_status, payment_status'),
          supabase.from('hotels').select('id'),
          supabase.from('partner_registrations').select('*').order('created_at', { ascending: false }),
          supabase
            .from('bookings')
            .select(`
              id, booking_reference, booking_status, payment_status, total_amount, 
              lead_created_at, voucher_expiry, payment_receipt_url,
              profiles!guest_id(full_name, email)
            `)
            .eq('booking_status', 'lead')
            .order('lead_created_at', { ascending: false })
        ]);

        const totalBookings = bookingsRes.data?.length || 0;
        const totalHotels = hotelsRes.data?.length || 0;
        const totalRevenue = bookingsRes.data?.reduce((sum, booking) => sum + Number(booking.total_amount), 0) || 0;
        const pendingRegistrations = registrationsRes.data?.filter(reg => reg.status === 'pending').length || 0;
        const bookingLeads = leadsRes.data?.length || 0;
        const pendingPayments = bookingsRes.data?.filter(booking => booking.payment_status === 'pending').length || 0;

        setStats({
          totalBookings,
          totalHotels,
          pendingRegistrations,
          totalRevenue,
          bookingLeads,
          pendingPayments
        });

        setRegistrations(registrationsRes.data || []);
        setBookingLeads(leadsRes.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateRegistrationStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('partner_registrations')
        .update({ 
          status,
          approved_at: status === 'approved' ? new Date().toISOString() : null,
          approved_by: profile?.id
        })
        .eq('id', id);

      if (error) {
        console.error('Error updating registration:', error);
        return;
      }

      // Update local state
      setRegistrations(prev => 
        prev.map(reg => 
          reg.id === id ? { ...reg, status } : reg
        )
      );

      // Update stats
      if (status === 'approved') {
        setStats(prev => ({ ...prev, pendingRegistrations: prev.pendingRegistrations - 1 }));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AdminSidebar />
          <div className="flex-1">
            <header className="h-12 flex items-center border-b bg-background">
              <SidebarTrigger className="ml-2" />
              <h1 className="ml-4 text-lg font-semibold">Admin Dashboard</h1>
            </header>
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  const renderContent = () => {
    switch (currentTab) {
      case 'content':
        return <ContentManagement />;
      case 'registrations':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Partner Registrations</h2>
            {registrations.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No partner registrations yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {registrations.map((registration) => (
                  <Card key={registration.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">{registration.company_name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Contact: {registration.contact_person}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {registration.email} • {registration.phone}
                          </p>
                        </div>
                        <Badge className={getStatusColor(registration.status)}>
                          {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                        </Badge>
                      </div>
                      
                      {registration.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => updateRegistrationStatus(registration.id, 'approved')}
                            className="flex items-center gap-1"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => updateRegistrationStatus(registration.id, 'rejected')}
                            className="flex items-center gap-1"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );
      case 'leads':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Booking Leads & Payments</h2>
            {bookingLeads.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No booking leads yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookingLeads.map((lead) => (
                  <Card key={lead.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">#{lead.booking_reference}</h4>
                          <p className="text-sm text-muted-foreground">
                            Guest: {lead.profiles?.full_name} ({lead.profiles?.email})
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Amount: SAR {lead.total_amount}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Expires: {new Date(lead.voucher_expiry).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(lead.payment_status)}>
                            {lead.payment_status}
                          </Badge>
                          {lead.payment_receipt_url && (
                            <p className="text-xs text-green-600 mt-1">Receipt uploaded</p>
                          )}
                        </div>
                      </div>
                      
                      {lead.payment_receipt_url && lead.payment_status === 'pending' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => {/* Verify payment */}}
                            className="flex items-center gap-1"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Verify Payment
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => window.open(lead.payment_receipt_url!, '_blank')}
                          >
                            View Receipt
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Admin Dashboard</h2>
              <p className="text-muted-foreground">Overview of your website and business metrics</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalBookings}</div>
                </CardContent>
              </Card>

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
                  <CardTitle className="text-sm font-medium">Booking Leads</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.bookingLeads}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Registrations</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingRegistrations}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingPayments}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">SAR {stats.totalRevenue}</div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your website content and business operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start" asChild>
                    <a href="/admin-dashboard?tab=content">
                      <FileText className="w-6 h-6 mb-2" />
                      <span className="font-medium">Manage Content</span>
                      <span className="text-xs text-muted-foreground">Update website pages and content</span>
                    </a>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start" asChild>
                    <a href="/admin-dashboard?tab=registrations">
                      <UserCheck className="w-6 h-6 mb-2" />
                      <span className="font-medium">Partner Approvals</span>
                      <span className="text-xs text-muted-foreground">{stats.pendingRegistrations} pending</span>
                    </a>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start" asChild>
                    <a href="/admin-dashboard?tab=leads">
                      <Clock className="w-6 h-6 mb-2" />
                      <span className="font-medium">Payment Verification</span>
                      <span className="text-xs text-muted-foreground">{stats.bookingLeads} booking leads</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1">
          <header className="h-12 flex items-center border-b bg-background">
            <SidebarTrigger className="ml-2" />
            <h1 className="ml-4 text-lg font-semibold">Admin Dashboard</h1>
          </header>
          <main className="p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;