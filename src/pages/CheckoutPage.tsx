import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from 'framer-motion';

// Import Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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
import { Separator } from '@/components/ui/separator';
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

// Mock data for order summary
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}
const initialCartItems: CartItem[] = [
  { id: '1', name: 'Margherita Pizza', price: 12.99, quantity: 1, imageUrl: 'https://placehold.co/100x100/FFC107/000000?text=Pizza' },
  { id: '2', name: 'Caesar Salad', price: 8.50, quantity: 2, imageUrl: 'https://placehold.co/100x100/4CAF50/FFFFFF?text=Salad' },
  { id: '3', name: 'Coke Zero', price: 2.50, quantity: 1, imageUrl: 'https://placehold.co/100x100/F44336/FFFFFF?text=Drink' },
];


const CheckoutPage: React.FC = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const { toast } = useToast();

  const [cartItems] = useState<CartItem[]>(initialCartItems);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const deliveryFee = 2.99;
  const taxes = subtotal * 0.08;
  const total = subtotal + deliveryFee + taxes;

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
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="address" render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Street Address</FormLabel>
                        <FormControl><Input placeholder="123 Foodie Lane" {...field} /></FormControl>
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
                      <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" placeholder="(123) 456-7890" {...field} /></FormControl><FormMessage /></FormItem>
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
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="w-12 h-12 rounded-md object-cover"
                                />
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                        <Separator />
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <p className="text-muted-foreground">Subtotal</p>
                            <p className="font-medium">${subtotal.toFixed(2)}</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-muted-foreground">Delivery Fee</p>
                            <p className="font-medium">${deliveryFee.toFixed(2)}</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-muted-foreground">Taxes & Fees</p>
                            <p className="font-medium">${taxes.toFixed(2)}</p>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-base">
                          <p>Total</p>
                          <p>${total.toFixed(2)}</p>
                        </div>
                      </div>
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