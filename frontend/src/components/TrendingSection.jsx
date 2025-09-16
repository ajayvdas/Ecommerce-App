
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Heart, ShoppingCart } from "lucide-react"

const trendingProducts = [
  {
    id: 1,
    name: "Oversized Blazer",
    price: 189.99,
    originalPrice: 249.99,
    image: "/oversized-blazer-fashion-model-trendy.jpg",
    badge: "Trending",
    discount: "24% OFF",
  },
  {
    id: 2,
    name: "High-Waist Jeans",
    price: 89.99,
    originalPrice: 119.99,
    image: "/high-waist-jeans-fashion-model-denim.jpg",
    badge: "Hot",
    discount: "25% OFF",
  },
  {
    id: 3,
    name: "Silk Midi Dress",
    price: 159.99,
    originalPrice: 199.99,
    image: "/silk-midi-dress-elegant-fashion-model.jpg",
    badge: "New",
    discount: "20% OFF",
  },
  {
    id: 4,
    name: "Chunky Sneakers",
    price: 129.99,
    originalPrice: 169.99,
    image: "/chunky-sneakers-fashion-footwear-trendy.jpg",
    badge: "Popular",
    discount: "23% OFF",
  },
]

export default function TrendingSection() {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">Trending Now</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Don't miss out on the hottest items everyone's talking about
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-card"
            >
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-primary text-primary-foreground">
                      {product.badge}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline" className="bg-white/90 text-destructive border-destructive">
                      {product.discount}
                    </Badge>
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                      <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button size="sm" variant="outline" className="w-full bg-white/90 hover:bg-white">
                        <Heart className="w-4 h-4 mr-2" />
                        Wishlist
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-card-foreground text-lg mb-2 text-balance">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">${product.price}</span>
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8 py-6 text-lg bg-transparent">
            View All Trending Items
          </Button>
        </div> */}
      </div>
    </section>
  )
}
