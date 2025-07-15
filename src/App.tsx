import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Ziaraat from "./pages/Ziaraat";
import Taxi from "./pages/Taxi";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import GuestAuth from "./pages/GuestAuth";
import AdminAuth from "./pages/AdminAuth";
import PartnerAuth from "./pages/PartnerAuth";
import AdminDashboard from "./pages/AdminDashboard";
import PartnerDashboard from "./pages/PartnerDashboard";
import GuestDashboard from "./pages/GuestDashboard";
import NotFound from "./pages/NotFound";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import UmrahGuide from "./pages/UmrahGuide";
import TrainPage from "./pages/Train";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ziaraat" element={<Ziaraat />} />
            <Route path="/taxi" element={<Taxi />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<GuestAuth />} />
            <Route path="/admin-login" element={<AdminAuth />} />
            <Route path="/partner-login" element={<PartnerAuth />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/partner-dashboard" element={<PartnerDashboard />} />
            <Route path="/guest-dashboard" element={<GuestDashboard />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
            <Route path="/guide" element={<UmrahGuide />} />
            <Route path="/train" element={<TrainPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
