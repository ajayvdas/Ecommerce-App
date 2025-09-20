import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";

const newestProducts = [
    {
        id: 1,
        name: "Denim Jacket",
        price: 89.99,
        image: "/denim-jeans.jpeg",
        badge: "New",
    },
    {
        id: 2,
        name: "Tweed Blazer",
        price: 199.99,
        image: "/leather-jacket.jpeg",
        badge: "New",
    },
    {
        id: 3,
        name: "Tuxedo Suit",
        price: 299.99,
        image: "/classic-white-tee.jpeg",
        badge: "New",
    },
    {
        id: 4,
        name: "Utility Jacket",
        price: 149.99,
        image: "/cozy-sweater.jpeg",
        badge: "New",
    },
    {
        id: 5,
        name: "Casual Shirt",
        price: 69.99,
        image: "/summer-dress.jpeg",
        badge: "New",
    },
    {
        id: 6,
        name: "Formal Blazer",
        price: 179.99,
        image: "/running-shoes.jpeg",
        badge: "New",
    },
];

export default function NewestArrivalsSection({ onAddToWishlist, isAdding, onAddToCart }) {
    const navigate = useNavigate();
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">NEWEST ARRIVALS</h2>
                </div>

                <div className="relative">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2 md:-ml-4 py-2">
                            {newestProducts.map((product) => (
                                <CarouselItem
                                    key={product.id}
                                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                                >
                                    <div className="h-full">
                                        <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 shadow-md bg-white group">
                                            <CardContent className="p-0 h-full flex flex-col">
                                                <div className="relative aspect-[3/4] overflow-hidden">
                                                    <img
                                                        src={product.image || "/placeholder.svg"}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                    <div className="absolute top-3 left-3">
                                                        <Badge variant="secondary" className="bg-primary text-primary-foreground">
                                                            {product.badge}
                                                        </Badge>
                                                    </div>

                                                    {/* Hover Actions */}
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                                                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                                                            <Button 
                                                                size="sm" 
                                                                className="w-full bg-primary hover:bg-primary/90"
                                                                onClick={() => onAddToCart && onAddToCart(product, 1)}
                                                            >
                                                                <ShoppingCart className="w-4 h-4 mr-2" />
                                                                Add to Cart
                                                            </Button>
                                                            <Button 
                                                                size="sm" 
                                                                variant="outline" 
                                                                className="w-full bg-white/90 hover:bg-white"
                                                                onClick={() => onAddToWishlist(product.id)}
                                                            >
                                                                <Heart className="w-4 h-4 mr-2" />
                                                                Wishlist
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-4 flex-1 flex flex-col justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
                                                            {product.name}
                                                        </h3>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <span className="text-2xl font-bold text-primary">${product.price}</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselPrevious className="left-2 bg-white/90 hover:bg-white shadow-lg border-0" />
                        <CarouselNext className="right-2 bg-white/90 hover:bg-white shadow-lg border-0" />
                    </Carousel>
                </div>

                {/* Carousel Indicators */}
                <div className="flex justify-center mt-8 space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>

                {/* View All Products Button */}
                <div className="text-center mt-12">
                    <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                        onClick={() => navigate('/products')}
                    >
                        View All Products
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </section>
    );
}

