

import { Button } from "@/components/ui/button"
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import { useGetWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation } from "@/slices/wishlistApiSlice"
import { toast } from "react-toastify"

function AddToCartSection({ product, quantity, setQuantity, onAddToCart, onAddToWishlist }) {
    const { userInfo } = useSelector((state) => state.auth);
    
    // Get wishlist data to check if product is already liked
    const { data: wishlistData } = useGetWishlistQuery(undefined, {
        skip: !userInfo,
    });
    
    const [addToWishlist] = useAddToWishlistMutation();
    const [removeFromWishlist] = useRemoveFromWishlistMutation();
    
    // Check if product is in wishlist
    const isInWishlist = wishlistData?.products?.some(item => item._id === product._id) || false;
    
    const handleWishlistToggle = async () => {
        if (!userInfo) {
            toast.error("Please login to manage wishlist");
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
            toast.error("Failed to update wishlist");
        }
    };

  const incrementQuantity = () => {
    if (quantity < product.countInStock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-6"
    >
      {/* Size Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">Select Size</label>
        <div className="flex gap-2">
          {["XS", "S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              className="w-12 h-12 border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-colors text-sm font-medium"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">Quantity</label>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="h-10 w-10 xl:h-10 xl:w-10 bg-transparent"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-lg font-medium w-12 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={incrementQuantity}
            disabled={quantity >= product.countInStock}
            className="h-10 w-10 xl:h-10 xl:w-10"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-600 ml-2">
            {product.countInStock > 0 ? `${product.countInStock} available` : "Out of stock"}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={onAddToCart}
          disabled={product.countInStock === 0}
          className="flex-1 h-12 xl:h-12 text-base xl:text-base"
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
        <Button 
          onClick={handleWishlistToggle} 
          variant="outline" 
          size="icon" 
          className={`h-12 w-12 xl:h-12 xl:w-12 bg-transparent ${isInWishlist ? 'text-red-500 border-red-500 hover:bg-red-50' : ''}`}
        >
          <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
        </Button>
      </div>

      {/* Stock Status */}
      {product.countInStock > 0 && product.countInStock <= 5 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <p className="text-sm text-orange-800">
            Only <span className="font-semibold">{product.countInStock}</span> left in stock - order soon!
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default AddToCartSection
