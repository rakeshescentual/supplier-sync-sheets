
import { Product, ProductVariant } from "@/models/product";

// Mock data for development
const mockProducts: Product[] = [
  {
    id: "p1",
    title: "Premium Hydrating Face Cream",
    description: "A deeply hydrating face cream for all skin types.",
    status: "active",
    syncStatus: "synced",
    handle: "premium-hydrating-face-cream",
    variants: [
      {
        id: "v1",
        title: "Default",
        price: 29.99,
        position: 1,
        inventoryQuantity: 100,
        requiresShipping: true,
        taxable: true,
        metafields: [],
        optionValues: {}
      }
    ],
    images: [],
    metafields: [],
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z"
  },
  // More mock products...
];

// Configuration for Gadget client
type GadgetConfig = {
  apiKey: string | null;
  endpoint: string | null;
  connectionPooling: boolean;
  useAdvancedFeatures: boolean;
};

// Mock API key and endpoint
const gadgetConfig: GadgetConfig = {
  apiKey: null,
  endpoint: null,
  connectionPooling: true,
  useAdvancedFeatures: false
};

/**
 * Configure Gadget API connection
 */
export const configureGadget = (
  apiKey: string, 
  endpoint: string, 
  options?: { 
    connectionPooling?: boolean; 
    useAdvancedFeatures?: boolean 
  }
): void => {
  gadgetConfig.apiKey = apiKey;
  gadgetConfig.endpoint = endpoint;
  
  if (options) {
    if (options.connectionPooling !== undefined) {
      gadgetConfig.connectionPooling = options.connectionPooling;
    }
    if (options.useAdvancedFeatures !== undefined) {
      gadgetConfig.useAdvancedFeatures = options.useAdvancedFeatures;
    }
  }
  
  console.log("Gadget configured with API key and endpoint", {
    endpoint,
    connectionPooling: gadgetConfig.connectionPooling,
    useAdvancedFeatures: gadgetConfig.useAdvancedFeatures
  });
};

/**
 * Check if Gadget is configured
 */
export const isGadgetConfigured = (): boolean => {
  return !!(gadgetConfig.apiKey && gadgetConfig.endpoint);
};

/**
 * Get Gadget connection info
 */
export const getGadgetConfig = (): { apiKey: string | null; endpoint: string | null } => {
  return {
    apiKey: gadgetConfig.apiKey,
    endpoint: gadgetConfig.endpoint
  };
};

/**
 * Fetch products with support for the latest Gadget.dev features
 */
export const fetchProducts = async (options?: {
  filter?: string;
  searchQuery?: string;
  page?: number;
  limit?: number;
  sort?: string;
  sortDirection?: 'asc' | 'desc';
}): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Log the API request for debugging
  console.log("Fetching products with options:", options);
  
  // In a real implementation, we would use the Gadget.dev client to fetch products
  // with the specified options, leveraging the latest API features like sorting and filtering
  
  return mockProducts;
};

/**
 * Save a product with improved error handling and background job support
 */
export const saveProduct = async (product: Partial<Product>): Promise<Product> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, we would use Gadget.dev's transaction support for data consistency
  console.log("Product saved with transaction support:", product);
  
  const newProduct: Product = {
    id: product.id || `p${Date.now()}`,
    title: product.title || "New Product",
    description: product.description || "",
    status: product.status || "active",
    syncStatus: product.syncStatus || "unsynced",
    handle: product.handle || `new-product-${Date.now()}`,
    variants: product.variants?.map(v => ({
      id: v.id || `v${Date.now()}`,
      title: v.title || "Default",
      price: v.price || 0,
      position: v.position || 1,
      inventoryQuantity: v.inventoryQuantity || 0,
      requiresShipping: true,
      taxable: true,
      metafields: v.metafields || [],
      optionValues: v.optionValues || {}
    })) || [],
    images: product.images || [],
    metafields: product.metafields || [],
    createdAt: product.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  return newProduct;
};

/**
 * Sync products with Shopify using Gadget.dev's background jobs
 */
export const syncProducts = async (): Promise<{
  status: "idle" | "in-progress" | "completed" | "failed";
  syncedCount: number;
  jobId?: string;
}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // In a real app, this would use Gadget.dev's background jobs
  console.log("Syncing products with Shopify using background job");
  
  const jobId = `job-${Date.now()}`;
  
  return {
    status: "completed",
    syncedCount: mockProducts.length,
    jobId
  };
};

/**
 * Get current sync status with enhanced reporting
 */
export const getSyncStatus = async (): Promise<{
  status: "idle" | "in-progress" | "completed" | "failed";
  progress: number;
  syncedCount: number;
  lastSyncTime: string | null;
  jobId?: string;
  errors?: Array<{ message: string; code: string; productId?: string }>;
  stats?: {
    added: number;
    updated: number;
    deleted: number;
    skipped: number;
  };
}> => {
  // In a real app, this would get the sync status from Gadget.dev
  return {
    status: "idle",
    progress: 100,
    syncedCount: mockProducts.length,
    lastSyncTime: "2023-01-01T00:00:00Z",
    stats: {
      added: 50,
      updated: 120,
      deleted: 5,
      skipped: 10
    }
  };
};

/**
 * Check webhooks status using Gadget.dev's new webhook management API
 */
export const checkWebhooksStatus = async (): Promise<{
  active: boolean;
  registered: string[];
  missing: string[];
  lastTriggered?: string;
}> => {
  // In a real app, this would check webhook status via Gadget.dev
  return {
    active: true,
    registered: [
      "products/create", 
      "products/update", 
      "products/delete"
    ],
    missing: [],
    lastTriggered: "2023-03-15T14:30:00Z"
  };
};

/**
 * Upload a file to Gadget.dev storage
 */
export const uploadFile = async (file: File): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would upload the file to Gadget.dev storage
  console.log("File uploaded to Gadget.dev storage:", file.name);
  
  return `https://storage.gadget.dev/files/${file.name}`;
};
