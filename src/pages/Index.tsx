
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductList from "@/components/products/ProductList";
import SyncStatus from "@/components/sync/SyncStatus";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
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
        <Button onClick={handleSync} className="shrink-0">
          Sync Products
        </Button>
      </div>
      
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
        </Card>
      </div>
      
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
    </div>
  );
};

export default Index;
