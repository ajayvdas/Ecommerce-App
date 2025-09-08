import { ArrowRight, ShoppingBag } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function ViewAllProductsButton({ userInfo }) {
    const navigate = useNavigate();

    function handleGetAllProducts() {
        if (userInfo) {
            navigate("/products");
        } else {
            navigate("/login");
        }
    }

    return (
        <Button
            onClick={handleGetAllProducts}
            className="group bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
            <ShoppingBag className="w-5 h-5" />
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
    );
}

