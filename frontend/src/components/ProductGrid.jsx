import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

export default function ProductGrid({
    products,
    totalCount,
    // totalItems,
    // currentPage,
    // itemsPerPage
}) {
    // const filteredProducts = query
    //     ? products?.filter((product) =>
    //           product.name.toLowerCase().includes(query.toLowerCase())
    //       )
    //     : products;
    const filteredProducts = products;

    // const isQueryActive = query?.trim().length > 0;
    const isQueryActive = false;

    return (
        <main className="flex-1 px-4 md:px-6 lg:px-8">
            {filteredProducts && filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
                    {filteredProducts.map((product) => (
                        <div key={product._id} className="group transform transition-all duration-300 hover:shadow-xl">
                            <Card className="w-full h-full overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 max-w-sm mx-auto">
                                <Link to={`/product/${product._id}`} className="block h-full">
                                    <CardContent className="p-0 relative h-full flex flex-col">
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-48 sm:h-52 md:h-56 lg:h-60 xl:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300"></div>
                                        </div>

                                        <div className="p-4 md:p-5 lg:p-6 flex-1 flex flex-col justify-between">
                                            <div className="space-y-2 md:space-y-3">
                                                <h3 className="font-bold text-base md:text-lg lg:text-xl text-gray-900 dark:text-white line-clamp-2 transition-colors duration-300">
                                                    {product.name}
                                                </h3>

                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                                        {product.category}
                                                    </span>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                                        {product.brand}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                                                        ${product.price.toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Link>
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

            {/* Pagination Component */}
            <div className="mt-8 md:mt-12 lg:mt-16">
                {/* <Pagination totalItems={totalItems} currentPage={currentPage} itemsPerPage={itemsPerPage} /> */}
                <Pagination totalCount={totalCount} />
            </div>
        </main>
    );
}
