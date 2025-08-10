/* eslint-disable react/prop-types */
import { motion } from "framer-motion"

function ProductImage({ image, name }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src={image || ''} 
          alt={name} 
          width={400} 
          height={400} 
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </motion.div>
    )
  }

  export default ProductImage