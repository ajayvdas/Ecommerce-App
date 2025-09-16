
import { useState } from "react";
import { motion } from "framer-motion";

import MultiStepIndicator from "@/components/MultiStepIndicator";
import ShippingForm from "@/components/ShippingForm";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "@/slices/cartSlice";
import { useNavigate } from "react-router-dom";

// const steps = ["Sign In", "Shipping", "Payment", "Place Order"];

export default function ShippingPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector ((state) => state.cart)
    const { shippingAddress } = cart;

    const [formData, setFormData] = useState({
        address: shippingAddress.address || "",
        city: shippingAddress.city || "",
        postalCode: shippingAddress.postalCode || "",
        country: shippingAddress || "",
    });




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCountryChange = (value) => {
        setFormData((prev) => ({ ...prev, country: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Form submitted:", formData);
        
        dispatch(saveShippingAddress({...formData}))
        navigate("/payment")
        
    };

    return (
        <div className="container mx-auto px-4 py-24 lg:px-8 lg:py-16 max-w-screen-md">

            <motion.h1
                className="text-3xl font-bold mb-8 mt-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Shipping
            </motion.h1>

            <MultiStepIndicator currentStep={1} />

            <ShippingForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleCountryChange={handleCountryChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}



