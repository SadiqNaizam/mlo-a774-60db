import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ClipboardCheck, UtensilsCrossed, Bike, PackageCheck } from 'lucide-react';

// Define the possible statuses for an order
type OrderStatus = 'confirmed' | 'preparing' | 'delivery' | 'delivered';

interface OrderTrackerProps {
  /** The current status of the order */
  currentStatus: OrderStatus;
  /** Optional class names for custom styling */
  className?: string;
}

const steps = [
  { id: 'confirmed', label: 'Order Confirmed', Icon: ClipboardCheck },
  { id: 'preparing', label: 'Preparing Food', Icon: UtensilsCrossed },
  { id: 'delivery', label: 'Out for Delivery', Icon: Bike },
  { id: 'delivered', label: 'Delivered', Icon: PackageCheck },
];

const OrderTracker: React.FC<OrderTrackerProps> = ({ currentStatus, className }) => {
  console.log('OrderTracker loaded with status:', currentStatus);

  const currentStepIndex = steps.findIndex(step => step.id === currentStatus);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Order Status</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-8 px-4 sm:px-6">
        <div className="flex items-center">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isActive = index === currentStepIndex;
            const isPending = index > currentStepIndex;

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center text-center">
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-colors duration-300",
                      {
                        "bg-green-500 border-green-500 text-white": isCompleted || isActive,
                        "bg-gray-100 border-gray-300 text-gray-400": isPending,
                      }
                    )}
                  >
                    <step.Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <p
                    className={cn(
                      "mt-2 text-xs sm:text-sm font-medium",
                      {
                        "text-green-600": isCompleted || isActive,
                        "text-gray-500": isPending,
                      }
                    )}
                  >
                    {step.label}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "flex-1 h-1 mx-2 transition-colors duration-300",
                    {
                      "bg-green-500": isCompleted || isActive,
                      "bg-gray-200": isPending,
                    }
                  )} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTracker;