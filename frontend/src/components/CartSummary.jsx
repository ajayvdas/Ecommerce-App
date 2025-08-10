import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";


function CartSummary({totalItems, totalPrice, onCheckout }) {
    return (
        <motion.div
            className="mt-8 bg-gray-100 p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <div className="flex justify-between mb-4">
                <span className="font-semibold">Total Items:</span>
                <span>{totalItems}</span>
            </div>
            <div className="flex justify-between mb-6">
                <span className="font-semibold">Total Price:</span>
                <span>${totalPrice ? totalPrice.toFixed(2) : "0"}</span>
            </div>
            <Button onClick={onCheckout} className="w-full">Proceed to Checkout</Button>
        </motion.div>
    );
}

export default CartSummary