import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addToCart } from "@/slices/cartSlice";

function AddToCartSection({ product }) {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, quantity }));
        // console.table("product: ", product);
        navigate("/cart");
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-100 p-6 rounded-lg mt-8"
        >
            <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                <span className={`${product.countInStock > 0 ? "text-green-500" : "text-red-500"} font-semibold`}>
                    {`${product.countInStock > 0 ? "In stock" : "Out of stock"}`}
                </span>
            </div>
            <div className="flex items-center mb-4">
                <label htmlFor="quantity" className="mr-2">
                    Quantity:
                </label>
                {/* <Input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
            className="w-20"
            min="1"
          /> */}
                <Select
                    value={quantity.toString()}
                    onValueChange={(strValue) => {
                        const numValue = parseInt(strValue);
                        setQuantity(Math.max(1, numValue));
                    }}
                >
                    <SelectTrigger className="w-20">
                        <SelectValue placeholder={1} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {[...Array(product.countInStock).keys()].map((x) => (
                                <SelectItem key={x + 1} value={(x + 1).toString()}>
                                    {x + 1}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Button type="button" disabled={product.countInStock === 0} className="w-full" onClick={addToCartHandler}>
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
        </motion.div>
    );
}

export default AddToCartSection;
