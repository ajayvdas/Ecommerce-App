import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

export default function ProductGrid({ products, totalCount }) {
    const filteredProducts = products;
    const isQueryActive = false;
    console.log('products is:', products)

    return (
        <main className="flex-1 px-4 md:px-6 lg:px-8">
            {filteredProducts && filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {filteredProducts.map((product) => (
                        <div key={product._id} className="group transition-all duration-300">
                            <Card className="w-full overflow-hidden border rounded-lg shadow-sm bg-white dark:bg-gray-900 hover:border hover:border-black">
                                {/* Image */}
                                <Link to={`/product/${product._id}`} className="block relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </Link>

                                {/* Content */}
                                <CardContent className="p-4 flex flex-col space-y-2">
                                    {/* Category */}
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {product.category}
                                    </p>

                                    {/* Name */}
                                    <h3 className="font-semibold text-base text-gray-900 dark:text-white">
                                        {product.name}
                                    </h3>

                                    {/* Reviews */}
                                    <div className="flex items-center text-sm">
                                        <div className="flex text-yellow-500 mr-1">
                                            {"★".repeat(4)}{"☆"}
                                        </div>
                                        <span className="text-gray-500">
                                            {product.reviews.length || 0} Reviews
                                        </span>
                                    </div>

                                    {/* Stock */}
                                    <p
                                        className={`text-sm font-medium ${
                                            product.countInStock > 0
                                                ? "text-green-600"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {product.countInStock > 0 ? `In Stock (${product.countInStock})` : "Out of Stock"}
                                    </p>

                                    {/* Price & Add to Cart */}
                                    <div className="flex items-center justify-between pt-2">
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                                            ${product.price.toFixed(2)}
                                        </span>
                                        <button
                                            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors duration-200"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            ) : isQueryActive ? (
                <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center">
                    <div className="mb-6">
                        <svg
                            className="w-16 h-16 md:w-20 md:h-20 text-gray-300 dark:text-gray-600 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                        No products found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-500 max-w-md">
                        Try adjusting your search criteria or browse our categories to find what you&apos;re looking for.
                    </p>
                </div>
            ) : null}

            {/* Pagination */}
            <div className="mt-8 md:mt-12 lg:mt-16">
                <Pagination totalCount={totalCount} />
            </div>
        </main>
    );
}
