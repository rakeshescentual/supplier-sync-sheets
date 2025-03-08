
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface MetafieldManagerProps {
  productType: string;
  fieldType: "required" | "optional" | "variant" | "custom";
}

// This would come from Gadget.dev in a real implementation
const getMetafields = (productType: string, fieldType: string) => {
  // Mock data - dynamically generated based on product type and field type
  const metafields = [
    { id: "1", name: "Ingredients", required: true, description: "List of ingredients" },
    { id: "2", name: "Size", required: true, description: "Product size/volume" },
    { id: "3", name: "Usage Instructions", required: fieldType === "required", description: "How to use the product" },
    { id: "4", name: "Benefits", required: fieldType === "required", description: "Product benefits" },
    { id: "5", name: "Fragrance Notes", required: productType === "fragrance" && fieldType === "required", description: "Top, middle, and base notes" },
    { id: "6", name: "Skin Type", required: productType === "skincare" && fieldType === "required", description: "Intended skin type" },
    { id: "7", name: "SPF Rating", required: false, description: "Sun protection factor" },
    { id: "8", name: "Shelf Life", required: false, description: "Product shelf life" },
  ].filter(field => {
    if (fieldType === "required") return field.required;
    if (fieldType === "optional") return !field.required;
    if (fieldType === "variant") return ["Size", "Color", "Fragrance"].includes(field.name);
    if (fieldType === "custom") return true; // Show all for custom tab, would be customizable
    return true;
  });
  
  return metafields;
};

const MetafieldManager: React.FC<MetafieldManagerProps> = ({ productType, fieldType }) => {
  const [metafields, setMetafields] = useState<any[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  
  useEffect(() => {
    // This would fetch from Gadget.dev in a real implementation
    const fields = getMetafields(productType, fieldType);
    setMetafields(fields);
    // Pre-select required fields
    setSelectedFields(fields.filter(f => f.required).map(f => f.id));
  }, [productType, fieldType]);
  
  const toggleField = (id: string) => {
    setSelectedFields(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  return (
    <div>
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          {fieldType === "required" && "These fields must be completed for all products of this type."}
          {fieldType === "optional" && "These fields are optional but recommended."}
          {fieldType === "variant" && "These fields define product variants."}
          {fieldType === "custom" && "Custom fields specific to your product line."}
        </p>
      </div>
      
      {metafields.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-muted-foreground">No {fieldType} fields for this product type.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Include</TableHead>
              <TableHead>Field Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {metafields.map((field) => (
              <TableRow key={field.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedFields.includes(field.id)}
                    onCheckedChange={() => toggleField(field.id)}
                    disabled={field.required}
                  />
                </TableCell>
                <TableCell className="font-medium">{field.name}</TableCell>
                <TableCell>{field.description}</TableCell>
                <TableCell>
                  {field.required ? (
                    <Badge variant="default">Required</Badge>
                  ) : (
                    <Badge variant="outline">Optional</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      
      {fieldType === "custom" && (
        <div className="mt-4 p-4 border rounded-md">
          <h4 className="text-sm font-semibold mb-2">Add Custom Field</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Field Name" />
            <Input placeholder="Description" />
            <div className="flex items-center space-x-2">
              <Checkbox id="required-custom" />
              <label htmlFor="required-custom" className="text-sm">Required Field</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetafieldManager;
