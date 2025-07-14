import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Hotel, 
  Car, 
  MapPin, 
  CreditCard, 
  Settings,
  LogOut,
  TrendingUp,
  Calendar
} from "lucide-react";

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("umrah_user");
    if (!userData) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.type !== "admin") {
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

  const stats = [
    { title: "Total Bookings", value: "248", icon: Calendar, color: "text-blue-600" },
    { title: "Active Partners", value: "12", icon: Users, color: "text-green-600" },
    { title: "Hotel Listings", value: "45", icon: Hotel, color: "text-purple-600" },
    { title: "Revenue (SAR)", value: "125,450", icon: TrendingUp, color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-primary">Umrah Asan Admin</h1>
              <Badge variant="secondary">Admin Panel</Badge>
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="hotels">Hotels</TabsTrigger>
            <TabsTrigger value="taxis">Taxis</TabsTrigger>
            <TabsTrigger value="ziaraat">Ziaraat</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Latest booking requests and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Booking #UMA{item}23</div>
                        <div className="text-sm text-muted-foreground">Hotel Al Haram - 3 nights</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Pending Payment</Badge>
                        <Button size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hotels" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Hotel className="w-5 h-5 mr-2" />
                  Hotel Management
                </CardTitle>
                <CardDescription>Manage hotel listings and availability</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="mb-4">Add New Hotel</Button>
                <p className="text-sm text-muted-foreground">Hotel management features will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="taxis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Car className="w-5 h-5 mr-2" />
                  Taxi Management
                </CardTitle>
                <CardDescription>Manage taxi services and drivers</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="mb-4">Add New Taxi</Button>
                <p className="text-sm text-muted-foreground">Taxi management features will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ziaraat" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Ziaraat Management
                </CardTitle>
                <CardDescription>Manage ziaraat tours and guides</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="mb-4">Add New Ziaraat Tour</Button>
                <p className="text-sm text-muted-foreground">Ziaraat management features will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="partners" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Partner Management
                </CardTitle>
                <CardDescription>Manage partners and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="mb-4">Add New Partner</Button>
                <p className="text-sm text-muted-foreground">Partner management features will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  System Settings
                </CardTitle>
                <CardDescription>Configure system settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">System settings will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;