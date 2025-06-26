import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuItemCard from '@/components/MenuItemCard';
import CartSummary from '@/components/CartSummary';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, MapPin, ShoppingCart } from 'lucide-react';

// --- MOCK DATA ---
const restaurantData = {
  name: 'The Golden Spoon',
  rating: 4.7,
  reviews: 321,
  address: '123 Culinary Lane, Foodie City',
  imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop',
  cuisine: ['Italian', 'Pizza', 'Pasta'],
};

const menu = {
  appetizers: [
    { id: 'app1', name: 'Bruschetta', description: 'Toasted bread with fresh tomatoes, garlic, basil, and olive oil.', price: 8.99, imageUrl: 'https://images.unsplash.com/photo-1505253716362-afb74bf60d44?q=80&w=2070&auto=format&fit=crop' },
    { id: 'app2', name: 'Garlic Knots', description: 'Soft, buttery garlic knots served with a side of marinara sauce.', price: 6.50, imageUrl: 'https://images.unsplash.com/photo-1627308595186-e6bb3673e864?q=80&w=1974&auto=format&fit=crop' },
  ],
  mainCourses: [
    { id: 'main1', name: 'Spaghetti Carbonara', description: 'Classic pasta with pancetta, egg, Parmesan cheese, and black pepper.', price: 16.99, imageUrl: 'https://images.unsplash.com/photo-1608796395892-43d738a6a12b?q=80&w=1974&auto=format&fit=crop' },
    { id: 'main2', name: 'Margherita Pizza', description: 'Simple yet delicious pizza with tomato sauce, fresh mozzarella, and basil.', price: 14.50, imageUrl: 'https://images.unsplash.com/photo-1598021680133-eb3a160ddd34?q=80&w=1974&auto=format&fit=crop' },
    { id: 'main3', name: 'Chicken Parmesan', description: 'Breaded chicken breast topped with marinara and melted mozzarella, served with pasta.', price: 18.00, imageUrl: 'https://images.unsplash.com/photo-1632778149955-e83f8ce9e324?q=80&w=2070&auto=format&fit=crop' },
  ],
  desserts: [
    { id: 'des1', name: 'Tiramisu', description: 'A coffee-flavored Italian dessert. Ladyfingers dipped in coffee, layered with a whipped mixture of eggs, sugar, and mascarpone cheese.', price: 9.00, imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=2070&auto=format&fit=crop' },
  ]
};
// --- END MOCK DATA ---

const RestaurantMenuPage: React.FC = () => {
  console.log('RestaurantMenuPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />

      <main className="flex-grow">
        {/* Restaurant Header Section */}
        <section className="relative h-48 md:h-64">
          <img
            src={restaurantData.imageUrl}
            alt={`${restaurantData.name} restaurant banner`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </section>

        <div className="container -mt-16 md:-mt-20 relative z-10">
          <Card className="p-4 sm:p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{restaurantData.name}</h1>
                <div className="flex items-center gap-4 text-muted-foreground mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-foreground">{restaurantData.rating}</span>
                    <span>({restaurantData.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{restaurantData.address}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                {restaurantData.cuisine.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}\
              </div>
            </div>
          </Card>
        </div>

        {/* Menu and Cart Section */}
        <div className="container mt-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">
            {/* Menu Items */}
            <div className="lg:col-span-8">
              <Tabs defaultValue="mainCourses" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="appetizers">Appetizers</TabsTrigger>
                  <TabsTrigger value="mainCourses">Main Courses</TabsTrigger>
                  <TabsTrigger value="desserts">Desserts</TabsTrigger>
                </TabsList>
                <TabsContent value="appetizers" className="mt-6">
                  <div className="grid gap-4">
                    {menu.appetizers.map(item => <MenuItemCard key={item.id} {...item} />)}\
                  </div>
                </TabsContent>
                <TabsContent value="mainCourses" className="mt-6">
                  <div className="grid gap-4">
                    {menu.mainCourses.map(item => <MenuItemCard key={item.id} {...item} />)}\
                  </div>
                </TabsContent>
                <TabsContent value="desserts" className="mt-6">
                  <div className="grid gap-4">
                     {menu.desserts.map(item => <MenuItemCard key={item.id} {...item} />)}\
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Cart Summary - Desktop (Sticky) */}
            <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24">
              <Card className="shadow-lg">
                <SheetHeader className="p-4 border-b">
                   <SheetTitle>Your Order</SheetTitle>
                </SheetHeader>
                <CartSummary />
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Cart Summary - Mobile (Floating Button & Sheet) */}
       <div className="lg:hidden fixed bottom-4 right-4 z-50">
         <Sheet>
            <SheetTrigger asChild>
                <Button size="lg" className="rounded-full shadow-xl h-16 w-16">
                    <ShoppingCart className="h-6 w-6" />
                    <span className="sr-only">View Cart</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col p-0">
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>Your Order</SheetTitle>
                </SheetHeader>
                <CartSummary />
            </SheetContent>
         </Sheet>
       </div>
    </div>
  );
};

export default RestaurantMenuPage;