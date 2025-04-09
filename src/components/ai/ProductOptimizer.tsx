
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Settings, Wand2 } from "lucide-react";
import TitleTab from "./tabs/TitleTab";
import DescriptionTab from "./tabs/DescriptionTab";
import TagsTab from "./tabs/TagsTab";
import SettingsTab from "./tabs/SettingsTab";
import { useProductOptimizer } from "@/hooks/useProductOptimizer";

const ProductOptimizer: React.FC = () => {
  const {
    productInput,
    isOptimizing,
    selectedTab,
    optimizationSettings,
    getResultForType,
    setSelectedTab,
    handleOptimize,
    handleTitleChange,
    handleDescriptionChange,
    handleTagsChange,
    setOptimizationSettings
  } = useProductOptimizer();

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
            <TitleTab
              productTitle={productInput.title}
              onTitleChange={handleTitleChange}
              result={getResultForType('title')}
            />
          </TabsContent>
          
          <TabsContent value="description">
            <DescriptionTab
              productDescription={productInput.description}
              onDescriptionChange={handleDescriptionChange}
              result={getResultForType('description')}
            />
          </TabsContent>
          
          <TabsContent value="tags">
            <TagsTab
              productTags={productInput.tags}
              onTagsChange={handleTagsChange}
              result={getResultForType('tags')}
            />
          </TabsContent>
          
          <TabsContent value="settings">
            <SettingsTab
              settings={optimizationSettings}
              onSettingsChange={setOptimizationSettings}
            />
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
