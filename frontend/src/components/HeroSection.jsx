import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const heroSlides = [
  {
    id: 1,
    title: "Spring Collection 2024",
    subtitle: "Discover the latest trends",
    description:
      "Elevate your style with our curated spring collection featuring vibrant colors and contemporary designs.",
    image: "/spring-fashion-collection-models-wearing-colorful-.jpg",
    cta: "Shop Spring Collection",
  },
  {
    id: 2,
    title: "Premium Denim",
    subtitle: "Crafted for comfort",
    description: "Experience the perfect blend of style and comfort with our premium denim collection.",
    image: "/premium-denim-jeans-fashion-models-urban-style.jpg",
    cta: "Explore Denim",
  },
  {
    id: 3,
    title: "Sustainable Fashion",
    subtitle: "Style with purpose",
    description: "Join the sustainable fashion movement with our eco-friendly collection made from organic materials.",
    image: "/sustainable-eco-friendly-fashion-organic-clothing-.jpg",
    cta: "Shop Sustainable",
  },
]



export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-card">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentSlide ? "opacity-100" : "opacity-0",
            )}
          >
            <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:pl-16">
          <div className="max-w-2xl text-white">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-accent font-medium text-lg tracking-wide">{heroSlides[currentSlide].subtitle}</p>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight text-balance">
                  {heroSlides[currentSlide].title}
                </h1>
              </div>
              <p className="text-xl text-white/90 leading-relaxed text-pretty">
                {heroSlides[currentSlide].description}
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {heroSlides[currentSlide].cta}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm z-20"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm z-20"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75",
            )}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}
