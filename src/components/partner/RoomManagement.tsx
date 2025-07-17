import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, Users, DollarSign } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const roomSchema = z.object({
  room_type: z.string().min(1, "Room type is required"),
  max_guests: z.number().min(1).max(10),
  price_per_night: z.number().min(1),
  available_rooms: z.number().min(0),
});

type RoomFormData = z.infer<typeof roomSchema>;

interface Room {
  id: string;
  room_type: string;
  max_guests: number;
  price_per_night: number;
  available_rooms: number;
  hotel_id: string;
}

interface RoomManagementProps {
  hotelId: string;
  hotelName: string;
}

const RoomManagement = ({ hotelId, hotelName }: RoomManagementProps) => {
  const { toast } = useToast();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      room_type: '',
      max_guests: 2,
      price_per_night: 100,
      available_rooms: 1,
    },
  });

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('hotel_id', hotelId)
        .order('room_type');

      if (error) throw error;
      setRooms(data || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      toast({
        title: "Error",
        description: "Failed to fetch rooms",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [hotelId]);

  const onSubmit = async (data: RoomFormData) => {
    setIsSubmitting(true);

    try {
      if (editingRoom) {
        // Update existing room
        const { error } = await supabase
          .from('rooms')
          .update(data)
          .eq('id', editingRoom.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Room updated successfully!",
        });
      } else {
        // Add new room
        const { error } = await supabase
          .from('rooms')
          .insert({
            room_type: data.room_type,
            max_guests: data.max_guests,
            price_per_night: data.price_per_night,
            available_rooms: data.available_rooms,
            hotel_id: hotelId,
          });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Room added successfully!",
        });
      }

      form.reset();
      setEditingRoom(null);
      setIsDialogOpen(false);
      fetchRooms();
    } catch (error) {
      console.error('Error saving room:', error);
      toast({
        title: "Error",
        description: "Failed to save room. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
    form.setValue('room_type', room.room_type);
    form.setValue('max_guests', room.max_guests);
    form.setValue('price_per_night', room.price_per_night);
    form.setValue('available_rooms', room.available_rooms);
    setIsDialogOpen(true);
  };

  const handleDelete = async (roomId: string) => {
    if (!confirm('Are you sure you want to delete this room type?')) return;

    try {
      const { error } = await supabase
        .from('rooms')
        .delete()
        .eq('id', roomId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Room deleted successfully!",
      });

      fetchRooms();
    } catch (error) {
      console.error('Error deleting room:', error);
      toast({
        title: "Error",
        description: "Failed to delete room",
        variant: "destructive",
      });
    }
  };

  const handleNewRoom = () => {
    setEditingRoom(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const roomTypes = [
    'Single Room',
    'Double Sharing',
    'Triple Sharing', 
    'Quad Sharing',
    'Multi-Sharing (6 people)',
    'Multi-Sharing (8 people)',
    'Family Room',
    'Suite'
  ];

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading rooms...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Room Management - {hotelName}
            </CardTitle>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleNewRoom} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Room Type
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingRoom ? 'Edit Room Type' : 'Add New Room Type'}
                </DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="room_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select room type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roomTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="max_guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Guests</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="1"
                            max="10"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price_per_night"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price per Night (SAR)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="1"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="available_rooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available Rooms</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="0"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Saving...' : (editingRoom ? 'Update' : 'Add')}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {rooms.length === 0 ? (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No room types added yet</p>
            <Button onClick={handleNewRoom}>Add Your First Room Type</Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room Type</TableHead>
                <TableHead>Max Guests</TableHead>
                <TableHead>Price/Night</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">{room.room_type}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {room.max_guests}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      SAR {room.price_per_night}
                    </div>
                  </TableCell>
                  <TableCell>{room.available_rooms} rooms</TableCell>
                  <TableCell>
                    <Badge variant={room.available_rooms > 0 ? "default" : "secondary"}>
                      {room.available_rooms > 0 ? "Available" : "Sold Out"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(room)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(room.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomManagement;