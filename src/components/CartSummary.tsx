import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';

// Define the structure of a cart item
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

// Mock data for initial cart state
const initialCartItems: CartItem[] = [
  { id: '1', name: 'Margherita Pizza', price: 12.99, quantity: 1, imageUrl: 'https://placehold.co/100x100/FFC107/000000?text=Pizza' },
  { id: '2', name: 'Caesar Salad', price: 8.50, quantity: 2, imageUrl: 'https://placehold.co/100x100/4CAF50/FFFFFF?text=Salad' },
  { id: '3', name: 'Coke Zero', price: 2.50, quantity: 1, imageUrl: 'https://placehold.co/100x100/F44336/FFFFFF?text=Drink' },
];

const CartSummary: React.FC = () => {
  console.log('CartSummary loaded');
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  // Handlers for item manipulation
  const handleQuantityChange = (id: string, delta: number) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  // Calculate subtotal using useMemo for efficiency
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  return (
    <div className="flex flex-col h-full bg-background">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
          <ShoppingCart className="w-16 h-16 mb-4" />
          <h3 className="text-xl font-semibold">Your cart is empty</h3>
          <p className="text-sm">Add items from the menu to get started.</p>
        </div>
      ) : (
        <>
          <ScrollArea className="flex-grow p-4">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.imageUrl || 'https://placehold.co/100x100'}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="flex-grow">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, -1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                   <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleRemoveItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t mt-auto">
            <Separator className="my-4" />
            <div className="flex justify-between items-center text-lg font-bold mb-4">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Button asChild className="w-full h-12 text-lg">
              <Link to="/checkout">
                Go to Checkout
              </Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSummary;