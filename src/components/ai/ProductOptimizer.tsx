
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Sparkles, CircleCheck, Settings, Wand2 } from "lucide-react";

interface OptimizationResult {
  original: string;
  optimized: string;
  type: 'title' | 'description' | 'tags';
  improvements: string[];
}

const ProductOptimizer: React.FC = () => {
  const { toast } = useToast();
  const [productInput, setProductInput] = useState({
    title: "",
    description: "",
    tags: ""
  });
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [results, setResults] = useState<OptimizationResult[]>([]);
  const [selectedTab, setSelectedTab] = useState("title");
  const [optimizationSettings, setOptimizationSettings] = useState({
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
          optimized: optimizeTitle(productInput.title),
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
          optimized: optimizeDescription(productInput.description),
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
          optimized: optimizeTags(productInput.tags),
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

  // Mock optimization functions - these would be replaced with actual AI API calls
  const optimizeTitle = (title: string) => {
    // Example logic based on settings
    let result = title;
    
    if (optimizationSettings.seoFocus > 50) {
      // Add SEO keywords
      result = result.replace(/cream/i, "Hydrating Face Cream");
      result = result.replace(/moisturizer/i, "Deep Moisturizing Lotion");
    }
    
    if (optimizationSettings.includeEmoji) {
      // Add emoji if enabled
      result = result.replace(/skincare/i, "Skincare ✨");
    }
    
    // Make title more compelling
    result = result.replace(/(\w+) (\w+)$/, "Premium $1 $2");
    
    return result || "Optimized " + title;
  };
  
  const optimizeDescription = (description: string) => {
    // Example basic optimization
    let result = description;
    
    // Add benefit-focused language
    result = result.replace(/hydrates skin/i, "deeply hydrates skin for up to 24 hours");
    
    // Add structure
    if (!result.includes("Benefits:")) {
      result += "\n\nBenefits:\n- Long-lasting hydration\n- Improves skin texture\n- Dermatologist tested";
    }
    
    if (optimizationSettings.toneConsistency) {
      // Ensure consistent tone
      result = result.replace(/you can/i, "customers can");
    }
    
    return result || "Optimized " + description;
  };
  
  const optimizeTags = (tags: string) => {
    const tagArray = tags.split(',').map(tag => tag.trim());
    
    // Add trending tags
    if (!tagArray.includes("trending")) tagArray.push("trending");
    if (!tagArray.includes("bestseller")) tagArray.push("bestseller");
    
    // Remove low-value tags and duplicates
    const uniqueTags = Array.from(new Set(tagArray));
    
    return uniqueTags.join(', ');
  };

  const getResultForType = (type: 'title' | 'description' | 'tags') => {
    return results.find(result => result.type === type);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
              AI Product Optimizer
            </CardTitle>
            <CardDescription>
              Optimize your product content for better search visibility and conversion
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="h-8" onClick={() => setSelectedTab("settings")}>
            <Settings className="h-4 w-4 mr-1" />
            Settings
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="title">Title</TabsTrigger>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="title">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Title</label>
                <Textarea
                  placeholder="Enter your product title..."
                  value={productInput.title}
                  onChange={(e) => setProductInput({...productInput, title: e.target.value})}
                  rows={2}
                />
              </div>
              
              {getResultForType('title') && (
                <div className="border rounded-md p-4 mt-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium">Optimized Title</h3>
                    <Badge className="bg-green-500">SEO Optimized</Badge>
                  </div>
                  <p className="p-2 bg-muted rounded-md mb-3">{getResultForType('title')?.optimized}</p>
                  <div>
                    <h4 className="text-xs font-medium mb-1">Improvements:</h4>
                    <ul className="text-xs space-y-1">
                      {getResultForType('title')?.improvements.map((improvement, i) => (
                        <li key={i} className="flex items-start">
                          <CircleCheck className="h-3 w-3 text-green-500 mr-1 mt-0.5" />
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="description">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Description</label>
                <Textarea
                  placeholder="Enter your product description..."
                  value={productInput.description}
                  onChange={(e) => setProductInput({...productInput, description: e.target.value})}
                  rows={6}
                />
              </div>
              
              {getResultForType('description') && (
                <div className="border rounded-md p-4 mt-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium">Optimized Description</h3>
                    <Badge className="bg-green-500">SEO Optimized</Badge>
                  </div>
                  <pre className="whitespace-pre-wrap p-2 bg-muted rounded-md mb-3 text-sm">
                    {getResultForType('description')?.optimized}
                  </pre>
                  <div>
                    <h4 className="text-xs font-medium mb-1">Improvements:</h4>
                    <ul className="text-xs space-y-1">
                      {getResultForType('description')?.improvements.map((improvement, i) => (
                        <li key={i} className="flex items-start">
                          <CircleCheck className="h-3 w-3 text-green-500 mr-1 mt-0.5" />
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="tags">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Tags (comma separated)</label>
                <Textarea
                  placeholder="skincare, moisturizer, face cream, dry skin..."
                  value={productInput.tags}
                  onChange={(e) => setProductInput({...productInput, tags: e.target.value})}
                  rows={2}
                />
              </div>
              
              {getResultForType('tags') && (
                <div className="border rounded-md p-4 mt-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium">Optimized Tags</h3>
                    <Badge className="bg-green-500">SEO Optimized</Badge>
                  </div>
                  <p className="p-2 bg-muted rounded-md mb-3">{getResultForType('tags')?.optimized}</p>
                  <div>
                    <h4 className="text-xs font-medium mb-1">Improvements:</h4>
                    <ul className="text-xs space-y-1">
                      {getResultForType('tags')?.improvements.map((improvement, i) => (
                        <li key={i} className="flex items-start">
                          <CircleCheck className="h-3 w-3 text-green-500 mr-1 mt-0.5" />
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Optimization Balance</label>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>SEO Focus: {optimizationSettings.seoFocus}%</span>
                  <span>Conversion Focus: {optimizationSettings.conversionFocus}%</span>
                </div>
                <Slider
                  value={[optimizationSettings.seoFocus]}
                  min={0}
                  max={100}
                  step={10}
                  onValueChange={(values) => setOptimizationSettings({
                    ...optimizationSettings,
                    seoFocus: values[0],
                    conversionFocus: 100 - values[0]
                  })}
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Use Industry-Specific Terms</label>
                  <Switch
                    checked={optimizationSettings.useIndustryTerms}
                    onCheckedChange={(checked) => setOptimizationSettings({
                      ...optimizationSettings,
                      useIndustryTerms: checked
                    })}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Include Emoji (where appropriate)</label>
                  <Switch
                    checked={optimizationSettings.includeEmoji}
                    onCheckedChange={(checked) => setOptimizationSettings({
                      ...optimizationSettings,
                      includeEmoji: checked
                    })}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Maintain Brand Tone Consistency</label>
                  <Switch
                    checked={optimizationSettings.toneConsistency}
                    onCheckedChange={(checked) => setOptimizationSettings({
                      ...optimizationSettings,
                      toneConsistency: checked
                    })}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={handleOptimize} disabled={isOptimizing}>
            <Wand2 className="h-4 w-4 mr-2" />
            {isOptimizing ? "Optimizing..." : "Optimize Content"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductOptimizer;
