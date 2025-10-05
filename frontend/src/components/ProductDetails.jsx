/* eslint-disable react/prop-types */
import { motion } from "framer-motion"
import { Star, Clock } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

function ProductDetails({ product }) {
    // Calculate delivery time (mock data - you can make this dynamic later)
    const deliveryTime = "02:30:25"
    const estimatedDelivery = "10 - 12 October 2024"

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 lg:space-y-8 xl:space-y-10"
        >
            {/* Category Badge */}
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 px-3 py-1">
                {product.category}
            </Badge>

            {/* Product Title */}
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                {product.name}
            </h1>

            {/* Rating and Reviews */}
            <div className="flex items-center space-x-3 lg:space-x-4">
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-5 h-5 lg:w-6 lg:h-6 ${
                                i < Math.floor(product.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                            }`}
                        />
                    ))}
                </div>
                <span className="text-sm lg:text-base text-gray-600">
                    {product.rating} ({product.numReviews} reviews)
                </span>
            </div>

            {/* Price */}
            <div className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
            </div>

            {/* Delivery Information */}
            <div className="flex items-center space-x-2 text-sm lg:text-base text-gray-600">
                <Clock className="w-4 h-4 lg:w-5 lg:h-5" />
                <span>Order in <span className="font-semibold text-gray-900">{deliveryTime}</span> to get next day delivery</span>
            </div>

            {/* Description */}
            <div className="text-gray-600 leading-relaxed text-sm lg:text-base lg:leading-loose">
                {product.description}
            </div>

            {/* Collapsible Sections */}
            <div className="space-y-4">
                {/* Description & Fit */}
                <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer py-3 border-b border-gray-200">
                        <span className="font-medium text-gray-900">Description & Fit</span>
                        <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </summary>
                    <div className="pt-4 text-gray-600">
                        <p className="mb-3">
                            Loose-fit sweatshirt hoodie in medium weight cotton-blend fabric with a soft brushed inside. 
                            Features a drawstring hood, kangaroo pocket, and ribbing at the cuffs and hem.
                        </p>
                        <p>
                            Perfect for casual wear and layering. Made from sustainable materials with attention to comfort and style.
                        </p>
                    </div>
                </details>

                {/* Shipping */}
                <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer py-3 border-b border-gray-200">
                        <span className="font-medium text-gray-900">Shipping</span>
                        <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </summary>
                    <div className="pt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-bold text-sm">%</span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Disc 50%</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Regular Package</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">3-4 Working Days</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Estimated Arrival</p>
                                    <p className="text-sm text-gray-600">{estimatedDelivery}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </details>
            </div>
        </motion.div>
    )
}

export default ProductDetails