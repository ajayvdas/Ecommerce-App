// import { useState } from "react";
// import { motion } from "framer-motion";
// import { ShoppingBag, Sparkles } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function StylizedHeading() {
//     const [isHovered, setIsHovered] = useState(false);

//     return (
//         <Link to="/">
//             <motion.div
//                 className="relative inline-block"
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, ease: "easeOut" }}
//             >
//                 {/* Main heading container */}
//                 <motion.div
//                     className="relative cursor-pointer"
//                     whileHover={{ scale: 1.05 }}
//                     transition={{ type: "spring", stiffness: 300, damping: 15 }}
//                 >
//                     {/* Glow effect background */}
//                     <motion.div
//                         className="absolute inset-0 rounded-2xl blur-xl"
//                         animate={
//                             isHovered
//                                 ? {
//                                       background: [
//                                           "linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))",
//                                           "linear-gradient(45deg, rgba(147, 51, 234, 0.4), rgba(236, 72, 153, 0.4))",
//                                           "linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))",
//                                       ],
//                                   }
//                                 : { background: "transparent" }
//                         }
//                         transition={{ duration: 2, repeat: Infinity }}
//                     />

//                     <div className="relative z-10 flex items-center gap-2">
//                         {/* Shopping bag icon with animation */}
//                         <motion.div
//                             animate={
//                                 isHovered
//                                     ? {
//                                           rotate: [0, -10, 10, 0],
//                                           scale: [1, 1.1, 1],
//                                       }
//                                     : { rotate: 0, scale: 1 }
//                             }
//                             transition={{ duration: 0.8, ease: "easeInOut" }}
//                             className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text"
//                         >
//                             <ShoppingBag className="w-6 h-6 text-blue-600" />
//                         </motion.div>

//                         {/* Thread text with enhanced styling */}
//                         <motion.span
//                             className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-300 via-blue-300 to-slate-300 bg-clip-text text-transparent italic relative"
//                             animate={
//                                 isHovered
//                                     ? {
//                                           backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
//                                       }
//                                     : {}
//                             }
//                             transition={{ duration: 2, repeat: Infinity }}
//                             style={{
//                                 backgroundSize: "200% 200%",
//                                 textShadow: isHovered ? "0 0 20px rgba(59, 130, 246, 0.5)" : "none",
//                             }}
//                         >
//                             Thread
//                             {/* Animated underline for Thread */}
//                             <motion.div
//                                 className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
//                                 initial={{ width: 0 }}
//                                 animate={isHovered ? { width: "100%" } : { width: 0 }}
//                                 transition={{ duration: 0.6, ease: "easeInOut" }}
//                             />
//                         </motion.span>

//                         {/* Theory text with enhanced styling */}
//                         <motion.span
//                             className="text-2xl lg:text-3xl  font-bold bg-gradient-to-r from-gray-800 via-purple-700 to-blue-800 bg-clip-text text-transparent italic relative"
//                             animate={
//                                 isHovered
//                                     ? {
//                                           backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
//                                       }
//                                     : {}
//                             }
//                             transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
//                             style={{
//                                 backgroundSize: "200% 200%",
//                                 textShadow: isHovered ? "0 0 20px rgba(147, 51, 234, 0.5)" : "none",
//                             }}
//                         >
//                             Theory!
//                             {/* Animated underline for Theory */}
//                             <motion.div
//                                 className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"
//                                 initial={{ width: 0 }}
//                                 animate={isHovered ? { width: "100%" } : { width: 0 }}
//                                 transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
//                             />
//                         </motion.span>

//                         {/* Sparkle icon with complex animation */}
//                         <motion.div
//                             className="relative"
//                             animate={
//                                 isHovered
//                                     ? {
//                                           rotate: [0, 180, 360],
//                                           scale: [1, 1.3, 1],
//                                       }
//                                     : { rotate: 0, scale: 1 }
//                             }
//                             transition={{
//                                 duration: 2,
//                                 repeat: isHovered ? Infinity : 0,
//                                 ease: "easeInOut",
//                             }}
//                         >
//                             <Sparkles className="w-6 h-6 text-yellow-400" />
//                         </motion.div>
//                     </div>

//                     {/* Pulsing border effect */}
//                     <motion.div
//                         className="absolute inset-0 rounded-2xl border-2 border-transparent"
//                         animate={
//                             isHovered
//                                 ? {
//                                       borderColor: [
//                                           "rgba(59, 130, 246, 0.3)",
//                                           "rgba(147, 51, 234, 0.5)",
//                                           "rgba(236, 72, 153, 0.3)",
//                                           "rgba(59, 130, 246, 0.3)",
//                                       ],
//                                   }
//                                 : { borderColor: "transparent" }
//                         }
//                         transition={{ duration: 2, repeat: Infinity }}
//                     />
//                 </motion.div>
//             </motion.div>
//         </Link>
//     );
// }


import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
// Mock Link component for demo
// const Link = ({ to, children }) => (
//   <div onClick={() => console.log(`Navigate to: ${to}`)} style={{ cursor: 'pointer' }}>
//     {children}
//   </div>
// );

export default function StylizedHeading() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link to="/">
            <motion.div
                className="relative inline-block"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.div
                    className="relative cursor-pointer flex items-center gap-2 px-4 py-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                    {/* Shopping bag icon */}
                    <motion.div
                        animate={
                            isHovered
                                ? {
                                      rotate: [0, -10, 10, 0],
                                      scale: [1, 1.1, 1],
                                  }
                                : { rotate: 0, scale: 1 }
                        }
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <ShoppingBag className="w-6 h-6 text-gray-800" />
                    </motion.div>

                    {/* Thread text */}
                    <span className="font-title text-2xl lg:text-3xl font-bold text-gray-800 italic">
                        Thread
                    </span>

                    {/* Theory text */}
                    <span className="font-title text-2xl lg:text-3xl font-bold text-gray-800 italic">
                        Theory!
                    </span>

                    {/* Sparkle icon */}
                    <motion.div
                        animate={
                            isHovered
                                ? {
                                      rotate: [0, 180, 360],
                                      scale: [1, 1.2, 1],
                                  }
                                : { rotate: 0, scale: 1 }
                        }
                        transition={{
                            duration: 1.5,
                            repeat: isHovered ? Infinity : 0,
                            ease: "easeInOut",
                        }}
                    >
                        <Sparkles className="w-6 h-6 text-yellow-500" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </Link>
    );
}