import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowRight } from "lucide-react";

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: "Discover the Spiritual Heartbeat of Islam: Holy Makkah",
      excerpt: "Holy Makkah — the birthplace of Prophet Muhammad (PBUH) — holds a special place in every Muslim's heart. Millions of pilgrims travel here each year to perform Umrah and Hajj...",
      author: "Umrah Asan Team",
      date: "December 15, 2024",
      readTime: "8 min read",
      category: "Spiritual Journey",
      slug: "exploring-blessings-holy-makkah"
    },
    {
      id: 2,
      title: "Holy Madina: The City of Peace and Prophet's Love",
      excerpt: "Holy Madina — Al-Madinah Al-Munawwarah — is the second holiest city in Islam and the final resting place of Prophet Muhammad (PBUH). For every Muslim, a visit to Madina brings...",
      author: "Umrah Asan Team",
      date: "December 10, 2024",
      readTime: "6 min read",
      category: "Sacred Places",
      slug: "finding-serenity-holy-madina"
    }
  ];

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
                      <span>{blog.date}</span>
                    </div>
                    <span>•</span>
                    <span>{blog.readTime}</span>
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blogs;