
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { gadgetService } from "@/services/gadgetService";

const GadgetConfig: React.FC = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    if (!apiKey || !endpoint) {
      toast({
        title: "Missing Information",
        description: "Please provide both API key and endpoint URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // In a real implementation, this would connect to Gadget.dev
      gadgetService.initializeGadgetClient(apiKey, endpoint);
      
      // Simulate successful connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsConnected(true);
      toast({
        title: "Connected to Gadget",
        description: "Successfully connected to your Gadget.dev application",
      });
    } catch (error) {
      console.error("Failed to connect to Gadget:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Gadget.dev. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="api-key">Gadget API Key</Label>
          <Input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Gadget API key"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endpoint">Gadget Endpoint URL</Label>
          <Input
            id="endpoint"
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="https://your-app.gadget.app/api"
          />
          <p className="text-xs text-muted-foreground">
            You can find your API endpoint in your Gadget.dev app settings.
          </p>
        </div>

        <Button onClick={handleConnect} disabled={isLoading}>
          {isLoading ? "Connecting..." : "Connect to Gadget"}
        </Button>
      </div>

      {isConnected && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle>Connected to Gadget</AlertTitle>
          <AlertDescription>
            Your app is successfully connected to Gadget.dev. All product data will be synced with your Gadget app.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Using Gadget.dev with this app</h3>
        <p className="text-sm text-muted-foreground">
          This application is designed to work with a Gadget.dev backend. Create a Gadget app with models for Products, ProductVariants, Metafields, and SyncStatus to get started.
        </p>
        <p className="text-sm text-muted-foreground">
          Configure your Gadget app to connect to Shopify and set up the necessary webhooks for product data syncing.
        </p>
      </div>
    </div>
  );
};

export default GadgetConfig;
