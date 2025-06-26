import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Plus, ShoppingCart } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface MenuItemCardProps {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
}) => {
  const { toast } = useToast();
  console.log('MenuItemCard loaded for:', name);

  const handleAddToCart = () => {
    toast({
      title: "Item Added to Cart",
      description: `${name} has been successfully added.`,
      action: (
        <Button variant="outline" size="sm">
          View Cart
        </Button>
      ),
    });
    console.log(`Added menu item ${id} to cart.`);
  };

  return (
    <Card className="w-full flex flex-col sm:flex-row overflow-hidden transition-shadow hover:shadow-md">
      {/* Details and Actions */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex items-end justify-between mt-4">
          <span className="text-xl font-semibold text-foreground">${price.toFixed(2)}</span>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">Customize</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{name}</DialogTitle>
                  <DialogDescription>
                    Make changes to your item here. Click "Add to Order" when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="special-instructions">Special Instructions</Label>
                    <Textarea placeholder="e.g. 'No onions, please.'" id="special-instructions" />
                  </div>
                   {/* Placeholder for more options like quantity, add-ons etc. */}
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Order
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button size="sm" onClick={handleAddToCart}>
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="sm:w-32 md:w-40 flex-shrink-0 order-first sm:order-last">
        <img 
          src={imageUrl || 'https://via.placeholder.com/150'} 
          alt={name} 
          className="w-full h-32 sm:h-full object-cover"
        />
      </div>
    </Card>
  );
};

export default MenuItemCard;