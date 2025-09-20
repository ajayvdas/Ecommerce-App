/* eslint-disable react/prop-types */
import { motion } from "framer-motion"
import { Star, ChevronRight } from 'lucide-react'
import { useState } from 'react'

function ReviewsSection({ reviews }) {
  const [currentReview, setCurrentReview] = useState(0);
  
  // Mock data for demonstration
  const mockReviews = [
    {
      _id: '1',
      name: 'Alex Mathio',
      rating: 5,
      comment: "NextGen's dedication to sustainability and ethical practices resonates strongly with today's consumers, positioning the brand as a responsible choice in the fashion world.",
      createdAt: '2024-10-13',
      avatar: '/professional-man-smiling.png'
    },
    {
      _id: '2',
      name: 'Sarah Johnson',
      rating: 4,
      comment: "Great quality and perfect fit. The material is comfortable and the design is exactly as shown. Would definitely recommend!",
      createdAt: '2024-10-12',
      avatar: '/professional-woman-smiling.png'
    },
    {
      _id: '3',
      name: 'Michael Chen',
      rating: 5,
      comment: "Excellent product with fast shipping. The attention to detail is remarkable and the customer service was outstanding.",
      createdAt: '2024-10-11',
      avatar: '/creative-director-man-smiling-portrait.jpg'
    }
  ];

  const displayReviews = reviews.length > 0 ? reviews : mockReviews;
  const totalReviews = displayReviews.length;
  const averageRating = displayReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

  // Calculate star distribution
  const starDistribution = [5, 4, 3, 2, 1].map(star => ({
    stars: star,
    count: displayReviews.filter(review => review.rating === star).length,
    percentage: (displayReviews.filter(review => review.rating === star).length / totalReviews) * 100
  }));

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % totalReviews);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Rating & Reviews</h2>
      
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Rating Overview */}
        <div className="space-y-6">
          <div className="text-center lg:text-left">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="text-lg text-gray-600 mb-1">/5</div>
            <div className="text-sm text-gray-500">({totalReviews} New Reviews)</div>
          </div>

          {/* Star Breakdown */}
          <div className="space-y-3">
            {starDistribution.map(({ stars, count, percentage }) => (
              <div key={stars} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-16">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{stars}</span>
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Review Card */}
        <div className="relative">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <h3 className="font-bold text-gray-900">{displayReviews[currentReview].name}</h3>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < displayReviews[currentReview].rating 
                          ? "text-yellow-400 fill-current" 
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(displayReviews[currentReview].createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </span>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              {displayReviews[currentReview].comment}
            </p>
            
            <div className="flex items-center space-x-3">
              <img 
                src={displayReviews[currentReview].avatar || '/placeholder-user.jpg'} 
                alt={displayReviews[currentReview].name}
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>

          {/* Review Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {displayReviews.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentReview ? 'bg-gray-800' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentReview(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ReviewsSection