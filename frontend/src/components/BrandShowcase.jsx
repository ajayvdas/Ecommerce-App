import { Truck, RotateCcw, Headphones, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
];

const features = [
    {
        icon: Truck,
        title: "Free Delivery",
        description: "Free shipping over $100",
    },
    {
        icon: RotateCcw,
        title: "Free Return",
        description: "Free shipping over $100",
    },
    {
        icon: Headphones,
        title: "Customer Support",
        description: "Friendly 27/7 customer support",
    },
    {
        icon: Shield,
        title: "Money Back Guarantee",
        description: "Quality checked by our team",
    },
];

export default function BrandShowcase() {
    return (
        <section className="py-16 lg:py-20 bg-gray-50">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Trusted by Leading Brands</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We partner with the world's most recognized fashion brands to bring you quality and style
                    </p>
                </div>

                <div className="flex gap-6 lg:gap-8 justify-center items-center overflow-x-auto pb-6 mb-20 scrollbar-hide">
                    {brands.map((brand) => (
                        <Card
                            key={brand.id}
                            className="flex-shrink-0 bg-white border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl"
                        >
                            <CardContent className="p-8 flex items-center justify-center w-40 h-28">
                                <img
                                    src={brand.logo || `/placeholder.svg?height=40&width=120&query=${brand.name} logo`}
                                    alt={`${brand.name} logo`}
                                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                />
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-5 p-2">
                            <div className="flex-shrink-0 bg-gray-100 rounded-xl p-3">
                                <feature.icon className="w-6 h-6 text-gray-700" />
                            </div>
                            <div className="pt-1">
                                <h3 className="font-semibold text-gray-900 mb-2 text-base">{feature.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}