/* eslint-disable react/prop-types */
import { motion } from "framer-motion"
import { useState } from "react"

function ProductImage({ image, name }) {
    const [currentImage, setCurrentImage] = useState(0)
    
    // Mock additional images for demonstration
    const images = [
        image || '/placeholder.svg',
        image || '/placeholder.svg',
        image || '/placeholder.svg',
        image || '/placeholder.svg'
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
        >
            {/* Image Navigation Dots */}
            <div className="flex justify-center space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-8 h-1 rounded-full transition-colors ${
                            index === currentImage ? 'bg-gray-800' : 'bg-gray-300'
                        }`}
                        onClick={() => setCurrentImage(index)}
                    />
                ))}
            </div>

            {/* Main Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img 
                    src={images[currentImage]} 
                    alt={name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3">
                {images.slice(0, 3).map((img, index) => (
                    <button
                        key={index}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentImage 
                                ? 'border-gray-800' 
                                : 'border-gray-200 hover:border-gray-400'
                        }`}
                        onClick={() => setCurrentImage(index)}
                    >
                        <img 
                            src={img} 
                            alt={`${name} view ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </motion.div>
    )
}

export default ProductImage