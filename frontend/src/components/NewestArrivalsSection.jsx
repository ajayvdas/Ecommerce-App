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
        image: "images/denim-jeans.jpeg",
        badge: "New",
    },
    {
        id: 2,
        name: "Tweed Blazer",
        price: 199.99,
        image: "images/leather-jacket.jpeg",
        badge: "New",
    },
    {
        id: 3,
        name: "Tuxedo Suit",
        price: 299.99,
        image: "images/classic-white-tee.jpeg",
        badge: "New",
    },
    {
        id: 4,
        name: "Utility Jacket",
        price: 149.99,
        image: "images/cozy-sweater.jpeg",
        badge: "New",
    },
    {
        id: 5,
        name: "Casual Shirt",
        price: 69.99,
        image: "images/summer-dress.jpeg",
        badge: "New",
    },
    {
        id: 6,
        name: "Formal Blazer",
        price: 179.99,
        image: "images/running-shoes.jpeg",
        badge: "New",
    },
];

export default function NewestArrivalsSection({ onAddToWishlist, isAdding, onAddToCart }) {
    const navigate = useNavigate();
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                    NEWEST ARRIVALS
                </h2>
                <div className="w-20 h-1 bg-gray-900 mx-auto mt-4"></div>
            </div>

            <div className="relative">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {newestProducts.map((product) => (
                            <CarouselItem
                                key={product.id}
                                className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
                            >
                                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-sm bg-white group h-full">
                                    <CardContent className="p-0 h-full flex flex-col">
                                        <div className="relative aspect-[3/4] overflow-hidden">
                                            <img
                                                src={product.image || "/placeholder.svg"}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-3 left-3">
                                                <Badge variant="secondary" className="bg-black text-white text-xs px-2 py-1">
                                                    {product.badge}
                                                </Badge>
                                            </div>

                                            {/* Hover Actions */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                                                <div className="absolute bottom-4 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 space-y-2">
                                                    <Button 
                                                        size="sm" 
                                                        className="w-full bg-black hover:bg-gray-800 text-white text-xs py-2 h-auto"
                                                        onClick={() => onAddToCart && onAddToCart(product, 1)}
                                                    >
                                                        <ShoppingCart className="w-3 h-3 mr-1" />
                                                        Add to Cart
                                                    </Button>
                                                    <Button 
                                                        size="sm" 
                                                        variant="outline" 
                                                        className="w-full bg-white/95 hover:bg-white border-white text-gray-900 text-xs py-2 h-auto"
                                                        onClick={() => onAddToWishlist(product.id)}
                                                        disabled={isAdding}
                                                    >
                                                        <Heart className="w-3 h-3 mr-1" />
                                                        {isAdding ? 'Adding...' : 'Wishlist'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                                                    {product.name}
                                                </h3>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-lg font-bold text-gray-900">${product.price}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious className="left-2 bg-white/90 hover:bg-white shadow-lg border-0 hidden sm:flex" />
                    <CarouselNext className="right-2 bg-white/90 hover:bg-white shadow-lg border-0 hidden sm:flex" />
                </Carousel>
            </div>

            {/* View All Products Button */}
            <div className="text-center mt-16">
                <Button 
                    size="lg" 
                    className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                    onClick={() => navigate('/products')}
                >
                    View All Products
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
        </div>
    );
}