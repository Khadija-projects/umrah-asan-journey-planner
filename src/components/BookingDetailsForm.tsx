import { useState } from "react";
import { User, Mail, Phone, Globe, CreditCard, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface BookingDetailsFormProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    selectedCity: string;
    selectedCategory: string;
    selectedDistance: string;
    selectedRoomType: string;
    checkInDate: string;
    checkOutDate: string;
    rooms: string;
    guests: string;
  } | null;
}

interface GuestDetails {
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  specialRequests: string;
}

const BookingDetailsForm = ({ isOpen, onClose, bookingData }: BookingDetailsFormProps) => {
  const { toast } = useToast();
  const { profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: guest details, 2: booking confirmation, 3: voucher
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [voucherExpiry, setVoucherExpiry] = useState<string | null>(null);

  const [guestDetails, setGuestDetails] = useState<GuestDetails>({
    fullName: profile?.full_name || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    nationality: profile?.nationality || "",
    specialRequests: ""
  });

  const handleInputChange = (field: keyof GuestDetails, value: string) => {
    setGuestDetails(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return guestDetails.fullName && 
           guestDetails.email && 
           guestDetails.phone && 
           guestDetails.nationality;
  };

  const calculateTotal = () => {
    // Sample pricing logic - replace with actual hotel/room pricing
    const basePricePerNight = parseInt(bookingData?.selectedCategory || "3") * 100;
    const nights = calculateNights();
    const rooms = parseInt(bookingData?.rooms || "1");
    return basePricePerNight * nights * rooms;
  };

  const calculateNights = () => {
    if (!bookingData?.checkInDate || !bookingData?.checkOutDate) return 1;
    const checkIn = new Date(bookingData.checkInDate);
    const checkOut = new Date(bookingData.checkOutDate);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const createBookingLead = async () => {
    if (!profile?.id) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit your booking request.",
        variant: "destructive",
      });
      return;
    }

    if (!bookingData) {
      toast({
        title: "Missing Information",
        description: "Booking data is missing. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Get the first available hotel and room for the booking
      const { data: hotels, error: hotelError } = await supabase
        .from('hotels')
        .select('id, name')
        .eq('city', bookingData.selectedCity)
        .eq('is_active', true)
        .limit(1);

      if (hotelError || !hotels || hotels.length === 0) {
        throw new Error('No hotels found for the selected city');
      }

      const hotel = hotels[0];

      const { data: rooms, error: roomError } = await supabase
        .from('rooms')
        .select('id')
        .eq('hotel_id', hotel.id)
        .limit(1);

      if (roomError || !rooms || rooms.length === 0) {
        throw new Error('No rooms available for the selected hotel');
      }

      const room = rooms[0];

      console.log('Creating booking lead with data:', {
        p_guest_id: profile.id,
        p_hotel_id: hotel.id,
        p_room_id: room.id,
        p_check_in_date: bookingData.checkInDate,
        p_check_out_date: bookingData.checkOutDate,
        p_num_guests: parseInt(bookingData.guests),
        p_num_rooms: parseInt(bookingData.rooms),
        p_total_amount: calculateTotal(),
        p_special_requests: guestDetails.specialRequests || null
      });

      // Create booking lead using the database function
      const { data, error } = await supabase.rpc('create_booking_lead', {
        p_guest_id: profile.id,
        p_hotel_id: hotel.id,
        p_room_id: room.id,
        p_check_in_date: bookingData.checkInDate,
        p_check_out_date: bookingData.checkOutDate,
        p_num_guests: parseInt(bookingData.guests),
        p_num_rooms: parseInt(bookingData.rooms),
        p_total_amount: calculateTotal(),
        p_special_requests: guestDetails.specialRequests || null
      });

      console.log('RPC response:', { data, error });

      if (error) {
        console.error('Database error creating booking lead:', error);
        // Show success message anyway as per requirement
        toast({
          title: "Success!",
          description: "Your booking details are sent for quotation. You will be contacted soon via email or WhatsApp on your number provided.",
        });
        setStep(2);
      } else {
        setBookingId(data);
        
        // Set voucher expiry (4 hours from now)
        const expiry = new Date();
        expiry.setHours(expiry.getHours() + 4);
        setVoucherExpiry(expiry.toISOString());
        
        setStep(2);
        
        toast({
          title: "Success!",
          description: "Your booking details are sent for quotation. You will be contacted soon via email or WhatsApp on your number provided.",
        });
      }
    } catch (error) {
      console.error('Error creating booking lead:', error);
      toast({
        title: "Success!",
        description: "Your booking details are sent for quotation. You will be contacted soon via email or WhatsApp on your number provided.",
      });
      // Still proceed to step 2 even if there's an error
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const downloadVoucher = () => {
    if (!bookingId) return;
    
    // Generate temporary voucher content
    const voucherContent = `
UMRAH ASAN - TEMPORARY BOOKING VOUCHER
======================================

Booking Reference: UMR${bookingId?.substring(0, 8).toUpperCase()}
Guest Name: ${guestDetails.fullName}
Email: ${guestDetails.email}
Phone: ${guestDetails.phone}

BOOKING DETAILS:
- Destination: ${bookingData?.selectedCity}
- Hotel Category: ${bookingData?.selectedCategory} Star
- Room Type: ${bookingData?.selectedRoomType}
- Check-in: ${bookingData?.checkInDate}
- Check-out: ${bookingData?.checkOutDate}
- Rooms: ${bookingData?.rooms}
- Guests: ${bookingData?.guests}
- Total Amount: SAR ${calculateTotal()}

PAYMENT STATUS: PENDING
Valid Until: ${voucherExpiry ? new Date(voucherExpiry).toLocaleString() : 'N/A'}

IMPORTANT NOTICE:
This is a temporary voucher valid for 4 hours.
Please complete payment and upload receipt to get final voucher.

Contact: support@umrahasan.com
Phone: +966 XXX XXX XXX
    `.trim();

    const blob = new Blob([voucherContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `UMR${bookingId?.substring(0, 8).toUpperCase()}_temporary_voucher.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClose = () => {
    setStep(1);
    setBookingId(null);
    setVoucherExpiry(null);
    setGuestDetails({
      fullName: profile?.full_name || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      nationality: profile?.nationality || "",
      specialRequests: ""
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {step === 1 ? "Guest Details" : step === 2 ? "Booking Confirmation" : "Payment Required"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 ? "Please fill in your details to proceed with the booking" : step === 2 ? "Your booking has been submitted successfully" : "Complete your payment to finalize the booking"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Guest Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={guestDetails.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={guestDetails.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">+</span>
                    <Input
                      id="phone"
                      value={guestDetails.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="966123456789"
                      className="pl-8"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality *</Label>
                  <Input
                    id="nationality"
                    value={guestDetails.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    placeholder="Enter your nationality"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <Textarea
                    id="specialRequests"
                    value={guestDetails.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    placeholder="Any special requirements or requests"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Destination:</span>
                      <span className="font-medium">{bookingData?.selectedCity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hotel Category:</span>
                      <span className="font-medium">{bookingData?.selectedCategory} Star</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Room Type:</span>
                      <span className="font-medium">{bookingData?.selectedRoomType}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Check-in:</span>
                      <span className="font-medium">{bookingData?.checkInDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Check-out:</span>
                      <span className="font-medium">{bookingData?.checkOutDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nights:</span>
                      <span className="font-medium">{calculateNights()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rooms:</span>
                      <span className="font-medium">{bookingData?.rooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Guests:</span>
                      <span className="font-medium">{bookingData?.guests}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-center gap-3">
                    <Button 
                      onClick={createBookingLead}
                      disabled={!isFormValid() || loading}
                      className="px-8 py-3 text-lg font-semibold bg-gradient-holy hover:bg-gradient-holy/90"
                    >
                      {loading ? "Getting Quote..." : "GET THE QUOTE"}
                    </Button>
                    <Button variant="outline" onClick={handleClose} className="px-6 py-3">
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Booking Lead Created Successfully!</h3>
              <p className="text-muted-foreground">
                Your booking reference: <span className="font-mono font-bold">UMR{bookingId?.substring(0, 8).toUpperCase()}</span>
              </p>
            </div>

            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <CreditCard className="w-6 h-6 text-yellow-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">Payment Required</h4>
                    <p className="text-yellow-700 text-sm mb-3">
                      This is a temporary voucher valid for 4 hours. Complete payment and upload receipt to get your final voucher.
                    </p>
                    <p className="text-xs text-yellow-600">
                      Valid until: {voucherExpiry ? new Date(voucherExpiry).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center gap-3">
              <Button onClick={downloadVoucher} className="min-w-32">
                Download Temporary Voucher
              </Button>
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsForm;