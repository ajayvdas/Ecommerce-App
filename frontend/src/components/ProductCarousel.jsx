// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { ChevronLeft, ChevronRight } from 'lucide-react'
// import { ProductCard } from "./ProductCard"
// import bannerImg from "../assets/bannerImg.jpg"

// const products = [
//   { id: 1, name: "Classic White Tee", price: 29.99, image: bannerImg },
//   { id: 2, name: "Denim Jeans", price: 59.99, image: bannerImg },
//   { id: 3, name: "Leather Jacket", price: 199.99, image: bannerImg },
//   { id: 4, name: "Summer Dress", price: 49.99, image: bannerImg },
//   { id: 5, name: "Running Shoes", price: 89.99, image: bannerImg },
//   { id: 6, name: "Cozy Sweater", price: 69.99, image: bannerImg },
// ]

// const PRODUCTS_PER_PAGE = 3
// const AUTO_SLIDE_INTERVAL = 5000 // 5 seconds

// export function ProductCarousel() {
//   const [currentPage, setCurrentPage] = useState(0)
//   const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE)

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentPage((prevPage) => (prevPage + 1) % totalPages)
//     }, AUTO_SLIDE_INTERVAL)

//     return () => clearInterval(timer)
//   }, [totalPages])

//   const nextPage = () => {
//     setCurrentPage((prevPage) => (prevPage + 1) % totalPages)
//   }

//   const prevPage = () => {
//     setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages)
//   }

//   return (
//     <div className="relative max-w-6xl mx-auto px-4 py-12">
//       <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
//       <div className="relative overflow-hidden">
//         <AnimatePresence initial={false} custom={currentPage}>
//           <motion.div
//             key={currentPage}
//             custom={currentPage}
//             variants={{
//               enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
//               center: { x: 0, opacity: 1 },
//               exit: (direction) => ({ x: direction < 0 ? 1000 : -1000, opacity: 0 }),
//             }}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             transition={{ duration: 0.5 }}
//             className="flex justify-between gap-6 py-4"
//           >
//             {products
//               .slice(currentPage * PRODUCTS_PER_PAGE, (currentPage + 1) * PRODUCTS_PER_PAGE)
//               .map((product) => (
//                 <ProductCard key={product.id} {...product} />
//               ))}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//       <button
//         onClick={prevPage}
//         className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
//         aria-label="Previous page"
//       >
//         <ChevronLeft className="w-6 h-6 text-gray-600" />
//       </button>
//       <button
//         onClick={nextPage}
//         className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
//         aria-label="Next page"
//       >
//         <ChevronRight className="w-6 h-6 text-gray-600" />
//       </button>
//       <div className="flex justify-center mt-6 space-x-2">
//         {Array.from({ length: totalPages }).map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentPage(index)}
//             className={`w-3 h-3 rounded-full ${
//               currentPage === index ? "bg-gray-800" : "bg-gray-300"
//             }`}
//             aria-label={`Go to page ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// // import { useState, useEffect } from "react"
// // import { motion, AnimatePresence } from "framer-motion"
// // import { ChevronLeft, ChevronRight } from 'lucide-react'
// // import { ProductCard } from "./ProductCard"
// // import bannerImg from "../assets/bannerImg.jpg"

// // const products = [
// //   { id: 1, name: "Classic White Tee", price: 29.99, image: bannerImg },
// //   { id: 2, name: "Denim Jeans", price: 59.99, image: bannerImg },
// //   { id: 3, name: "Leather Jacket", price: 199.99, image: bannerImg },
// //   { id: 4, name: "Summer Dress", price: 49.99, image: bannerImg },
// //   { id: 5, name: "Running Shoes", price: 89.99, image: bannerImg },
// //   { id: 6, name: "Cozy Sweater", price: 69.99, image: bannerImg },
// // ]

// // const PRODUCTS_PER_PAGE = 3
// // const AUTO_SLIDE_INTERVAL = 5000 // 5 seconds

// // export function ProductCarousel() {
// //   const [currentPage, setCurrentPage] = useState(0)
// //   const [direction, setDirection] = useState(0)
// //   const [isAutoPlaying, setIsAutoPlaying] = useState(true)
// //   const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE)

// //   useEffect(() => {
// //     if (!isAutoPlaying) return

// //     const timer = setInterval(() => {
// //       setDirection(1)
// //       setCurrentPage((prevPage) => (prevPage + 1) % totalPages)
// //     }, AUTO_SLIDE_INTERVAL)

// //     return () => clearInterval(timer)
// //   }, [totalPages, isAutoPlaying])

// //   const goToPage = (newPage) => {
// //     setDirection(newPage > currentPage ? 1 : -1)
// //     setCurrentPage(newPage)
// //   }

// //   const nextPage = () => {
// //     setIsAutoPlaying(false)
// //     setDirection(1)
// //     setCurrentPage((prevPage) => (prevPage + 1) % totalPages)
// //   }

// //   const prevPage = () => {
// //     setIsAutoPlaying(false)
// //     setDirection(-1)
// //     setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages)
// //   }

// //   // Pause auto-play when hovering over the carousel
// //   const handleMouseEnter = () => setIsAutoPlaying(false)
// //   const handleMouseLeave = () => setIsAutoPlaying(true)

// //   return (
// //     <div
// //       className="relative max-w-6xl mx-auto px-4 py-12"
// //       onMouseEnter={handleMouseEnter}
// //       onMouseLeave={handleMouseLeave}
// //     >
// //       <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
// //       <div className="relative overflow-hidden">
// //         <AnimatePresence mode="wait" custom={direction}>
// //           <motion.div
// //             key={currentPage}
// //             custom={direction}
// //             variants={{
// //               enter: (direction) => ({
// //                 x: direction > 0 ? 1000 : -1000,
// //                 opacity: 0
// //               }),
// //               center: {
// //                 zIndex: 1,
// //                 x: 0,
// //                 opacity: 1
// //               },
// //               exit: (direction) => ({
// //                 zIndex: 0,
// //                 x: direction < 0 ? 1000 : -1000,
// //                 opacity: 0
// //               })
// //             }}
// //             initial="enter"
// //             animate="center"
// //             exit="exit"
// //             transition={{
// //               x: { type: "spring", stiffness: 300, damping: 30 },
// //               opacity: { duration: 0.2 }
// //             }}
// //             className="absolute w-full flex justify-between gap-6 py-4"
// //           >
// //             {products
// //               .slice(currentPage * PRODUCTS_PER_PAGE, (currentPage + 1) * PRODUCTS_PER_PAGE)
// //               .map((product) => (
// //                 <ProductCard key={product.id} {...product} />
// //               ))}
// //           </motion.div>
// //         </AnimatePresence>
// //       </div>
// //       <button
// //         onClick={prevPage}
// //         className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
// //         aria-label="Previous page"
// //       >
// //         <ChevronLeft className="w-6 h-6 text-gray-600" />
// //       </button>
// //       <button
// //         onClick={nextPage}
// //         className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
// //         aria-label="Next page"
// //       >
// //         <ChevronRight className="w-6 h-6 text-gray-600" />
// //       </button>
// //       <div className="flex justify-center mt-6 space-x-2">
// //         {Array.from({ length: totalPages }).map((_, index) => (
// //           <button
// //             key={index}
// //             onClick={() => goToPage(index)}
// //             className={`w-3 h-3 rounded-full transition-colors ${
// //               currentPage === index ? "bg-gray-800" : "bg-gray-300"
// //             }`}
// //             aria-label={`Go to page ${index + 1}`}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   )
// // }

// // import { useState, useEffect } from "react"
// // import { motion, AnimatePresence } from "framer-motion"
// // import { ChevronLeft, ChevronRight } from 'lucide-react'
// // import { ProductCard } from "./ProductCard"
// // import bannerImg from "../assets/bannerImg.jpg"

// // const products = [
// //   { id: 1, name: "Classic White Tee", price: 29.99, image: bannerImg },
// //   { id: 2, name: "Denim Jeans", price: 59.99, image: bannerImg },
// //   { id: 3, name: "Leather Jacket", price: 199.99, image: bannerImg },
// //   { id: 4, name: "Summer Dress", price: 49.99, image: bannerImg },
// //   { id: 5, name: "Running Shoes", price: 89.99, image: bannerImg },
// //   { id: 6, name: "Cozy Sweater", price: 69.99, image: bannerImg },
// // ]

// // const PRODUCTS_PER_PAGE = 3
// // const AUTO_SLIDE_INTERVAL = 5000 // 5 seconds

// // export function ProductCarousel() {
// //   const [currentPage, setCurrentPage] = useState(0)
// //   const [direction, setDirection] = useState(0)
// //   const [isAutoPlaying, setIsAutoPlaying] = useState(true)
// //   const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE)

// //   useEffect(() => {
// //     if (!isAutoPlaying) return

// //     const timer = setInterval(() => {
// //       setDirection(1)
// //       setCurrentPage((prevPage) => (prevPage + 1) % totalPages)
// //     }, AUTO_SLIDE_INTERVAL)

// //     return () => clearInterval(timer)
// //   }, [totalPages, isAutoPlaying])

// //   const goToPage = (newPage) => {
// //     setDirection(newPage > currentPage ? 1 : -1)
// //     setCurrentPage(newPage)
// //   }

// //   const nextPage = () => {
// //     setIsAutoPlaying(false)
// //     setDirection(1)
// //     setCurrentPage((prevPage) => (prevPage + 1) % totalPages)
// //   }

// //   const prevPage = () => {
// //     setIsAutoPlaying(false)
// //     setDirection(-1)
// //     setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages)
// //   }

// //   const handleMouseEnter = () => setIsAutoPlaying(false)
// //   const handleMouseLeave = () => setIsAutoPlaying(true)

// //   return (
// //     <div
// //       className="relative max-w-6xl mx-auto px-4 py-12"
// //       onMouseEnter={handleMouseEnter}
// //       onMouseLeave={handleMouseLeave}
// //     >
// //       <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
// //       {/* Added min-height to ensure container maintains height */}
// //       <div className="relative overflow-hidden min-h-[400px]">
// //         {/* Added wrapper div for maintaining layout structure */}
// //         <div className="absolute inset-0">
// //           <AnimatePresence mode="wait" custom={direction}>
// //             <motion.div
// //               key={currentPage}
// //               custom={direction}
// //               variants={{
// //                 enter: (direction) => ({
// //                   x: direction > 0 ? 1000 : -1000,
// //                   opacity: 0
// //                 }),
// //                 center: {
// //                   zIndex: 1,
// //                   x: 0,
// //                   opacity: 1
// //                 },
// //                 exit: (direction) => ({
// //                   zIndex: 0,
// //                   x: direction < 0 ? 1000 : -1000,
// //                   opacity: 0
// //                 })
// //               }}
// //               initial="enter"
// //               animate="center"
// //               exit="exit"
// //               transition={{
// //                 x: { type: "spring", stiffness: 300, damping: 30 },
// //                 opacity: { duration: 0.2 }
// //               }}
// //               className="flex justify-between gap-6 absolute inset-0"
// //             >
// //               {products
// //                 .slice(currentPage * PRODUCTS_PER_PAGE, (currentPage + 1) * PRODUCTS_PER_PAGE)
// //                 .map((product) => (
// //                   <div key={product.id} className="flex-1">
// //                     <ProductCard {...product} />
// //                   </div>
// //                 ))}
// //             </motion.div>
// //           </AnimatePresence>
// //         </div>
// //       </div>

// //       <button
// //         onClick={prevPage}
// //         className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
// //         aria-label="Previous page"
// //       >
// //         <ChevronLeft className="w-6 h-6 text-gray-600" />
// //       </button>
// //       <button
// //         onClick={nextPage}
// //         className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
// //         aria-label="Next page"
// //       >
// //         <ChevronRight className="w-6 h-6 text-gray-600" />
// //       </button>

// //       <div className="flex justify-center mt-6 space-x-2">
// //         {Array.from({ length: totalPages }).map((_, index) => (
// //           <button
// //             key={index}
// //             onClick={() => goToPage(index)}
// //             className={`w-3 h-3 rounded-full transition-colors ${
// //               currentPage === index ? "bg-gray-800" : "bg-gray-300"
// //             }`}
// //             aria-label={`Go to page ${index + 1}`}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   )
// // }

// // perplexity

// // import { useState, useEffect } from "react"
// // import { motion, AnimatePresence } from "framer-motion"
// // import { ChevronLeft, ChevronRight } from 'lucide-react'
// // import { ProductCard } from "./ProductCard"
// // import bannerImg from "../assets/bannerImg.jpg"

// // const products = [
// //   { id: 1, name: "Classic White Tee", price: 29.99, image: bannerImg },
// //   { id: 2, name: "Denim Jeans", price: 59.99, image: bannerImg },
// //   { id: 3, name: "Leather Jacket", price: 199.99, image: bannerImg },
// //   { id: 4, name: "Summer Dress", price: 49.99, image: bannerImg },
// //   { id: 5, name: "Running Shoes", price: 89.99, image: bannerImg },
// //   { id: 6, name: "Cozy Sweater", price: 69.99, image: bannerImg },
// // ]

// // const PRODUCTS_PER_PAGE = 3
// // const AUTO_SLIDE_INTERVAL = 5000 // 5 seconds

// // export function ProductCarousel() {
// //   const [currentPage, setCurrentPage] = useState(0)
// //   const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE)

// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setCurrentPage((prevPage) => (prevPage + 1) % totalPages)
// //     }, AUTO_SLIDE_INTERVAL)

// //     return () => clearInterval(timer)
// //   }, [totalPages])

// //   const nextPage = () => {
// //     setCurrentPage((prevPage) => (prevPage + 1) % totalPages)
// //   }

// //   const prevPage = () => {
// //     setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages)
// //   }

// //   return (
// //     <div className="relative max-w-6xl mx-auto px-4 py-12">
// //       <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
// //       <div className="relative overflow-hidden">
// //         <AnimatePresence initial={false}>
// //           <motion.div
// //             key={currentPage}
// //             variants={{
// //               enter: { x: '100%', opacity: 0 },
// //               center: { x: '0%', opacity: 1 },
// //               exit: { x: '-100%', opacity: 0 },
// //             }}
// //             initial="enter"
// //             animate="center"
// //             exit="exit"
// //             transition={{ duration: 0.5 }}
// //             className="flex justify-between gap-6 py-4"
// //           >
// //             {products
// //               .slice(currentPage * PRODUCTS_PER_PAGE, (currentPage + 1) * PRODUCTS_PER_PAGE)
// //               .map((product) => (
// //                 <ProductCard key={product.id} {...product} />
// //               ))}
// //           </motion.div>
// //         </AnimatePresence>
// //       </div>
// //       <button
// //         onClick={prevPage}
// //         className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
// //         aria-label="Previous page"
// //       >
// //         <ChevronLeft className="w-6 h-6 text-gray-600" />
// //       </button>
// //       <button
// //         onClick={nextPage}
// //         className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
// //         aria-label="Next page"
// //       >
// //         <ChevronRight className="w-6 h-6 text-gray-600" />
// //       </button>
// //       <div className="flex justify-center mt-6 space-x-2">
// //         {Array.from({ length: totalPages }).map((_, index) => (
// //           <button
// //             key={index}
// //             onClick={() => setCurrentPage(index)}
// //             className={`w-3 h-3 rounded-full ${currentPage === index ? "bg-gray-800" : "bg-gray-300"}`}
// //             aria-label={`Go to page ${index + 1}`}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   )
// // }

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import bannerImg from "../assets/bannerImg.jpg"

// const products = [
//     { id: 1, name: "Product 1", price: "$19.99", image: bannerImg },
//     { id: 2, name: "Product 2", price: "$29.99", image: bannerImg },
//     { id: 3, name: "Product 3", price: "$39.99", image: bannerImg },
//     { id: 4, name: "Product 4", price: "$49.99", image: bannerImg },
//     { id: 5, name: "Product 5", price: "$59.99", image: bannerImg },
// ];

// const ProductCarousel = () => {
//     const [currentIndex, setCurrentIndex] = useState(0);

//     const nextSlide = () => {
//         setCurrentIndex((prevIndex) => (prevIndex === products.length - 3 ? 0 : prevIndex + 1));
//     };

//     const prevSlide = () => {
//         setCurrentIndex((prevIndex) => (prevIndex === 0 ? products.length - 3 : prevIndex - 1));
//     };

//     return (
//         <>
//             <h2 className="text-3xl font-bold text-center my-8">Top Products</h2>
//             <div className="relative  min-h-[400px]">
//                 <div className="relative w-full max-w-5xl mx-auto">
//                     <div className="overflow-hidden">
//                         <motion.div
//                             className="flex"
//                             animate={{ x: `-${currentIndex * 33.33}%` }}
//                             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                         >
//                             {products.map((product, index) => (
//                                 <div key={product.id} className="w-1/3 flex-shrink-0 px-2">
//                                     <Card className="w-full">
//                                         <CardContent className="p-6 relative">
//                                             <img
//                                                 src={product.image}
//                                                 alt={product.name}
//                                                 className="w-full h-48 object-cover mb-4 rounded-md"
//                                             />
//                                             <Button
//                                                 variant="outline"
//                                                 size="icon"
//                                                 className="absolute top-8 right-8 bg-white/80 backdrop-blur-sm"
//                                             >
//                                                 <Heart className="h-4 w-4" />
//                                             </Button>
//                                             <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
//                                             <p className="text-lg font-medium text-gray-600">{product.price}</p>
//                                         </CardContent>
//                                     </Card>
//                                 </div>
//                             ))}
//                         </motion.div>
//                     </div>

//                     <Button
//                         variant="outline"
//                         size="icon"
//                         className="absolute rounded-full top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2"
//                         onClick={prevSlide}
//                     >
//                         <ChevronLeft className="h-4 w-4" />
//                     </Button>
//                     <Button
//                         variant="outline"
//                         size="icon"
//                         className="absolute rounded-full top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2"
//                         onClick={nextSlide}
//                     >
//                         <ChevronRight className="h-4 w-4" />
//                     </Button>

//                     <div className="flex justify-center mt-4 space-x-2">
//                         {Array.from({ length: products.length - 2 }, (_, index) => (
//                             <div
//                                 key={index}
//                                 className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-primary" : "bg-gray-300"}`}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ProductCarousel;



import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Star, ShoppingCart } from "lucide-react";

const products = [
    { id: 1, name: "Premium Leather Jacket", price: "$299.99", originalPrice: "$399.99", rating: 4.8, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop" },
    { id: 2, name: "Elegant Summer Dress", price: "$89.99", originalPrice: "$119.99", rating: 4.9, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop" },
    { id: 3, name: "Classic Denim Jeans", price: "$59.99", originalPrice: "$79.99", rating: 4.7, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop" },
    { id: 4, name: "Cozy Knit Sweater", price: "$79.99", originalPrice: "$99.99", rating: 4.6, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop" },
    { id: 5, name: "Designer Sneakers", price: "$149.99", originalPrice: "$199.99", rating: 4.8, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop" },
];

const ProductCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [likedProducts, setLikedProducts] = useState(new Set());

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === products.length - 3 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? products.length - 3 : prevIndex - 1));
    };

    const toggleLike = (productId) => {
        setLikedProducts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(productId)) {
                newSet.delete(productId);
            } else {
                newSet.add(productId);
            }
            return newSet;
        });
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
        ));
    };

    return (
        <div className="py-16 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
            {/* Animated Section Header */}
            <motion.div
                className="text-center mb-12 relative"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Floating sparkles around title */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                            style={{
                                left: `${20 + i * 15}%`,
                                top: `${20 + (i % 2) * 60}%`,
                            }}
                            animate={{
                                y: [-5, -15, -5],
                                opacity: [0.4, 1, 0.4],
                                scale: [0.8, 1.2, 0.8]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>

                <motion.h2 
                    className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-700 via-purple-600 to-blue-600 bg-clip-text text-transparent relative inline-block"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    ✨ Top Products ✨
                    <motion.div
                        className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />
                </motion.h2>
                
                <motion.p
                    className="text-slate-600 mt-4 text-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    Discover our handpicked collection of premium fashion
                </motion.p>
            </motion.div>

            {/* Main Carousel Container */}
            <div className="relative min-h-[500px] px-4">
                <div className="relative w-full max-w-6xl mx-auto">
                    {/* Product Cards Container */}
                    <div className="overflow-hidden rounded-2xl">
                        <motion.div
                            className="flex gap-6 px-4"
                            animate={{ x: `-${currentIndex * 33.33}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {products.map((product, index) => (
                                <motion.div 
                                    key={product.id} 
                                    className="w-1/3 flex-shrink-0"
                                    onHoverStart={() => setHoveredProduct(product.id)}
                                    onHoverEnd={() => setHoveredProduct(null)}
                                    whileHover={{ y: -10 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                >
                                    {/* Product Card */}
                                    <motion.div 
                                        className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-white/20 backdrop-blur-sm"
                                        whileHover={{ 
                                            boxShadow: "0 25px 50px rgba(147, 51, 234, 0.15), 0 0 0 1px rgba(147, 51, 234, 0.1)" 
                                        }}
                                    >
                                        {/* Image Container */}
                                        <div className="relative overflow-hidden">
                                            <motion.img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-56 object-cover"
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.6 }}
                                            />
                                            
                                            {/* Gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                            
                                            {/* Discount badge */}
                                            <motion.div
                                                className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                                                initial={{ scale: 0, rotate: -10 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                25% OFF
                                            </motion.div>

                                            {/* Heart button */}
                                            <motion.button
                                                className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md border border-white/20 ${
                                                    likedProducts.has(product.id) 
                                                        ? 'bg-red-500 text-white' 
                                                        : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
                                                }`}
                                                onClick={() => toggleLike(product.id)}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Heart className={`h-4 w-4 ${likedProducts.has(product.id) ? 'fill-current' : ''}`} />
                                            </motion.button>

                                            {/* Quick shop overlay */}
                                            <motion.div
                                                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0"
                                                animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <motion.button
                                                    className="bg-white text-gray-800 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:bg-gray-50"
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ 
                                                        scale: hoveredProduct === product.id ? 1 : 0.8,
                                                        opacity: hoveredProduct === product.id ? 1 : 0
                                                    }}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <ShoppingCart className="w-4 h-4" />
                                                    Quick Add
                                                </motion.button>
                                            </motion.div>
                                        </div>

                                        {/* Card Content */}
                                        <div className="p-6">
                                            {/* Rating */}
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="flex items-center gap-1">
                                                    {renderStars(product.rating)}
                                                </div>
                                                <span className="text-sm text-gray-600 font-medium">
                                                    {product.rating}
                                                </span>
                                            </div>

                                            {/* Product name */}
                                            <motion.h3 
                                                className="text-xl font-bold text-gray-800 mb-3 line-clamp-2"
                                                whileHover={{ color: "#7c3aed" }}
                                            >
                                                {product.name}
                                            </motion.h3>

                                            {/* Price section */}
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                                    {product.price}
                                                </span>
                                                <span className="text-lg text-gray-400 line-through">
                                                    {product.originalPrice}
                                                </span>
                                            </div>

                                            {/* Add to cart button */}
                                            <motion.button
                                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <ShoppingCart className="w-4 h-4" />
                                                Add to Cart
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Navigation Buttons */}
                    <motion.button
                        className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-white/20 hover:bg-white hover:shadow-xl transition-all duration-300"
                        onClick={prevSlide}
                        whileHover={{ scale: 1.1, x: -5 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ChevronLeft className="h-6 w-6 text-gray-700" />
                    </motion.button>

                    <motion.button
                        className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-white/20 hover:bg-white hover:shadow-xl transition-all duration-300"
                        onClick={nextSlide}
                        whileHover={{ scale: 1.1, x: 5 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ChevronRight className="h-6 w-6 text-gray-700" />
                    </motion.button>

                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-8 gap-3">
                        {Array.from({ length: products.length - 2 }, (_, index) => (
                            <motion.button
                                key={index}
                                className={`h-3 rounded-full transition-all duration-300 ${
                                    index === currentIndex 
                                        ? "w-8 bg-gradient-to-r from-purple-600 to-blue-600" 
                                        : "w-3 bg-gray-300 hover:bg-gray-400"
                                }`}
                                onClick={() => setCurrentIndex(index)}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCarousel;