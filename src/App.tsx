import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Ziaraat from "./pages/Ziaraat";
import Taxi from "./pages/Taxi";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
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
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<Login />} />
          <Route path="/partner-login" element={<Login />} />
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
  </QueryClientProvider>
);

export default App;
