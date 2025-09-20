import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const categories = [
    {
        id: 1,
        title: "Urban Streetwear",
        description: "Discover the latest street fashion trends",
        image: "/creative-director-man-smiling-portrait.jpg",
        bgColor: "bg-gradient-to-br from-gray-900 to-gray-700",
        size: "large",
    },
    {
        id: 2,
        title: "Business Attire",
        description: "Professional looks for the modern workplace",
        image: "/professional-man-smiling.png",
        bgColor: "bg-gradient-to-br from-blue-600 to-blue-800",
        size: "small",
    },
    {
        id: 3,
        title: "Denim Collection",
        description: "Classic and contemporary denim styles",
        image: "/premium-denim-jeans-fashion-models-urban-style.jpg",
        bgColor: "bg-gradient-to-br from-indigo-600 to-indigo-800",
        size: "small",
    },
    {
        id: 4,
        title: "Casual Wear",
        description: "Comfortable and stylish everyday fashion",
        image: "/creative-woman-designer-smiling-portrait.jpg",
        bgColor: "bg-gradient-to-br from-purple-600 to-purple-800",
        size: "small",
    },
];

export default function CuratedCategoriesSection() {
    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">CURATED CATEGORIES</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
                    {/* Large Category Card */}
                    <div className="group cursor-pointer">
                        <div
                            className={`${categories[0].bgColor} rounded-2xl p-8 text-white relative overflow-hidden h-full flex flex-col justify-between transition-transform duration-300 group-hover:scale-105`}
                        >
                            <div className="absolute inset-0">
                                <img
                                    src={categories[0].image}
                                    alt={categories[0].title}
                                    className="w-full h-full object-cover opacity-20"
                                />
                            </div>
                            <div className="absolute inset-0 bg-black/40"></div>
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold mb-4">{categories[0].title}</h3>
                                <p className="text-white/90 mb-6 text-lg">{categories[0].description}</p>
                            </div>
                            <div className="relative z-10">
                                <Button variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                                    Shop Now
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Small Category Cards Grid */}
                    <div className="grid grid-cols-1 gap-6">
                        {categories.slice(1).map((category) => (
                            <div key={category.id} className="group cursor-pointer">
                                <div
                                    className={`${category.bgColor} rounded-2xl p-6 text-white relative overflow-hidden h-full flex flex-col justify-between transition-transform duration-300 group-hover:scale-105`}
                                >
                                    <div className="absolute inset-0">
                                        <img
                                            src={category.image}
                                            alt={category.title}
                                            className="w-full h-full object-cover opacity-20"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-black/40"></div>
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                                        <p className="text-white/90 mb-4 text-sm">{category.description}</p>
                                    </div>
                                    <div className="relative z-10">
                                        <Button variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100 text-sm">
                                            Shop Now
                                            <ArrowRight className="ml-2 h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

