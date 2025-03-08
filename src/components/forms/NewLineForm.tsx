
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Upload, 
  Trash2, 
  Plus,
  Info, 
  ArrowRight
} from 'lucide-react';

const lineItemSchema = z.object({
  name: z.string().min(2, {
    message: 'Product name must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  unitCost: z.string().refine((value) => {
    const num = Number(value);
    return !isNaN(num) && num > 0;
  }, {
    message: 'Unit cost must be a valid number greater than zero.',
  }),
  sellingPrice: z.string().refine((value) => {
    const num = Number(value);
    return !isNaN(num) && num > 0;
  }, {
    message: 'Selling price must be a valid number greater than zero.',
  }),
  moq: z.string().refine((value) => {
    const num = Number(value);
    return !isNaN(num) && num > 0;
  }, {
    message: 'MOQ must be a valid number greater than zero.',
  }),
  leadTime: z.string().refine((value) => {
    const num = Number(value);
    return !isNaN(num) && num > 0;
  }, {
    message: 'Lead time must be a valid number greater than zero.',
  }),
  productCategory: z.string().min(2, {
    message: 'Product category must be at least 2 characters.',
  }),
  fragranceType: z.string().min(2, {
    message: 'Fragrance type must be at least 2 characters.',
  }),
  gender: z.string().min(2, {
    message: 'Gender must be at least 2 characters.',
  }),
  barcode: z.string().optional(),
  taxCode: z.string().optional(),
  brandName: z.string().min(2, {
    message: 'Brand name must be at least 2 characters.',
  }),
  isFragranceConcentrated: z.boolean().default(false),
  isAlcoholFree: z.boolean().default(false),
  isLongLasting: z.boolean().default(false),
  isNatural: z.boolean().default(false),
  isOrganic: z.boolean().default(false),
  isCrueltyFree: z.boolean().default(false),
  isVegan: z.boolean().default(false),
  isHypoallergenic: z.boolean().default(false),
  isDermatologicallyTested: z.boolean().default(false),
  isSuitableForSensitiveSkin: z.boolean().default(false),
  isParabenFree: z.boolean().default(false),
  isSulfateFree: z.boolean().default(false),
  isPhthalateFree: z.boolean().default(false),
  isGlutenFree: z.boolean().default(false),
  isSiliconeFree: z.boolean().default(false),
  isOilFree: z.boolean().default(false),
  isAmmoniaFree: z.boolean().default(false),
  isFormaldehydeFree: z.boolean().default(false),
  isTriclosanFree: z.boolean().default(false),
  isMineralOilFree: z.boolean().default(false),
  isPegFree: z.boolean().default(false),
  isNanoParticleFree: z.boolean().default(false),
  isDyeFree: z.boolean().default(false),
  isArtificialColorFree: z.boolean().default(false),
  isArtificialFragranceFree: z.boolean().default(false),
  isAlcoholDenatFree: z.boolean().default(false),
  isAnimalDerivedIngredientFree: z.boolean().default(false),
  isAerosolFree: z.boolean().default(false),
  isRecyclable: z.boolean().default(false),
  isBiodegradable: z.boolean().default(false),
  isCompostable: z.boolean().default(false),
  isRefillable: z.boolean().default(false),
  isReusable: z.boolean().default(false),
  isSustainable: z.boolean().default(false),
  isFairTrade: z.boolean().default(false),
  isEthicallySourced: z.boolean().default(false),
  isResponsiblySourced: z.boolean().default(false),
  isCarbonNeutral: z.boolean().default(false),
  isWaterless: z.boolean().default(false),
  isConcentratedFormula: z.boolean().default(false),
  isMultiUse: z.boolean().default(false),
  isTravelSize: z.boolean().default(false),
  isUnisex: z.boolean().default(false),
  isLimitedEdition: z.boolean().default(false),
  isNewArrival: z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
  isRecommendedByDermatologist: z.boolean().default(false),
  isClinicallyProven: z.boolean().default(false),
  isAwardWinning: z.boolean().default(false),
  isPatentPending: z.boolean().default(false),
  isExclusive: z.boolean().default(false),
  isOnlineOnly: z.boolean().default(false),
  isAvailableInStore: z.boolean().default(false),
  isDiscontinued: z.boolean().default(false),
  isSeasonal: z.boolean().default(false),
  isFestive: z.boolean().default(false),
  isGiftSet: z.boolean().default(false),
  isSampleAvailable: z.boolean().default(false),
  isTesterAvailable: z.boolean().default(false),
  isWithPackaging: z.boolean().default(false),
  isWithoutPackaging: z.boolean().default(false),
  isSuitableForAllSkinTypes: z.boolean().default(false),
  isSuitableForDrySkin: z.boolean().default(false),
  isSuitableForOilySkin: z.boolean().default(false),
  isSuitableForCombinationSkin: z.boolean().default(false),
  isSuitableForSensitiveSkin2: z.boolean().default(false),
  isSuitableForAcneProneSkin: z.boolean().default(false),
  isSuitableForMatureSkin: z.boolean().default(false),
  isSuitableForYoungSkin: z.boolean().default(false),
  isSuitableForMen: z.boolean().default(false),
  isSuitableForWomen: z.boolean().default(false),
  isSuitableForChildren: z.boolean().default(false),
  isSuitableForBabies: z.boolean().default(false),
  isSuitableForPregnantWomen: z.boolean().default(false),
  isSuitableForBreastfeedingWomen: z.boolean().default(false),
  isSuitableForElderly: z.boolean().default(false),
  isSuitableForDisabled: z.boolean().default(false),
  isSuitableForAllEthnicities: z.boolean().default(false),
  isSuitableForVegans: z.boolean().default(false),
  isSuitableForVegetarians: z.boolean().default(false),
  isSuitableForCoeliacs: z.boolean().default(false),
  isSuitableForDiabetics: z.boolean().default(false),
  isSuitableForPeopleWithAllergies: z.boolean().default(false),
  isSuitableForPeopleWithAsthma: z.boolean().default(false),
  isSuitableForPeopleWithEczema: z.boolean().default(false),
  isSuitableForPeopleWithPsoriasis: z.boolean().default(false),
  isSuitableForPeopleWithRosacea: z.boolean().default(false),
  isSuitableForPeopleWithDermatitis: z.boolean().default(false),
  isSuitableForPeopleWithSensitiveScalp: z.boolean().default(false),
  isSuitableForPeopleWithHairLoss: z.boolean().default(false),
  isSuitableForPeopleWithDandruff: z.boolean().default(false),
  isSuitableForPeopleWithBrittleNails: z.boolean().default(false),
  isSuitableForPeopleWithDryHands: z.boolean().default(false),
  isSuitableForPeopleWithCrackedHeels: z.boolean().default(false),
  isSuitableForPeopleWithSunburn: z.boolean().default(false),
  isSuitableForPeopleWithInsectBites: z.boolean().default(false),
  isSuitableForPeopleWithScars: z.boolean().default(false),
  isSuitableForPeopleWithStretchMarks: z.boolean().default(false),
  isSuitableForPeopleWithTattoos: z.boolean().default(false),
  isSuitableForPeopleWithPiercings: z.boolean().default(false),
  isSuitableForPeopleWithWarts: z.boolean().default(false),
  isSuitableForPeopleWithMoles: z.boolean().default(false),
  isSuitableForPeopleWithFreckles: z.boolean().default(false),
  isSuitableForPeopleWithBirthmarks: z.boolean().default(false),
  isSuitableForPeopleWithVitiligo: z.boolean().default(false),
  isSuitableForPeopleWithAlbinism: z.boolean().default(false),
  isSuitableForPeopleWithLupus: z.boolean().default(false),
  isSuitableForPeopleWithArthritis: z.boolean().default(false),
  isSuitableForPeopleWithOsteoporosis: z.boolean().default(false),
  isSuitableForPeopleWithFibromyalgia: z.boolean().default(false),
  isSuitableForPeopleWithChronicFatigueSyndrome: z.boolean().default(false),
  isSuitableForPeopleWithMultipleSclerosis: z.boolean().default(false),
  isSuitableForPeopleWithParkinsonsDisease: z.boolean().default(false),
  isSuitableForPeopleWithAlzheimersDisease: z.boolean().default(false),
  isSuitableForPeopleWithDementia: z.boolean().default(false),
  isSuitableForPeopleWithEpilepsy: z.boolean().default(false),
  isSuitableForPeopleWithMigraines: z.boolean().default(false),
  isSuitableForPeopleWithHeadaches: z.boolean().default(false),
  isSuitableForPeopleWithBackPain: z.boolean().default(false),
  isSuitableForPeopleWithNeckPain: z.boolean().default(false),
  isSuitableForPeopleWithShoulderPain: z.boolean().default(false),
  isSuitableForPeopleWithElbowPain: z.boolean().default(false),
  isSuitableForPeopleWithWristPain: z.boolean().default(false),
  isSuitableForPeopleWithHandPain: z.boolean().default(false),
  isSuitableForPeopleWithHipPain: z.boolean().default(false),
  isSuitableForPeopleWithKneePain: z.boolean().default(false),
  isSuitableForPeopleWithAnklePain: z.boolean().default(false),
  isSuitableForPeopleWithFootPain: z.boolean().default(false),
  isSuitableForPeopleWithToePain: z.boolean().default(false),
  isSuitableForPeopleWithBunions: z.boolean().default(false),
  isSuitableForPeopleWithHammerToe: z.boolean().default(false),
  isSuitableForPeopleWithPlantarFasciitis: z.boolean().default(false),
  isSuitableForPeopleWithAchillesTendinitis: z.boolean().default(false),
  isSuitableForPeopleWithShinSplints: z.boolean().default(false),
  isSuitableForPeopleWithCarpalTunnelSyndrome: z.boolean().default(false),
  isSuitableForPeopleWithTennisElbow: z.boolean().default(false),
  isSuitableForPeopleWithGolfersElbow: z.boolean().default(false),
  isSuitableForPeopleWithBursitis: z.boolean().default(false),
  isSuitableForPeopleWithTendonitis: z.boolean().default(false),
  isSuitableForPeopleWithSprains: z.boolean().default(false),
  isSuitableForPeopleWithStrains: z.boolean().default(false),
  isSuitableForPeopleWithFractures: z.boolean().default(false),
  isSuitableForPeopleWithDislocations: z.boolean().default(false),
  isSuitableForPeopleWithArthroscopicSurgery: z.boolean().default(false),
  isSuitableForPeopleWithJointReplacementSurgery: z.boolean().default(false),
  isSuitableForPeopleWithSpinalFusionSurgery: z.boolean().default(false),
  isSuitableForPeopleWithLaminectomySurgery: z.boolean().default(false),
  isSuitableForPeopleWithDiscectomySurgery: z.boolean().default(false),
  isSuitableForPeopleWithKneeReplacementSurgery: z.boolean().default(false),
  isSuitableForPeopleWithHipReplacementSurgery: z.boolean().default(false),
  isSuitableForPeopleWithShoulderReplacementSurgery: z.boolean().default(false),
  isSuitableForPeopleWithElbowReplacementSurgery: z.boolean().default(false),
  isSuitableForPeopleWithWristReplacementSurgery: z.boolean().default(false),
  isSuitableForPeopleWithAnkleReplacementSurgery: z.boolean().default(false),
  isSuitableForPeopleWithFootReplacementSurgery: z.boolean().default(false),
  isSuitableForPeopleWithToeReplacementSurgery: z.boolean().default(false),
  isSuitableForPeopleWithBunionSurgery: z.boolean().default(false),
  isSuitableForPeopleWithHammerToeSurgery: z.boolean().default(false),
  isSuitableForPeopleWithPlantarFasciitisSurgery: z.boolean().default(false),
  isSuitableForPeopleWithAchillesTendinitisSurgery: z.boolean().default(false),
  isSuitableForPeopleWithShinSplintsSurgery: z.boolean().default(false),
  isSuitableForPeopleWithCarpalTunnelSyndromeSurgery: z.boolean().default(false),
  isSuitableForPeopleWithTennisElbowSurgery: z.boolean().default(false),
  isSuitableForPeopleWithGolfersElbowSurgery: z.boolean().default(false),
  isSuitableForPeopleWithBursitisSurgery: z.boolean().default(false),
  isSuitableForPeopleWithTendonitisSurgery: z.boolean().default(false),
  isSuitableForPeopleWithSprainsSurgery: z.boolean().default(false),
  isSuitableForPeopleWithStrainsSurgery: z.boolean().default(false),
  isSuitableForPeopleWithFracturesSurgery: z.boolean().default(false),
  isSuitableForPeopleWithDislocationsSurgery: z.boolean().default(false),
});

const formSchema = z.object({
  supplierName: z.string().min(2, {
    message: 'Supplier name must be at least 2 characters.',
  }),
  contactName: z.string().min(2, {
    message: 'Contact name must be at least 2 characters.',
  }),
  contactEmail: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  contactPhone: z.string().min(10, {
    message: 'Phone number must be at least 10 digits.',
  }),
  addressLine1: z.string().min(5, {
    message: 'Address must be at least 5 characters.',
  }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, {
    message: 'City must be at least 2 characters.',
  }),
  state: z.string().min(2, {
    message: 'State must be at least 2 characters.',
  }),
  zipCode: z.string().min(5, {
    message: 'Zip code must be at least 5 characters.',
  }),
  country: z.string().min(2, {
    message: 'Country must be at least 2 characters.',
  }),
  companyOverview: z.string().min(20, {
    message: 'Company overview must be at least 20 characters.',
  }),
  website: z.string().url({
    message: 'Please enter a valid website URL.',
  }),
  bankName: z.string().min(2, {
    message: 'Bank name must be at least 2 characters.',
  }),
  accountName: z.string().min(2, {
    message: 'Account name must be at least 2 characters.',
  }),
  accountNumber: z.string().min(8, {
    message: 'Account number must be at least 8 characters.',
  }),
  swiftCode: z.string().min(8, {
    message: 'Swift code must be at least 8 characters.',
  }),
  paymentTerms: z.string().min(2, {
    message: 'Payment terms must be at least 2 characters.',
  }),
  currency: z.string().min(2, {
    message: 'Currency must be at least 2 characters.',
  }),
  taxId: z.string().optional(),
  lineItems: z.array(lineItemSchema).min(1, {
    message: 'You must add at least one product line item.',
  }),
  additionalNotes: z.string().optional(),
  termsAndConditions: z.boolean().refine((value) => value === true, {
    message: 'You must accept the terms and conditions.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const NewLineForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [fieldsCompleted, setFieldsCompleted] = useState(0);
  const totalFields = 22;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplierName: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      companyOverview: '',
      website: '',
      bankName: '',
      accountName: '',
      accountNumber: '',
      swiftCode: '',
      paymentTerms: '',
      currency: '',
      taxId: '',
      lineItems: [],
      additionalNotes: '',
      termsAndConditions: false,
    },
  });

  const calculateCompletion = (data: FormValues) => {
    let completed = 0;
    if (data.supplierName) completed++;
    if (data.contactName) completed++;
    if (data.contactEmail) completed++;
    if (data.contactPhone) completed++;
    if (data.addressLine1) completed++;
    if (data.city) completed++;
    if (data.state) completed++;
    if (data.zipCode) completed++;
    if (data.country) completed++;
    if (data.companyOverview) completed++;
    if (data.website) completed++;
    if (data.bankName) completed++;
    if (data.accountName) completed++;
    if (data.accountNumber) completed++;
    if (data.swiftCode) completed++;
    if (data.paymentTerms) completed++;
    if (data.currency) completed++;
    if (data.taxId) completed++;
    if (data.lineItems.length > 0) completed++;
    if (data.additionalNotes) completed++;
    if (data.termsAndConditions) completed++;

    const percentage = Math.round((completed / totalFields) * 100);
    setFieldsCompleted(completed);
    setCompletionPercentage(percentage);
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form submitted:', data);
      toast({
        title: 'Success!',
        description: 'Your form has been submitted successfully.',
      });
      form.reset();
      setCompletionPercentage(0);
      setFieldsCompleted(0);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: 'There was an error submitting your form. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveAsDraft = () => {
    const data = form.getValues();
    console.log('Form saved as draft:', data);
    toast({
      title: 'Draft Saved!',
      description: 'Your form has been saved as a draft.',
    });
  };

  React.useEffect(() => {
    const subscription = form.watch((data) => {
      calculateCompletion(data as FormValues);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <ScrollArea className="h-[calc(100vh-8rem)] px-4">
      <div className="container max-w-5xl py-6">
        <Card className="mb-8 bg-white shadow-soft">
          <CardHeader>
            <Badge variant="outline" className="w-fit bg-primary/10 text-primary mb-2">Supplier Form</Badge>
            <CardTitle className="text-2xl font-semibold">New Product Line Submission</CardTitle>
            <CardDescription>
              Complete all required fields below to submit a new product line to Escentual.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="supplierName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supplier Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Escentual Ltd." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="020 7946 0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator className="my-4" />
                <h3 className="text-xl font-semibold mb-4">Company Address</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="addressLine1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main Street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="addressLine2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 2 (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Apartment, suite, unit, building, floor, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="London" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="Greater London" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input placeholder="SW1A 0AA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="United Kingdom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="my-4" />
                <h3 className="text-xl font-semibold mb-4">Company Information</h3>

                <FormField
                  control={form.control}
                  name="companyOverview"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Overview</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Briefly describe your company and its mission."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="my-4" />
                <h3 className="text-xl font-semibold mb-4">Bank Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="bankName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Lloyds Bank" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="accountName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Escentual Ltd." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <Input placeholder="12345678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="swiftCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SWIFT Code</FormLabel>
                        <FormControl>
                          <Input placeholder="LOYDGB2LXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="paymentTerms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Terms</FormLabel>
                        <FormControl>
                          <Input placeholder="Net 30 days" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <FormControl>
                          <Input placeholder="GBP" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="taxId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tax ID (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="GB123456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="my-4" />
                <h3 className="text-xl font-semibold mb-4">Product Line Items</h3>

                <div className="grid grid-cols-1 gap-4">
                  {/* Product Line Items Form Fields */}
                </div>

                <Separator className="my-4" />
                <h3 className="text-xl font-semibold mb-4">Additional Information</h3>

                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any additional information you would like to provide."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="termsAndConditions"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to the <a href="#" className="text-primary underline underline-offset-2">terms and conditions</a>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center">
                    <span className="mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                      <CheckCircle size={16} />
                    </span>
                    <span>Completed</span>
                  </div>
                  <div className="flex items-center ml-4">
                    <span className="mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                      <CheckCircle size={16} />
                    </span>
                    <span>Validated</span>
                  </div>
                  <div className="flex items-center ml-4">
                    <span className="mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-red-50 text-red-500">
                      <AlertCircle size={16} />
                    </span>
                    <span>Action Required</span>
                  </div>
                  <div className="flex items-center ml-4">
                    <span className="mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-amber-50 text-amber-500">
                      <Clock size={16} />
                    </span>
                    <span>Pending Review</span>
                  </div>
                </div>
                
                <div className="bg-muted/30 rounded-md p-4 border border-border">
                  <div className="w-full bg-secondary h-2 rounded overflow-hidden">
                    <div 
                      className="bg-primary h-full transition-all duration-500 ease-in-out"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
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
