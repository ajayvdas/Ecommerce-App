import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import MultiStepIndicator from "@/components/MultiStepIndicator";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "@/slices/cartSlice";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
      if (!shippingAddress.address) {
        navigate("/shipping")
      }
    }, [navigate, shippingAddress])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        console.log("Continuing with payment method:", paymentMethod);
        console.log(
          cart.cartItems, 
          cart.shippingAddress, 
          cart.paymentMethod,
          cart.itemsPrice,
          cart.taxPrice,
          cart.totalPrice,
        )

        navigate("/placeorder")
    };

    return (
        <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-16 max-w-screen-md">
            <MultiStepIndicator currentStep={2} />
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md mx-auto mt-8"
            >
                <h1 className="text-3xl font-bold mb-8 mt-8">Payment Method</h1>
                <form onSubmit={submitHandler}>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <RadioGroup
                            defaultValue="paypal_credit_card"
                            onValueChange={(value) => setPaymentMethod(value)}
                            className="space-y-4"
                        >
                            <p className="text-2xl">Select Method</p>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="paypal_credit_card" id="paypal_credit_card" />
                                <Label htmlFor="paypal_credit_card" className="flex items-center cursor-pointer">
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    PayPal or Credit Card
                                </Label>
                            </div>
                            {/* Additional payment methods can be added here */}
                        </RadioGroup>
                        <Button type="submit" className="w-full mt-6">
                            Continue
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
