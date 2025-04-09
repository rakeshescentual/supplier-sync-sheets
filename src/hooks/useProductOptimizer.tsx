
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  OptimizationResult, 
  OptimizationSettings, 
  ProductInput,
  optimizeTitle,
  optimizeDescription,
  optimizeTags
} from "@/utils/optimizerUtils";

export const useProductOptimizer = () => {
  const { toast } = useToast();
  const [productInput, setProductInput] = useState<ProductInput>({
    title: "",
    description: "",
    tags: ""
  });
  
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [results, setResults] = useState<OptimizationResult[]>([]);
  const [selectedTab, setSelectedTab] = useState("title");
  const [optimizationSettings, setOptimizationSettings] = useState<OptimizationSettings>({
    seoFocus: 70,
    conversionFocus: 30,
    useIndustryTerms: true,
    includeEmoji: false,
    toneConsistency: true
  });

  const handleOptimize = async () => {
    if (!productInput.title && !productInput.description) {
      toast({
        title: "Missing Information",
        description: "Please provide at least a product title or description to optimize",
        variant: "destructive",
      });
      return;
    }

    setIsOptimizing(true);

    try {
      // In a real implementation, this would call your AI optimization API
      // For now, we'll simulate a delay and return mock results
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newResults: OptimizationResult[] = [];
      
      if (productInput.title) {
        newResults.push({
          original: productInput.title,
          optimized: optimizeTitle(productInput.title, optimizationSettings),
          type: 'title',
          improvements: [
            "Added popular search keywords",
            "Improved clarity for search engines",
            "Optimized for mobile display"
          ]
        });
      }
      
      if (productInput.description) {
        newResults.push({
          original: productInput.description,
          optimized: optimizeDescription(productInput.description, optimizationSettings),
          type: 'description',
          improvements: [
            "Enhanced readability with better paragraph structure",
            "Added benefit-focused language",
            "Incorporated high-value keywords",
            "Added missing product specifications"
          ]
        });
      }
      
      if (productInput.tags) {
        newResults.push({
          original: productInput.tags,
          optimized: optimizeTags(productInput.tags, optimizationSettings),
          type: 'tags',
          improvements: [
            "Added trending search terms",
            "Removed low-value tags",
            "Added location-based tags",
            "Improved specificity"
          ]
        });
      }
      
      setResults(newResults);
      
      toast({
        title: "Optimization Complete",
        description: "Your product content has been optimized for better performance.",
      });
    } catch (error) {
      console.error("Error optimizing product:", error);
      toast({
        title: "Optimization Failed",
        description: "Failed to optimize product content. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const getResultForType = (type: 'title' | 'description' | 'tags') => {
    return results.find(result => result.type === type);
  };

  const handleTitleChange = (title: string) => {
    setProductInput({ ...productInput, title });
  };

  const handleDescriptionChange = (description: string) => {
    setProductInput({ ...productInput, description });
  };

  const handleTagsChange = (tags: string) => {
    setProductInput({ ...productInput, tags });
  };

  return {
    productInput,
    isOptimizing,
    selectedTab,
    optimizationSettings,
    results,
    setSelectedTab,
    handleOptimize,
    getResultForType,
    handleTitleChange,
    handleDescriptionChange,
    handleTagsChange,
    setOptimizationSettings
  };
};
