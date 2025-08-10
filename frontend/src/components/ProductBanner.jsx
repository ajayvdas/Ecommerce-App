import  { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ShoppingCart, Star, Sparkles } from 'lucide-react'
import BannerImg1 from '../assets/BannerImg1.png'
const products = [
  {
    id: 1,
    name: "Aurora Headphones",
    description: "Premium wireless headphones with crystal-clear sound and all-day comfort",
    price: 299.99,
    // image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
    image: BannerImg1,
    gradient: "from-purple-600 via-pink-600 to-blue-600",
    accent: "bg-gradient-to-r from-purple-500 to-pink-500"
  },
  {
    id: 2,
    name: "Quantum Watch",
    description: "Smart watch that seamlessly blends technology with elegant design",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    accent: "bg-gradient-to-r from-emerald-500 to-teal-500"
  },
  {
    id: 3,
    name: "Nebula Speaker",
    description: "360° sound experience with immersive audio and stunning light effects",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=600&fit=crop",
    gradient: "from-orange-600 via-red-600 to-pink-600",
    accent: "bg-gradient-to-r from-orange-500 to-red-500"
  }
]

const AUTO_SLIDE_INTERVAL = 3000

export default function ProductBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
      }, AUTO_SLIDE_INTERVAL)
      return () => clearInterval(timer)
    }
  }, [isHovered])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
  }

  const currentProduct = products[currentIndex]

  return (
      <div 
      className="bg-black relative w-full h-[350px] lg:h-[400px] overflow-hidden rounded-b-2xl sm:rounded-b-3xl shadow-2xl mx-2 sm:mx-4 lg:mx-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >


      {/* Main Content */}


            {/* Product Image */}
            <div className="relative order-first lg:order-last">
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="w-full h-full sm:h-60 lg:h-80 object-cover rounded-xl sm:rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
              </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md p-2 sm:p-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 group"
        aria-label="Previous product"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md p-2 sm:p-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 group"
        aria-label="Next product"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to product ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}