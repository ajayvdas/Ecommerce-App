
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fashion Blogger",
    content:
      "Absolutely love the quality and style! The pieces I ordered exceeded my expectations. The fabric is luxurious and the fit is perfect.",
    rating: 5,
    image: "/professional-woman-smiling.png",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Style Enthusiast",
    content:
      "Fast shipping and amazing customer service. The sustainable collection is not only stylish but also makes me feel good about my choices.",
    rating: 5,
    image: "/professional-man-smiling.png",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Fashion Designer",
    content:
      "The attention to detail is remarkable. Every piece tells a story and the craftsmanship is evident. Highly recommend to anyone who values quality.",
    rating: 5,
    image: "/creative-woman-designer-smiling-portrait.jpg",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Creative Director",
    content:
      "Been shopping here for over a year now. Consistent quality, trendy designs, and excellent customer support. My go-to fashion destination.",
    rating: 5,
    image: "/creative-director-man-smiling-portrait.jpg",
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 bg-[#fefce8]/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#374151] mb-4">What Our Customers Say</h2>
          <p className="text-lg text-[#374151] max-w-2xl mx-auto text-pretty">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="border-none bg-[#fefce8] shadow-lg">
                    <CardContent className="p-8 text-center">
                      <Quote className="w-12 h-12 text-[#d97706] mx-auto mb-6" />

                      <blockquote className="text-xl text-[#374151] mb-6 leading-relaxed text-pretty">
                        "{testimonial.content}"
                      </blockquote>

                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-[#d97706] text-[#d97706]" />
                        ))}
                      </div>

                      <div className="flex items-center justify-center gap-4">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="text-left">
                          <h4 className="font-semibold text-[#374151] text-lg">{testimonial.name}</h4>
                          <p className="text-[#374151]">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-[#ffffff] hover:bg-[#fefce8]"
            onClick={goToPrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-[#ffffff] hover:bg-[#fefce8]"
            onClick={goToNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentIndex ? "bg-[#d97706] scale-125" : "bg-[#d97706] hover:bg-[#374151]/50",
                )}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
