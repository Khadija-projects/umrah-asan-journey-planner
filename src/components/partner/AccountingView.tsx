import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { CreditCard, TrendingUp, Clock, CheckCircle, DollarSign, Calendar } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface AccountingSummary {
  totalBookings: number;
  totalAmount: number;
  receivedAmount: number;
  pendingAmount: number;
  confirmedBookings: number;
  pendingBookings: number;
}

interface BookingTransaction {
  id: string;
  booking_reference: string;
  guest_name: string;
  hotel_name: string;
  check_in_date: string;
  check_out_date: string;
  total_amount: number;
  payment_status: string;
  booking_status: string;
  created_at: string;
  payment_received: boolean;
  payment_received_date?: string;
}

const AccountingView = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [summary, setSummary] = useState<AccountingSummary>({
    totalBookings: 0,
    totalAmount: 0,
    receivedAmount: 0,
    pendingAmount: 0,
    confirmedBookings: 0,
    pendingBookings: 0,
  });
  const [transactions, setTransactions] = useState<BookingTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterMonth, setFilterMonth] = useState<string>('all');

  const fetchAccountingData = async () => {
    if (!profile?.id) return;

    try {
      // Get all hotels for this partner
      const { data: hotels } = await supabase
        .from('hotels')
        .select('id')
        .eq('partner_id', profile.id);

      if (!hotels || hotels.length === 0) {
        setIsLoading(false);
        return;
      }

      const hotelIds = hotels.map(h => h.id);

      // Get all bookings for partner's hotels
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select(`
          id,
          booking_reference,
          check_in_date,
          check_out_date,
          total_amount,
          payment_status,
          booking_status,
          created_at,
          guest_id,
          hotels(name),
          profiles(full_name)
        `)
        .in('hotel_id', hotelIds)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const processedTransactions: BookingTransaction[] = (bookings || []).map(booking => ({
        id: booking.id,
        booking_reference: booking.booking_reference || '',
        guest_name: (booking.profiles as any)?.full_name || 'Unknown Guest',
        hotel_name: (booking.hotels as any)?.name || 'Unknown Hotel',
        check_in_date: booking.check_in_date,
        check_out_date: booking.check_out_date,
        total_amount: Number(booking.total_amount),
        payment_status: booking.payment_status,
        booking_status: booking.booking_status || 'pending',
        created_at: booking.created_at,
        payment_received: booking.payment_status === 'confirmed',
        payment_received_date: booking.payment_status === 'confirmed' ? booking.created_at : undefined,
      }));

      setTransactions(processedTransactions);

      // Calculate summary
      const totalAmount = processedTransactions.reduce((sum, t) => sum + t.total_amount, 0);
      const receivedAmount = processedTransactions
        .filter(t => t.payment_received)
        .reduce((sum, t) => sum + t.total_amount, 0);
      const confirmedBookings = processedTransactions.filter(t => t.booking_status === 'confirmed').length;
      const pendingBookings = processedTransactions.filter(t => t.booking_status === 'pending').length;

      setSummary({
        totalBookings: processedTransactions.length,
        totalAmount,
        receivedAmount,
        pendingAmount: totalAmount - receivedAmount,
        confirmedBookings,
        pendingBookings,
      });

    } catch (error) {
      console.error('Error fetching accounting data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch accounting data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountingData();
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

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (filterStatus !== 'all' && transaction.payment_status !== filterStatus) {
      return false;
    }
    
    if (filterMonth !== 'all') {
      const transactionMonth = new Date(transaction.created_at).getMonth();
      const selectedMonth = parseInt(filterMonth);
      if (transactionMonth !== selectedMonth) {
        return false;
      }
    }
    
    return true;
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading accounting data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">SAR {summary.totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              From {summary.totalBookings} bookings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Amount Received</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              SAR {summary.receivedAmount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              From {summary.confirmedBookings} confirmed bookings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              SAR {summary.pendingAmount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              From {summary.pendingBookings} pending bookings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary.totalAmount > 0 ? ((summary.receivedAmount / summary.totalAmount) * 100).toFixed(1) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Payment collection rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Payment Transactions
            </CardTitle>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterMonth} onValueChange={setFilterMonth}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  <SelectItem value="0">January</SelectItem>
                  <SelectItem value="1">February</SelectItem>
                  <SelectItem value="2">March</SelectItem>
                  <SelectItem value="3">April</SelectItem>
                  <SelectItem value="4">May</SelectItem>
                  <SelectItem value="5">June</SelectItem>
                  <SelectItem value="6">July</SelectItem>
                  <SelectItem value="7">August</SelectItem>
                  <SelectItem value="8">September</SelectItem>
                  <SelectItem value="9">October</SelectItem>
                  <SelectItem value="10">November</SelectItem>
                  <SelectItem value="11">December</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No transactions found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking Ref</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Hotel</TableHead>
                  <TableHead>Stay Dates</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Booking Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      #{transaction.booking_reference}
                    </TableCell>
                    <TableCell>{transaction.guest_name}</TableCell>
                    <TableCell>{transaction.hotel_name}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(transaction.check_in_date).toLocaleDateString()} - 
                        {new Date(transaction.check_out_date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      SAR {transaction.total_amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={getPaymentStatusColor(transaction.payment_status)}>
                        {transaction.payment_status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.booking_status)}>
                        {transaction.booking_status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountingView;