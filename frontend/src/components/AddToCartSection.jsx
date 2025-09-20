import { motion } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function AddToCartSection({ product, quantity, setQuantity, onAddToCart }) {
    const [selectedSize, setSelectedSize] = useState('M');
    
    // Mock sizes - in a real app, this would come from the product data
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
        >
            {/* Size Selection */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">Select Size</label>
                <div className="flex space-x-3">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`w-12 h-12 rounded-full border-2 transition-all font-medium ${
                                selectedSize === size
                                    ? 'bg-gray-900 text-white border-gray-900'
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                            }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
                <Button 
                    type="button" 
                    disabled={product.countInStock === 0} 
                    className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3 text-lg font-medium"
                    onClick={onAddToCart}
                >
                    Add to Cart
                </Button>
                <Button 
                    variant="outline" 
                    size="icon"
                    className="w-12 h-12 border-gray-300 hover:border-gray-400"
                >
                    <Heart className="h-5 w-5" />
                </Button>
            </div>

            {/* Stock Status */}
            <div className="text-sm">
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
