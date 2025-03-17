
# Gadget.dev API Integration Documentation

This document provides technical details about how this application integrates with Gadget.dev's API.

## API Service Overview

The application uses a service layer pattern to interact with Gadget.dev. All API calls are centralized in the `gadgetService.ts` file.

## Service Methods

### Product Management

#### `getProducts(options: FilterOptions): Promise<Product[]>`

Fetches products based on filter options.

**Parameters:**
- `options`: An object containing filter options:
  - `filter`: "all" | "synced" | "unsynced" | "issues"
  - `searchQuery`: Optional search string
  - `page`: Optional page number for pagination
  - `limit`: Optional limit of products per page

**Returns:**
A promise that resolves to an array of Product objects.

**Example:**
```typescript
const products = await gadgetService.getProducts({ 
  filter: "synced", 
  searchQuery: "t-shirt", 
  page: 1, 
  limit: 20 
});
```

#### `getProduct(id: string): Promise<Product>`

Fetches a single product by ID.

**Parameters:**
- `id`: The ID of the product to fetch

**Returns:**
A promise that resolves to a Product object.

**Example:**
```typescript
const product = await gadgetService.getProduct("product-123");
```

#### `saveProduct(product: Partial<Product>): Promise<Product>`

Creates or updates a product.

**Parameters:**
- `product`: A partial Product object containing the fields to update

**Returns:**
A promise that resolves to the created/updated Product object.

**Example:**
```typescript
const updatedProduct = await gadgetService.saveProduct({
  id: "product-123",
  title: "Updated Product Title",
  description: "New description"
});
```

### Synchronization

#### `syncProducts(): Promise<void>`

Triggers a product sync from Shopify.

**Returns:**
A promise that resolves when the sync has been initiated.

**Example:**
```typescript
await gadgetService.syncProducts();
```

#### `getSyncStatus(): Promise<SyncStatus>`

Gets the current sync status.

**Returns:**
A promise that resolves to a SyncStatus object.

**Example:**
```typescript
const status = await gadgetService.getSyncStatus();
console.log(`Sync progress: ${status.progress}%`);
```

### Configuration

#### `initializeGadgetClient(apiKey: string, endpoint: string)`

Initializes the Gadget client with the given API key and endpoint.

**Parameters:**
- `apiKey`: The Gadget.dev API key
- `endpoint`: The Gadget.dev API endpoint URL

**Example:**
```typescript
gadgetService.initializeGadgetClient(
  "gsk_12345abcdef",
  "https://my-app.gadget.app/api"
);
```

### Advanced Features

#### `sendEmail(to: string, subject: string, content: string, attachments?: any[]): Promise<boolean>`

Sends an email using Gadget's email actions.

**Parameters:**
- `to`: Recipient email address
- `subject`: Email subject
- `content`: Email content (can be HTML)
- `attachments`: Optional array of attachments

**Returns:**
A promise that resolves to a boolean indicating success.

**Example:**
```typescript
const success = await gadgetService.sendEmail(
  "user@example.com",
  "New Product Added",
  "<h1>New Product</h1><p>A new product has been added to your store.</p>"
);
```

#### `logAuditEvent(event: string, user: string, details: any): Promise<void>`

Logs an audit event.

**Parameters:**
- `event`: The event name
- `user`: The user who performed the action
- `details`: Additional details about the event

**Example:**
```typescript
await gadgetService.logAuditEvent(
  "product.update",
  "user@example.com",
  { productId: "product-123", changes: { title: "Updated Title" } }
);
```

#### `uploadFile(file: File, path: string): Promise<string>`

Uploads a file to Gadget storage.

**Parameters:**
- `file`: The file to upload
- `path`: The path where the file should be stored

**Returns:**
A promise that resolves to the URL of the uploaded file.

**Example:**
```typescript
const fileUrl = await gadgetService.uploadFile(
  excelFile,
  "product-imports/june-2023.xlsx"
);
```

## Data Models

### Product

The core data model representing a Shopify product.

```typescript
interface Product {
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
```

### ProductVariant

Represents a variant of a product.

```typescript
interface ProductVariant {
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
```

### SyncStatus

Represents the status of a product sync operation.

```typescript
interface SyncStatus {
  status: "idle" | "in-progress" | "completed" | "failed";
  progress: number;
  lastSync: string;
  syncedProducts: number;
  totalProducts: number;
  estimatedTimeRemaining?: string;
  error?: string;
}
```

## Best Practices

### Error Handling

All API calls should be wrapped in try-catch blocks to handle errors gracefully:

```typescript
try {
  const products = await gadgetService.getProducts({ filter: "all" });
  // Process products
} catch (error) {
  console.error("Failed to fetch products:", error);
  // Show error message to user
}
```

### Optimistic Updates

For better user experience, implement optimistic updates:

```typescript
// Optimistic update approach
const updateProduct = async (product: Partial<Product>) => {
  // 1. Update local state immediately
  setProducts(prev => prev.map(p => 
    p.id === product.id ? { ...p, ...product } : p
  ));
  
  try {
    // 2. Update on server
    await gadgetService.saveProduct(product);
  } catch (error) {
    // 3. Revert local state on error
    setProducts(originalProducts);
    throw error;
  }
};
```

### Caching

Leverage React Query's caching capabilities for better performance:

```typescript
const { data: products, isLoading, error } = useQuery({
  queryKey: ['products', filter, searchQuery, page],
  queryFn: () => gadgetService.getProducts({ 
    filter, 
    searchQuery, 
    page, 
    limit: 20 
  }),
  staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
});
```

## Configuration

### Environment Variables

Create a `.env` file with your Gadget.dev credentials:

```
VITE_GADGET_API_KEY=your_api_key
VITE_GADGET_API_ENDPOINT=your_endpoint
```

Then update your Vite configuration to use these variables.

### Advanced Configuration

For advanced configuration options, modify the `initializeGadgetClient` method in `gadgetService.ts`.
