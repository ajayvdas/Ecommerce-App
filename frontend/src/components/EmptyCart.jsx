import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { useNavigate } from 'react-router-dom'
import EmptyCartImg from '../assets/empty_cart.svg'
import { ArrowLeft, ShoppingBag } from 'lucide-react'

const EmptyCart = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full"
        >
          <Card className="w-full shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center pb-2 pt-6 px-6 sm:px-8 lg:px-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
                className="mx-auto mb-3 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center"
              >
                <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </motion.div>
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Your cart is empty
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-600 mt-2 max-w-sm mx-auto leading-relaxed">
                Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex justify-center px-6 sm:px-8 lg:px-12 py-2">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-[200px] sm:max-w-[240px] lg:max-w-[280px]"
              >
                <img
                  src={EmptyCartImg}
                  alt="Empty cart illustration"
                  className="w-full h-auto drop-shadow-lg"
                />
              </motion.div>
            </CardContent>
            
            <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center px-6 sm:px-8 lg:px-12 pb-6 pt-2">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="w-full sm:w-auto"
              >
                <Button 
                  onClick={() => navigate(-1)}
                  variant="outline"
                  size="default"
                  className="w-full sm:w-auto min-w-[140px] h-10 text-sm font-medium border-2 hover:bg-gray-50 transition-all duration-200"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> 
                  Go Back
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="w-full sm:w-auto"
              >
                <Button 
                  onClick={() => navigate('/products')}
                  size="default"
                  className="w-full sm:w-auto min-w-[140px] h-10 text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Start Shopping
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
        
        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        </motion.div>
      </div>
    </div>
  )
}

export default EmptyCart