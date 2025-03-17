# Shopify Product Sync with Gadget.dev

This application is a comprehensive solution for synchronizing and managing Shopify products through Gadget.dev integration.

## Overview

This React application provides a robust, user-friendly interface for:
- Viewing and managing Shopify product data
- Monitoring real-time synchronization status
- Managing product metafields and variants
- Exporting and importing product data via Excel
- Configuring Gadget.dev API connections

## Features

### Product Management
- Complete product listing with filtering and search
- Detailed product editing capabilities
- Variant management with inventory tracking
- Metafield management for enhanced product data
- Bulk operations support

### Synchronization
- Real-time sync status monitoring
- Manual and automated sync triggers
- Detailed sync history and logs
- Error handling and resolution workflows

### Integration
- Seamless Gadget.dev API integration
- Shopify connection management
- Webhook configuration and monitoring
- API key and endpoint management

### Excel Import/Export
- New Line Form generation and processing
- Template downloads for different product types
- Bulk import capabilities
- Data validation and error checking

## Gadget.dev Integration

This application leverages Gadget.dev's latest features:

- **Enhanced API Client**: Uses improved connection pooling and response management
- **Background Jobs**: Utilizes Gadget's updated background job processing
- **Transaction Support**: Leverages improved transaction handling
- **Email Actions**: Incorporates Gadget's email sending capabilities
- **Audit Logging**: Uses structured data support for comprehensive audit trails
- **File Storage**: Implements enhanced file storage with metadata support

### Connecting to Gadget.dev

To connect this application to your Gadget.dev backend:

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
6. Use the GadgetSettings page in this app to connect to your Gadget.dev backend

### Gadget.dev Client Implementation

The application uses a service layer pattern to interact with Gadget.dev:

```typescript
// Actual implementation in gadgetService.ts
import { Gadget } from '@gadgetinc/api-client-core';
import { Client } from './gadget-api'; // Generated client from your Gadget app

let gadgetClient: Client;

export const gadgetService = {
  initializeGadgetClient: (apiKey, endpoint) => {
    gadgetClient = new Client({
      apiKey,
      endpoint,
      connectionPooling: true, // Latest Gadget feature
      requestTimeout: 10000    // Configurable timeouts
    });
    return gadgetClient;
  },
  
  // Other methods implemented using the client
}
```

## Technical Architecture

### Frontend Stack
- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Shadcn/UI component library
- React Query for data fetching and caching

### State Management
- React Query for server state
- React state hooks for local UI state
- Form state using React Hook Form

### Code Organization
- Feature-based component structure
- Service layer for API interactions
- Utility functions for common operations
- Type definitions aligned with Gadget.dev models

## Development Workflow

### Setup
1. Clone this repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

### Configuration
1. Navigate to the GadgetSettings page
2. Enter your Gadget.dev API key and endpoint
3. Connect your application to your Gadget.dev backend

### Testing
The application includes a mock service layer for development and testing without an actual Gadget.dev backend.

## User Stories

### As a Product Manager
- I want to view all my Shopify products in one place
- I want to filter products by sync status
- I want to trigger manual syncs when needed
- I want to view detailed sync history

### As a Data Entry Specialist
- I want to bulk import products via Excel
- I want to manage product variants efficiently
- I want to update product metafields easily
- I want to validate product data before syncing

### As a Developer
- I want to configure API connections
- I want to monitor webhook status
- I want to access audit logs
- I want to customize the sync process

## Timeline and Development History

### Phase 1: Core Product Management
- Initial product listing and filtering
- Basic product editing
- Simple sync functionality

### Phase 2: Enhanced Integration
- Gadget.dev API integration
- Improved sync status monitoring
- Webhook configuration

### Phase 3: Advanced Features
- Excel import/export
- Metafield management
- Audit logging
- Enhanced error handling

### Current Phase
- Optimization for latest Gadget.dev features
- Performance improvements
- Enhanced documentation

## Limitations and Known Issues

- Bulk operations limited to 100 products at a time
- Some advanced Shopify features require additional configuration
- File uploads limited to 10MB per file
- Sync operations may take longer for stores with thousands of products

## Future Roadmap

- Enhanced analytics dashboard
- Custom workflow builders
- Advanced filtering and search capabilities
- Integration with additional third-party services
- Mobile responsive design improvements

## Contributing

Contributions are welcome! Please see our contributing guidelines for more information.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
