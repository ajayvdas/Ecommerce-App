import { motion } from "framer-motion";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function CartItem({ item, onAddToCart, onRemoveCart, index }) {

    return (
        <motion.div
            className="flex items-center justify-between border-b border-gray-200 py-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="flex items-center">
                <img src={item.image} alt={item.name} width={100} height={100} className="rounded-md mr-4" />
                <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">${Number(item.price).toFixed(2)}</p>
                </div>
            </div>
            <div className="flex items-center">
                <Select
                    value={item.quantity.toString()}
                    onValueChange={(value) => onAddToCart({ ...item }, parseInt(value))}
                >
                    <SelectTrigger className="w-[80px] mr-4">
                        <SelectValue placeholder={item.quantity} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {[...Array(item.countInStock).keys()].map((num) => (
                                <SelectItem key={num + 1} value={(num + 1).toString()}>
                                    {num + 1}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" onClick={() => onRemoveCart(item._id)}>
                    <Trash2 className="h-5 w-5 text-red-500" />
                </Button>
            </div>
        </motion.div>
    );
}

export default CartItem;
