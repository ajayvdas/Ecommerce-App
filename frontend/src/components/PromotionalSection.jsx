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
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Image */}
                    <div className="relative">
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                            <img
                                src="/creative-director-man-smiling-portrait.jpg"
                                alt="Promotional offer"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold text-gray-900">
                                EXCLUSIVE <span className="text-red-600">50% OFF</span>
                            </h2>
                            <p className="text-lg text-gray-600">
                                Don't miss out on our biggest sale of the year. Limited time offer on selected items.
                            </p>
                        </div>

                        {/* Countdown Timer */}
                        <div className="flex items-center space-x-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900 bg-white rounded-lg px-4 py-2 shadow-md">
                                    {timeLeft.days.toString().padStart(2, '0')}
                                </div>
                                <div className="text-sm text-gray-600 mt-1">Days</div>
                            </div>
                            <div className="text-2xl font-bold text-gray-400">:</div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900 bg-white rounded-lg px-4 py-2 shadow-md">
                                    {timeLeft.hours.toString().padStart(2, '0')}
                                </div>
                                <div className="text-sm text-gray-600 mt-1">Hours</div>
                            </div>
                            <div className="text-2xl font-bold text-gray-400">:</div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900 bg-white rounded-lg px-4 py-2 shadow-md">
                                    {timeLeft.minutes.toString().padStart(2, '0')}
                                </div>
                                <div className="text-sm text-gray-600 mt-1">Minutes</div>
                            </div>
                            <div className="text-2xl font-bold text-gray-400">:</div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900 bg-white rounded-lg px-4 py-2 shadow-md">
                                    {timeLeft.seconds.toString().padStart(2, '0')}
                                </div>
                                <div className="text-sm text-gray-600 mt-1">Seconds</div>
                            </div>
                        </div>

                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold">
                            Shop Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

