
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

// Mock API key and endpoint
let gadgetApiKey: string | null = null;
let gadgetEndpoint: string | null = null;

/**
 * Configure Gadget API connection
 */
export const configureGadget = (apiKey: string, endpoint: string): void => {
  gadgetApiKey = apiKey;
  gadgetEndpoint = endpoint;
  console.log("Gadget configured with API key and endpoint");
};

/**
 * Check if Gadget is configured
 */
export const isGadgetConfigured = (): boolean => {
  return !!(gadgetApiKey && gadgetEndpoint);
};

/**
 * Get Gadget connection info
 */
export const getGadgetConfig = (): { apiKey: string | null; endpoint: string | null } => {
  return {
    apiKey: gadgetApiKey,
    endpoint: gadgetEndpoint
  };
};

/**
 * Fetch products (mock implementation for development)
 */
export const fetchProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockProducts;
};

/**
 * Save a product
 */
export const saveProduct = async (product: Partial<Product>): Promise<Product> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
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
  
  // In a real app, this would send the product to Gadget.dev
  console.log("Product saved:", newProduct);
  
  return newProduct;
};

/**
 * Sync products with Shopify
 */
export const syncProducts = async (): Promise<{
  status: "idle" | "in-progress" | "completed" | "failed";
  syncedCount: number;
}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // In a real app, this would trigger a sync with Shopify via Gadget.dev
  console.log("Syncing products with Shopify");
  
  return {
    status: "completed",
    syncedCount: mockProducts.length
  };
};

/**
 * Get current sync status
 */
export const getSyncStatus = async (): Promise<{
  status: "idle" | "in-progress" | "completed" | "failed";
  progress: number;
  syncedCount: number;
  lastSyncTime: string | null;
}> => {
  // In a real app, this would get the sync status from Gadget.dev
  return {
    status: "idle",
    progress: 100,
    syncedCount: mockProducts.length,
    lastSyncTime: "2023-01-01T00:00:00Z"
  };
};
