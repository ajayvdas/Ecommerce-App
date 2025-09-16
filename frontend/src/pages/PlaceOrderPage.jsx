import { motion } from "framer-motion";
// import { Check, CreditCard } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Separator } from "@/components/ui/separator"
// import Image from "next/image"
// import bannerImg from "../assets/bannerImg.jpg"
import MultiStepIndicator from "@/components/MultiStepIndicator";
import ShippingDetails from "@/components/ShippingDetails";
import PaymentMethod from "@/components/PaymentMethod";
import OrderItems from "@/components/OrderItems";
import OrderSummary from "@/components/OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "@/slices/ordersApiSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearCartItems } from "@/slices/cartSlice";
import Loader from "@/components/Loader";
import Error from "@/components/Error";

// const steps = ["Sign In", "Shipping", "Payment", "Place Order"]

// Mock data (replace with actual data in a real application)
// const orderData = {
//   shippingAddress: "123 Main St, Anytown, AN 12345",
//   paymentMethod: "Credit Card",
//   orderItems: [
//     { id: 1, name: "Classic Denim Jacket", image: bannerImg, price: 89.99, quantity: 1 },
//     { id: 2, name: "Vintage Leather Boots", image: bannerImg, price: 129.99, quantity: 2 },
//   ],
//   itemsPrice: 349.97,
//   shippingPrice: 10,
//   taxPrice: 35,
//   totalPrice: 394.97,
// }

export default function PlaceOrderPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate("/shipping");
        } else if (!cart.paymentMethod) {
            navigate("/payment");
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);


    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (err) {
            toast.error(err);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error)
        return (
            <div className="m-4 mx-auto min-w-16">
                <Error message={error.message} />
            </div>
        );

    console.log(cart);
    return (
        <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-16 max-w-screen-lg">
            <MultiStepIndicator currentStep={3} />

            <motion.div
                className="mt-8 grid gap-8 md:grid-cols-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="md:col-span-2 space-y-8">
                    <ShippingDetails shippingAddress={cart.shippingAddress} />
                    <PaymentMethod method={cart.paymentMethod} />
                    {cart.cartItems.length === 0 ? <p>Your cart is empty</p> : <OrderItems items={cart.cartItems} />}
                </div>
                <div className="md:col-span-1">
                    <OrderSummary
                        itemsPrice={cart.itemsPrice}
                        shippingPrice={cart.shippingPrice}
                        taxPrice={cart.taxPrice}
                        totalPrice={cart.totalPrice}
                        isLoading={isLoading}
                        onPlaceOrder={placeOrderHandler}
                        cartLength={cart.cartItems.length}
                    />
                </div>
            </motion.div>
        </div>
    );
}

// function MultiStepIndicator({ currentStep }) {
//   return (
//     <nav aria-label="Progress">
//       <ol className="flex items-center">
//         {steps.map((step, index) => (
//           <li key={step} className="relative flex-1">
//             {index <= currentStep ? (
//               <div className="group flex items-center">
//                 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary">
//                   <Check className="w-5 h-5 text-white" />
//                 </span>
//                 <span className="ml-3 text-sm font-medium text-primary">{step}</span>
//               </div>
//             ) : (
//               <div className="group flex items-center">
//                 <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-300">
//                   <span className="text-gray-500">{index + 1}</span>
//                 </span>
//                 <span className="ml-3 text-sm font-medium text-gray-500">{step}</span>
//               </div>
//             )}

//             {index !== steps.length - 1 && (
//               <div className="hidden md:block absolute top-4 left-0 w-full">
//                 <div className="h-0.5 bg-gray-200" />
//               </div>
//             )}
//           </li>
//         ))}
//       </ol>
//     </nav>
//   )
// }
