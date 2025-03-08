import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertCircle, 
  ArrowRight, 
  CheckCircle, 
  Clock 
} from 'lucide-react';

const formSchema = z.object({
  productTitle: z.string().min(3, { message: "Product title must be at least 3 characters" }),
  productDescription: z.string().min(10, { message: "Product description must be at least 10 characters" }),
  brand: z.string().min(1, { message: "Brand is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  subcategory: z.string().min(1, { message: "Subcategory is required" }),
  productType: z.string().min(1, { message: "Product type is required" }),
  sku: z.string().min(1, { message: "SKU is required" }),
  barcode: z.string().min(1, { message: "Barcode/EAN is required" }),
  retailPrice: z.string().min(1, { message: "Retail price is required" }),
  costPrice: z.string().min(1, { message: "Cost price is required" }),
  taxable: z.boolean().default(true),
  ingredients: z.string().optional(),
  howToUse: z.string().optional(),
  countryOfOrigin: z.string().min(1, { message: "Country of origin is required" }),
  mainImage: z.string().min(1, { message: "Main image URL is required" }),
  additionalImages: z.string().optional(),
  hasVariants: z.boolean().default(false),
  variantType: z.string().optional(),
  variantOptions: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  searchKeywords: z.string().optional(),
  ageRestricted: z.boolean().default(false),
  certifications: z.string().optional(),
  safetyWarnings: z.string().optional(),
  weight: z.string().min(1, { message: "Weight is required" }),
  dimensions: z.string().optional(),
  shippingClass: z.string().optional(),
  supplierName: z.string().min(1, { message: "Supplier name is required" }),
  supplierEmail: z.string().email({ message: "Valid email is required" }),
  supplierCode: z.string().min(1, { message: "Supplier code is required" }),
  leadTime: z.string().optional(),
  minimumOrderQuantity: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const NewLineForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [fieldsCompleted, setFieldsCompleted] = useState(0);
  const [totalFields, setTotalFields] = useState(0);
  const [activeTab, setActiveTab] = useState("product");
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productTitle: "",
      productDescription: "",
      brand: "",
      category: "",
      subcategory: "",
      productType: "",
      sku: "",
      barcode: "",
      retailPrice: "",
      costPrice: "",
      taxable: true,
      ingredients: "",
      howToUse: "",
      countryOfOrigin: "",
      mainImage: "",
      additionalImages: "",
      hasVariants: false,
      variantType: "",
      variantOptions: "",
      metaTitle: "",
      metaDescription: "",
      searchKeywords: "",
      ageRestricted: false,
      certifications: "",
      safetyWarnings: "",
      weight: "",
      dimensions: "",
      shippingClass: "",
      supplierName: "",
      supplierEmail: "",
      supplierCode: "",
      leadTime: "",
      minimumOrderQuantity: "",
    },
  });
  
  const calculateCompletion = (data: FormValues) => {
    const requiredFields = Object.keys(formSchema.shape).filter(key => {
      const fieldSchema = (formSchema.shape as any)[key];
      return !fieldSchema.isOptional?.() && !('_def' in fieldSchema && 'defaultValue' in fieldSchema._def);
    });
    
    const completedFields = requiredFields.filter(key => {
      const value = (data as any)[key];
      return value !== undefined && value !== "" && value !== null;
    });
    
    setTotalFields(requiredFields.length);
    setFieldsCompleted(completedFields.length);
    const percentage = Math.round((completedFields.length / requiredFields.length) * 100);
    setCompletionPercentage(percentage);
  };
  
  React.useEffect(() => {
    const subscription = form.watch((data) => {
      calculateCompletion(data as FormValues);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Form Submitted Successfully",
        description: "Your new line form has been sent to the supplier.",
        variant: "default",
      });
      
      console.log('Form submitted:', data);
    } catch (error) {
      toast({
        title: "Error Submitting Form",
        description: "There was a problem submitting your form. Please try again.",
        variant: "destructive",
      });
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const saveAsDraft = async () => {
    try {
      const data = form.getValues();
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Draft Saved",
        description: "Your form has been saved as a draft.",
        variant: "default",
      });
      
      console.log('Draft saved:', data);
    } catch (error) {
      toast({
        title: "Error Saving Draft",
        description: "There was a problem saving your draft. Please try again.",
        variant: "destructive",
      });
      console.error('Error saving draft:', error);
    }
  };
  
  return (
    <ScrollArea className="h-[calc(100vh-6rem)] w-full">
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">New Line Form</CardTitle>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Tabs defaultValue="product" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-6 mb-8">
                    <TabsTrigger value="product">Product</TabsTrigger>
                    <TabsTrigger value="pricing">Pricing</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="images">Images</TabsTrigger>
                    <TabsTrigger value="variants">Variants</TabsTrigger>
                    <TabsTrigger value="supplier">Supplier</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="product" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="productTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Title *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter product title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Brand *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter brand name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="productDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Description *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter detailed product description" 
                              className="min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category *</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="skincare">Skincare</SelectItem>
                                <SelectItem value="makeup">Makeup</SelectItem>
                                <SelectItem value="haircare">Haircare</SelectItem>
                                <SelectItem value="fragrance">Fragrance</SelectItem>
                                <SelectItem value="bathbody">Bath & Body</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="subcategory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subcategory *</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select subcategory" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="serums">Serums</SelectItem>
                                <SelectItem value="moisturizers">Moisturizers</SelectItem>
                                <SelectItem value="sunscreen">Sunscreen</SelectItem>
                                <SelectItem value="shampoo">Shampoo</SelectItem>
                                <SelectItem value="conditioner">Conditioner</SelectItem>
                                <SelectItem value="bodywash">Bodywash</SelectItem>
                                <SelectItem value="body lotion">Body Lotion</SelectItem>
                                <SelectItem value="body scrub">Body Scrub</SelectItem>
                                <SelectItem value="body oil">Body Oil</SelectItem>
                                <SelectItem value="body cream">Body Cream</SelectItem>
                                <SelectItem value="body gel">Body Gel</SelectItem>
                                <SelectItem value="body spray">Body Spray</SelectItem>
                                <SelectItem value="body mist">Body Mist</SelectItem>
                                <SelectItem value="body lotion">Body Lotion</SelectItem>
                                <SelectItem value="body scrub">Body Scrub</SelectItem>
                                <SelectItem value="body oil">Body Oil</SelectItem>
                                <SelectItem value="body cream">Body Cream</SelectItem>
                                <SelectItem value="body gel">Body Gel</SelectItem>
                                <SelectItem value="body spray">Body Spray</SelectItem>
                                <SelectItem value="body mist">Body Mist</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="productType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Type *</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select product type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="topical">Topical</SelectItem>
                                <SelectItem value="oral">Oral</SelectItem>
                                <SelectItem value="inhalation">Inhalation</SelectItem>
                                <SelectItem value="dermal">Dermal</SelectItem>
                                <SelectItem value="vaginal">Vaginal</SelectItem>
                                <SelectItem value="injection">Injection</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="pricing" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="sku"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SKU *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter SKU" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="barcode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Barcode/EAN *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter barcode/EAN" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="retailPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Retail Price *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter retail price" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="costPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cost Price *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter cost price" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="taxable"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Taxable</FormLabel>
                          <FormControl>
                            <Checkbox {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  <TabsContent value="details" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="ingredients"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ingredients</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter product ingredients" 
                              className="min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="howToUse"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How to Use</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter how to use instructions" 
                              className="min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="countryOfOrigin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country of Origin *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter country of origin" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  <TabsContent value="images" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="mainImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Main Image URL *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter main image URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="additionalImages"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Images (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter additional image URLs" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  <TabsContent value="variants" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="hasVariants"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Has Variants</FormLabel>
                          <FormControl>
                            <Checkbox {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="variantType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Variant Type</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter variant type" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="variantOptions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Variant Options</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter variant options" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  <TabsContent value="supplier" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="supplierName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Supplier Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter supplier name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="supplierEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Supplier Email *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter supplier email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="supplierCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Supplier Code *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter supplier code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="leadTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lead Time</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter lead time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="minimumOrderQuantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Order Quantity</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter minimum order quantity" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
                
                <div className="mt-8 pt-4 border-t">
                  <div className="w-full bg-secondary rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="mt-3 flex items-center gap-2">
                    {completionPercentage === 100 ? (
                      <CheckCircle className="text-green-500 h-5 w-5" />
                    ) : completionPercentage > 60 ? (
                      <CheckCircle className="text-amber-500 h-5 w-5" />
                    ) : completionPercentage > 0 ? (
                      <AlertCircle className="text-red-500 h-5 w-5" />
                    ) : (
                      <Clock className="text-gray-400 h-5 w-5" />
                    )}
                    
                    <div className="text-sm font-medium">
                      {completionPercentage === 100
                        ? "All required fields completed"
                        : completionPercentage > 60
                        ? "Form mostly complete"
                        : completionPercentage > 0
                        ? "Form incomplete"
                        : "No fields completed yet"}
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground flex justify-between">
                    <span>Form completion: {completionPercentage}%</span>
                    <span>{fieldsCompleted} of {totalFields} fields completed</span>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={saveAsDraft}
                    className="flex items-center gap-2"
                  >
                    Save as Draft
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>Processing...</>
                    ) : (
                      <>
                        Submit Form
                        <ArrowRight size={16} />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};

export default NewLineForm;
