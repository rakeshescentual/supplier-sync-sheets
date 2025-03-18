
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductList from "@/components/products/ProductList";
import SyncStatus from "@/components/sync/SyncStatus";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { PlusCircle, FileText, LineChart, Sparkles, BarChart3 } from "lucide-react";
import CompetitorInsights from "@/components/insights/CompetitorInsights";
import ProductOptimizer from "@/components/ai/ProductOptimizer";
import PerformanceMonitor from "@/components/monitoring/PerformanceMonitor";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [dashboardTab, setDashboardTab] = useState("overview");
  
  const handleSync = () => {
    toast({
      title: "Sync Started",
      description: "Synchronizing with Shopify. This may take a few minutes.",
    });
    // This would connect to your Gadget.dev API in the future
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Sync Dashboard</h1>
          <p className="text-muted-foreground">Manage and synchronize Shopify products with ease</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => navigate("/new-product")} variant="outline">
            <PlusCircle className="h-4 w-4 mr-2" /> Add Product
          </Button>
          <Button onClick={() => navigate("/new-line-form")} variant="outline">
            <FileText className="h-4 w-4 mr-2" /> New Line Form
          </Button>
          <Button onClick={handleSync} className="shrink-0">
            Sync Products
          </Button>
        </div>
      </div>
      
      <Tabs value={dashboardTab} onValueChange={setDashboardTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="insights">Competitor Insights</TabsTrigger>
          <TabsTrigger value="optimizer">AI Optimizer</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Sync Status</CardTitle>
                <CardDescription>Current synchronization with Shopify</CardDescription>
              </CardHeader>
              <CardContent>
                <SyncStatus />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Product data overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Products:</span>
                  <span className="font-medium">20,342</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Synced:</span>
                  <span className="font-medium">20,342</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Sync:</span>
                  <span className="font-medium">2 hours ago</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pt-2">
                <Button variant="outline" size="sm" onClick={() => setDashboardTab("performance")}>
                  <BarChart3 className="h-4 w-4 mr-1" /> View Performance
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-purple-500" /> AI Recommendations
                </CardTitle>
                <CardDescription>Product optimization suggestions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-1">Improve Product Descriptions</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    165 products have descriptions shorter than recommended length.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setDashboardTab("optimizer")}>
                    Optimize Now
                  </Button>
                </div>
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-1">Missing Alt Text on Images</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    273 product images are missing alt text for accessibility.
                  </p>
                  <Button variant="outline" size="sm">Fix Issues</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="h-5 w-5 mr-2 text-blue-500" /> Market Insights
                </CardTitle>
                <CardDescription>Competitive analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-1">Price Competitiveness</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Your pricing is 8% higher than market average in the Skincare category.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setDashboardTab("insights")}>
                    View Analysis
                  </Button>
                </div>
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-1">New Market Trends</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    3 new product categories trending among competitors this month.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setDashboardTab("insights")}>
                    Explore Trends
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0">
                <div>
                  <CardTitle>Product Management</CardTitle>
                  <CardDescription>View and manage your Shopify products</CardDescription>
                </div>
                <div className="w-full md:w-64">
                  <Input 
                    placeholder="Search products..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All Products</TabsTrigger>
                  <TabsTrigger value="synced">Synced</TabsTrigger>
                  <TabsTrigger value="unsynced">Unsynced</TabsTrigger>
                  <TabsTrigger value="issues">Issues</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4">
                  <ProductList filter="all" searchQuery={searchQuery} />
                </TabsContent>
                <TabsContent value="synced" className="mt-4">
                  <ProductList filter="synced" searchQuery={searchQuery} />
                </TabsContent>
                <TabsContent value="unsynced" className="mt-4">
                  <ProductList filter="unsynced" searchQuery={searchQuery} />
                </TabsContent>
                <TabsContent value="issues" className="mt-4">
                  <ProductList filter="issues" searchQuery={searchQuery} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights">
          <CompetitorInsights />
        </TabsContent>
        
        <TabsContent value="optimizer">
          <ProductOptimizer />
        </TabsContent>
        
        <TabsContent value="performance">
          <PerformanceMonitor />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
