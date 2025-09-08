import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
// import bannerImg from "../assets/bannerImg.jpg"
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductImage from "@/components/ProductImage";
import ProductDetails from "@/components/ProductDetails";
import AddToCartSection from "@/components/AddToCartSection";
import ReviewsSection from "@/components/ReviewsSection";
import WriteReviewForm from "@/components/WriteReviewForm";
import { useCreateReviewMutation, useGetProductDetailsQuery } from "@/slices/productsApiSlice";
import Loader from "@/components/Loader";
import ErrorComponent from "@/components/ErrorComponent";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { addToCart } from "@/slices/cartSlice";

// Mock product data (replace with actual data fetching in a real application)
// const product = {
//   id: 1,
//   name: "Classic Denim Jacket",
//   price: 89.99,
//   description: "A timeless denim jacket that never goes out of style. Perfect for layering in any season.",
//   image: bannerImg,
//   rating: 4.5,
//   numReviews: 127,
//   status: "In stock",
//   reviews: [
//     { id: 1, author: "John Doe", rating: 5, comment: "Great quality and fit!" },
//     { id: 2, author: "Jane Smith", rating: 4, comment: "Nice jacket, but runs a bit small." },
//   ]
// }

export default function ProductPage() {
    const { id: productId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
    const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, quantity }));

        navigate("/");
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await createReview({
                productId,
                rating,
                comment,
            }).unwrap();

            refetch();
            toast.success("Review added successfully");
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <ErrorComponent 
                    title='Error loading products'
                    description={error?.data?.message || error.error}

                />
            ) : product ? (
                <div className="container mx-auto px-4 py-24 lg:px-8 lg:py-16 max-w-screen-lg">
                    <Link to="/">
                        <Button variant="outline" className="mb-4 md:mt-6">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Go back
                        </Button>
                    </Link>

                    <div className="grid md:grid-cols-2 gap-8">
                        <ProductImage image={product.image} name={product.name} />
                        <ProductDetails product={product} />
                    </div>

                    <AddToCartSection
                        product={product}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        onAddToCart={addToCartHandler}
                    />
                    {/* todo: build a better messaging component */}
                    <ReviewsSection reviews={product.reviews} />
                    {userInfo ? (
                        <WriteReviewForm
                            rating={rating}
                            setRating={setRating}
                            comment={comment}
                            setComment={setComment}
                            loadingProductReview={loadingProductReview}
                            onSubmit={submitHandler}
                        />
                    ) : (
                        <p>
                            Please <Link to="/login">sign in</Link> to write a review
                        </p>
                    )}
                </div>
            ) : (
                <p>No data available</p>
            )}
        </>
    );
}
