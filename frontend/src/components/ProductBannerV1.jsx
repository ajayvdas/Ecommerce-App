import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import bannerImg from "../assets/bannerimg.jpg"


const products = [
  {
    id: 1,
    name: "Premium Leather Jacket",
    description: "Elevate your style with our premium leather jacket. Crafted for comfort and durability.",
    price: 299.99,
    image: bannerImg
  },
  {
    id: 2,
    name: "Elegant Summer Dress",
    description: "Stay cool and stylish with our elegant summer dress. Perfect for any occasion.",
    price: 89.99,
    image: bannerImg
  },
  {
    id: 3,
    name: "Classic Denim Jeans",
    description: "Our classic denim jeans offer both style and comfort. A wardrobe essential.",
    price: 59.99,
    image: bannerImg
  }
]

const AUTO_SLIDE_INTERVAL = 5000 // 5 seconds

export function ProductBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
    }, AUTO_SLIDE_INTERVAL)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
  }

  return (
    <div className="relative w-full h-[400px] overflow-hidden mt-16">
      <AnimatePresence initial={false} custom={currentIndex}>
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            custom={index}
            variants={{
              enter: (direction) => ({
                x: direction > 0 ? '100%' : '-100%',
                opacity: 0,
              }),
              center: {
                x: 0,
                opacity: 1,
              },
              exit: (direction) => ({
                x: direction < 0 ? '100%' : '-100%',
                opacity: 0,
              }),
            }}
            initial="enter"
            animate={index === currentIndex ? "center" : ""}
            exit="exit"
            transition={{ duration: 0.5 }}
            className={`absolute top-0 left-0 w-full h-full ${
              index === currentIndex ? 'block' : 'hidden'
            }`}
          >
            <div className="relative w-full h-full bg-gray-100 flex items-center">
              <div className="absolute inset-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40" />
              </div>
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
                <div className="text-white mb-8 md:mb-0 md:w-1/2">
                  <h2 className="text-4xl font-bold mb-4">{product.name}</h2>
                  <p className="text-lg mb-6">{product.description}</p>
                  <p className="text-3xl font-semibold mb-6">${product.price.toFixed(2)}</p>
                  <Button className="bg-white text-black hover:bg-gray-200">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>
                <div className="md:w-1/2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto max-h-80 object-contain rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200"
        aria-label="Previous product"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200"
        aria-label="Next product"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

