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
import { Plus, Edit, Trash2, Navigation } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "./ImageUpload";

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  page_type: string;
  excerpt: string | null;
  featured_image_url: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  is_published: boolean;
  show_in_navigation: boolean;
  navigation_order: number;
}

export function PagesManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    page_type: "custom",
    excerpt: "",
    featured_image_url: "",
    meta_description: "",
    meta_keywords: "",
    is_published: true,
    show_in_navigation: false,
    navigation_order: 0,
  });

  const queryClient = useQueryClient();

  const { data: pages, isLoading } = useQuery({
    queryKey: ["pages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .order("navigation_order", { ascending: true });
      
      if (error) throw error;
      return data as Page[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from("pages").insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      toast.success("Page created successfully!");
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to create page: " + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase
        .from("pages")
        .update(data)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      toast.success("Page updated successfully!");
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to update page: " + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("pages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      toast.success("Page deleted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete page: " + error.message);
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      content: "",
      page_type: "custom",
      excerpt: "",
      featured_image_url: "",
      meta_description: "",
      meta_keywords: "",
      is_published: true,
      show_in_navigation: false,
      navigation_order: 0,
    });
    setEditingPage(null);
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

    if (editingPage) {
      updateMutation.mutate({ id: editingPage.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleEdit = (page: Page) => {
    setEditingPage(page);
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content,
      page_type: page.page_type,
      excerpt: page.excerpt || "",
      featured_image_url: page.featured_image_url || "",
      meta_description: page.meta_description || "",
      meta_keywords: page.meta_keywords || "",
      is_published: page.is_published,
      show_in_navigation: page.show_in_navigation,
      navigation_order: page.navigation_order,
    });
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return <div>Loading pages...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Pages</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPage(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPage ? "Edit Page" : "Add New Page"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Page Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="page_type">Page Type *</Label>
                  <Select
                    value={formData.page_type}
                    onValueChange={(value) => setFormData({ ...formData, page_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="about">About</SelectItem>
                      <SelectItem value="contact">Contact</SelectItem>
                      <SelectItem value="faq">FAQ</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
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
                  placeholder="Auto-generated from title"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
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
                  rows={10}
                  placeholder="You can use HTML tags like <h2>, <p>, <ul>, <li>, <strong>, etc."
                />
              </div>

              <ImageUpload
                label="Featured Image"
                value={formData.featured_image_url}
                onChange={(value) => setFormData({ ...formData, featured_image_url: value })}
                placeholder="Upload or enter image URL"
              />

              <div>
                <Label htmlFor="meta_description">Meta Description (SEO)</Label>
                <Textarea
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="meta_keywords">Meta Keywords (SEO)</Label>
                <Input
                  id="meta_keywords"
                  value={formData.meta_keywords}
                  onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="navigation_order">Navigation Order</Label>
                  <Input
                    id="navigation_order"
                    type="number"
                    value={formData.navigation_order}
                    onChange={(e) => setFormData({ ...formData, navigation_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show_in_navigation"
                    checked={formData.show_in_navigation}
                    onCheckedChange={(checked) => setFormData({ ...formData, show_in_navigation: checked })}
                  />
                  <Label htmlFor="show_in_navigation">Show in Navigation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_published"
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                  />
                  <Label htmlFor="is_published">Published</Label>
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
                  {editingPage ? "Update" : "Create"} Page
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {pages?.map((page) => (
          <Card key={page.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                {page.title}
                {page.show_in_navigation && <Navigation className="h-4 w-4 text-blue-500" />}
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(page)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteMutation.mutate(page.id)}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{page.excerpt}</p>
              <div className="flex gap-2 mb-2">
                <Badge variant="outline">{page.page_type}</Badge>
                {page.show_in_navigation && <Badge variant="default">In Navigation</Badge>}
                <Badge variant={page.is_published ? "default" : "secondary"}>
                  {page.is_published ? "Published" : "Draft"}
                </Badge>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>Slug: /{page.slug}</span>
                {page.show_in_navigation && <span>Nav Order: {page.navigation_order}</span>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}