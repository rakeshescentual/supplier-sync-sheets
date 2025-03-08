
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import NewLineFormExcelExport from "@/components/forms/NewLineFormExcelExport";
import MetafieldManager from "@/components/metafields/MetafieldManager";
import SupplierCommunication from "@/components/communication/SupplierCommunication";
import ProductTypeSelector from "@/components/forms/ProductTypeSelector";
import ValidationRules from "@/components/validation/ValidationRules";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewLineForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [productType, setProductType] = useState<string>("fragrance");
  const [formState, setFormState] = useState({
    supplierName: "",
    supplierEmail: "",
    brandName: "",
    expectedLaunchDate: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductTypeChange = (type: string) => {
    setProductType(type);
  };

  const handleExportExcel = () => {
    if (!formState.supplierName || !formState.supplierEmail) {
      toast({
        title: "Missing Information",
        description: "Please enter supplier name and email before exporting",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Excel Export",
      description: "Exporting New Line Form as Excel sheet...",
    });
    // This would connect to Gadget.dev API to handle the actual export
  };

  const handleSendToSupplier = () => {
    if (!formState.supplierName || !formState.supplierEmail) {
      toast({
        title: "Missing Information",
        description: "Please enter supplier name and email to send form",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Form Sent",
      description: `New Line Form sent to ${formState.supplierEmail}`,
    });
    // This would connect to Gadget.dev API to handle the email sending
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">New Line Form</h1>
            <p className="text-muted-foreground">Create and manage new product line submissions</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExportExcel} variant="outline">
            Export as Excel
          </Button>
          <Button onClick={handleSendToSupplier}>
            Send to Supplier
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Supplier Information</CardTitle>
            <CardDescription>Enter the basic supplier details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Supplier Name</label>
                <Input 
                  name="supplierName"
                  value={formState.supplierName}
                  onChange={handleInputChange}
                  placeholder="Enter supplier name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Supplier Email</label>
                <Input 
                  name="supplierEmail"
                  value={formState.supplierEmail}
                  onChange={handleInputChange}
                  placeholder="supplier@example.com"
                  type="email"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Brand Name</label>
                <Input 
                  name="brandName"
                  value={formState.brandName}
                  onChange={handleInputChange}
                  placeholder="Enter brand name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Expected Launch Date</label>
                <Input 
                  name="expectedLaunchDate"
                  value={formState.expectedLaunchDate}
                  onChange={handleInputChange}
                  placeholder="DD/MM/YYYY"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Product Type</CardTitle>
            <CardDescription>Select the type of product line</CardDescription>
          </CardHeader>
          <CardContent>
            <ProductTypeSelector 
              value={productType} 
              onChange={handleProductTypeChange} 
            />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Metafield Requirements</CardTitle>
          <CardDescription>Required metafields based on product type</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="required">
            <TabsList className="mb-4">
              <TabsTrigger value="required">Required Fields</TabsTrigger>
              <TabsTrigger value="optional">Optional Fields</TabsTrigger>
              <TabsTrigger value="variant">Variant Fields</TabsTrigger>
              <TabsTrigger value="custom">Custom Fields</TabsTrigger>
            </TabsList>
            <TabsContent value="required" className="mt-4">
              <MetafieldManager 
                productType={productType} 
                fieldType="required" 
              />
            </TabsContent>
            <TabsContent value="optional" className="mt-4">
              <MetafieldManager 
                productType={productType} 
                fieldType="optional" 
              />
            </TabsContent>
            <TabsContent value="variant" className="mt-4">
              <MetafieldManager 
                productType={productType} 
                fieldType="variant" 
              />
            </TabsContent>
            <TabsContent value="custom" className="mt-4">
              <MetafieldManager 
                productType={productType} 
                fieldType="custom" 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Validation Rules</CardTitle>
          <CardDescription>Configure validation requirements for this product type</CardDescription>
        </CardHeader>
        <CardContent>
          <ValidationRules productType={productType} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Communication History</CardTitle>
          <CardDescription>Email communication with supplier</CardDescription>
        </CardHeader>
        <CardContent>
          <SupplierCommunication 
            supplierEmail={formState.supplierEmail} 
            brandName={formState.brandName}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewLineForm;
