# Developer Guide for Shopify Product Sync App

This guide provides detailed information for developers working on or extending this application.

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Basic knowledge of React, TypeScript, and Tailwind CSS
- Familiarity with Gadget.dev concepts

### Local Development Setup

1. Clone the repository
   ```
   git clone https://github.com/your-username/shopify-product-sync.git
   cd shopify-product-sync
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open http://localhost:5173 to view the app

## Project Structure

```
src/
├── components/           # UI components
│   ├── forms/            # Form components
│   ├── gadget/           # Gadget-specific components
│   ├── layout/           # Layout components
│   ├── metafields/       # Metafield management components
│   ├── products/         # Product management components
│   ├── sync/             # Sync status components
│   └── ui/               # Shadcn/UI component library
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── models/               # TypeScript interfaces
├── pages/                # Page components
├── services/             # API service layer
│   └── gadgetService.ts  # Gadget.dev API service
├── utils/                # Utility functions
└── App.tsx               # Main application component
```

## Key Components

### GadgetConfig

Handles the configuration of Gadget.dev API connection. Located in `src/components/gadget/GadgetConfig.tsx`.

Key features:
- API key and endpoint input
- Connection testing
- Connection status display

### ProductList

Displays a list of products with filtering and search. Located in `src/components/products/ProductList.tsx`.

Key features:
- Product filtering
- Search functionality
- Status badges
- Action buttons

### SyncStatus

Displays the current synchronization status. Located in `src/components/sync/SyncStatus.tsx`.

Key features:
- Progress bar
- Status badges
- Last sync information
- Webhook status

### MetafieldManager

Manages product metafields. Located in `src/components/metafields/MetafieldManager.tsx`.

Key features:
- Required/optional field management
- Variant field management
- Custom field creation

## Gadget.dev Integration

### Service Layer

The application uses a service layer pattern to interact with Gadget.dev. All API calls are centralized in the `gadgetService.ts` file.

### Mock Implementation

During development, the service uses a mock implementation that returns dummy data. This allows for development without an actual Gadget.dev backend.

To use a real Gadget.dev backend:

1. Generate a Gadget.dev API client
2. Update the `gadgetService.ts` file to use the generated client
3. Connect your application to your Gadget.dev backend using the GadgetSettings page

## Adding New Features

### Adding a New Page

1. Create a new file in the `src/pages` directory
2. Add the page to the routes in `App.tsx`
3. Add links to the page from other pages as needed

Example:
```tsx
// src/pages/NewPage.tsx
import React from "react";

const NewPage: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold">New Page</h1>
      {/* Page content */}
    </div>
  );
};

export default NewPage;

// In App.tsx, add the new route
<Route path="/new-page" element={<NewPage />} />
```

### Adding a New Component

1. Create a new file in the appropriate subdirectory of `src/components`
2. Create a TypeScript interface for the component props
3. Implement the component
4. Import and use the component in a page or another component

Example:
```tsx
// src/components/ui/CustomButton.tsx
import React from "react";
import { Button } from "@/components/ui/button";

interface CustomButtonProps {
  label: string;
  onClick: () => void;
  variant?: "default" | "outline";
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  label, 
  onClick, 
  variant = "default" 
}) => {
  return (
    <Button variant={variant} onClick={onClick}>
      {label}
    </Button>
  );
};

export default CustomButton;
```

### Adding a New API Method

1. Define the method interface in `models/product.ts`
2. Implement the method in `services/gadgetService.ts`
3. Use the method in your components

Example:
```typescript
// In models/product.ts
export interface GadgetApiService {
  // ... existing methods
  deleteProduct: (id: string) => Promise<void>;
}

// In services/gadgetService.ts
deleteProduct: async (id: string): Promise<void> => {
  console.log("Deleting product with ID:", id);
  // In a real implementation, this would use Gadget's API
  return Promise.resolve();
}
```

## Testing

### Unit Testing

Use Jest and React Testing Library for unit tests:

```typescript
import { render, screen } from '@testing-library/react';
import CustomButton from './CustomButton';

describe('CustomButton', () => {
  it('renders the button with the correct label', () => {
    render(<CustomButton label="Test Button" onClick={() => {}} />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });
});
```

### Integration Testing

Use Cypress for integration tests:

```typescript
describe('Product List', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays products', () => {
    cy.get('[data-testid="product-list"]').should('exist');
    cy.get('[data-testid="product-item"]').should('have.length.at.least', 1);
  });
});
```

## Performance Optimization

### React Query

Use React Query for data fetching and caching:

```typescript
import { useQuery } from '@tanstack/react-query';
import { gadgetService } from '@/services/gadgetService';

const useProducts = (filter, searchQuery, page = 1) => {
  return useQuery({
    queryKey: ['products', filter, searchQuery, page],
    queryFn: () => gadgetService.getProducts({ 
      filter, 
      searchQuery, 
      page, 
      limit: 20 
    }),
  });
};
```

### Memoization

Use React.memo and useMemo to prevent unnecessary re-renders:

```typescript
import React, { useMemo } from 'react';

const ProductItem = React.memo(({ product }) => {
  return (
    <div>{product.title}</div>
  );
});

const ProductList = ({ products }) => {
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => a.title.localeCompare(b.title));
  }, [products]);

  return (
    <div>
      {sortedProducts.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};
```

## Deployment

### Build for Production

```
npm run build
```

This will create a production-ready build in the `dist` directory.

### Deploy to a Hosting Provider

1. Upload the `dist` directory to your hosting provider
2. Configure your hosting provider to serve the `index.html` file for all routes
3. Set environment variables for your Gadget.dev API key and endpoint

## Troubleshooting

### Common Issues

#### "Cannot connect to Gadget.dev"

- Check that your API key and endpoint are correct
- Verify that your Gadget.dev app is running
- Check for CORS issues in the browser console

#### "Products not loading"

- Check the browser console for errors
- Verify that your Gadget.dev app has products
- Check that your API key has the correct permissions

### Debugging

- Use the browser console to view logs
- Add temporary `console.log` statements
- Use React Developer Tools to inspect component state
