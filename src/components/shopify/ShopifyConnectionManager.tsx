
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { 
  Server, 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  CheckCircle, 
  Loader 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  initMCPConnection,
  disconnectMCP,
  getConnectionStatus,
  loadConnectionsFromLocalStorage,
  saveConnectionToLocalStorage,
  removeConnectionFromLocalStorage,
  type MCPConnectionInfo
} from "@/services/shopifyDevAssistantService";

const ShopifyConnectionManager: React.FC = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [endpoint, setEndpoint] = useState("https://mcp.shopify.com/dev-assistant");
  const [storeUrl, setStoreUrl] = useState("");
  const [useAI, setUseAI] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [connections, setConnections] = useState<MCPConnectionInfo[]>([]);
  
  useEffect(() => {
    // Load saved connections on component mount
    const savedConnections = loadConnectionsFromLocalStorage();
    setConnections(savedConnections);
  }, []);

  const handleConnect = async () => {
    if (!apiKey || !storeUrl) {
      toast({
        title: "Missing Information",
        description: "Please provide both API key and Store URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const connection = await initMCPConnection({
        apiKey,
        endpoint,
        storeUrl,
        useAI
      });
      
      saveConnectionToLocalStorage(connection);
      setConnections(prev => [...prev, connection]);
      
      toast({
        title: "Connected to Shopify Dev Assistant",
        description: `Successfully connected to ${storeUrl}`,
      });
    } catch (error) {
      console.error("Failed to connect to Shopify Dev Assistant:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Shopify Dev Assistant. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async (connectionId: string) => {
    try {
      await disconnectMCP(connectionId);
      removeConnectionFromLocalStorage(connectionId);
      setConnections(prev => prev.filter(conn => conn.id !== connectionId));
      
      toast({
        title: "Disconnected",
        description: "Successfully disconnected from Shopify Dev Assistant"
      });
    } catch (error) {
      console.error("Failed to disconnect:", error);
      toast({
        title: "Disconnect Failed",
        description: "Failed to disconnect from Shopify Dev Assistant",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="api-key">Shopify API Key</Label>
          <Input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Shopify API key"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="store-url">Shopify Store URL</Label>
          <Input
            id="store-url"
            type="text"
            value={storeUrl}
            onChange={(e) => setStoreUrl(e.target.value)}
            placeholder="your-store.myshopify.com"
          />
          <p className="text-xs text-muted-foreground">
            Enter your Shopify store URL (e.g., your-store.myshopify.com)
          </p>
        </div>

        <div className="space-y-4 mt-2">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="use-ai">Enable AI Features</Label>
              <p className="text-xs text-muted-foreground">
                Use AI-powered suggestions and responses
              </p>
            </div>
            <Switch
              id="use-ai"
              checked={useAI}
              onCheckedChange={setUseAI}
            />
          </div>
        </div>

        <Button onClick={handleConnect} disabled={isLoading} className="mt-2">
          {isLoading ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Server className="h-4 w-4 mr-2" />
              Connect to Shopify Dev Assistant
            </>
          )}
        </Button>
      </div>

      {connections.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Active Connections</h3>
          {connections.map(connection => (
            <div key={connection.id} className="border rounded-md p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {connection.status === 'connected' ? (
                    <Wifi className="h-4 w-4 text-green-500 mr-2" />
                  ) : connection.status === 'error' ? (
                    <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                  ) : connection.status === 'connecting' ? (
                    <Loader className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-gray-500 mr-2" />
                  )}
                  <span className="font-medium">{connection.config.storeUrl}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDisconnect(connection.id)}
                >
                  Disconnect
                </Button>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {connection.connectedAt && (
                  <p>Connected since: {new Date(connection.connectedAt).toLocaleString()}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Alert className="bg-blue-50 border-blue-200">
        <Server className="h-4 w-4 text-blue-500" />
        <AlertTitle>About Shopify Dev Assistant</AlertTitle>
        <AlertDescription>
          <p className="mb-2">
            The Shopify Dev Assistant provides AI-powered help for Shopify development. Connect your store to:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Get AI-powered answers to Shopify development questions</li>
            <li>Access real-time data from your Shopify store</li>
            <li>Receive code snippets tailored to your store's configuration</li>
            <li>Debug issues with expert guidance</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ShopifyConnectionManager;
