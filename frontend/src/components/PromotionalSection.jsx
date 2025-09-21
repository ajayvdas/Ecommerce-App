import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function PromotionalSection() {
    const [timeLeft, setTimeLeft] = useState({
        days: 5,
        hours: 19,
        minutes: 23,
        seconds: 2
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else if (prev.days > 0) {
                    return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left Side - Image */}
                <div className="relative order-2 lg:order-1">
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src="/creative-director-man-smiling-portrait.jpg"
                            alt="Promotional offer"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                </div>

                {/* Right Side - Content */}
                <div className="space-y-8 order-1 lg:order-2">
                    <div className="space-y-6">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                            EXCLUSIVE{" "}
                            <span className="text-red-600 relative">
                                50% OFF
                                <div className="absolute -bottom-2 left-0 w-full h-1 bg-red-600 opacity-30"></div>
                            </span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-md leading-relaxed">
                            Don't miss out on our biggest sale of the year. Limited time offer on selected items.
                        </p>
                    </div>

                    {/* Countdown Timer */}
                    <div className="flex items-center flex-wrap gap-4 sm:gap-6">
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-gray-900 bg-white rounded-xl px-4 py-3 shadow-lg border">
                                {timeLeft.days.toString().padStart(2, '0')}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">Days</div>
                        </div>
                        <div className="text-xl sm:text-2xl font-bold text-gray-400">:</div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-gray-900 bg-white rounded-xl px-4 py-3 shadow-lg border">
                                {timeLeft.hours.toString().padStart(2, '0')}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">Hours</div>
                        </div>
                        <div className="text-xl sm:text-2xl font-bold text-gray-400">:</div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-gray-900 bg-white rounded-xl px-4 py-3 shadow-lg border">
                                {timeLeft.minutes.toString().padStart(2, '0')}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">Minutes</div>
                        </div>
                        <div className="text-xl sm:text-2xl font-bold text-gray-400">:</div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-gray-900 bg-white rounded-xl px-4 py-3 shadow-lg border">
                                {timeLeft.seconds.toString().padStart(2, '0')}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">Seconds</div>
                        </div>
                    </div>

                    <Button 
                        size="lg" 
                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                        Shop Now
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </div>
    );
}