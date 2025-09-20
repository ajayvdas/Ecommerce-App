import { useSelector } from "react-redux";

import HeroSection from "@/components/HeroSection";
import TrendingSection from "@/components/TrendingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BrandShowcase from "@/components/BrandShowcase";
import ProductCarouselImg from "@/components/ProductCarouselImg";
import ViewAllProductsButton from "@/components/ViewAllProducts";
import ShopByCategory from "@/components/ShopByCategory";
import { useAddToWishlistMutation } from "@/slices/wishlistApiSlice";
import { toast } from "react-toastify";

export default function HomePage() {
    const { userInfo } = useSelector(state => state.auth)

    const [addToWishlist, { isLoading: isAdding }] = useAddToWishlistMutation()

    const handleAddToWishlist = async(productId) => {
        try {
            await addToWishlist(productId).unwrap()
            toast.success('Product added to wishlist')
        } catch (error) {
            console.error('Failed to add to wishlist:', error)
            toast.error('Failed to add to wishlist')
        }
    }
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
            <TrendingSection 
                onAddToWishlist={handleAddToWishlist}
                isAdding={isAdding}
            />
            <TestimonialsSection />
            <BrandShowcase />
        </div>
    );
}
