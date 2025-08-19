/* eslint-disable react/prop-types */
import { motion } from "framer-motion"
import { Star } from 'lucide-react'

function ReviewsSection({ reviews }) {
  // Helper function to format date
  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric'
  //   });
  // };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-12"
    >
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      {/* todo: build a better messaging component */}
      {reviews.length === 0 && <p>No reviews</p>}
      {reviews.map((review) => (
        <div key={review._id} className="bg-white p-4 rounded-lg shadow mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
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
              <span className="ml-2 font-semibold">{review.name}</span>
            </div>
            <span className="text-sm text-gray-500">
              {review.createdAt.substring(0, 10)}
            </span>
          </div>
          <p className="text-gray-600">{review.comment}</p>
        </div>
      ))}
    </motion.div>
  )
}

export default ReviewsSection