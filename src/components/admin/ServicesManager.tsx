import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import { toast } from "sonner";

interface Service {
  id: string;
  name: string;
  slug: string;
  service_type: string;
  description: string;
  short_description: string | null;
  featured_image_url: string | null;
  features: string[];
  contact_info: any;
  booking_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  meta_description: string | null;
  sort_order: number;
}

export function ServicesManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    service_type: "taxi",
    description: "",
    short_description: "",
    featured_image_url: "",
    features: "",
    contact_phone: "",
    contact_whatsapp: "",
    contact_email: "",
    contact_website: "",
    booking_url: "",
    is_featured: false,
    is_active: true,
    meta_description: "",
    sort_order: 0,
  });

  const queryClient = useQueryClient();

  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("sort_order", { ascending: true });
      
      if (error) throw error;
      return data as Service[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from("services").insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service created successfully!");
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to create service: " + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase
        .from("services")
        .update(data)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service updated successfully!");
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to update service: " + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service deleted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete service: " + error.message);
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      service_type: "taxi",
      description: "",
      short_description: "",
      featured_image_url: "",
      features: "",
      contact_phone: "",
      contact_whatsapp: "",
      contact_email: "",
      contact_website: "",
      booking_url: "",
      is_featured: false,
      is_active: true,
      meta_description: "",
      sort_order: 0,
    });
    setEditingService(null);
    setIsDialogOpen(false);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const features = formData.features
      .split("\n")
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const contact_info = {
      ...(formData.contact_phone && { phone: formData.contact_phone }),
      ...(formData.contact_whatsapp && { whatsapp: formData.contact_whatsapp }),
      ...(formData.contact_email && { email: formData.contact_email }),
      ...(formData.contact_website && { website: formData.contact_website }),
    };

    const submitData = {
      name: formData.name,
      slug: formData.slug || generateSlug(formData.name),
      service_type: formData.service_type,
      description: formData.description,
      short_description: formData.short_description || null,
      featured_image_url: formData.featured_image_url || null,
      features,
      contact_info,
      booking_url: formData.booking_url || null,
      is_featured: formData.is_featured,
      is_active: formData.is_active,
      meta_description: formData.meta_description || null,
      sort_order: formData.sort_order,
    };

    if (editingService) {
      updateMutation.mutate({ id: editingService.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      slug: service.slug,
      service_type: service.service_type,
      description: service.description,
      short_description: service.short_description || "",
      featured_image_url: service.featured_image_url || "",
      features: service.features.join("\n"),
      contact_phone: service.contact_info?.phone || "",
      contact_whatsapp: service.contact_info?.whatsapp || "",
      contact_email: service.contact_info?.email || "",
      contact_website: service.contact_info?.website || "",
      booking_url: service.booking_url || "",
      is_featured: service.is_featured,
      is_active: service.is_active,
      meta_description: service.meta_description || "",
      sort_order: service.sort_order,
    });
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return <div>Loading services...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Services</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingService(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingService ? "Edit Service" : "Add New Service"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Service Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="service_type">Service Type *</Label>
                  <Select
                    value={formData.service_type}
                    onValueChange={(value) => setFormData({ ...formData, service_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="taxi">Taxi</SelectItem>
                      <SelectItem value="train">Train</SelectItem>
                      <SelectItem value="hotel">Hotel</SelectItem>
                      <SelectItem value="visa">Visa</SelectItem>
                      <SelectItem value="flight">Flight</SelectItem>
                      <SelectItem value="tour">Tour</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="Auto-generated from name"
                />
              </div>

              <div>
                <Label htmlFor="short_description">Short Description</Label>
                <Textarea
                  id="short_description"
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="description">Full Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="features">Features (one per line)</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  rows={3}
                  placeholder="24/7 Service&#10;English Speaking Drivers&#10;Fixed Rates"
                />
              </div>

              <div>
                <Label htmlFor="featured_image_url">Featured Image URL</Label>
                <Input
                  id="featured_image_url"
                  value={formData.featured_image_url}
                  onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_phone">Contact Phone</Label>
                  <Input
                    id="contact_phone"
                    value={formData.contact_phone}
                    onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                    placeholder="+966-XXX-XXXX"
                  />
                </div>
                <div>
                  <Label htmlFor="contact_whatsapp">WhatsApp</Label>
                  <Input
                    id="contact_whatsapp"
                    value={formData.contact_whatsapp}
                    onChange={(e) => setFormData({ ...formData, contact_whatsapp: e.target.value })}
                    placeholder="+966-XXX-XXXX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_email">Contact Email</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                    placeholder="info@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="contact_website">Website</Label>
                  <Input
                    id="contact_website"
                    value={formData.contact_website}
                    onChange={(e) => setFormData({ ...formData, contact_website: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="booking_url">Booking URL</Label>
                <Input
                  id="booking_url"
                  value={formData.booking_url}
                  onChange={(e) => setFormData({ ...formData, booking_url: e.target.value })}
                  placeholder="https://booking.example.com"
                />
              </div>

              <div>
                <Label htmlFor="meta_description">Meta Description (SEO)</Label>
                <Textarea
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="sort_order">Sort Order</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                  <Label htmlFor="is_featured">Featured</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {editingService ? "Update" : "Create"} Service
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {services?.map((service) => (
          <Card key={service.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                {service.name}
                {service.is_featured && <Star className="h-4 w-4 text-yellow-500" />}
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(service)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteMutation.mutate(service.id)}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{service.short_description}</p>
              <div className="flex gap-2 mb-2">
                <Badge variant="outline">{service.service_type}</Badge>
                {service.is_featured && <Badge variant="default">Featured</Badge>}
                <Badge variant={service.is_active ? "default" : "secondary"}>
                  {service.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>Features: {service.features.length}</span>
                {service.contact_info?.phone && <span>Phone: ✓</span>}
                {service.contact_info?.whatsapp && <span>WhatsApp: ✓</span>}
                {service.booking_url && <span>Booking: ✓</span>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}