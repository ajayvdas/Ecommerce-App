
import { useState } from "react";
import { motion } from "framer-motion";

import MultiStepIndicator from "@/components/MultiStepIndicator";
import ShippingForm from "@/components/ShippingForm";
import { useDispatch } from "react-redux";
import { saveShippingAddress } from "@/slices/cartSlice";
import { useNavigate } from "react-router-dom";

// const steps = ["Sign In", "Shipping", "Payment", "Place Order"];

export default function ShippingPage() {
    const [formData, setFormData] = useState({
        address: "",
        city: "",
        postalCode: "",
        country: "",
    });

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCountryChange = (value) => {
        setFormData((prev) => ({ ...prev, country: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // Here you would typically send the data to your backend or state management system
        dispatch(saveShippingAddress({...formData}))
        navigate("/payment")
        
    };

    return (
        <div className="container mx-auto px-4 py-24 lg:px-8 lg:py-16 max-w-screen-md">
            <MultiStepIndicator currentStep={1} />

            <motion.h1
                className="text-3xl font-bold mb-8 mt-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Shipping
            </motion.h1>

            <ShippingForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleCountryChange={handleCountryChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}



