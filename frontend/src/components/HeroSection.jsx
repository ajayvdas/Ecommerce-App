import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const heroSlides = [
  {
    id: 1,
    title: "INDULGE YOURSELF WITH THE FINEST OUTFITS",
    subtitle: "ARTISAN FABRIC",
    description:
      "Discover our premium collection of handcrafted garments made from the finest materials. Experience luxury fashion that defines your unique style.",
    image: "/spring-fashion-collection-models-wearing-colorful-.jpg",
    cta: "See Collection →",
  },
  {
    id: 2,
    title: "PREMIUM DENIM COLLECTION",
    subtitle: "CRAFTED FOR COMFORT",
    description: "Experience the perfect blend of style and comfort with our premium denim collection designed for the modern lifestyle.",
    image: "/premium-denim-jeans-fashion-models-urban-style.jpg",
    cta: "Explore Denim →",
  },
  {
    id: 3,
    title: "SUSTAINABLE FASHION MOVEMENT",
    subtitle: "STYLE WITH PURPOSE",
    description: "Join the sustainable fashion movement with our eco-friendly collection made from organic materials and ethical practices.",
    image: "/sustainable-eco-friendly-fashion-organic-clothing-.jpg",
    cta: "Shop Sustainable →",
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
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden bg-card">
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
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:pl-16">
          <div className="max-w-3xl text-white">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-white/80 font-medium text-lg tracking-widest uppercase">{heroSlides[currentSlide].subtitle}</p>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance">
                  {heroSlides[currentSlide].title}
                </h1>
              </div>
              <p className="text-lg text-white/90 leading-relaxed text-pretty max-w-2xl">
                {heroSlides[currentSlide].description}
              </p>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 px-8 py-4 text-lg font-semibold rounded-none shadow-lg hover:shadow-xl transition-all duration-300 group border-2 border-white"
              >
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
