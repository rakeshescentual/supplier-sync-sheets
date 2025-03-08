
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  sku: z.string().min(1, {
    message: "SKU is required.",
  }),
  price: z.string().min(1, {
    message: "Price is required.",
  }),
  taxable: z.boolean().default(true),
  requiresShipping: z.boolean().default(true),
  description: z.string().optional(),
  hasVariants: z.boolean().default(false),
  // Add other fields as needed
});

type FormValues = z.infer<typeof formSchema>;

export default function NewLineForm() {
  const { toast } = useToast();
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [draftSaved, setDraftSaved] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sku: "",
      price: "",
      taxable: true,
      requiresShipping: true,
      description: "",
      hasVariants: false,
      // Add other default values as needed
    },
  });

  // Form auto-save draft
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem("product-draft", JSON.stringify(value as FormValues));
      setDraftSaved(true);
      
      // Reset draft saved indicator after 3 seconds
      setTimeout(() => {
        setDraftSaved(false);
      }, 3000);
    });
    
    return () => subscription.unsubscribe();
  }, [form]);

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("product-draft");
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        form.reset(parsedDraft);
      } catch (error) {
        console.error("Error parsing saved draft:", error);
      }
    }
  }, [form]);

  function onSubmit(values: FormValues) {
    setFormStatus("submitting");
    
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setFormStatus("success");
      toast({
        title: "Product created",
        description: "Your product has been successfully created",
      });
      
      // Reset form after submission
      form.reset();
      // Clear draft from localStorage
      localStorage.removeItem("product-draft");
    }, 2000);
  }

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="p-4 max-w-4xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product name" {...field} />
                      </FormControl>
                      <FormDescription>
                        The name of your product as it will appear in your store.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter SKU" {...field} />
                      </FormControl>
                      <FormDescription>
                        Stock keeping unit. A unique identifier for your product.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="0.00" {...field} />
                      </FormControl>
                      <FormDescription>
                        The price of your product.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product description" {...field} />
                      </FormControl>
                      <FormDescription>
                        A detailed description of your product.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="taxable"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Taxable</FormLabel>
                        <FormDescription>
                          This product is subject to tax.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requiresShipping"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Requires Shipping</FormLabel>
                        <FormDescription>
                          This product requires shipping.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasVariants"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Has Variants</FormLabel>
                        <FormDescription>
                          This product has multiple variants.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    {formStatus === "success" && (
                      <div className="flex items-center text-green-500 mr-4">
                        <CheckCircle className="h-5 w-5 mr-1" />
                        <span>Saved successfully</span>
                      </div>
                    )}
                    {formStatus === "error" && (
                      <div className="flex items-center text-red-500 mr-4">
                        <AlertCircle className="h-5 w-5 mr-1" />
                        <span>Error saving</span>
                      </div>
                    )}
                    {formStatus === "submitting" && (
                      <div className="flex items-center text-blue-500 mr-4">
                        <Clock className="h-5 w-5 mr-1" />
                        <span>Saving...</span>
                      </div>
                    )}
                    {draftSaved && (
                      <div className="text-gray-500 text-sm">Draft saved</div>
                    )}
                  </div>
                  
                  <Button type="submit" disabled={formStatus === "submitting"}>
                    {formStatus === "submitting" ? "Saving..." : "Save Product"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
