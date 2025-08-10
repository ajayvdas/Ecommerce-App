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

// export default function ProductCarouselImg() {
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
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Mock product data with placeholder images
const products = [
    { id: 1, name: "Classic White Tee", price: 29.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop" },
    { id: 2, name: "Denim Jeans", price: 59.99, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop" },
    { id: 3, name: "Leather Jacket", price: 199.99, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop" },
    { id: 4, name: "Summer Dress", price: 49.99, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop" },
    { id: 5, name: "Running Shoes", price: 89.99, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop" },
    { id: 6, name: "Cozy Sweater", price: 69.99, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop" },
];

export default function ProductCarouselImg() {
    return (
        <div className="relative w-full bg-gradient-to-br from-slate-50 to-slate-100 mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">Featured Products</h2>
                
                <div className="relative">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {products.map((product) => (
                                <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                    <div className="h-full">
                                        <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                                            <CardContent className="p-0 h-full flex flex-col">
                                                <div className="relative aspect-square overflow-hidden bg-slate-100">
                                                    <img 
                                                        src={product.image} 
                                                        alt={product.name}
                                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                        onError={(e) => {
                                                            e.target.src = `https://via.placeholder.com/400x400/e2e8f0/64748b?text=${encodeURIComponent(product.name)}`;
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300"></div>
                                                </div>
                                                
                                                <div className="p-4 flex-1 flex flex-col justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-slate-800 text-lg mb-2 line-clamp-2">
                                                            {product.name}
                                                        </h3>
                                                    </div>
                                                    
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-2xl font-bold text-slate-900">
                                                            ${product.price}
                                                        </span>
                                                        <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                                                            Add to Cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        
                        <CarouselPrevious className="left-2 bg-white/90 hover:bg-white shadow-lg border-0" />
                        <CarouselNext className="right-2 bg-white/90 hover:bg-white shadow-lg border-0" />
                    </Carousel>
                </div>
            </div>
        </div>
    );
}