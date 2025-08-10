/* eslint-disable react/prop-types */
import { motion } from "framer-motion"
import { Star } from 'lucide-react'


function ReviewsSection({ reviews }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12"
      >
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded-lg shadow mb-4">
            <div className="flex items-center mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 font-semibold">{review.author}</span>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </motion.div>
    )
  }

  export default ReviewsSection