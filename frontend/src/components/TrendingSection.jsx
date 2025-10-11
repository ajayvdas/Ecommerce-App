import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, TrendingUp } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const trendingProducts = [
    {
        id: 7,
        name: "Oversized Hoodie",
        price: 79.99,
        originalPrice: 99.99,
        image: "images/cozy-sweater.jpeg",
        badge: "Trending",
        discount: 20,
    },
    {
        id: 8,
        name: "Leather Boots",
        price: 159.99,
        originalPrice: 199.99,
        image: "images/running-shoes.jpeg",
        badge: "Hot",
        discount: 20,
    },
    {
        id: 9,
        name: "Vintage Denim",
        price: 119.99,
        image: "images/denim-jeans.jpeg",
        badge: "Trending",
    },
    {
        id: 10,
        name: "Minimalist Watch",
        price: 249.99,
        originalPrice: 299.99,
        image: "images/classic-white-tee.jpeg",
        badge: "Popular",
        discount: 17,
    },
    {
        id: 11,
        name: "Cotton Dress",
        price: 89.99,
        image: "images/summer-dress.jpeg",
        badge: "Trending",
    },
    {
        id: 12,
        name: "Designer Jacket",
        price: 199.99,
        originalPrice: 249.99,
        image: "images/leather-jacket.jpeg",
        badge: "Hot",
        discount: 20,
    },
];

export default function TrendingSection({ onAddToWishlist, isAdding, onAddToCart }) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 mb-4">
                    <TrendingUp className="w-8 h-8 text-gray-900" />
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                        TRENDING NOW
                    </h2>
                </div>
                <div className="w-20 h-1 bg-gray-900 mx-auto mb-4"></div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Discover the hottest items everyone&apos;s talking about
                </p>
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
                        {trendingProducts.map((product) => (
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
                                            <div className="absolute top-3 left-3 flex flex-col gap-2">
                                                <Badge 
                                                    variant="secondary" 
                                                    className={cn(
                                                        "text-white text-xs px-2 py-1",
                                                        product.badge === "Hot" && "bg-red-500",
                                                        product.badge === "Trending" && "bg-orange-500",
                                                        product.badge === "Popular" && "bg-blue-500"
                                                    )}
                                                >
                                                    {product.badge}
                                                </Badge>
                                                {product.discount && (
                                                    <Badge variant="secondary" className="bg-green-600 text-white text-xs px-2 py-1">
                                                        -{product.discount}%
                                                    </Badge>
                                                )}
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
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                                                    {product.originalPrice && (
                                                        <span className="text-sm text-gray-500 line-through">
                                                            ${product.originalPrice}
                                                        </span>
                                                    )}
                                                </div>
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
        </div>
    );
}