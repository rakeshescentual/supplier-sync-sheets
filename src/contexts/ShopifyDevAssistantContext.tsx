
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MCPConnectionInfo,
  loadConnectionsFromLocalStorage,
  saveConnectionToLocalStorage,
  removeConnectionFromLocalStorage,
  initMCPConnection,
  disconnectMCP,
  MCPConnectionConfig
} from '@/services/shopifyDevAssistantService';
import { useToast } from '@/hooks/use-toast';

interface ShopifyDevAssistantContextType {
  connections: MCPConnectionInfo[];
  activeConnectionId: string | null;
  isConnecting: boolean;
  connect: (config: MCPConnectionConfig) => Promise<MCPConnectionInfo | null>;
  disconnect: (connectionId: string) => Promise<boolean>;
  setActiveConnection: (connectionId: string) => void;
}

const ShopifyDevAssistantContext = createContext<ShopifyDevAssistantContextType | undefined>(undefined);

export const ShopifyDevAssistantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [connections, setConnections] = useState<MCPConnectionInfo[]>([]);
  const [activeConnectionId, setActiveConnectionId] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  useEffect(() => {
    // Load saved connections on component mount
    const savedConnections = loadConnectionsFromLocalStorage();
    setConnections(savedConnections);
    
    // Set the first connection as active if available
    if (savedConnections.length > 0 && !activeConnectionId) {
      setActiveConnectionId(savedConnections[0].id);
    }
  }, []);

  const connect = async (config: MCPConnectionConfig): Promise<MCPConnectionInfo | null> => {
    if (isConnecting) return null;
    
    setIsConnecting(true);
    try {
      const connection = await initMCPConnection(config);
      saveConnectionToLocalStorage(connection);
      
      setConnections(prev => {
        const updated = [...prev.filter(conn => conn.id !== connection.id), connection];
        return updated;
      });
      
      if (!activeConnectionId) {
        setActiveConnectionId(connection.id);
      }
      
      toast({
        title: "Connected",
        description: `Successfully connected to ${config.storeUrl}`,
      });
      
      return connection;
    } catch (error) {
      console.error('Error connecting to Shopify Dev Assistant:', error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to Shopify Dev Assistant",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = async (connectionId: string): Promise<boolean> => {
    try {
      await disconnectMCP(connectionId);
      removeConnectionFromLocalStorage(connectionId);
      
      setConnections(prev => prev.filter(conn => conn.id !== connectionId));
      
      if (activeConnectionId === connectionId) {
        const remainingConnections = connections.filter(conn => conn.id !== connectionId);
        setActiveConnectionId(remainingConnections.length > 0 ? remainingConnections[0].id : null);
      }
      
      toast({
        title: "Disconnected",
        description: "Successfully disconnected from Shopify Dev Assistant",
      });
      
      return true;
    } catch (error) {
      console.error('Error disconnecting from Shopify Dev Assistant:', error);
      toast({
        title: "Disconnect Failed",
        description: "Could not disconnect from Shopify Dev Assistant",
        variant: "destructive",
      });
      return false;
    }
  };

  const setActiveConnection = (connectionId: string) => {
    if (connections.some(conn => conn.id === connectionId)) {
      setActiveConnectionId(connectionId);
    }
  };

  const value = {
    connections,
    activeConnectionId,
    isConnecting,
    connect,
    disconnect,
    setActiveConnection
  };

  return (
    <ShopifyDevAssistantContext.Provider value={value}>
      {children}
    </ShopifyDevAssistantContext.Provider>
  );
};

export const useShopifyDevAssistant = () => {
  const context = useContext(ShopifyDevAssistantContext);
  if (context === undefined) {
    throw new Error('useShopifyDevAssistant must be used within a ShopifyDevAssistantProvider');
  }
  return context;
};
