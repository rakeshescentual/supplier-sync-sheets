
# User Guide: Shopify Product Sync App

This guide will help you navigate and use the Shopify Product Sync App effectively.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [Product Management](#product-management)
4. [Synchronization](#synchronization)
5. [New Line Forms](#new-line-forms)
6. [Gadget Settings](#gadget-settings)
7. [Troubleshooting](#troubleshooting)

## Getting Started

### Initial Setup

1. Open the application in your web browser
2. Navigate to the Gadget Settings page via the navigation menu
3. Enter your Gadget.dev API key and endpoint
4. Click "Connect to Gadget"
5. Once connected, you'll be able to use all features of the application

### Navigation

The application has a main navigation menu with the following sections:

- **Dashboard**: Overview of your products and sync status
- **Product Management**: Detailed product listing and management
- **New Line Form**: Create and manage new product lines
- **Gadget Settings**: Configure your Gadget.dev connection

## Dashboard Overview

The dashboard provides a quick overview of your product sync status and key metrics.

### Sync Status Card

This card shows:
- Current sync status (Idle, In Progress, Completed, Failed)
- Sync progress bar (when a sync is in progress)
- Number of products synced
- Estimated time remaining (when a sync is in progress)
- Last successful sync time
- Webhook status

### Statistics Card

This card shows:
- Total number of products
- Number of synced products
- Last sync time

### Actions

From the dashboard, you can:
- Trigger a manual product sync
- Add a new product
- Create a new line form

## Product Management

The Product Management section allows you to view and manage your Shopify products.

### Filtering Products

Use the tabs to filter products by:
- All Products
- Synced Products
- Unsynced Products
- Products with Issues

### Searching Products

Use the search box to find products by:
- Product title
- Product SKU

### Product Actions

For each product, you can:
- View detailed information
- Edit product details
- Manage variants
- Manage metafields

## Synchronization

The application keeps your products in sync with Shopify.

### Manual Sync

To trigger a manual sync:
1. Click the "Sync Products" button on the dashboard
2. A toast notification will appear indicating that the sync has started
3. The sync status will update in real-time
4. You'll receive a notification when the sync is complete

### Automatic Sync

The application can also automatically sync products when:
- A webhook is triggered from Shopify
- A product is updated in the application

### Sync Status

The sync status can be:
- **Idle**: No sync is currently running
- **In Progress**: A sync is currently running
- **Completed**: The last sync completed successfully
- **Failed**: The last sync failed

## New Line Forms

New Line Forms allow you to create new products in bulk using Excel.

### Creating a New Line Form

1. Navigate to the New Line Form page
2. Select the product type
3. Configure the form fields
4. Click "Generate Excel Form"
5. Save the Excel file to your computer

### Filling Out the Form

1. Open the Excel file
2. Fill out the product information
3. Save the file

### Uploading the Form

1. Navigate to the New Line Form page
2. Click "Upload Filled Form"
3. Select your filled Excel file
4. The application will process the file and create the products
5. You'll receive a notification when the process is complete

## Gadget Settings

The Gadget Settings page allows you to configure your connection to Gadget.dev.

### Connecting to Gadget.dev

1. Navigate to the Gadget Settings page
2. Enter your Gadget.dev API key
3. Enter your Gadget.dev endpoint URL
4. Click "Connect to Gadget"
5. If the connection is successful, you'll see a success message

### Managing Connection

- You can update your API key and endpoint at any time
- The connection status is displayed on the page
- If the connection is lost, you'll need to reconnect

## Troubleshooting

### Common Issues

#### Products Not Syncing

If products are not syncing:
1. Check your internet connection
2. Verify that your Gadget.dev app is running
3. Check the sync status for any errors
4. Try triggering a manual sync

#### Cannot Connect to Gadget.dev

If you cannot connect to Gadget.dev:
1. Verify that your API key is correct
2. Verify that your endpoint URL is correct
3. Check that your Gadget.dev app is running
4. Try again later, as Gadget.dev may be experiencing issues

#### Excel Form Not Working

If the Excel form is not working:
1. Make sure you're using the latest form template
2. Verify that you've filled out all required fields
3. Check for any error messages in the application
4. Try downloading a new form template

### Getting Help

If you need further assistance:
1. Check the documentation
2. Contact your administrator
3. Reach out to Gadget.dev support
