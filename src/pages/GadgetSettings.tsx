
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GadgetConfig from "@/components/gadget/GadgetConfig";

const GadgetSettings = () => {
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Gadget.dev Integration Settings</h1>
        <p className="text-muted-foreground">
          Configure your Gadget.dev integration for product sync and new line form processing.
        </p>
      </div>

      <Tabs defaultValue="connection">
        <TabsList className="mb-4">
          <TabsTrigger value="connection">Connection</TabsTrigger>
          <TabsTrigger value="sync">Sync Settings</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="logs">Audit Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="connection" className="space-y-6">
          <GadgetConfig />
        </TabsContent>
        
        <TabsContent value="sync" className="space-y-6">
          <div className="rounded-md border p-4">
            <h3 className="text-sm font-medium mb-2">Sync Configuration</h3>
            <p className="text-sm text-muted-foreground">
              Configure how products are synchronized between Shopify and your Gadget app.
              This feature will be available once you connect to Gadget.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="webhooks" className="space-y-6">
          <div className="rounded-md border p-4">
            <h3 className="text-sm font-medium mb-2">Webhook Management</h3>
            <p className="text-sm text-muted-foreground">
              Configure webhooks to automatically process incoming data from Shopify or supplier submissions.
              This feature will be available once you connect to Gadget.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-6">
          <div className="rounded-md border p-4">
            <h3 className="text-sm font-medium mb-2">Audit Logs</h3>
            <p className="text-sm text-muted-foreground">
              View audit logs of all changes made to products and forms.
              This feature will be available once you connect to Gadget.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GadgetSettings;
