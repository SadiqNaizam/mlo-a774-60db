import React from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from 'framer-motion';

// Import Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartSummary from '@/components/CartSummary';

// Import shadcn/ui Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CreditCard, Wallet, Home, Phone, User } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";


// Form validation schema
const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Please enter a valid address." }),
  city: z.string().min(2, { message: "Please enter a valid city." }),
  state: z.string().min(2, { message: "Please enter a valid state." }),
  zipCode: z.string().min(5, { message: "Please enter a valid ZIP code." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  paymentMethod: z.enum(["credit-card", "paypal"], {
    required_error: "You need to select a payment method.",
  }),
  promoCode: z.string().optional(),
});

const CheckoutPage: React.FC = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      paymentMethod: "credit-card",
      promoCode: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Order submitted:", values);
    toast({
      title: "Order Placed!",
      description: "We've received your order and are preparing it now.",
    });
    // Navigate to the order tracking page upon successful submission
    navigate('/order-tracking');
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-1 container py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Form Details */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Delivery Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Information</CardTitle>
                    <CardDescription>Where should we send your order?</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} icon={User} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="address" render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Street Address</FormLabel>
                        <FormControl><Input placeholder="123 Foodie Lane" {...field} icon={Home} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Tastytown" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="state" render={({ field }) => (
                      <FormItem><FormLabel>State</FormLabel><FormControl><Input placeholder="CA" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="zipCode" render={({ field }) => (
                      <FormItem><FormLabel>ZIP Code</FormLabel><FormControl><Input placeholder="90210" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" placeholder="(123) 456-7890" {...field} icon={Phone}/></FormControl><FormMessage /></FormItem>
                    )} />
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>Choose how you'd like to pay.</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-2"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="credit-card" /></FormControl>
                                <FormLabel className="font-normal flex items-center gap-2"><CreditCard className="h-4 w-4" /> Credit Card</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="paypal" /></FormControl>
                                <FormLabel className="font-normal flex items-center gap-2"><Wallet className="h-4 w-4" /> PayPal</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Promo Code */}
                <Accordion type="single" collapsible>
                  <AccordionItem value="promo-code">
                    <AccordionTrigger className="text-base font-semibold">Have a promo code?</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex gap-2">
                         <FormField control={form.control} name="promoCode" render={({ field }) => (
                          <FormItem className="flex-grow">
                            <FormControl><Input placeholder="Enter code" {...field} /></FormControl>
                          </FormItem>
                        )} />
                        <Button type="button" variant="secondary">Apply</Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button type="submit" size="lg" className="w-full text-lg">Place Order</Button>
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Order</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* CartSummary is used here as per layout requirements */}
                      <CartSummary />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </Form>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

export default CheckoutPage;