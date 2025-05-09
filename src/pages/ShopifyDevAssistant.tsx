
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShopifyConnectionManager from "@/components/shopify/ShopifyConnectionManager";

const ShopifyDevAssistant = () => {
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Shopify Dev Assistant</h1>
        <p className="text-muted-foreground">
          Connect to the Shopify Dev Assistant for AI-powered development help.
        </p>
      </div>

      <Tabs defaultValue="connection">
        <TabsList className="mb-4">
          <TabsTrigger value="connection">Connection</TabsTrigger>
          <TabsTrigger value="assistant">Dev Assistant</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="connection" className="space-y-6">
          <ShopifyConnectionManager />
        </TabsContent>
        
        <TabsContent value="assistant" className="space-y-6">
          <div className="rounded-md border p-4">
            <h3 className="text-sm font-medium mb-2">Shopify Dev Assistant</h3>
            <p className="text-sm text-muted-foreground">
              Ask questions about Shopify development, APIs, and best practices.
              This feature will be available once you connect to the Shopify Dev Assistant.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="docs" className="space-y-6">
          <div className="rounded-md border p-4">
            <h3 className="text-sm font-medium mb-2">Documentation Resources</h3>
            <p className="text-sm text-muted-foreground">
              Access relevant Shopify documentation and resources.
              This feature will be available once you connect to the Shopify Dev Assistant.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShopifyDevAssistant;
