import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    title: "Men's Collection",
    description: "Discover our latest men's fashion",
    image: "/placeholder.svg?height=300&width=400&text=Men's+Fashion",
    bgColor: "bg-blue-600",
  },
  {
    title: "Women's Collection",
    description: "Explore trendy women's styles",
    image: "/placeholder.svg?height=300&width=400&text=Women's+Fashion",
    bgColor: "bg-pink-600",
  },
  {
    title: "Accessories",
    description: "Complete your look with accessories",
    image: "/placeholder.svg?height=300&width=400&text=Accessories",
    bgColor: "bg-purple-600",
  },
]

export default function ShopByCategory() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Shop by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore our curated collections designed for every style and occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="group cursor-pointer">
              <div
                className={`${category.bgColor} rounded-2xl p-8 text-white relative overflow-hidden h-64 flex flex-col justify-between transition-transform duration-300 group-hover:scale-105`}
              >
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <p className="text-white/90 mb-4">{category.description}</p>
                </div>
                <div className="relative z-10">
                  <Button variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
