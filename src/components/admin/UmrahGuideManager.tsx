import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface UmrahGuideStep {
  id: string;
  title: string;
  slug: string;
  step_number: number;
  content: string;
  short_description: string | null;
  featured_image_url: string | null;
  video_url: string | null;
  duration_estimate: string | null;
  important_notes: string | null;
  common_mistakes: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  is_active: boolean;
}

export function UmrahGuideManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<UmrahGuideStep | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    step_number: 1,
    content: "",
    short_description: "",
    featured_image_url: "",
    video_url: "",
    duration_estimate: "",
    important_notes: "",
    common_mistakes: "",
    meta_description: "",
    meta_keywords: "",
    is_active: true,
  });

  const queryClient = useQueryClient();

  const { data: steps, isLoading } = useQuery({
    queryKey: ["umrah-guide-steps"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("umrah_guide_steps")
        .select("*")
        .order("step_number", { ascending: true });
      
      if (error) throw error;
      return data as UmrahGuideStep[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from("umrah_guide_steps").insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["umrah-guide-steps"] });
      toast.success("Umrah guide step created successfully!");
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to create step: " + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase
        .from("umrah_guide_steps")
        .update(data)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["umrah-guide-steps"] });
      toast.success("Umrah guide step updated successfully!");
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to update step: " + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("umrah_guide_steps").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["umrah-guide-steps"] });
      toast.success("Umrah guide step deleted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete step: " + error.message);
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      step_number: 1,
      content: "",
      short_description: "",
      featured_image_url: "",
      video_url: "",
      duration_estimate: "",
      important_notes: "",
      common_mistakes: "",
      meta_description: "",
      meta_keywords: "",
      is_active: true,
    });
    setEditingStep(null);
    setIsDialogOpen(false);
  };

  const generateSlug = (title: string) => {
    return title
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
      slug: formData.slug || generateSlug(formData.title),
    };

    if (editingStep) {
      updateMutation.mutate({ id: editingStep.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleEdit = (step: UmrahGuideStep) => {
    setEditingStep(step);
    setFormData({
      title: step.title,
      slug: step.slug,
      step_number: step.step_number,
      content: step.content,
      short_description: step.short_description || "",
      featured_image_url: step.featured_image_url || "",
      video_url: step.video_url || "",
      duration_estimate: step.duration_estimate || "",
      important_notes: step.important_notes || "",
      common_mistakes: step.common_mistakes || "",
      meta_description: step.meta_description || "",
      meta_keywords: step.meta_keywords || "",
      is_active: step.is_active,
    });
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return <div>Loading Umrah guide steps...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Umrah Guide Steps</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingStep(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Step
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingStep ? "Edit Guide Step" : "Add New Guide Step"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="step_number">Step Number *</Label>
                  <Input
                    id="step_number"
                    type="number"
                    value={formData.step_number}
                    onChange={(e) => setFormData({ ...formData, step_number: parseInt(e.target.value) || 1 })}
                    required
                    min="1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="Auto-generated from title"
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
                <Label htmlFor="content">Content (HTML) *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={8}
                  placeholder="You can use HTML tags like <h2>, <p>, <ul>, <li>, <strong>, etc."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration_estimate">Duration Estimate</Label>
                  <Input
                    id="duration_estimate"
                    value={formData.duration_estimate}
                    onChange={(e) => setFormData({ ...formData, duration_estimate: e.target.value })}
                    placeholder="e.g., 30 minutes"
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
              </div>

              <div>
                <Label htmlFor="video_url">Video URL</Label>
                <Input
                  id="video_url"
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>

              <div>
                <Label htmlFor="important_notes">Important Notes</Label>
                <Textarea
                  id="important_notes"
                  value={formData.important_notes}
                  onChange={(e) => setFormData({ ...formData, important_notes: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="common_mistakes">Common Mistakes</Label>
                <Textarea
                  id="common_mistakes"
                  value={formData.common_mistakes}
                  onChange={(e) => setFormData({ ...formData, common_mistakes: e.target.value })}
                  rows={3}
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

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {editingStep ? "Update" : "Create"} Step
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {steps?.map((step) => (
          <Card key={step.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Step {step.step_number}: {step.title}
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(step)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteMutation.mutate(step.id)}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{step.short_description}</p>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>Duration: {step.duration_estimate || "N/A"}</span>
                <span className={step.is_active ? "text-green-600" : "text-red-600"}>
                  {step.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}