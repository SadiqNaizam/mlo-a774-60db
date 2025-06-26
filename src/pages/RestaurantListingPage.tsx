import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard, { RestaurantCardProps } from '@/components/RestaurantCard';

// shadcn/ui Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search } from 'lucide-react';

// Placeholder Data for Restaurants
const restaurants: RestaurantCardProps[] = [
  {
    slug: 'the-sushi-spot',
    name: 'The Sushi Spot',
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=800&auto=format&fit=crop',
    cuisine: 'Japanese',
    rating: 4.8,
    deliveryTime: 25,
  },
  {
    slug: 'bella-italia',
    name: 'Bella Italia',
    imageUrl: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=800&auto=format&fit=crop',
    cuisine: 'Italian',
    rating: 4.6,
    deliveryTime: 30,
  },
  {
    slug: 'taco-fiesta',
    name: 'Taco Fiesta',
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-151f8a0c4296?q=80&w=800&auto=format&fit=crop',
    cuisine: 'Mexican',
    rating: 4.5,
    deliveryTime: 20,
  },
  {
    slug: 'burger-bliss',
    name: 'Burger Bliss',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
    cuisine: 'American',
    rating: 4.7,
    deliveryTime: 25,
  },
  {
    slug: 'curry-kingdom',
    name: 'Curry Kingdom',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop',
    cuisine: 'Indian',
    rating: 4.9,
    deliveryTime: 35,
  },
  {
    slug: 'pho-nomenal',
    name: 'Pho-nomenal',
    imageUrl: 'https://images.unsplash.com/photo-1585102987345-a74c11435219?q=80&w=800&auto=format&fit=crop',
    cuisine: 'Vietnamese',
    rating: 4.6,
    deliveryTime: 30,
  },
];

const RestaurantListingPage: React.FC = () => {
  console.log('RestaurantListingPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-muted/[.50]">
      <Header />
      <main className="flex-grow">
        <div className="container py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Find Your Next Meal</h1>
            <p className="text-muted-foreground mt-2">
              Showing results for <span className="text-primary font-semibold">"sushi"</span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Filter & Sort</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="sort-by">Sort by</Label>
                    <Select defaultValue="rating">
                      <SelectTrigger id="sort-by" className="w-full mt-1">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rating">Highest Rating</SelectItem>
                        <SelectItem value="delivery_time">Fastest Delivery</SelectItem>
                        <SelectItem value="popular">Popularity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-2">Cuisine</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="cuisine-japanese" defaultChecked />
                        <Label htmlFor="cuisine-japanese">Japanese</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="cuisine-italian" />
                        <Label htmlFor="cuisine-italian">Italian</Label>
                      </div>
                       <div className="flex items-center space-x-2">
                        <Checkbox id="cuisine-mexican" />
                        <Label htmlFor="cuisine-mexican">Mexican</Label>
                      </div>
                       <div className="flex items-center space-x-2">
                        <Checkbox id="cuisine-indian" />
                        <Label htmlFor="cuisine-indian">Indian</Label>
                      </div>
                    </div>
                  </div>
                   <Separator />
                   <div>
                    <h3 className="font-semibold mb-2">Rating</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="rating-4" />
                        <Label htmlFor="rating-4">4 stars & up</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="rating-3" />
                        <Label htmlFor="rating-3">3 stars & up</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Restaurant Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.slug} {...restaurant} />
                ))}\
              </div>

              {/* Pagination */}
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantListingPage;