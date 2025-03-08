
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ValidationRulesProps {
  productType: string;
}

const ValidationRules: React.FC<ValidationRulesProps> = ({ productType }) => {
  // These would be fetched from Gadget.dev in a real implementation
  const [rules, setRules] = useState({
    minImages: 5,
    requireIngredients: true,
    requireBarcode: true,
    requireMetafields: true,
    autoReminders: true,
    requireApproval: true,
  });
  
  const handleChange = (name: string, value: any) => {
    setRules(prev => ({ ...prev, [name]: value }));
  };
  
  // Product type specific validation suggestions
  const getTypeSuggestions = () => {
    switch (productType) {
      case "fragrance":
        return "Fragrances should include notes, concentration, and scent family.";
      case "skincare":
        return "Skincare should include ingredients, skin type, and usage instructions.";
      case "makeup":
        return "Makeup should include shade range, finish, and application tips.";
      default:
        return "All products require complete metafield information.";
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-muted/50 rounded-md">
        <p className="text-sm">{getTypeSuggestions()}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="min-images">Minimum Required Images</Label>
            <Input
              id="min-images"
              type="number"
              value={rules.minImages}
              onChange={(e) => handleChange("minImages", parseInt(e.target.value))}
              min={1}
              max={10}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Products must have at least this many images
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="require-ingredients">Require Ingredients</Label>
              <p className="text-xs text-muted-foreground">
                Mandatory ingredient listing for all products
              </p>
            </div>
            <Switch
              id="require-ingredients"
              checked={rules.requireIngredients}
              onCheckedChange={(checked) => handleChange("requireIngredients", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="require-barcode">Require Barcode</Label>
              <p className="text-xs text-muted-foreground">
                All products must have valid barcodes
              </p>
            </div>
            <Switch
              id="require-barcode"
              checked={rules.requireBarcode}
              onCheckedChange={(checked) => handleChange("requireBarcode", checked)}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="require-metafields">Require All Metafields</Label>
              <p className="text-xs text-muted-foreground">
                All selected metafields must be completed
              </p>
            </div>
            <Switch
              id="require-metafields"
              checked={rules.requireMetafields}
              onCheckedChange={(checked) => handleChange("requireMetafields", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-reminders">Automated Reminders</Label>
              <p className="text-xs text-muted-foreground">
                Send weekly reminders for incomplete forms
              </p>
            </div>
            <Switch
              id="auto-reminders"
              checked={rules.autoReminders}
              onCheckedChange={(checked) => handleChange("autoReminders", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="require-approval">Require Approval</Label>
              <p className="text-xs text-muted-foreground">
                Products require manual approval before sync
              </p>
            </div>
            <Switch
              id="require-approval"
              checked={rules.requireApproval}
              onCheckedChange={(checked) => handleChange("requireApproval", checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationRules;
