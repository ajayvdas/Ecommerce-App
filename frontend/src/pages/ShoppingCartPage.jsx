import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import { addToCart, removeFromCart } from "@/slices/cartSlice";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
// import Image from "next/image"
// import bannerImg from '../assets/bannerImg.jpg'

// // Mock cart data (replace with actual data fetching in a real application)
// const initialCartItems = [
//   {
//     id: 1,
//     name: "Classic Denim Jacket",
//     price: 89.99,
//     image: bannerImg,
//     quantity: 1,
//   },
//   {
//     id: 2,
//     name: "Vintage Leather Boots",
//     price: 129.99,
//     image: bannerImg,
//     quantity: 2,
//   },
// ]

export default function ShoppingCartPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems, totalPrice, totalItems } = cart;
    console.table("cart items is: ", cartItems);

    const addToCartHandler = async (product, quantity) => {
        dispatch(addToCart({ ...product, quantity }));
    };

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate("/login?redirect=/shipping");
    };

    const EmptyCart = () => (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-32 h-32 mb-6 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="w-16 h-16 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-balance">Your cart is empty</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-md text-pretty">
                Start adding items you would purchase to your cart. You can save items while browsing and come back to them later.
            </p>
            <Button 
                onClick={() => navigate("/")}
                className="bg-primary hover:bg-primary/90">Start Shopping</Button>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-24 lg:px-8 lg:py-16 max-w-screen-md">
            {cartItems.length === 0 ? (
                <EmptyCart />
            ) : (
                <>
                    <motion.h1
                        className="text-3xl font-bold mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Shopping Cart
                    </motion.h1>
                    {cartItems.map((item, index) => (
                        <CartItem
                            key={item._id}
                            item={item}
                            onAddToCart={addToCartHandler}
                            onRemoveCart={removeFromCartHandler}
                            index={index}
                        />
                    ))}
                    <CartSummary onCheckout={checkoutHandler} totalItems={totalItems} totalPrice={totalPrice} />
                </>
            )}
        </div>
    );
}
