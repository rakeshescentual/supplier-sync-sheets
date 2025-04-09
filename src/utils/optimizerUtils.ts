
/**
 * Utility functions for product content optimization
 */

/**
 * Optimizes product titles based on specified settings
 */
export const optimizeTitle = (title: string, settings: OptimizationSettings): string => {
  // Example logic based on settings
  let result = title;
  
  if (settings.seoFocus > 50) {
    // Add SEO keywords
    result = result.replace(/cream/i, "Hydrating Face Cream");
    result = result.replace(/moisturizer/i, "Deep Moisturizing Lotion");
  }
  
  if (settings.includeEmoji) {
    // Add emoji if enabled
    result = result.replace(/skincare/i, "Skincare ✨");
  }
  
  // Make title more compelling
  result = result.replace(/(\w+) (\w+)$/, "Premium $1 $2");
  
  return result || "Optimized " + title;
};

/**
 * Optimizes product descriptions based on specified settings
 */
export const optimizeDescription = (description: string, settings: OptimizationSettings): string => {
  // Example basic optimization
  let result = description;
  
  // Add benefit-focused language
  result = result.replace(/hydrates skin/i, "deeply hydrates skin for up to 24 hours");
  
  // Add structure
  if (!result.includes("Benefits:")) {
    result += "\n\nBenefits:\n- Long-lasting hydration\n- Improves skin texture\n- Dermatologist tested";
  }
  
  if (settings.toneConsistency) {
    // Ensure consistent tone
    result = result.replace(/you can/i, "customers can");
  }
  
  return result || "Optimized " + description;
};

/**
 * Optimizes product tags based on specified settings
 */
export const optimizeTags = (tags: string, settings: OptimizationSettings): string => {
  const tagArray = tags.split(',').map(tag => tag.trim());
  
  // Add trending tags
  if (!tagArray.includes("trending")) tagArray.push("trending");
  if (!tagArray.includes("bestseller")) tagArray.push("bestseller");
  
  // Remove low-value tags and duplicates
  const uniqueTags = Array.from(new Set(tagArray));
  
  return uniqueTags.join(', ');
};

/**
 * Types for the optimization utilities
 */
export interface OptimizationSettings {
  seoFocus: number;
  conversionFocus: number;
  useIndustryTerms: boolean;
  includeEmoji: boolean;
  toneConsistency: boolean;
}

export interface OptimizationResult {
  original: string;
  optimized: string;
  type: 'title' | 'description' | 'tags';
  improvements: string[];
}

export interface ProductInput {
  title: string;
  description: string;
  tags: string;
}
