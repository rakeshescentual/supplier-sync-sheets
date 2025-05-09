
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShopifyConnectionManager from "@/components/shopify/ShopifyConnectionManager";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loadConnectionsFromLocalStorage, queryDevAssistant, MCPConnectionInfo } from "@/services/shopifyDevAssistantService";
import { MessageCircle, BookOpen, Server, Loader } from "lucide-react";

const ShopifyDevAssistant = () => {
  const [activeConnections, setActiveConnections] = useState<MCPConnectionInfo[]>([]);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<{
    answer: string;
    relevantDocs?: string[];
    codeSnippets?: string[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);
  
  useEffect(() => {
    // Load saved connections on component mount
    const savedConnections = loadConnectionsFromLocalStorage();
    setActiveConnections(savedConnections);
    
    // Set the first connection as selected if available
    if (savedConnections.length > 0) {
      setSelectedConnectionId(savedConnections[0].id);
    }
  }, []);

  const handleQuery = async () => {
    if (!selectedConnectionId || !query.trim()) return;
    
    setIsLoading(true);
    try {
      const result = await queryDevAssistant(selectedConnectionId, query);
      setResponse(result);
    } catch (error) {
      console.error("Error querying Dev Assistant:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-blue-500" />
                Shopify Dev Assistant
              </CardTitle>
              <CardDescription>
                Ask questions about Shopify development, APIs, and best practices.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeConnections.length > 0 ? (
                <>
                  {activeConnections.length > 1 && (
                    <div className="mb-4">
                      <label htmlFor="connection-select" className="block text-sm font-medium mb-1">
                        Select Connection
                      </label>
                      <select 
                        id="connection-select"
                        className="w-full border rounded p-2"
                        value={selectedConnectionId || ''}
                        onChange={(e) => setSelectedConnectionId(e.target.value)}
                      >
                        {activeConnections.map(conn => (
                          <option key={conn.id} value={conn.id}>
                            {conn.config.storeUrl}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Ask something about Shopify development..." 
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleQuery()}
                    />
                    <Button onClick={handleQuery} disabled={isLoading || !query.trim()}>
                      {isLoading ? (
                        <>
                          <Loader className="h-4 w-4 mr-2 animate-spin" />
                          Loading...
                        </>
                      ) : "Ask"}
                    </Button>
                  </div>
                  
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader className="h-8 w-8 animate-spin text-blue-500" />
                    </div>
                  ) : response ? (
                    <div className="mt-6 space-y-4">
                      <div className="rounded-md border p-4">
                        <h3 className="text-sm font-medium mb-2">Answer</h3>
                        <div className="prose max-w-none text-sm">
                          {response.answer}
                        </div>
                      </div>
                      
                      {response.codeSnippets && response.codeSnippets.length > 0 && (
                        <div className="rounded-md border p-4">
                          <h3 className="text-sm font-medium mb-2">Code Example</h3>
                          <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
                            {response.codeSnippets[0]}
                          </pre>
                        </div>
                      )}
                      
                      {response.relevantDocs && response.relevantDocs.length > 0 && (
                        <div className="rounded-md border p-4">
                          <h3 className="text-sm font-medium mb-2">Relevant Documentation</h3>
                          <ul className="text-sm space-y-1">
                            {response.relevantDocs.map((doc, idx) => (
                              <li key={idx}>
                                <a 
                                  href={doc} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:underline"
                                >
                                  {doc}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="text-center py-6">
                  <p className="mb-4 text-muted-foreground">
                    Connect to a Shopify store to get started with the Dev Assistant.
                  </p>
                  <Button variant="outline" onClick={() => document.querySelector('[data-value="connection"]')?.click()}>
                    <Server className="h-4 w-4 mr-2" />
                    Set Up Connection
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="docs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                Documentation Resources
              </CardTitle>
              <CardDescription>
                Access relevant Shopify documentation and resources.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a 
                  href="https://shopify.dev/api/admin-graphql" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-4 border rounded-md hover:bg-gray-50"
                >
                  <h3 className="font-medium mb-1">Admin GraphQL API</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive GraphQL API for managing Shopify stores
                  </p>
                </a>
                <a 
                  href="https://shopify.dev/api/admin-rest" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-4 border rounded-md hover:bg-gray-50"
                >
                  <h3 className="font-medium mb-1">Admin REST API</h3>
                  <p className="text-sm text-muted-foreground">
                    REST API for Shopify admin functionality
                  </p>
                </a>
                <a 
                  href="https://shopify.dev/api/storefront" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-4 border rounded-md hover:bg-gray-50"
                >
                  <h3 className="font-medium mb-1">Storefront API</h3>
                  <p className="text-sm text-muted-foreground">
                    Build custom storefronts with Shopify's commerce API
                  </p>
                </a>
                <a 
                  href="https://shopify.dev/apps/tools/app-bridge" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-4 border rounded-md hover:bg-gray-50"
                >
                  <h3 className="font-medium mb-1">App Bridge</h3>
                  <p className="text-sm text-muted-foreground">
                    Create seamless app experiences within the Shopify Admin
                  </p>
                </a>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShopifyDevAssistant;
