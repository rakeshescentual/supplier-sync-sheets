
import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const ProductTypeSelector: React.FC<ProductTypeSelectorProps> = ({
  value,
  onChange
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [productTypes, setProductTypes] = useState([
    { id: "fragrance", label: "Fragrance" },
    { id: "skincare", label: "Skincare" },
    { id: "makeup", label: "Makeup" },
    { id: "haircare", label: "Haircare" },
    { id: "bodycare", label: "Bodycare" },
  ]);
  
  useEffect(() => {
    // In a real implementation, this would fetch product types from Gadget.dev
    const fetchProductTypes = async () => {
      setIsLoading(true);
      try {
        // This would be replaced with an actual Gadget.dev API call:
        // const types = await gadgetClient.productTypes.findMany();
        // setProductTypes(types.map(t => ({ id: t.id, label: t.name })));
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Using static data for now
      } catch (error) {
        console.error("Error fetching product types:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProductTypes();
  }, []);
  
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="space-y-3"
    >
      {productTypes.map((type) => (
        <div key={type.id} className="flex items-center space-x-2">
          <RadioGroupItem value={type.id} id={type.id} />
          <Label htmlFor={type.id}>{type.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default ProductTypeSelector;
