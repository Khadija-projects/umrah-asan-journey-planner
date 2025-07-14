import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  CreditCard, 
  Download, 
  LogOut,
  Upload,
  Clock,
  CheckCircle,
  User
} from "lucide-react";

const GuestDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("umrah_user");
    if (!userData) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.type !== "guest") {
      navigate("/login");
      return;
    }

    setUser(parsedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("umrah_user");
    navigate("/");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const bookings = [
    {
      id: "UMA001",
      type: "Hotel",
      service: "Al Haram Hotel - Deluxe Room",
      dates: "Jan 15-18, 2024",
      amount: "2,400 SAR",
      status: "confirmed",
      paymentStatus: "paid"
    },
    {
      id: "UMA002", 
      type: "Taxi",
      service: "Airport Transfer",
      dates: "Jan 15, 2024",
      amount: "150 SAR",
      status: "pending",
      paymentStatus: "pending",
      expiresIn: "2h 30m"
    },
    {
      id: "UMA003",
      type: "Ziaraat",
      service: "Madinah Holy Sites Tour",
      dates: "Jan 16, 2024",
      amount: "300 SAR", 
      status: "confirmed",
      paymentStatus: "paid"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-orange-300 text-orange-600">Pending Payment</Badge>;
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-primary">My Umrah Journey</h1>
              <Badge variant="secondary">Guest</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user.name}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {bookings.filter(b => b.status === "confirmed").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {bookings.filter(b => b.status === "pending").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Bookings</CardTitle>
                <CardDescription>Manage your hotel, taxi, and ziaraat bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-medium">Booking #{booking.id}</div>
                            <div className="text-sm text-muted-foreground">{booking.type}</div>
                          </div>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                      
                      <div>
                        <div className="font-medium">{booking.service}</div>
                        <div className="text-sm text-muted-foreground">{booking.dates}</div>
                        <div className="text-sm font-medium text-primary">{booking.amount}</div>
                      </div>

                      {booking.status === "pending" && booking.expiresIn && (
                        <div className="bg-orange-50 border border-orange-200 rounded p-3">
                          <div className="flex items-center text-orange-700">
                            <Clock className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">
                              Payment expires in: {booking.expiresIn}
                            </span>
                          </div>
                          <div className="mt-2 flex space-x-2">
                            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                              <Upload className="w-4 h-4 mr-1" />
                              Upload Payment
                            </Button>
                          </div>
                        </div>
                      )}

                      {booking.status === "confirmed" && (
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            Download Voucher
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment History
                </CardTitle>
                <CardDescription>Track all your payments and receipts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.filter(b => b.paymentStatus === "paid").map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Payment for #{booking.id}</div>
                        <div className="text-sm text-muted-foreground">{booking.service}</div>
                        <div className="text-xs text-muted-foreground">Paid on Jan 10, 2024</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{booking.amount}</span>
                        <Badge className="bg-green-100 text-green-800">Paid</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <p className="text-sm text-muted-foreground">Demo Guest</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-muted-foreground">guest@umrahasan.com</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">WhatsApp</label>
                    <p className="text-sm text-muted-foreground">+966 123 456 789</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Preferred Language</label>
                    <p className="text-sm text-muted-foreground">English</p>
                  </div>
                  <Button>Update Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GuestDashboard;