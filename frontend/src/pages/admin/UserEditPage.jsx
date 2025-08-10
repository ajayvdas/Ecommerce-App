import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import EditUserForm from "@/components/EditUserForm";

export default function UserEditPage() {
    return (
        <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-16 max-w-screen-md">
            <Link to="/">
                <Button variant="outline" className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Go back
                </Button>
            </Link>

            <motion.h1
                className="text-3xl font-bold mb-8 mt-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Edit User
            </motion.h1>

            <EditUserForm />
        </div>
    );
}
