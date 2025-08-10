/* eslint-disable react/prop-types */
import { motion } from "framer-motion"
import { Star } from 'lucide-react'

function ProductDetails({ product }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.numReviews} reviews)</span>
        </div>
        <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
        <p className="text-gray-600 mb-4">{product.description}</p>
      </motion.div>
    )
  }

  export default ProductDetails