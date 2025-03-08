
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ProductTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const ProductTypeSelector: React.FC<ProductTypeSelectorProps> = ({
  value,
  onChange
}) => {
  const productTypes = [
    { id: "fragrance", label: "Fragrance" },
    { id: "skincare", label: "Skincare" },
    { id: "makeup", label: "Makeup" },
    { id: "haircare", label: "Haircare" },
    { id: "bodycare", label: "Bodycare" },
  ];
  
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
