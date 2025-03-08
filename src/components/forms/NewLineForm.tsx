
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  ChevronRight, 
  Upload, 
  UploadCloud, 
  Clipboard, 
  Save, 
  FileSpreadsheet, 
  Mail,
  Plus,
  Minus,
  Image as ImageIcon
} from 'lucide-react';
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define form schema
const formSchema = z.object({
  brand: z.string().min(2, { message: "Brand name is required" }),
  productName: z.string().min(2, { message: "Product name is required" }),
  productType: z.string().min(1, { message: "Please select a product type" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  shortDescription: z.string().min(5, { message: "Short description is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  compareAtPrice: z.string().optional(),
  sku: z.string().min(1, { message: "SKU is required" }),
  barcode: z.string().optional(),
  weight: z.string().optional(),
  quantity: z.string().min(1, { message: "Quantity is required" }),
  tags: z.string().optional(),
  supplierEmail: z.string().email({ message: "Valid email is required" }),
  trackInventory: z.boolean().default(true),
  isVisible: z.boolean().default(true),
});

interface Variant {
  id: string;
  option: string;
  value: string;
}

interface ImageFile {
  id: string;
  file: File | null;
  preview: string;
}

const NewLineForm = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("product");
  const [variants, setVariants] = useState<Variant[]>([{ id: '1', option: '', value: '' }]);
  const [images, setImages] = useState<ImageFile[]>([
    { id: '1', file: null, preview: '' },
    { id: '2', file: null, preview: '' },
    { id: '3', file: null, preview: '' },
    { id: '4', file: null, preview: '' },
    { id: '5', file: null, preview: '' },
  ]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      brand: "",
      productName: "",
      productType: "",
      description: "",
      shortDescription: "",
      price: "",
      compareAtPrice: "",
      sku: "",
      barcode: "",
      weight: "",
      quantity: "",
      tags: "",
      supplierEmail: "",
      trackInventory: true,
      isVisible: true,
    },
  });
  
  const handleAddVariant = () => {
    setVariants([...variants, { id: Date.now().toString(), option: '', value: '' }]);
  };
  
  const handleRemoveVariant = (id: string) => {
    if (variants.length > 1) {
      setVariants(variants.filter(variant => variant.id !== id));
    }
  };
  
  const handleVariantChange = (id: string, field: 'option' | 'value', value: string) => {
    setVariants(variants.map(variant => 
      variant.id === id ? { ...variant, [field]: value } : variant
    ));
  };
  
  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setImages(images.map(img => 
            img.id === id ? { ...img, file, preview: event.target.result as string } : img
          ));
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Check if at least one image is uploaded
    const uploadedImages = images.filter(img => img.file);
    if (uploadedImages.length < 5) {
      toast({
        title: "Validation Error",
        description: "Please upload at least 5 images for the product",
        variant: "destructive",
      });
      return;
    }
    
    // Combine form values with variants and images
    const formData = {
      ...values,
      variants,
      images: uploadedImages.map(img => ({
        filename: img.file?.name,
        size: img.file?.size,
        type: img.file?.type,
      })),
    };
    
    console.log("Form submitted:", formData);
    
    // Simulate form submission success
    toast({
      title: "Form Submitted",
      description: "The new line form has been successfully submitted.",
    });
    
    // Reset form
    form.reset();
    setVariants([{ id: '1', option: '', value: '' }]);
    setImages([
      { id: '1', file: null, preview: '' },
      { id: '2', file: null, preview: '' },
      { id: '3', file: null, preview: '' },
      { id: '4', file: null, preview: '' },
      { id: '5', file: null, preview: '' },
    ]);
  };
  
  const handleGenerateExcel = () => {
    // This would generate an Excel file based on the form data
    toast({
      title: "Excel Generated",
      description: "The Excel file has been generated and is ready for download.",
    });
  };
  
  const handleSendEmail = () => {
    // This would send an email with the form or Excel file
    toast({
      title: "Email Sent",
      description: `The form has been sent to the supplier at ${form.getValues().supplierEmail}`,
    });
  };
  
  return (
    <div className="container mx-auto px-6 pt-20 pb-12 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">New Line Form</h1>
        <p className="text-muted-foreground">
          Create and manage product information from suppliers.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card className="mb-6 transition-all duration-300 hover:shadow-soft-lg overflow-hidden">
                <CardHeader className="pb-4">
                  <Tabs 
                    value={activeTab} 
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="w-full justify-start mb-2">
                      <TabsTrigger value="product" className="text-xs">Product Information</TabsTrigger>
                      <TabsTrigger value="variants" className="text-xs">Variants</TabsTrigger>
                      <TabsTrigger value="images" className="text-xs">Images</TabsTrigger>
                      <TabsTrigger value="metafields" className="text-xs">Metafields</TabsTrigger>
                    </TabsList>
                    
                    <CardTitle className="text-lg mt-4">
                      {activeTab === "product" && "Product Information"}
                      {activeTab === "variants" && "Product Variants"}
                      {activeTab === "images" && "Product Images"}
                      {activeTab === "metafields" && "Custom Metafields"}
                    </CardTitle>
                    <CardDescription>
                      {activeTab === "product" && "Enter the basic information about this product"}
                      {activeTab === "variants" && "Define variants like size, color, or material"}
                      {activeTab === "images" && "Upload at least 5 high-quality product images"}
                      {activeTab === "metafields" && "Add custom metafields for additional product data"}
                    </CardDescription>
                  </Tabs>
                </CardHeader>
                
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-24rem)] pr-4">
                    <TabsContent value="product" className="mt-0 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="brand"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Brand Name</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Chanel" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="productName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Product Name</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. N°5 Eau de Parfum" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="productType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select product type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="fragrance">Fragrance</SelectItem>
                                <SelectItem value="skincare">Skincare</SelectItem>
                                <SelectItem value="makeup">Makeup</SelectItem>
                                <SelectItem value="haircare">Haircare</SelectItem>
                                <SelectItem value="bath-body">Bath & Body</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Detailed product description..." 
                                className="min-h-32" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Include key selling points, benefits, and usage instructions.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="shortDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Short Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Brief product summary..." 
                                className="min-h-20" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              A concise summary shown in product listings (max 150 characters).
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Separator />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price (£)</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. 99.00" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="compareAtPrice"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Compare-at Price (£) (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. 120.00" {...field} />
                              </FormControl>
                              <FormDescription>
                                Original price if the product is on sale
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="sku"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>SKU</FormLabel>
                              <FormControl>
                                <Input placeholder="Stock Keeping Unit" {...field} />
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
                              <FormLabel>Barcode (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="UPC, EAN, etc." {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Weight (g) (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. 100" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="quantity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Initial Quantity</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. 100" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="tags"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tags (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Comma-separated tags" {...field} />
                              </FormControl>
                              <FormDescription>
                                E.g. new, featured, seasonal
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="trackInventory"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between p-3 rounded-lg border">
                              <div className="space-y-0.5">
                                <FormLabel>Track Inventory</FormLabel>
                                <FormDescription>
                                  Keep track of stock levels
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="isVisible"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between p-3 rounded-lg border">
                              <div className="space-y-0.5">
                                <FormLabel>Visible on Storefront</FormLabel>
                                <FormDescription>
                                  Product will be published on approval
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="supplierEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Supplier Email</FormLabel>
                            <FormControl>
                              <Input placeholder="supplier@example.com" {...field} />
                            </FormControl>
                            <FormDescription>
                              This email will be used for communications about this product
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                    
                    <TabsContent value="variants" className="mt-0">
                      <div className="space-y-6">
                        {variants.map((variant, index) => (
                          <div key={variant.id} className="p-4 border rounded-lg relative">
                            <div className="absolute right-4 top-4">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveVariant(variant.id)}
                                disabled={variants.length === 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <h3 className="font-medium mb-4">Variant {index + 1}</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`variant-option-${variant.id}`}>Option Type</Label>
                                <Select 
                                  value={variant.option} 
                                  onValueChange={(value) => handleVariantChange(variant.id, 'option', value)}
                                >
                                  <SelectTrigger id={`variant-option-${variant.id}`} className="mt-1 w-full">
                                    <SelectValue placeholder="Select option type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="size">Size</SelectItem>
                                    <SelectItem value="color">Color</SelectItem>
                                    <SelectItem value="material">Material</SelectItem>
                                    <SelectItem value="style">Style</SelectItem>
                                    <SelectItem value="volume">Volume</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div>
                                <Label htmlFor={`variant-value-${variant.id}`}>Option Value</Label>
                                <Input
                                  id={`variant-value-${variant.id}`}
                                  value={variant.value}
                                  onChange={(e) => handleVariantChange(variant.id, 'value', e.target.value)}
                                  placeholder="e.g. Small, Red, 100ml"
                                  className="mt-1"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={handleAddVariant}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Another Variant
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="images" className="mt-0">
                      <div className="space-y-4">
                        <div className="p-4 border border-dashed rounded-lg bg-muted/40">
                          <div className="text-center py-4">
                            <UploadCloud className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                            <h3 className="font-medium">Product Images</h3>
                            <p className="text-sm text-muted-foreground mt-1 mb-2">
                              Upload at least 5 high-quality images (PNG, JPG or WebP)
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                            {images.map((image, index) => (
                              <div 
                                key={image.id} 
                                className="border rounded-lg p-4 flex flex-col items-center text-center"
                              >
                                <div 
                                  className={`relative w-full h-40 rounded-md mb-2 flex items-center justify-center ${
                                    image.preview 
                                      ? 'bg-muted/20' 
                                      : 'bg-muted border-2 border-dashed'
                                  }`}
                                >
                                  {image.preview ? (
                                    <img 
                                      src={image.preview} 
                                      alt={`Preview ${index + 1}`} 
                                      className="h-full w-full object-contain rounded-md"
                                    />
                                  ) : (
                                    <ImageIcon className="h-10 w-10 text-muted-foreground/40" />
                                  )}
                                </div>
                                
                                <Label
                                  htmlFor={`image-upload-${image.id}`}
                                  className="w-full"
                                >
                                  <div className="cursor-pointer">
                                    <Button 
                                      type="button" 
                                      variant="outline" 
                                      size="sm" 
                                      className="w-full mt-2"
                                    >
                                      <Upload className="mr-2 h-3.5 w-3.5" />
                                      {image.file ? 'Change Image' : 'Upload Image'}
                                    </Button>
                                  </div>
                                  <span className="sr-only">Upload Image {index + 1}</span>
                                </Label>
                                <Input
                                  id={`image-upload-${image.id}`}
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleImageUpload(image.id, e)}
                                />
                                
                                <p className="text-xs text-muted-foreground mt-2">
                                  {index === 0 ? 'Main Image' : `Additional Image ${index}`}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="metafields" className="mt-0">
                      <div className="space-y-6">
                        <div className="p-4 border rounded-lg">
                          <h3 className="font-medium mb-4">Ingredients</h3>
                          <Textarea 
                            placeholder="Full list of ingredients..."
                            className="min-h-32"
                          />
                          <p className="text-xs text-muted-foreground mt-2">
                            List all ingredients in order of concentration
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-4 border rounded-lg">
                            <h3 className="font-medium mb-4">Product Origin</h3>
                            <Input placeholder="e.g. France, Italy" />
                            <p className="text-xs text-muted-foreground mt-2">
                              Country where the product was manufactured
                            </p>
                          </div>
                          
                          <div className="p-4 border rounded-lg">
                            <h3 className="font-medium mb-4">Certifications</h3>
                            <Input placeholder="e.g. Cruelty-Free, Vegan" />
                            <p className="text-xs text-muted-foreground mt-2">
                              Any certifications or standards met by this product
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-4 border rounded-lg">
                            <h3 className="font-medium mb-4">How To Use</h3>
                            <Textarea 
                              placeholder="Application instructions..."
                              className="min-h-20"
                            />
                          </div>
                          
                          <div className="p-4 border rounded-lg">
                            <h3 className="font-medium mb-4">Key Benefits</h3>
                            <Textarea 
                              placeholder="Main product benefits..."
                              className="min-h-20"
                            />
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h3 className="font-medium mb-4">Dimensions</h3>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="length">Length (cm)</Label>
                              <Input id="length" placeholder="0.0" />
                            </div>
                            <div>
                              <Label htmlFor="width">Width (cm)</Label>
                              <Input id="width" placeholder="0.0" />
                            </div>
                            <div>
                              <Label htmlFor="height">Height (cm)</Label>
                              <Input id="height" placeholder="0.0" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="sticky top-24 transition-all duration-300 hover:shadow-soft-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Form Actions</CardTitle>
                  <CardDescription>
                    Save, export or share this form
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <Button className="w-full" type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save and Submit
                  </Button>
                  
                  <Button variant="outline" className="w-full" type="button" onClick={handleGenerateExcel}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Generate Excel
                  </Button>
                  
                  <Button variant="outline" className="w-full" type="button" onClick={handleSendEmail}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email to Supplier
                  </Button>
                </CardContent>
                
                <CardFooter className="flex flex-col items-stretch gap-4 border-t pt-6">
                  <div className="text-sm">
                    <h4 className="font-medium">Validation Status</h4>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-center text-xs text-green-500">
                        <span className="bg-green-100 p-0.5 rounded-full mr-2">
                          <CheckCircle2 className="h-3 w-3" />
                        </span>
                        Basic information completed
                      </li>
                      <li className="flex items-center text-xs text-green-500">
                        <span className="bg-green-100 p-0.5 rounded-full mr-2">
                          <CheckCircle2 className="h-3 w-3" />
                        </span>
                        Pricing information added
                      </li>
                      <li className="flex items-center text-xs text-amber-500">
                        <span className="bg-amber-100 p-0.5 rounded-full mr-2">
                          <AlertCircle className="h-3 w-3" />
                        </span>
                        5 product images required
                      </li>
                      <li className="flex items-center text-xs text-muted-foreground">
                        <span className="bg-muted p-0.5 rounded-full mr-2">
                          <ClockIcon className="h-3 w-3" />
                        </span>
                        Waiting for human validation
                      </li>
                    </ul>
                  </div>
                  
                  <div className="text-sm">
                    <h4 className="font-medium">Required Fields Completion</h4>
                    <Progress value={75} className="h-2 mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">75% complete</p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewLineForm;
