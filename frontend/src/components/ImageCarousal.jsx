// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
// import BannerImg1 from "../assets/BannerImg1.png";

// const products = [
//     {
//         id: 1,
//         name: "Aurora Headphones",
//         description: "Premium wireless headphones with crystal-clear sound and all-day comfort",
//         price: 299.99,
//         // image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
//         image: BannerImg1,
//         gradient: "from-purple-600 via-pink-600 to-blue-600",
//         accent: "bg-gradient-to-r from-purple-500 to-pink-500",
//     },
//     {
//         id: 2,
//         name: "Quantum Watch",
//         description: "Smart watch that seamlessly blends technology with elegant design",
//         price: 449.99,
//         image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
//         gradient: "from-emerald-600 via-teal-600 to-cyan-600",
//         accent: "bg-gradient-to-r from-emerald-500 to-teal-500",
//     },
//     {
//         id: 3,
//         name: "Nebula Speaker",
//         description: "360° sound experience with immersive audio and stunning light effects",
//         price: 199.99,
//         image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=600&fit=crop",
//         gradient: "from-orange-600 via-red-600 to-pink-600",
//         accent: "bg-gradient-to-r from-orange-500 to-red-500",
//     },
// ];

// export default function ImageCarousal() {
//     return (
//         <div className="m-20">
//             <Carousel>
//                 <CarouselContent>
//                     {products.map((product) => {
//                         return (
//                             <CarouselItem key={product.id}>
//                                 <img
//                                     src={BannerImg1}
//                                     alt={product.name}
//                                     className="w-full h-full sm:h-60 lg:h-80 object-cover rounded-xl sm:rounded-2xl shadow-2xl"
//                                 />
//                             </CarouselItem>
//                         );
//                     })}
//                 </CarouselContent>
//                 <CarouselPrevious />
//                 <CarouselNext />
//             </Carousel>
//         </div>
//     );
// }

import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import BannerImg1 from "../assets/BannerImg1.png";
import BannerImg2 from "../assets/BannerImg2.png";
// import chatGptImage from "../assets/ChatGPT Image.png"
import chatGptImage2 from "../assets/ChatgptImage2.png"

const products = [
    {
        id: 1,
        name: "Aurora Headphones",
        description: "Premium wireless headphones with crystal-clear sound and all-day comfort",
        price: 299.99,
        // image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
        image: BannerImg1,
        gradient: "from-purple-600 via-pink-600 to-blue-600",
        accent: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
        id: 2,
        name: "Quantum Watch",
        description: "Smart watch that seamlessly blends technology with elegant design",
        price: 449.99,
        // image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
        image: BannerImg2,
        gradient: "from-emerald-600 via-teal-600 to-cyan-600",
        accent: "bg-gradient-to-r from-emerald-500 to-teal-500",
    },
    {
        id: 3,
        name: "Nebula Speaker",
        description: "360° sound experience with immersive audio and stunning light effects",
        price: 199.99,
        // image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=600&fit=crop",
        image: chatGptImage2,
        gradient: "from-orange-600 via-red-600 to-pink-600",
        accent: "bg-gradient-to-r from-orange-500 to-red-500",
    },
];

export default function ImageCarousal() {
    const [api, setApi] = useState();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    const canScrollPrev = current > 1;
    const canScrollNext = current < count;

    return (
        <div className="m-20">
            <Carousel className="relative" setApi={setApi}>
                <CarouselContent>
                    {products.map((product) => {
                        return (
                            <CarouselItem key={product.id}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full sm:h-60 lg:h-96  rounded-xl sm:rounded-2xl shadow-2xl "
                                />
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious
                    disabled={!canScrollPrev}
                    className={!canScrollPrev ? "opacity-50 cursor-not-allowed" : ""}
                />
                <CarouselNext disabled={!canScrollNext} className={!canScrollNext ? "opacity-50 cursor-not-allowed" : ""} />

                {/* Slide Indicators */}
                <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
                    {products.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                                index === current ? "bg-white scale-125 shadow-lg" : "bg-white/50 hover:bg-white/75"
                            }`}
                            aria-label={`Go to product ${index + 1}`}
                        />
                    ))}
                </div>
            </Carousel>
        </div>
    );
}
