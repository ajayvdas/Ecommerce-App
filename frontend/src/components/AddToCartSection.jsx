import { motion } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { 
    useAddToWishlistMutation, 
    useRemoveFromWishlistMutation,
    useCheckProductInWishlistQuery 
} from "@/slices/wishlistApiSlice";

function AddToCartSection({ product, quantity, setQuantity, onAddToCart }) {
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    
    // Wishlist functionality
    const [addToWishlist, { isLoading: isAddingToWishlist }] = useAddToWishlistMutation();
    const [removeFromWishlist, { isLoading: isRemovingFromWishlist }] = useRemoveFromWishlistMutation();
    
    // Check if product is in wishlist (only if user is logged in)
    const { data: wishlistCheck } = useCheckProductInWishlistQuery(product._id, {
        skip: !userInfo || !product._id
    });
    
    const isInWishlist = wishlistCheck?.isInWishlist || false;
    const isWishlistLoading = isAddingToWishlist || isRemovingFromWishlist;
    
    const handleWishlistToggle = async () => {
        if (!userInfo) {
            toast.error("Please login to add items to wishlist");
            navigate("/login");
            return;
        }
        
        try {
            if (isInWishlist) {
                await removeFromWishlist(product._id).unwrap();
                toast.success("Product removed from wishlist");
            } else {
                await addToWishlist(product._id).unwrap();
                toast.success("Product added to wishlist");
            }
        } catch (error) {
            console.error("Wishlist operation failed:", error);
            toast.error(error?.data?.message || "Failed to update wishlist");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6 lg:space-y-8"
        >
            {/* Quantity Selection */}
            <div className="space-y-3">
                <label className="text-sm lg:text-base font-medium text-gray-900">Quantity</label>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-400 flex items-center justify-center font-medium text-gray-700 hover:text-gray-900 transition-all"
                        disabled={quantity <= 1}
                    >
                        -
                    </button>
                    <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                    <button
                        onClick={() => setQuantity(Math.min(product.countInStock, quantity + 1))}
                        className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-400 flex items-center justify-center font-medium text-gray-700 hover:text-gray-900 transition-all"
                        disabled={quantity >= product.countInStock}
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 lg:space-x-4">
                <Button 
                    type="button" 
                    disabled={product.countInStock === 0} 
                    className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3 lg:py-4 text-lg lg:text-xl font-medium"
                    onClick={onAddToCart}
                >
                    {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button 
                    variant="outline" 
                    size="icon"
                    className={`w-12 h-12 lg:w-14 lg:h-14 border-gray-300 hover:border-gray-400 ${
                        isInWishlist ? 'bg-red-50 border-red-300 text-red-600' : ''
                    }`}
                    onClick={handleWishlistToggle}
                    disabled={isWishlistLoading}
                    title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <Heart className={`h-5 w-5 lg:h-6 lg:w-6 ${isInWishlist ? 'fill-current' : ''}`} />
                </Button>
            </div>

            {/* Stock Status */}
            <div className="text-sm lg:text-base">
                <span className={`font-medium ${
                    product.countInStock > 0 ? "text-green-600" : "text-red-600"
                }`}>
                    {product.countInStock > 0 
                        ? `In Stock (${product.countInStock} available)` 
                        : "Out of Stock"
                    }
                </span>
            </div>
        </motion.div>
    );
}

export default AddToCartSection;
