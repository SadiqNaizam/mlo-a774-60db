import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard, { RestaurantCardProps } from '@/components/RestaurantCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

// Placeholder data for categories and restaurants
const foodCategories = [
  { name: 'Pizza', imageUrl: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500&q=80' },
  { name: 'Sushi', imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&q=80' },
  { name: 'Burgers', imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&q=80' },
  { name: 'Italian', imageUrl: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=500&q=80' },
  { name: 'Mexican', imageUrl: 'https://images.unsplash.com/photo-1627907228175-2bf846a303b4?w=500&q=80' },
  { name: 'Desserts', imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&q=80' },
];

const featuredRestaurants: RestaurantCardProps[] = [
  { slug: 'the-pizza-place', name: 'The Pizza Place', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80', cuisine: 'Pizza', rating: 4.5, deliveryTime: 30 },
  { slug: 'sushi-world', name: 'Sushi World', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80', cuisine: 'Sushi', rating: 4.8, deliveryTime: 25 },
  { slug: 'burger-barn', name: 'Burger Barn', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80', cuisine: 'Burgers', rating: 4.3, deliveryTime: 20 },
  { slug: 'pasta-paradise', name: 'Pasta Paradise', imageUrl: 'https://images.unsplash.com/photo-1598866594240-a7b1a4a14215?w=500&q=80', cuisine: 'Italian', rating: 4.7, deliveryTime: 35 },
  { slug: 'taco-fiesta', name: 'Taco Fiesta', imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=500&q=80', cuisine: 'Mexican', rating: 4.6, deliveryTime: 25 },
];

const popularRestaurants: RestaurantCardProps[] = [
    { slug: 'burger-barn', name: 'Burger Barn', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80', cuisine: 'Burgers', rating: 4.3, deliveryTime: 20 },
    { slug: 'the-pizza-place', name: 'The Pizza Place', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80', cuisine: 'Pizza', rating: 4.5, deliveryTime: 30 },
    { slug: 'taco-fiesta', name: 'Taco Fiesta', imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=500&q=80', cuisine: 'Mexican', rating: 4.6, deliveryTime: 25 },
    { slug: 'sushi-world', name: 'Sushi World', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80', cuisine: 'Sushi', rating: 4.8, deliveryTime: 25 },
];


const HomePage = () => {
  console.log('HomePage loaded');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurant-listing?q=${searchQuery.trim()}`);
    } else {
      navigate('/restaurant-listing');
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[400px] bg-cover bg-center text-white flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920')" }}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Your next meal, delivered.</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Discover local restaurants and get your favorite food delivered right to your door.</p>
            <form onSubmit={handleSearch} className="flex max-w-xl mx-auto">
              <Input
                type="search"
                placeholder="Enter restaurant or cuisine..."
                className="rounded-r-none h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="lg" className="rounded-l-none h-12">
                <Search className="h-5 w-5 mr-2" /> Find Food
              </Button>
            </form>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 md:py-16 bg-muted/20">
            <div className="container">
                <h2 className="text-3xl font-bold text-center mb-8">Explore by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {foodCategories.map((category) => (
                        <Card key={category.name} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                            <CardContent className="p-0 relative">
                                <img src={category.imageUrl} alt={category.name} className="w-full h-32 object-cover" />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                                    <h3 className="text-white font-bold text-lg">{category.name}</h3>
                                </div>
                            </CardContent>
                        </Card>
                    ))}\
                </div>
            </div>
        </section>

        {/* Featured Restaurants Carousel */}
        <section className="py-12 md:py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">Featured Restaurants</h2>
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {featuredRestaurants.map((restaurant, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <div className="p-1">
                      <RestaurantCard {...restaurant} />
                    </div>
                  </CarouselItem>
                ))}\
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* Popular Restaurants Grid */}
         <section className="py-12 md:py-16 bg-muted/20">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">Popular Near You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 {popularRestaurants.map((restaurant, index) => (
                    <RestaurantCard key={index} {...restaurant} />
                ))}\
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;