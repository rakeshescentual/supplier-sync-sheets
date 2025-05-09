
import React, { useState } from "react";
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
  Loader,
  Activity
} from "lucide-react";
import { useShopifyDevAssistant } from "@/contexts/ShopifyDevAssistantContext";
import { checkMCPConnectionHealth } from "@/services/shopifyDevAssistantService";
import { useState as useStateHook } from "react";

const ShopifyConnectionManager: React.FC = () => {
  const { connections, isConnecting, connect, disconnect } = useShopifyDevAssistant();
  const [apiKey, setApiKey] = useState("");
  const [endpoint, setEndpoint] = useState("https://mcp.shopify.com/dev-assistant");
  const [storeUrl, setStoreUrl] = useState("");
  const [useAI, setUseAI] = useState(true);
  const [connectionHealth, setConnectionHealth] = useState<Record<string, { 
    isChecking: boolean; 
    latency?: number; 
    status?: string;
  }>>({});

  const handleConnect = async () => {
    if (!apiKey || !storeUrl) {
      return;
    }

    await connect({
      apiKey,
      endpoint,
      storeUrl,
      useAI
    });
  };

  const handleDisconnect = async (connectionId: string) => {
    await disconnect(connectionId);
  };

  const checkConnectionHealth = async (connectionId: string) => {
    setConnectionHealth(prev => ({
      ...prev,
      [connectionId]: { ...prev[connectionId], isChecking: true }
    }));
    
    try {
      const health = await checkMCPConnectionHealth(connectionId);
      setConnectionHealth(prev => ({
        ...prev,
        [connectionId]: { 
          isChecking: false, 
          latency: health.latency,
          status: health.status
        }
      }));
    } catch (error) {
      console.error("Error checking connection health:", error);
      setConnectionHealth(prev => ({
        ...prev,
        [connectionId]: { 
          isChecking: false, 
          status: 'error'
        }
      }));
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
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="endpoint">MCP Endpoint</Label>
              <p className="text-xs text-muted-foreground">
                Advanced: Custom MCP server endpoint
              </p>
            </div>
            <div className="w-2/3">
              <Input
                id="endpoint"
                type="text"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                placeholder="https://mcp.shopify.com/dev-assistant"
              />
            </div>
          </div>
        </div>

        <Button onClick={handleConnect} disabled={isConnecting} className="mt-2">
          {isConnecting ? (
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
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => checkConnectionHealth(connection.id)}
                    disabled={connectionHealth[connection.id]?.isChecking}
                  >
                    {connectionHealth[connection.id]?.isChecking ? (
                      <Loader className="h-3 w-3 animate-spin" />
                    ) : (
                      <Activity className="h-3 w-3 mr-1" />
                    )}
                    <span className="ml-1">Health</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDisconnect(connection.id)}
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {connection.connectedAt && (
                  <p>Connected since: {new Date(connection.connectedAt).toLocaleString()}</p>
                )}
                {connectionHealth[connection.id]?.latency !== undefined && (
                  <p className="mt-1">
                    Latency: <span className="font-medium">{connectionHealth[connection.id].latency}ms</span>
                  </p>
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
