"use client"

// import { useState } from "react";
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

function WriteReviewForm({ rating, setRating, comment, setComment, loadingProductReview, onSubmit }) {
  // const [rating, setRating] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="mt-12 max-w-5xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="rating" className="block mb-2">
            Rating:
          </label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((value) => (
              <Star
                key={value}
                className={`h-6 w-6 cursor-pointer ${
                  value <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
                onClick={() => setRating(value)}
              />
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="comment" className="block mb-2">
            Your Review:
          </label>
          <Textarea
            id="comment"
            placeholder="Write your review here..."
            className="w-full"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={loadingProductReview}>
          {loadingProductReview ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </motion.div>
  )
}

export default WriteReviewForm
