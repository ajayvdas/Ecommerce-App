import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import HeroSection from "@/components/HeroSection";
import TopBrandsSection from "@/components/TopBrandsSection";
import NewestArrivalsSection from "@/components/NewestArrivalsSection";
import CuratedCategoriesSection from "@/components/CuratedCategoriesSection";
import PromotionalSection from "@/components/PromotionalSection";
import TrendingSection from "@/components/TrendingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { useAddToWishlistMutation } from "@/slices/wishlistApiSlice";
import { addToCart } from "@/slices/cartSlice";
import { toast } from "react-toastify";

export default function HomePage() {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [addToWishlist, { isLoading: isAdding }] = useAddToWishlistMutation();

    const handleAddToWishlist = async (productId) => {
        if (!userInfo) {
            toast.error("Please login to add items to wishlist");
            navigate("/login");
            return;
        }

        try {
            await addToWishlist(productId).unwrap();
            toast.success("Product added to wishlist");
        } catch (error) {
            console.error("Failed to add to wishlist:", error);
            toast.error("Failed to add to wishlist");
        }
    };

    const handleAddToCart = (product, quantity = 1) => {
        dispatch(addToCart({ ...product, quantity }));
        toast.success("Product added to cart");
    };

    return (
        <div className="min-h-screen">
            <HeroSection />

            <TopBrandsSection />

            <section className="py-20 bg-gray-50">
                <NewestArrivalsSection
                    onAddToWishlist={handleAddToWishlist}
                    onAddToCart={handleAddToCart}
                    isAdding={isAdding}
                />
            </section>

            <section className="py-20 bg-white">
                <CuratedCategoriesSection />
            </section>

            <section className="py-20 bg-gray-50">
                <PromotionalSection />
            </section>

            <section className="py-20 bg-white">
                <TrendingSection onAddToWishlist={handleAddToWishlist} onAddToCart={handleAddToCart} isAdding={isAdding} />
            </section>

            <TestimonialsSection />
        </div>
    );
}
