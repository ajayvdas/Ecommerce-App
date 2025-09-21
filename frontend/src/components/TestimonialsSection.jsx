import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, ChevronLeft, ChevronRight, Heart, Award, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fashion Blogger",
    content:
      "Absolutely love the quality and style! The pieces I ordered exceeded my expectations. The fabric is luxurious and the fit is perfect. This is now my go-to brand for all my fashion needs.",
    rating: 5,
    image: "/professional-woman-smiling.png",
    verified: true,
    purchase: "Oversized Blazer, High-Waist Jeans",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Style Enthusiast",
    content:
      "Fast shipping and amazing customer service. The sustainable collection is not only stylish but also makes me feel good about my choices. The quality is outstanding and the designs are timeless.",
    rating: 5,
    image: "/professional-man-smiling.png",
    verified: true,
    purchase: "Silk Midi Dress, Chunky Sneakers",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Fashion Designer",
    content:
      "The attention to detail is remarkable. Every piece tells a story and the craftsmanship is evident. Highly recommend to anyone who values quality and wants to make a statement with their style.",
    rating: 5,
    image: "/creative-woman-designer-smiling-portrait.jpg",
    verified: true,
    purchase: "Premium Denim Collection",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Creative Director",
    content:
      "Been shopping here for over a year now. Consistent quality, trendy designs, and excellent customer support. My go-to fashion destination for both casual and professional wear.",
    rating: 5,
    image: "/creative-director-man-smiling-portrait.jpg",
    verified: true,
    purchase: "Business Attire Collection",
  },
]

const stats = [
  { icon: Users, value: "50K+", label: "Happy Customers" },
  { icon: Star, value: "4.9", label: "Average Rating" },
  { icon: Award, value: "98%", label: "Satisfaction Rate" },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 8000)

    return () => clearInterval(timer)
  }, [])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f1f5f9' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        ></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <div className="w-20 h-1 bg-gray-900 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who trust us for their fashion needs. 
            Real reviews from real people.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="border-0 bg-white shadow-xl rounded-2xl overflow-hidden">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Image Side */}
                        <div className="relative h-80 lg:h-96">
                          <img
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                          <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-center gap-3 mb-3">
                              <img
                                src={testimonial.image || "/placeholder.svg"}
                                alt={testimonial.name}
                                className="w-12 h-12 rounded-full border-2 border-white object-cover"
                              />
                              <div>
                                <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                                <p className="text-white/80 text-sm">{testimonial.role}</p>
                              </div>
                              {testimonial.verified && (
                                <div className="ml-auto">
                                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Content Side */}
                        <div className="p-8 lg:p-10 flex flex-col justify-center">
                          <div className="mb-6">
                            <Quote className="w-10 h-10 text-gray-900 mb-4" />
                            <blockquote className="text-lg text-gray-700 leading-relaxed">
                              "{testimonial.content}"
                            </blockquote>
                          </div>
                          
                          <div className="mt-auto">
                            <div className="text-sm text-gray-500 mb-2 font-medium">Recent Purchase:</div>
                            <div className="text-sm font-medium text-gray-700 bg-gray-100 rounded-lg px-3 py-2 inline-block">
                              {testimonial.purchase}
                            </div>
                          </div>
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white hover:bg-gray-50 shadow-lg border w-12 h-12 hidden lg:flex"
            onClick={goToPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white hover:bg-gray-50 shadow-lg border w-12 h-12 hidden lg:flex"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentIndex 
                    ? "bg-gray-900 scale-125" 
                    : "bg-gray-300 hover:bg-gray-400",
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