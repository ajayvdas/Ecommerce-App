"use client"

import { Card, CardContent } from "@/components/ui/card"

const brands = [
  {
    id: 1,
    name: "Zara",
    logo: "/zara-fashion-brand-logo.jpg",
  },
  {
    id: 2,
    name: "H&M",
    logo: "/letter-h-typography.png",
  },
  {
    id: 3,
    name: "Nike",
    logo: "/nike-brand-logo.jpg",
  },
  {
    id: 4,
    name: "Adidas",
    logo: "/adidas-brand-logo.jpg",
  },
  {
    id: 5,
    name: "Uniqlo",
    logo: "/uniqlo-fashion-brand-logo.jpg",
  },
  {
    id: 6,
    name: "Levi's",
    logo: "/levis-brand-logo.jpg",
  },
]

export default function BrandShowcase() {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Trusted by Leading Brands</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We partner with the world's most recognized fashion brands to bring you quality and style
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <Card key={brand.id} className="group hover:shadow-lg transition-all duration-300 bg-card border-0">
              <CardContent className="p-6 flex items-center justify-center h-24">
                <img
                  src={brand.logo || "/placeholder.svg"}
                  alt={`${brand.name} logo`}
                  className="max-w-full max-h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
