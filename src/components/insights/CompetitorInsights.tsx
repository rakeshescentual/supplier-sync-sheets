
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Info, AlertCircle, Search } from "lucide-react";

// Mock data - In a real implementation, this would come from the API
const mockCompetitorData = [
  { competitor: 'Competitor A', averagePrice: 29.99, productCount: 542, topCategory: 'Skincare' },
  { competitor: 'Competitor B', averagePrice: 34.99, productCount: 423, topCategory: 'Haircare' },
  { competitor: 'Competitor C', averagePrice: 24.99, productCount: 621, topCategory: 'Makeup' },
];

const priceComparisonData = [
  { category: 'Skincare', yourStore: 32.99, competitorA: 29.99, competitorB: 34.99, competitorC: 24.99 },
  { category: 'Haircare', yourStore: 28.99, competitorA: 26.99, competitorB: 29.99, competitorC: 21.99 },
  { category: 'Makeup', yourStore: 25.99, competitorA: 23.99, competitorB: 27.99, competitorC: 19.99 },
  { category: 'Fragrance', yourStore: 59.99, competitorA: 54.99, competitorB: 64.99, competitorC: 49.99 },
];

interface InsightResult {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  action?: string;
}

const CompetitorInsights: React.FC = () => {
  const { toast } = useToast();
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [insights, setInsights] = useState<InsightResult[]>([]);

  const handleAnalyze = async () => {
    if (!competitorUrl) {
      toast({
        title: "Missing Information",
        description: "Please provide a competitor URL to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      // In a real implementation, this would call your scraping API
      // For now, we'll simulate a delay and return mock insights
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock insights that would come from AI analysis
      setInsights([
        {
          title: "Price Optimization",
          description: "Your skincare products are priced 10% higher than the market average.",
          impact: "high",
          action: "Consider adjusting prices for selected skincare products to improve competitiveness."
        },
        {
          title: "Product Description",
          description: "Competitor product descriptions are more detailed with ingredient benefits.",
          impact: "medium",
          action: "Update product descriptions to highlight key ingredients and benefits."
        },
        {
          title: "Product Categorization",
          description: "Competitors use more specific categories for better discoverability.",
          impact: "medium",
          action: "Restructure product categories with more specific subcategories."
        },
        {
          title: "Bundle Opportunities",
          description: "Competitors offer bundled products that increase average order value.",
          impact: "high",
          action: "Create product bundles for complementary products."
        }
      ]);
      
      toast({
        title: "Analysis Complete",
        description: "Competitor insights generated successfully.",
      });
    } catch (error) {
      console.error("Error analyzing competitor:", error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze competitor. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getImpactBadge = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">High Impact</span>;
      case 'medium':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Medium Impact</span>;
      case 'low':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Low Impact</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Competitor Analysis</CardTitle>
          <CardDescription>
            Analyze competitor products and pricing to gain insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Input
              placeholder="Enter competitor URL (e.g., https://competitor.com)"
              value={competitorUrl}
              onChange={(e) => setCompetitorUrl(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleAnalyze} disabled={isAnalyzing} className="whitespace-nowrap">
              {isAnalyzing ? "Analyzing..." : "Analyze Competitor"}
            </Button>
          </div>
          
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Privacy Compliance</AlertTitle>
            <AlertDescription>
              This tool respects website terms of service and only analyzes publicly available data. Always ensure compliance with local regulations.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Market Overview</TabsTrigger>
              <TabsTrigger value="pricing">Price Comparison</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="pt-4">
              <div className="grid gap-4 md:grid-cols-3">
                {mockCompetitorData.map((competitor, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{competitor.competitor}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Avg. Price:</dt>
                          <dd className="font-medium">${competitor.averagePrice}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Products:</dt>
                          <dd className="font-medium">{competitor.productCount}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Top Category:</dt>
                          <dd className="font-medium">{competitor.topCategory}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="pricing" className="pt-4">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={priceComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Legend />
                  <Bar dataKey="yourStore" name="Your Store" fill="#8884d8" />
                  <Bar dataKey="competitorA" name="Competitor A" fill="#82ca9d" />
                  <Bar dataKey="competitorB" name="Competitor B" fill="#ffc658" />
                  <Bar dataKey="competitorC" name="Competitor C" fill="#ff8042" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="insights" className="pt-4">
              {insights.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No insights yet</h3>
                  <p className="text-muted-foreground">
                    Enter a competitor URL and analyze to generate AI-powered insights
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {insights.map((insight, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">{insight.title}</CardTitle>
                          {getImpactBadge(insight.impact)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-2">{insight.description}</p>
                        {insight.action && (
                          <div className="mt-2 pt-2 border-t">
                            <p className="text-sm font-medium">Recommended Action:</p>
                            <p className="text-sm text-muted-foreground">{insight.action}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitorInsights;
