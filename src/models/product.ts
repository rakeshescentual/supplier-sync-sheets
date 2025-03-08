
// These interfaces are designed to align with Gadget.dev's data structure
// You can modify them based on your specific Gadget.dev schema

export interface Product {
  id: string;
  shopifyId?: string;
  title: string;
  description?: string;
  vendor?: string;
  productType?: string;
  tags?: string[];
  status: "active" | "draft" | "archived";
  syncStatus: "synced" | "unsynced" | "issues";
  handle: string;
  options?: ProductOption[];
  variants: ProductVariant[];
  images: ProductImage[];
  metafields: Metafield[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductOption {
  id: string;
  name: string;
  position: number;
  values: string[];
}

export interface ProductVariant {
  id: string;
  shopifyId?: string;
  title: string;
  sku?: string;
  barcode?: string;
  price: number;
  compareAtPrice?: number;
  position: number;
  inventoryQuantity: number;
  weight?: number;
  weightUnit?: string;
  requiresShipping: boolean;
  taxable: boolean;
  imageId?: string;
  optionValues: { [key: string]: string };
  metafields: Metafield[];
}

export interface ProductImage {
  id: string;
  shopifyId?: string;
  src: string;
  position: number;
  alt?: string;
}

export interface Metafield {
  id: string;
  shopifyId?: string;
  namespace: string;
  key: string;
  value: string;
  type: string;
  description?: string;
}

// API service interfaces
export interface SyncStatus {
  status: "idle" | "in-progress" | "completed" | "failed";
  progress: number;
  lastSync: string;
  syncedProducts: number;
  totalProducts: number;
  estimatedTimeRemaining?: string;
  error?: string;
}

export interface FilterOptions {
  filter: "all" | "synced" | "unsynced" | "issues";
  searchQuery?: string;
  page?: number;
  limit?: number;
}

// This will be implemented when connecting to Gadget.dev
export interface GadgetApiService {
  getProducts: (options: FilterOptions) => Promise<Product[]>;
  getProduct: (id: string) => Promise<Product>;
  syncProducts: () => Promise<void>;
  getSyncStatus: () => Promise<SyncStatus>;
}
