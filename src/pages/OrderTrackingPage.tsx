import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderTracker from '@/components/OrderTracker';

// Import shadcn/ui Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

// Import Icons
import { Map, Clock } from 'lucide-react';

// Define types for order status
type OrderStatus = 'confirmed' | 'preparing' | 'delivery' | 'delivered';

const orderStatuses: OrderStatus[] = ['confirmed', 'preparing', 'delivery', 'delivered'];
const progressValues: { [key in OrderStatus]: number } = {
  confirmed: 10,
  preparing: 40,
  delivery: 75,
  delivered: 100,
};

const OrderTrackingPage = () => {
  console.log('OrderTrackingPage loaded');

  const [status, setStatus] = useState<OrderStatus>('confirmed');
  const [progress, setProgress] = useState(progressValues.confirmed);

  useEffect(() => {
    // Simulate order progress
    if (status !== 'delivered') {
      const currentStatusIndex = orderStatuses.indexOf(status);
      const nextStatus = orderStatuses[currentStatusIndex + 1];

      const timer = setTimeout(() => {
        setStatus(nextStatus);
        setProgress(progressValues[nextStatus]);
      }, 8000); // Update status every 8 seconds

      // Cleanup timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [status]);


  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-1 py-8 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Your Order is on its Way!</h1>
            <p className="text-muted-foreground mt-2">Track your delivery in real-time below.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Map Placeholder */}
            <div className="lg:col-span-2">
              <Card className="h-full shadow-sm">
                <CardHeader>
                  <CardTitle>Live Delivery Map</CardTitle>
                  <CardDescription>Real-time location of your delivery driver.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center bg-muted rounded-md h-80 text-muted-foreground">
                    <div className="text-center">
                      <Map className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-semibold">Map Feature Coming Soon</h3>
                      <p className="text-sm">We're working on bringing you live tracking.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Order Status and Details */}
            <div className="flex flex-col gap-8">
              <OrderTracker currentStatus={status} />
              
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <Clock className="w-6 h-6 text-primary"/>
                  <div>
                    <CardTitle>Estimated Delivery</CardTitle>
                    <CardDescription>Approximately 15-20 minutes remaining</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={progress} className="w-full" />
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>Restaurant: Sushi Palace</p>
                  <p>Order ID: #FP-1A2B3C</p>
                  <div className="mt-4">
                    <Button asChild className="w-full">
                      <Link to="/restaurant-listing">Order Again</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTrackingPage;