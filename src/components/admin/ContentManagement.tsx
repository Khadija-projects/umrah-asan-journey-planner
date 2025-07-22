import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogManager } from "./BlogManager";
import { ZiaraatManager } from "./ZiaraatManager";
import { UmrahGuideManager } from "./UmrahGuideManager";
import { ServicesManager } from "./ServicesManager";
import { PagesManager } from "./PagesManager";
import { FAQManager } from "./FAQManager";
import { FileText, MapPin, BookOpen, Car, Settings, HelpCircle } from "lucide-react";

export function ContentManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Content Management</h2>
        <p className="text-muted-foreground">
          Manage all website content from this centralized dashboard.
        </p>
      </div>

      <Tabs defaultValue="blogs" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="blogs" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Blogs
          </TabsTrigger>
          <TabsTrigger value="ziaraat" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Ziaraat
          </TabsTrigger>
          <TabsTrigger value="umrah-guide" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Umrah Guide
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Car className="h-4 w-4" />
            Services
          </TabsTrigger>
          <TabsTrigger value="pages" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Pages
          </TabsTrigger>
          <TabsTrigger value="faqs" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            FAQs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="blogs">
          <Card>
            <CardHeader>
              <CardTitle>Blog Management</CardTitle>
            </CardHeader>
            <CardContent>
              <BlogManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ziaraat">
          <Card>
            <CardHeader>
              <CardTitle>Ziaraat Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <ZiaraatManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="umrah-guide">
          <Card>
            <CardHeader>
              <CardTitle>Umrah Guide Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <UmrahGuideManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Services Management</CardTitle>
            </CardHeader>
            <CardContent>
              <ServicesManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle>Pages Management</CardTitle>
            </CardHeader>
            <CardContent>
              <PagesManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faqs">
          <Card>
            <CardHeader>
              <CardTitle>FAQ Management</CardTitle>
            </CardHeader>
            <CardContent>
              <FAQManager />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}