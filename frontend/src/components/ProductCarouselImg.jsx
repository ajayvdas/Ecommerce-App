import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// Mock product data with placeholder images
const products = [
  {
    id: 1,
    name: "Classic White Tee",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Denim Jeans",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Leather Jacket",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Summer Dress",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Running Shoes",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Cozy Sweater",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
  },
]

export default function ProductCarouselImg() {
  return (
    <div className="relative w-full bg-card mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Featured Products</h2>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4 py-2">
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="h-full">
                    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 shadow-md bg-background">
                      <CardContent className="p-0 h-full flex flex-col">
                        <div className="relative aspect-square overflow-hidden">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(product.name)}`
                            }}
                          />
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-semibold text-card-foreground text-lg mb-2 line-clamp-2">
                              {product.name}
                            </h3>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-primary">${product.price}</span>
                            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-2 bg-background/90 hover:bg-background shadow-lg border-0" />
            <CarouselNext className="right-2 bg-background/90 hover:bg-background shadow-lg border-0" />
          </Carousel>
        </div>
      </div>
    </div>
  )
}
