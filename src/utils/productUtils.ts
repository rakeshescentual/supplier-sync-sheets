
/**
 * Generates an SEO-friendly SKU from a product title
 * 
 * Rules for SEO-friendly SKUs:
 * 1. Convert to uppercase
 * 2. Replace spaces with hyphens
 * 3. Remove special characters
 * 4. Limit to 20 characters for readability
 * 5. Add a unique identifier (timestamp-based)
 */
export const generateSeoFriendlySku = (title: string): string => {
  // Clean the title: remove special chars, convert spaces to hyphens
  const cleanTitle = title
    .toUpperCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  
  // Take first 15 chars of clean title (or less if title is shorter)
  const truncatedTitle = cleanTitle.substring(0, 15);
  
  // Add a unique timestamp-based suffix (last 5 digits of timestamp)
  const timestamp = Date.now().toString().slice(-5);
  
  // Combine to create the final SKU
  return `${truncatedTitle}-${timestamp}`;
};

/**
 * Validates if a SKU is in the correct format
 */
export const isValidSku = (sku: string): boolean => {
  // SKU format validation rules
  const skuRegex = /^[A-Z0-9-]{5,25}$/;
  return skuRegex.test(sku);
};
