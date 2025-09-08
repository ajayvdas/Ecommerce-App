"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetTopProductsQuery } from "@/slices/productsApiSlice";
import Loader from "./Loader";

const ImageCarousal = () => {
    // Sample product images - replace with your actual product data
    // const products = [
    //   {
    //     id: 1,
    //     image: "/modern-smartphone.png",
    //     title: "Premium Smartphone",
    //     price: "$899",
    //   },
    //   {
    //     id: 2,
    //     image: "/wireless-headphones-product-shot.jpg",
    //     title: "Wireless Headphones",
    //     price: "$299",
    //   },
    //   {
    //     id: 3,
    //     image: "/laptop-computer-product-shot.jpg",
    //     title: "Gaming Laptop",
    //     price: "$1299",
    //   },
    //   {
    //     id: 4,
    //     image: "/smartwatch-product-shot.jpg",
    //     title: "Smart Watch",
    //     price: "$399",
    //   },
    //   {
    //     id: 5,
    //     image: "/tablet-device-product-shot.jpg",
    //     title: "Tablet Pro",
    //     price: "$699",
    //   },
    // ]

    const [currentIndex, setCurrentIndex] = useState(0);

    const { data: products, isLoading, error } = useGetTopProductsQuery();

    // Auto-advance carousel every 1 second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1));
        }, 2000);

        return () => clearInterval(interval);
    }, [products?.length]);

    const goToPrevious = () => {
        setCurrentIndex(currentIndex === 0 ? products.length - 1 : currentIndex - 1);
    };

    const goToNext = () => {
        setCurrentIndex(currentIndex === products.length - 1 ? 0 : currentIndex + 1);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return isLoading ? (
        <Loader />
    ) : error ? (
        <p>Error fetching home</p>
    ) : (
        <div className="relative w-full max-w-4xl mx-auto bg-card rounded-lg overflow-hidden shadow-lg">
            {/* Main carousel container */}
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
                {/* Carousel slides */}
                <div
                    className="flex transition-transform duration-500 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {products.map((product) => (
                        <div key={product._id} className="min-w-full h-full relative">
                            <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                            {/* Product info overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
                                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-1">
                                    {product.title}
                                </h3>
                                <p className="text-white/90 text-sm sm:text-base md:text-lg font-semibold">
                                    {product.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation buttons */}
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-lg z-10"
                    onClick={goToPrevious}
                >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-lg z-10"
                    onClick={goToNext}
                >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center space-x-2 p-4 bg-card">
                {products.map((_, index) => (
                    <button
                        key={index}
                        className={cn(
                            "w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300",
                            index === currentIndex
                                ? "bg-primary scale-125"
                                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                        )}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousal;
