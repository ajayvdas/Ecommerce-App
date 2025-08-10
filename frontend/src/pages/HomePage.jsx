// banner
// featured products

import ImageCarousal from "@/components/ImageCarousal";
// import ProductBanner from "@/components/ProductBanner";
// import ProductCarousel from "@/components/ProductCarousel";
import ProductCarouselImg from "@/components/ProductCarouselImg";
import ViewAllProductsButton from "@/components/ViewAllProducts";
import { useSelector } from "react-redux";

const HomePage = () => {
    const { userInfo } = useSelector((state) => state.auth);
    // const cart = useSelector(state => state.cart)
    // console.table(cart)

    return (
        <>
            {/* BANNER */}
            {/* <ProductBanner /> */}
            <ImageCarousal />
            {/* featured products */}
            <div className="flex flex-col items-center justify-center mb-8">
                {/* <ProductCarousel /> */}
                <ProductCarouselImg />
                <ViewAllProductsButton userInfo={userInfo} />
            </div>
        </>
    );
};

export default HomePage;
