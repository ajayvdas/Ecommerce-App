
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
// import bannerImg from "../assets/bannerImg.jpg"
import { Link, useNavigate, useParams } from "react-router-dom"
import ProductImage from "@/components/ProductImage"
import ProductDetails from "@/components/ProductDetails"
import AddToCartSection from "@/components/AddToCartSection"
import ReviewsSection from "@/components/ReviewsSection"
import WriteReviewForm from "@/components/WriteReviewForm"
import { useCreateReviewMutation, useGetProductDetailsQuery } from "@/slices/productsApiSlice"
import Loader from "@/components/Loader"
import ErrorComponent from "@/components/ErrorComponent"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { toast } from "react-toastify"
import { addToCart } from "@/slices/cartSlice"

export default function ProductPage() {
  const { id: productId } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const { userInfo } = useSelector((state) => state.auth)

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId)
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation()

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }))

    navigate("/cart")
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap()

      refetch()
      toast.success("Review added successfully")
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorComponent title="Error loading products" description={error?.data?.message || error.error} />
      ) : product ? (
        <div className="min-h-screen bg-white">
          {/* Back Button */}
          <div className="container mx-auto px-4 pt-6 max-w-7xl">
            <Link to="/">
              <Button variant="ghost" className="mb-6 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="mr-2 h-4 w-4" /> Go back
              </Button>
            </Link>
          </div>

          {/* Main Product Section */}
          <div className="container mx-auto px-4 pb-12 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
              {/* Product Images */}
              <ProductImage image={product.image} name={product.name} />

              {/* Product Details */}
              <div className="space-y-6">
                <ProductDetails product={product} />
                <AddToCartSection
                  product={product}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  onAddToCart={addToCartHandler}
                />
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 max-w-7xl">
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
                <div className="text-center mt-8">
                  <p className="text-gray-600">
                    Please{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                      sign in
                    </Link>{" "}
                    to write a review
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </>
  )
}
