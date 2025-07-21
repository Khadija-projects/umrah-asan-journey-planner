import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  featured_image_url?: string;
  meta_description?: string;
  meta_keywords?: string;
  read_time: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const BlogManager = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "Umrah Asan Team",
    category: "",
    featured_image_url: "",
    meta_description: "",
    meta_keywords: "",
    read_time: "5 min read",
    published: true,
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch blogs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditing && editingBlog) {
        const { error } = await supabase
          .from('blogs')
          .update(formData)
          .eq('id', editingBlog.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Blog updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert([formData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Blog created successfully",
        });
      }

      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      toast({
        title: "Error",
        description: "Failed to save blog",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      category: blog.category,
      featured_image_url: blog.featured_image_url || "",
      meta_description: blog.meta_description || "",
      meta_keywords: blog.meta_keywords || "",
      read_time: blog.read_time,
      published: blog.published,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Blog deleted successfully",
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author: "Umrah Asan Team",
      category: "",
      featured_image_url: "",
      meta_description: "",
      meta_keywords: "",
      read_time: "5 min read",
      published: true,
    });
    setIsEditing(false);
    setEditingBlog(null);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Button onClick={() => setIsEditing(!isEditing)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {isEditing ? "Cancel" : "Add New Blog"}
        </Button>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">Blog List</TabsTrigger>
          {isEditing && <TabsTrigger value="editor">Blog Editor</TabsTrigger>}
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="grid gap-4">
            {blogs.map((blog) => (
              <Card key={blog.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="line-clamp-1">{blog.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {blog.category} • {blog.read_time}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`/blogs/${blog.slug}`, '_blank')}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(blog)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(blog.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground">
                      Created: {new Date(blog.created_at).toLocaleDateString()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${blog.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {isEditing && (
          <TabsContent value="editor">
            <Card>
              <CardHeader>
                <CardTitle>{editingBlog ? 'Edit Blog' : 'Create New Blog'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => {
                          const title = e.target.value;
                          setFormData(prev => ({
                            ...prev,
                            title,
                            slug: !isEditing ? generateSlug(title) : prev.slug
                          }));
                        }}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="slug">Slug</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Content (HTML)</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      rows={15}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="meta_description">Meta Description</Label>
                      <Textarea
                        id="meta_description"
                        value={formData.meta_description}
                        onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="meta_keywords">Meta Keywords</Label>
                      <Input
                        id="meta_keywords"
                        value={formData.meta_keywords}
                        onChange={(e) => setFormData(prev => ({ ...prev, meta_keywords: e.target.value }))}
                        placeholder="keyword1, keyword2, keyword3"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                    />
                    <Label htmlFor="published">Published</Label>
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <Button type="submit">
                      {isEditing && editingBlog ? 'Update Blog' : 'Create Blog'}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};