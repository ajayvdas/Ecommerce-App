import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function OrderSummary({ itemsPrice, shippingPrice, taxPrice, totalPrice, isLoading, onPlaceOrder, cartLength }) {
    return (
      <motion.div 
        className="bg-gray-50 p-6 rounded-lg"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Items:</span>
            <span>${itemsPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>${shippingPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax:</span>
            <span>${taxPrice.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        <Button onClick={onPlaceOrder} disabled={isLoading || cartLength === 0} className="w-full mt-6">{isLoading ? 'Placing Order...' : 'Place Order'}</Button>
      </motion.div>
    )
  }