
// Shopify Dev Assistant service for MCP (Multi Connection Protocol) connections

export type MCPConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export type MCPConnectionConfig = {
  endpoint: string;
  apiKey: string;
  storeUrl: string;
  useAI: boolean;
};

export type MCPConnectionInfo = {
  id: string;
  status: MCPConnectionStatus;
  config: MCPConnectionConfig;
  connectedAt?: string;
  lastActivity?: string;
};

export type MCPMessageType = 'query' | 'command' | 'event' | 'response';

export interface MCPMessage {
  type: MCPMessageType;
  payload: any;
  timestamp: number;
}

// Store active connections
const activeConnections: Record<string, MCPConnectionInfo> = {};

/**
 * Initialize an MCP connection to Shopify Dev Assistant
 */
export const initMCPConnection = async (config: MCPConnectionConfig): Promise<MCPConnectionInfo> => {
  // This would actually connect to Shopify's MCP server in a real implementation
  console.log('Initializing MCP connection to Shopify Dev Assistant', config);
  
  // Simulate connection process
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const connectionInfo = {
    id: `mcp-${Date.now()}`,
    status: 'connected' as MCPConnectionStatus,
    config,
    connectedAt: new Date().toISOString()
  };
  
  // Store in active connections
  activeConnections[connectionInfo.id] = connectionInfo;
  
  return connectionInfo;
};

/**
 * Disconnect from Shopify Dev Assistant
 */
export const disconnectMCP = async (connectionId: string): Promise<void> => {
  console.log(`Disconnecting from MCP connection: ${connectionId}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Remove from active connections
  delete activeConnections[connectionId];
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
  
  const connection = activeConnections[connectionId];
  if (!connection) {
    throw new Error(`Connection not found: ${connectionId}`);
  }
  
  // Update last activity
  activeConnections[connectionId] = {
    ...connection,
    lastActivity: new Date().toISOString()
  };
  
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
  } else if (query.toLowerCase().includes('order')) {
    return {
      answer: "Orders in Shopify represent customer purchases. You can access and manage orders through the Admin API.",
      relevantDocs: [
        "https://shopify.dev/api/admin-rest/current/resources/order",
        "https://shopify.dev/api/admin-graphql/current/objects/Order"
      ],
      codeSnippets: [
        `// Fetch recent orders via REST API
const orders = await shopify.api.rest.Order.all({
  session: session,
  status: "any",
  limit: 10,
});`
      ]
    };
  } else if (query.toLowerCase().includes('inventory')) {
    return {
      answer: "Inventory in Shopify is managed through InventoryItems and InventoryLevels. InventoryItems represent a product's inventory across all locations, while InventoryLevels represent the inventory at a specific location.",
      relevantDocs: [
        "https://shopify.dev/api/admin-rest/current/resources/inventorylevel",
        "https://shopify.dev/api/admin-graphql/current/objects/InventoryItem"
      ],
      codeSnippets: [
        `// Adjust inventory level via GraphQL
const adjustInventoryMutation = await client.query({
  data: \`mutation {
    inventoryAdjustQuantity(input: {
      inventoryLevelId: "gid://shopify/InventoryLevel/123456",
      availableDelta: 5
    }) {
      inventoryLevel {
        available
      }
      userErrors {
        field
        message
      }
    }
  }\`
});`
      ]
    };
  } else if (query.toLowerCase().includes('theme') || query.toLowerCase().includes('liquid')) {
    return {
      answer: "Shopify themes use the Liquid templating language. Liquid is a template language created by Shopify and written in Ruby. It is used to load dynamic content on storefronts.",
      relevantDocs: [
        "https://shopify.dev/themes/architecture",
        "https://shopify.dev/api/liquid"
      ],
      codeSnippets: [
        `<!-- Display a collection's products in Liquid -->
{% for product in collection.products %}
  <div class="product">
    <h2>{{ product.title }}</h2>
    <p>{{ product.price | money }}</p>
    {% if product.available %}
      <span class="in-stock">In stock</span>
    {% else %}
      <span class="sold-out">Sold out</span>
    {% endif %}
  </div>
{% endfor %}`
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
 * Send a command to the Shopify Dev Assistant
 */
export const sendMCPCommand = async (
  connectionId: string,
  command: string,
  params: Record<string, any> = {}
): Promise<any> => {
  console.log(`Sending command to Dev Assistant on connection ${connectionId}: ${command}`, params);
  
  const connection = activeConnections[connectionId];
  if (!connection) {
    throw new Error(`Connection not found: ${connectionId}`);
  }
  
  // Simulate command processing
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock command responses
  switch (command) {
    case 'validate-theme':
      return {
        success: true,
        issues: [
          { severity: 'warning', message: 'Unused CSS selector in assets/theme.css', location: 'assets/theme.css:245' },
          { severity: 'info', message: 'Consider using srcset for responsive images', location: 'templates/product.liquid:56' }
        ]
      };
    case 'analyze-performance':
      return {
        success: true,
        score: 87,
        recommendations: [
          'Optimize images to reduce page load time',
          'Add browser caching headers to static assets',
          'Minify JavaScript files'
        ]
      };
    default:
      return { success: false, error: 'Unknown command' };
  }
};

/**
 * Get connection status
 */
export const getConnectionStatus = async (connectionId: string): Promise<MCPConnectionStatus> => {
  const connection = activeConnections[connectionId];
  return connection?.status || 'disconnected';
};

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

/**
 * Check health of MCP connection
 */
export const checkMCPConnectionHealth = async (connectionId: string): Promise<{
  status: MCPConnectionStatus;
  latency: number;
  errors?: string[];
}> => {
  const connection = activeConnections[connectionId];
  if (!connection) {
    return {
      status: 'error',
      latency: 0,
      errors: ['Connection not found']
    };
  }
  
  // Simulate connection check
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    status: connection.status,
    latency: 42 // simulated latency in ms
  };
};

/**
 * Register for MCP events
 */
export const registerMCPEventListener = (
  connectionId: string,
  eventType: string,
  callback: (event: any) => void
): () => void => {
  console.log(`Registered for ${eventType} events on connection ${connectionId}`);
  
  // In a real implementation, this would set up event listeners
  // For now, return an unregister function
  return () => {
    console.log(`Unregistered from ${eventType} events on connection ${connectionId}`);
  };
};
