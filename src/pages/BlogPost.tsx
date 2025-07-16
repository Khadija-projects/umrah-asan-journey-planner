import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowLeft, MapPin, Clock, Star } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();

  const blogPosts = {
    "exploring-blessings-holy-makkah": {
      title: "Discover the Spiritual Heartbeat of Islam: Holy Makkah",
      author: "Umrah Asan Team",
      date: "December 15, 2024",
      readTime: "8 min read",
      category: "Spiritual Journey",
      content: `
      <h2>Introduction</h2>
      <p>Holy Makkah — the birthplace of Prophet Muhammad (PBUH) — holds a special place in every Muslim's heart. Millions of pilgrims travel here each year to perform Umrah and Hajj, seeking forgiveness, blessings, and closeness to Allah Almighty. But beyond the Kaaba, what else makes Makkah so deeply spiritual and unique?</p>

      <h2>The Blessing Masjid al-Haram</h2>
      <p>At the heart of Makkah lies Masjid al-Haram, the largest mosque in the world and the home of the Holy Kaaba. Pilgrims from every corner of the globe gather here day and night, creating an atmosphere of unity, peace, and prayer.</p>

      <h2>Historic Landmarks</h2>
      <p>Makkah is filled with sites rich in Islamic history:</p>
      <ul>
        <li><strong>Mount Safa and Marwah:</strong> Where Hajar (RA) ran in search of water for her son, Prophet Ismail (AS).</li>
        <li><strong>Jabal al-Noor:</strong> Home to the Cave of Hira, where the first revelation descended.</li>
        <li><strong>Mina & Arafat:</strong> Sites central to Hajj rituals.</li>
      </ul>

      <h2>Modern Comforts for Pilgrims</h2>
      <p>Today, Makkah is well-equipped with world-class hotels, shopping centers, and transport options to make your pilgrimage as comfortable as possible. Pilgrims can book premium stays near the Haram, access taxis easily, and even explore local restaurants serving authentic Hijazi cuisine.</p>

      <h2>Tips for a Peaceful Visit</h2>
      <ul>
        <li>Book your hotel in advance, especially during Ramadan or Hajj.</li>
        <li>Use trusted taxi services for safe and easy travel.</li>
        <li>Carry a small prayer mat and water bottle at all times.</li>
        <li>Respect local customs and dress modestly.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Visiting Holy Makkah is not just a journey — it's a life-changing experience. May your time here bring peace, forgiveness, and spiritual renewal.</p>
      
      <p><strong>👉 Ready to plan your Holy Makkah Umrah? Book now with Umrah Asan for trusted hotels, taxis, and ziaraat assistance.</strong></p>
      `
    },
    "finding-serenity-holy-madina": {
      title: "Holy Madina: The City of Peace and Prophet's Love",
      author: "Umrah Asan Team", 
      date: "December 10, 2024",
      readTime: "6 min read",
      category: "Blessing Places",
      content: `
      <h2>Introduction</h2>
      <p>Holy Madina — Al-Madinah Al-Munawwarah — is the second holiest city in Islam and the final resting place of Prophet Muhammad (PBUH). For every Muslim, a visit to Madina brings a sense of calmness, love, and connection to the Prophet's (PBUH) legacy.</p>

      <h2>Masjid an-Nabawi</h2>
      <p>Masjid an-Nabawi (The Prophet's Mosque) is the highlight of every visit to Madina. Praying here once is better than a thousand prayers elsewhere — except Masjid al-Haram. Pilgrims offer Salat, send blessings upon the Prophet (PBUH), and visit Rawdah — a garden from the gardens of Paradise.</p>

      <h2>Key Ziaraat in Madina</h2>
      <p>Madina is full of blessed historical sites:</p>
      <ul>
        <li><strong>Jannat al-Baqi:</strong> The resting place of many family members and companions of the Prophet (PBUH).</li>
        <li><strong>Quba Mosque:</strong> The first mosque built in Islam. Praying two rakats here equals the reward of an Umrah.</li>
        <li><strong>Uhud Mountain:</strong> Site of the famous Battle of Uhud. Visit the graves of the martyrs and reflect on their sacrifice.</li>
      </ul>

      <h2>Tranquil Atmosphere</h2>
      <p>Unlike the bustling energy of Makkah, Madina's vibe is peaceful and calm. Streets are quiet, people walk slowly, and the whole city radiates serenity.</p>

      <h2>Tips for a Smooth Visit</h2>
      <ul>
        <li>Dress respectfully and maintain the sanctity of this blessed city.</li>
        <li>Use taxis or local buses to reach ziaraat spots easily.</li>
        <li>Book hotels near the Prophet's Mosque for convenience and frequent prayers.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Holy Madina is not just a city — it is an embrace of peace and mercy. May every visitor return with hearts full of light, love, and blessings.</p>
      
      <p><strong>👉 Want to experience the serenity of Madina? Umrah Asan helps you find trusted hotels and smooth taxi rides for your peaceful stay.</strong></p>
      `
    }
  };

  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Blog Post Not Found</h1>
            <Link to="/blogs">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="py-16 px-4 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto">
          <Link to="/blogs" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Link>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{post.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{post.readTime}</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="w-4 h-4" />
            <span>By {post.author}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Ready for Your Spiritual Journey?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Book your trusted hotels, reliable taxis, and guided ziaraat with Umrah Asan
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/">
                    <Button variant="default" size="lg">
                      Book Hotel Now
                    </Button>
                  </Link>
                  <Link to="/taxi">
                    <Button variant="outline" size="lg">
                      Book Taxi
                    </Button>
                  </Link>
                  <Link to="/ziaraat">
                    <Button variant="gold" size="lg">
                      Explore Ziaraat
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;