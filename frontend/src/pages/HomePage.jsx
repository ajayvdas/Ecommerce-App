import HeroSection from "@/components/HeroSection";
import TrendingSection from "@/components/TrendingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
// import NewsletterSection from "@/components/NewsletterSection";
import BrandShowcase from "@/components/BrandShowcase";
import ProductCarouselImg from "@/components/ProductCarouselImg";
import ViewAllProductsButton from "@/components/ViewAllProducts";
import ShopByCategory from "@/components/ShopByCategory";
import { useSelector } from "react-redux";

export default function HomePage() {
    const { userInfo } = useSelector(state => state.auth)
    return (
        <div>
            <HeroSection />
            <div className="bg-background">
                <ProductCarouselImg />
                <div className="flex flex-col items-center justify-center py-8">
                    <ViewAllProductsButton userInfo={userInfo} />
                </div>
                <ShopByCategory />
            </div>
            <TrendingSection />
            <TestimonialsSection />
            <BrandShowcase />
            {/* <NewsletterSection /> */}
        </div>
    );
}
