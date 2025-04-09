
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CircleCheck } from "lucide-react";
import { OptimizationResult } from "@/utils/optimizerUtils";

interface DescriptionTabProps {
  productDescription: string;
  onDescriptionChange: (value: string) => void;
  result: OptimizationResult | undefined;
}

const DescriptionTab: React.FC<DescriptionTabProps> = ({ productDescription, onDescriptionChange, result }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Product Description</label>
        <Textarea
          placeholder="Enter your product description..."
          value={productDescription}
          onChange={(e) => onDescriptionChange(e.target.value)}
          rows={6}
        />
      </div>
      
      {result && (
        <div className="border rounded-md p-4 mt-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium">Optimized Description</h3>
            <Badge className="bg-green-500">SEO Optimized</Badge>
          </div>
          <pre className="whitespace-pre-wrap p-2 bg-muted rounded-md mb-3 text-sm">
            {result.optimized}
          </pre>
          <div>
            <h4 className="text-xs font-medium mb-1">Improvements:</h4>
            <ul className="text-xs space-y-1">
              {result.improvements.map((improvement, i) => (
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
  );
};

export default DescriptionTab;
