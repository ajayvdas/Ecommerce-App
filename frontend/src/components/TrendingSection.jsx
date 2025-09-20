
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Heart, ShoppingCart, ArrowRight, Star } from "lucide-react"

const trendingProducts = [
  {
    id: 1,
    name: "Oversized Blazer",
    price: 189.99,
    originalPrice: 249.99,
    image: "/oversized-blazer-fashion-model-trendy.jpg",
    badge: "Trending",
    discount: "24% OFF",
    rating: 4.8,
    reviews: 124,
    category: "Blazers",
  },
  {
    id: 2,
    name: "High-Waist Jeans",
    price: 89.99,
    originalPrice: 119.99,
    image: "/high-waist-jeans-fashion-model-denim.jpg",
    badge: "Hot",
    discount: "25% OFF",
    rating: 4.9,
    reviews: 89,
    category: "Denim",
  },
  {
    id: 3,
    name: "Silk Midi Dress",
    price: 159.99,
    originalPrice: 199.99,
    image: "/silk-midi-dress-elegant-fashion-model.jpg",
    badge: "New",
    discount: "20% OFF",
    rating: 4.7,
    reviews: 156,
    category: "Dresses",
  },
  {
    id: 4,
    name: "Chunky Sneakers",
    price: 129.99,
    originalPrice: 169.99,
    image: "/chunky-sneakers-fashion-footwear-trendy.jpg",
    badge: "Popular",
    discount: "23% OFF",
    rating: 4.6,
    reviews: 203,
    category: "Footwear",
  },
]

export default function TrendingSection({ onAddToWishlist, isAdding, onAddToCart }) {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              TRENDING NOW
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the most sought-after pieces that are flying off our shelves. 
            Limited quantities available.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {trendingProducts.map((product, index) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white rounded-2xl transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg">
                      {product.badge}
                    </Badge>
                    <Badge variant="outline" className="bg-white/95 text-red-600 border-red-200 shadow-md">
                      {product.discount}
                    </Badge>
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Button
                      size="icon"
                      variant="outline"
                      className="w-10 h-10 bg-white/90 hover:bg-white shadow-lg border-0 mb-2"
                      onClick={() => onAddToWishlist(product.id)}
                    >
                      <Heart className="w-4 h-4 text-gray-700" />
                    </Button>
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <Button 
                      size="sm" 
                      className="w-full bg-white text-gray-900 hover:bg-gray-100 shadow-lg border-0 font-semibold"
                      onClick={() => onAddToCart({...product}, 1)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {product.category}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            View All Trending Items
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
