import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  FileText,
  MapPin,
  Book,
  Wrench,
  HelpCircle,
  Users,
  Building2,
  Clock,
  Settings
} from "lucide-react";

const adminItems = [
  { 
    title: "Dashboard", 
    url: "/admin-dashboard", 
    icon: LayoutDashboard,
    description: "Overview & Stats"
  },
  { 
    title: "Content Management", 
    url: "/admin-dashboard?tab=content", 
    icon: FileText,
    description: "Manage Website Content"
  },
];

const contentItems = [
  { 
    title: "Blogs", 
    url: "/admin-dashboard?tab=content&section=blogs", 
    icon: FileText,
    description: "Manage Blog Posts"
  },
  { 
    title: "Ziaraat", 
    url: "/admin-dashboard?tab=content&section=ziaraat", 
    icon: MapPin,
    description: "Manage Holy Places"
  },
  { 
    title: "Umrah Guide", 
    url: "/admin-dashboard?tab=content&section=umrah-guide", 
    icon: Book,
    description: "Guide Steps & Content"
  },
  { 
    title: "Services", 
    url: "/admin-dashboard?tab=content&section=services", 
    icon: Wrench,
    description: "Taxi, Train & Other Services"
  },
  { 
    title: "Pages", 
    url: "/admin-dashboard?tab=content&section=pages", 
    icon: FileText,
    description: "Static Pages"
  },
  { 
    title: "FAQs", 
    url: "/admin-dashboard?tab=content&section=faqs", 
    icon: HelpCircle,
    description: "Frequently Asked Questions"
  },
];

const managementItems = [
  { 
    title: "Partner Registrations", 
    url: "/admin-dashboard?tab=registrations", 
    icon: Users,
    description: "Approve/Reject Partners"
  },
  { 
    title: "Hotels & Rooms", 
    url: "/admin-dashboard?tab=hotels", 
    icon: Building2,
    description: "Manage Accommodations"
  },
  { 
    title: "Booking Leads", 
    url: "/admin-dashboard?tab=leads", 
    icon: Clock,
    description: "Payment Verification"
  },
];

export function AdminSidebar() {
  const location = useLocation();
  const currentPath = location.pathname + location.search;

  const isActive = (path: string) => currentPath.includes(path.split('?')[1] || path);
  const isContentExpanded = currentPath.includes('tab=content');

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium" 
      : "hover:bg-accent hover:text-accent-foreground";

  return (
    <Sidebar>
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <div className="flex flex-col">
                        <span className="font-medium">{item.title}</span>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Content Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Content Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {contentItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <div className="flex flex-col">
                        <span className="font-medium">{item.title}</span>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Business Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Business Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <div className="flex flex-col">
                        <span className="font-medium">{item.title}</span>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}