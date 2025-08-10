/* eslint-disable react/prop-types */
import { motion } from "framer-motion"
import { Heart } from 'lucide-react'



export function ProductCard({ image, name, price }) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <img src={image} alt={name} className="w-full h-64 object-cover" />
        <button
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
          aria-label="Add to wishlist"
        >
          <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600 mt-2">${price.toFixed(2)}</p>
      </div>
    </motion.div>
  )
}
