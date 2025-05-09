
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, RefreshCw, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { configureGadget, isGadgetConfigured, getGadgetConfig } from "@/services/gadgetService";
import { Switch } from "@/components/ui/switch";

const GadgetConfig: React.FC = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [useConnectionPooling, setUseConnectionPooling] = useState(true);
  const [useAdvancedFeatures, setUseAdvancedFeatures] = useState(false);

  useEffect(() => {
    // Check if Gadget is already configured
    const isConfigured = isGadgetConfigured();
    if (isConfigured) {
      const config = getGadgetConfig();
      if (config.apiKey && config.endpoint) {
        setApiKey(config.apiKey);
        setEndpoint(config.endpoint);
        setIsConnected(true);
      }
    }
  }, []);

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
      configureGadget(apiKey, endpoint);
      
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

        <div className="space-y-4 mt-2">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="connection-pooling">Use Connection Pooling</Label>
              <p className="text-xs text-muted-foreground">
                Improves performance for multiple requests
              </p>
            </div>
            <Switch
              id="connection-pooling"
              checked={useConnectionPooling}
              onCheckedChange={setUseConnectionPooling}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="advanced-features">Use Advanced Features</Label>
              <p className="text-xs text-muted-foreground">
                Enable background jobs and transaction support
              </p>
            </div>
            <Switch
              id="advanced-features"
              checked={useAdvancedFeatures}
              onCheckedChange={setUseAdvancedFeatures}
            />
          </div>
        </div>

        <Button onClick={handleConnect} disabled={isLoading} className="mt-2">
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Connecting...
            </>
          ) : (
            "Connect to Gadget"
          )}
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
        <Alert className="bg-blue-50 border-blue-200 mt-2">
          <Shield className="h-4 w-4 text-blue-500" />
          <AlertTitle>Latest Gadget Features</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Background Jobs: Process long-running tasks asynchronously</li>
              <li>Transaction Support: Ensure data consistency with atomic operations</li>
              <li>Enhanced API Client: Improved connection pooling and response management</li>
              <li>File Storage: Upload and manage files with metadata support</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default GadgetConfig;
