/* eslint-disable react/prop-types */


import { motion } from 'framer-motion'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

const ErrorComponent = ({ title, description, reset }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[350px] shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <AlertCircle className="h-6 w-6 text-red-500" />
              </motion.div>
              <CardTitle className="text-xl font-bold text-red-500">{title || "Oops! Something went wrong"}</CardTitle>
            </div>
            <CardDescription className="mt-2 text-gray-600">
              {description || "We're sorry, but we encountered an unexpected error. Please try again or contact support if the problem persists."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
            >
              <img
                src="/placeholder.svg?height=100&width=320"
                alt="Error illustration"
                className="w-full h-auto rounded-md"
              />
            </motion.div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              <Home className="mr-2 h-4 w-4" /> Home
            </Button>
            {reset && (
              <Button onClick={reset}>
                <RefreshCw className="mr-2 h-4 w-4" /> Try Again
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

export default ErrorComponent