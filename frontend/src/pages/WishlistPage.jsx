import { useState } from "react";
import { Heart, ShoppingCart, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSelector, useDispatch } from "react-redux";
import { useGetWishlistQuery, useRemoveFromWishlistMutation } from "@/slices/wishlistApiSlice";
import { addToCart } from "@/slices/cartSlice";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";

// interface WishlistItem {
//   id: string
//   name: string
//   price: number
//   originalPrice?: number
//   image: string
//   brand: string
//   rating: number
//   reviews: number
//   inStock: boolean
// }

const mockWishlistItems = [
    {
        id: "1",
        name: "Elegant Silk Blouse",
        price: 89.99,
        originalPrice: 129.99,
        image: "/elegant-silk-blouse-fashion.jpg",
        brand: "Luxe Fashion",
        rating: 4.8,
        reviews: 124,
        inStock: true,
    },
    {
        id: "2",
        name: "Designer Leather Handbag",
        price: 299.99,
        image: "/luxury-leather-handbag.png",
        brand: "Milano Bags",
        rating: 4.9,
        reviews: 89,
        inStock: true,
    },
    {
        id: "3",
        name: "Vintage Denim Jacket",
        price: 79.99,
        originalPrice: 99.99,
        image: "/vintage-denim-jacket-fashion.jpg",
        brand: "Urban Style",
        rating: 4.6,
        reviews: 203,
        inStock: false,
    },
    {
        id: "4",
        name: "Cashmere Scarf",
        price: 149.99,
        image: "/cashmere-scarf-luxury-fashion.jpg",
        brand: "Soft Luxe",
        rating: 4.7,
        reviews: 67,
        inStock: true,
    },
    {
        id: "5",
        name: "High-Waist Trousers",
        price: 119.99,
        originalPrice: 159.99,
        image: "/high-waist-trousers-elegant-fashion.jpg",
        brand: "Modern Fit",
        rating: 4.5,
        reviews: 156,
        inStock: true,
    },
    {
        id: "6",
        name: "Statement Earrings",
        price: 45.99,
        image: "/statement-earrings-jewelry-fashion.jpg",
        brand: "Sparkle Co",
        rating: 4.4,
        reviews: 92,
        inStock: true,
    },
];

export default function WishlistPage() {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    
    const { data: wishlistData, isLoading, error } = useGetWishlistQuery(undefined, {
        skip: !userInfo,
    });
    
    // Extract products array from the wishlist data
    const wishlistItems = wishlistData?.products || [];
    
    const [removeFromWishlist, { isLoading: isRemoving }] = useRemoveFromWishlistMutation();

    const handleRemoveFromWishlist = async (productId) => {
        try {
            await removeFromWishlist(productId).unwrap();
            toast.success('Product removed from wishlist');
        } catch (error) {
            console.error('Failed to remove from wishlist:', error);
            toast.error('Failed to remove from wishlist');
        }
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart({ ...product, quantity: 1 }));
        toast.success('Product added to cart');
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error loading wishlist</h2>
                    <p className="text-gray-600">Please try again later.</p>
                </div>
            </div>
        );
    }

    const EmptyWishlist = () => (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-32 h-32 mb-6 rounded-full bg-muted flex items-center justify-center">
                <Heart className="w-16 h-16 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-balance">Your wishlist is empty</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-md text-pretty">
                Start adding items you love to your wishlist. You can save items while browsing and come back to them later.
            </p>
            <Button className="bg-primary hover:bg-primary/90">Start Shopping</Button>
        </div>
    );

    return (
        <div className="min-h-screen">
            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2 text-balance">My Wishlist</h2>
                    <p className="text-muted-foreground text-pretty">
                        {wishlistItems?.length || 0} {(wishlistItems?.length || 0) === 1 ? "item" : "items"} saved for later
                    </p>
                </div>

                {!wishlistItems || wishlistItems.length === 0 ? (
                    <EmptyWishlist />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistItems.map((item) => (
                            <Card
                                key={item.id}
                                className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="relative">
                                    <img
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.name}
                                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {(!item.countInStock || item.countInStock === 0) && (
                                        <Badge variant="secondary" className="absolute top-2 left-2">
                                            Out of Stock
                                        </Badge>
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                                        onClick={() => handleRemoveFromWishlist(item._id)}
                                        disabled={isRemoving}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>

                                <CardContent className="p-4">
                                    <div className="mb-2">
                                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                                        <h3 className="font-semibold text-lg leading-tight text-balance group-hover:text-primary transition-colors">
                                            {item.name}
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-1 mb-3">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-medium">{item.rating}</span>
                                        <span className="text-sm text-muted-foreground">({item.numReviews})</span>
                                    </div>

                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-xl font-bold">${item.price}</span>
                                    </div>

                                    <div className="space-y-2">
                                        <Button 
                                            className="w-full bg-primary hover:bg-primary/90" 
                                            disabled={!item.countInStock || item.countInStock === 0}
                                            onClick={() => handleAddToCart(item)}
                                        >
                                            <ShoppingCart className="w-4 h-4 mr-2" />
                                            {item.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
