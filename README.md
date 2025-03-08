
# Shopify Product Sync App

This application is designed to sync and manage Shopify products, designed for later integration with Gadget.dev.

## Overview

This React application provides a user interface for:
- Viewing and managing Shopify product data
- Monitoring synchronization status
- Managing product metafields

## Transferring to Gadget.dev

This frontend application is designed to be paired with a Gadget.dev backend. To connect this application to Gadget.dev:

1. Create a new Gadget.dev application
2. Set up the necessary models in Gadget.dev:
   - Product
   - ProductVariant
   - ProductImage
   - Metafield
   - SyncStatus

3. Configure Shopify connections in your Gadget.dev app
4. Set up webhooks for product updates
5. Implement the necessary APIs and actions in Gadget.dev
6. Update the `src/services/gadgetService.ts` file to use the Gadget.dev JavaScript client

### Gadget.dev Client Integration

Replace the mock implementation in `gadgetService.ts` with the actual Gadget.dev client:

```typescript
import { Gadget } from '@gadgetinc/api-client-core';
import { Client } from './gadget-api'; // Generated client from your Gadget app

let gadgetClient: Client;

export const gadgetService = {
  initializeGadgetClient: (apiKey: string, endpoint: string) => {
    gadgetClient = new Client({
      apiKey,
      endpoint,
    });
    return gadgetClient;
  },
  
  getProducts: async (options: FilterOptions) => {
    const result = await gadgetClient.products.findMany({
      // Convert options to Gadget query format
    });
    return result.data;
  },

  // Implement other methods similarly
}
```

## Features

- Product listing and filtering
- Sync status monitoring
- Mock data structure ready for Gadget.dev integration
- Responsive design
- Type definitions aligned with Gadget.dev data model

## Development

1. Clone this repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
