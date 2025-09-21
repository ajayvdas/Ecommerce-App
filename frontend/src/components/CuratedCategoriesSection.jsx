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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                    CURATED CATEGORIES
                </h2>
                <div className="w-20 h-1 bg-gray-900 mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[600px]">
                {/* Large Category Card */}
                <div className="group cursor-pointer">
                    <div
                        className={`${categories[0].bgColor} rounded-xl p-6 sm:p-8 text-white relative overflow-hidden h-80 lg:h-full flex flex-col justify-between transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl`}
                    >
                        <div className="absolute inset-0">
                            <img
                                src={categories[0].image}
                                alt={categories[0].title}
                                className="w-full h-full object-cover opacity-15"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/60"></div>
                        <div className="relative z-10 flex-1 flex flex-col justify-center">
                            <h3 className="text-2xl sm:text-3xl font-bold mb-3">{categories[0].title}</h3>
                            <p className="text-white/90 mb-6 text-base sm:text-lg max-w-md">{categories[0].description}</p>
                        </div>
                        <div className="relative z-10">
                            <Button variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 group-hover:shadow-lg">
                                Shop Now
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Small Category Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                    {categories.slice(1).map((category) => (
                        <div key={category.id} className="group cursor-pointer">
                            <div
                                className={`${category.bgColor} rounded-xl p-4 sm:p-6 text-white relative overflow-hidden h-40 sm:h-48 lg:h-full flex flex-col justify-between transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl`}
                            >
                                <div className="absolute inset-0">
                                    <img
                                        src={category.image}
                                        alt={category.title}
                                        className="w-full h-full object-cover opacity-15"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/60"></div>
                                <div className="relative z-10 flex-1 flex flex-col justify-center">
                                    <h3 className="text-lg sm:text-xl font-bold mb-2">{category.title}</h3>
                                    <p className="text-white/90 mb-4 text-sm max-w-xs">{category.description}</p>
                                </div>
                                <div className="relative z-10">
                                    <Button variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100 text-sm transition-all duration-300 group-hover:shadow-lg">
                                        Shop Now
                                        <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}