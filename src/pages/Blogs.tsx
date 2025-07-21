import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBlogs(data || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading blogs...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Spiritual Insights & Umrah Guidance
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover the blessed places, learn about Islamic history, and prepare for your spiritual journey
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {blogs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No blogs available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs.map((blog) => (
                <Card key={blog.id} className="hover:shadow-card transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                        {blog.category}
                      </span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(blog.created_at).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <span>•</span>
                      <span>{blog.read_time}</span>
                    </div>
                    <CardTitle className="text-xl mb-3 hover:text-primary transition-colors">
                      <Link to={`/blogs/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-base">
                      {blog.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>{blog.author}</span>
                      </div>
                      <Link to={`/blogs/${blog.slug}`}>
                        <Button variant="outline" size="sm">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blogs;