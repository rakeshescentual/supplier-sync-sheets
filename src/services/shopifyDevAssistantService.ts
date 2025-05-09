
// Shopify Dev Assistant service for MCP (Multi Connection Protocol) connections

type MCPConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

type MCPConnectionConfig = {
  endpoint: string;
  apiKey: string;
  storeUrl: string;
  useAI: boolean;
};

type MCPConnectionInfo = {
  id: string;
  status: MCPConnectionStatus;
  config: MCPConnectionConfig;
  connectedAt?: string;
  lastActivity?: string;
};

/**
 * Initialize an MCP connection to Shopify Dev Assistant
 */
export const initMCPConnection = async (config: MCPConnectionConfig): Promise<MCPConnectionInfo> => {
  // This would actually connect to Shopify's MCP server in a real implementation
  console.log('Initializing MCP connection to Shopify Dev Assistant', config);
  
  // Simulate connection process
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    id: `mcp-${Date.now()}`,
    status: 'connected',
    config,
    connectedAt: new Date().toISOString()
  };
};

/**
 * Disconnect from Shopify Dev Assistant
 */
export const disconnectMCP = async (connectionId: string): Promise<void> => {
  console.log(`Disconnecting from MCP connection: ${connectionId}`);
  await new Promise(resolve => setTimeout(resolve, 500));
};

/**
 * Send a query to the Shopify Dev Assistant
 */
export const queryDevAssistant = async (
  connectionId: string, 
  query: string
): Promise<{
  answer: string;
  relevantDocs?: string[];
  codeSnippets?: string[];
}> => {
  console.log(`Querying Dev Assistant on connection ${connectionId}: ${query}`);
  
  // Simulate response delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock responses based on query content
  if (query.toLowerCase().includes('product')) {
    return {
      answer: "Products in Shopify are the items you sell in your store. You can manage them through the Admin API or GraphQL API.",
      relevantDocs: [
        "https://shopify.dev/api/admin-rest/current/resources/product",
        "https://shopify.dev/api/admin-graphql/current/objects/Product"
      ],
      codeSnippets: [
        `// Fetch products via GraphQL
const { products } = await client.query({
  data: \`{
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          variants {
            edges {
              node {
                id
                price
              }
            }
          }
        }
      }
    }
  }\`
});`
      ]
    };
  }
  
  // Default response
  return {
    answer: "I can help you with Shopify development questions. Please ask about specific Shopify APIs, features, or development patterns.",
    relevantDocs: ["https://shopify.dev/docs"]
  };
};

/**
 * Get connection status
 */
export const getConnectionStatus = async (connectionId: string): Promise<MCPConnectionStatus> => {
  // This would check the actual connection status in a real implementation
  return 'connected';
};

// Store active connections
const activeConnections: Record<string, MCPConnectionInfo> = {};

/**
 * Get all active connections
 */
export const getActiveConnections = (): MCPConnectionInfo[] => {
  return Object.values(activeConnections);
};

/**
 * Save a connection to local storage
 */
export const saveConnectionToLocalStorage = (connection: MCPConnectionInfo): void => {
  try {
    const connections = JSON.parse(localStorage.getItem('shopify_mcp_connections') || '[]');
    const existingIndex = connections.findIndex((c: MCPConnectionInfo) => c.id === connection.id);
    
    if (existingIndex >= 0) {
      connections[existingIndex] = connection;
    } else {
      connections.push(connection);
    }
    
    localStorage.setItem('shopify_mcp_connections', JSON.stringify(connections));
    activeConnections[connection.id] = connection;
  } catch (error) {
    console.error('Error saving connection to localStorage', error);
  }
};

/**
 * Load connections from local storage
 */
export const loadConnectionsFromLocalStorage = (): MCPConnectionInfo[] => {
  try {
    const connections = JSON.parse(localStorage.getItem('shopify_mcp_connections') || '[]');
    connections.forEach((conn: MCPConnectionInfo) => {
      activeConnections[conn.id] = conn;
    });
    return connections;
  } catch (error) {
    console.error('Error loading connections from localStorage', error);
    return [];
  }
};

/**
 * Remove a connection from local storage
 */
export const removeConnectionFromLocalStorage = (connectionId: string): void => {
  try {
    const connections = JSON.parse(localStorage.getItem('shopify_mcp_connections') || '[]');
    const filteredConnections = connections.filter((c: MCPConnectionInfo) => c.id !== connectionId);
    localStorage.setItem('shopify_mcp_connections', JSON.stringify(filteredConnections));
    delete activeConnections[connectionId];
  } catch (error) {
    console.error('Error removing connection from localStorage', error);
  }
};
