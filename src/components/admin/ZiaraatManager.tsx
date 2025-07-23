import { useState, useEffect } from "react";
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
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "./ImageUpload";

interface ZiaraatLocation {
  id: string;
  name: string;
  slug: string;
  description: string;
  city: string;
  location_type: string;
  historical_significance: string | null;
  visiting_hours: string | null;
  featured_image_url: string | null;
  distance_from_haram: number | null;
  recommended_duration: string | null;
  entry_fee: string | null;
  special_notes: string | null;
  is_active: boolean;
  sort_order: number;
  meta_description: string | null;
  meta_keywords: string | null;
}

export function ZiaraatManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<ZiaraatLocation | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    city: "",
    location_type: "makkah",
    historical_significance: "",
    visiting_hours: "",
    featured_image_url: "",
    distance_from_haram: "",
    recommended_duration: "",
    entry_fee: "Free",
    special_notes: "",
    is_active: true,
    sort_order: 0,
    meta_description: "",
    meta_keywords: "",
  });

  const queryClient = useQueryClient();

  const { data: locations, isLoading } = useQuery({
    queryKey: ["ziaraat-locations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ziaraat_locations")
        .select("*")
        .order("sort_order", { ascending: true });
      
      if (error) throw error;
      return data as ZiaraatLocation[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from("ziaraat_locations").insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ziaraat-locations"] });
      toast.success("Ziaraat location created successfully!");
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to create location: " + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase
        .from("ziaraat_locations")
        .update(data)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ziaraat-locations"] });
      toast.success("Ziaraat location updated successfully!");
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to update location: " + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("ziaraat_locations").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ziaraat-locations"] });
      toast.success("Ziaraat location deleted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete location: " + error.message);
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      city: "",
      location_type: "makkah",
      historical_significance: "",
      visiting_hours: "",
      featured_image_url: "",
      distance_from_haram: "",
      recommended_duration: "",
      entry_fee: "Free",
      special_notes: "",
      is_active: true,
      sort_order: 0,
      meta_description: "",
      meta_keywords: "",
    });
    setEditingLocation(null);
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
    
    const submitData = {
      ...formData,
      slug: formData.slug || generateSlug(formData.name),
      distance_from_haram: formData.distance_from_haram ? parseInt(formData.distance_from_haram) : null,
    };

    if (editingLocation) {
      updateMutation.mutate({ id: editingLocation.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleEdit = (location: ZiaraatLocation) => {
    setEditingLocation(location);
    setFormData({
      name: location.name,
      slug: location.slug,
      description: location.description,
      city: location.city,
      location_type: location.location_type,
      historical_significance: location.historical_significance || "",
      visiting_hours: location.visiting_hours || "",
      featured_image_url: location.featured_image_url || "",
      distance_from_haram: location.distance_from_haram?.toString() || "",
      recommended_duration: location.recommended_duration || "",
      entry_fee: location.entry_fee || "Free",
      special_notes: location.special_notes || "",
      is_active: location.is_active,
      sort_order: location.sort_order,
      meta_description: location.meta_description || "",
      meta_keywords: location.meta_keywords || "",
    });
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return <div>Loading ziaraat locations...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Ziaraat Locations</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingLocation(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingLocation ? "Edit Location" : "Add New Location"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location_type">Location Type *</Label>
                  <Select
                    value={formData.location_type}
                    onValueChange={(value) => setFormData({ ...formData, location_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="makkah">Makkah</SelectItem>
                      <SelectItem value="madina">Madina</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="historical_significance">Historical Significance</Label>
                <Textarea
                  id="historical_significance"
                  value={formData.historical_significance}
                  onChange={(e) => setFormData({ ...formData, historical_significance: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="visiting_hours">Visiting Hours</Label>
                  <Input
                    id="visiting_hours"
                    value={formData.visiting_hours}
                    onChange={(e) => setFormData({ ...formData, visiting_hours: e.target.value })}
                    placeholder="e.g., 24/7 or 9:00 AM - 5:00 PM"
                  />
                </div>
                <div>
                  <Label htmlFor="recommended_duration">Recommended Duration</Label>
                  <Input
                    id="recommended_duration"
                    value={formData.recommended_duration}
                    onChange={(e) => setFormData({ ...formData, recommended_duration: e.target.value })}
                    placeholder="e.g., 30 minutes"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="distance_from_haram">Distance from Haram (meters)</Label>
                  <Input
                    id="distance_from_haram"
                    type="number"
                    value={formData.distance_from_haram}
                    onChange={(e) => setFormData({ ...formData, distance_from_haram: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="entry_fee">Entry Fee</Label>
                  <Input
                    id="entry_fee"
                    value={formData.entry_fee}
                    onChange={(e) => setFormData({ ...formData, entry_fee: e.target.value })}
                  />
                </div>
              </div>

              <ImageUpload
                label="Featured Image"
                value={formData.featured_image_url}
                onChange={(value) => setFormData({ ...formData, featured_image_url: value })}
                placeholder="Upload or enter image URL"
              />

              <div>
                <Label htmlFor="special_notes">Special Notes</Label>
                <Textarea
                  id="special_notes"
                  value={formData.special_notes}
                  onChange={(e) => setFormData({ ...formData, special_notes: e.target.value })}
                  rows={2}
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

              <div className="grid grid-cols-2 gap-4">
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
                  {editingLocation ? "Update" : "Create"} Location
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {locations?.map((location) => (
          <Card key={location.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{location.name}</CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(location)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteMutation.mutate(location.id)}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{location.description}</p>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>City: {location.city}</span>
                <span>Type: {location.location_type}</span>
                <span>Duration: {location.recommended_duration || "N/A"}</span>
                <span className={location.is_active ? "text-green-600" : "text-red-600"}>
                  {location.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}