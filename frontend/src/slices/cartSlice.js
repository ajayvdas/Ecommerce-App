/* eslint-disable no-unused-vars */
import { updateCart } from "@/utils/cartUtils";
import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // addToCart: (state, action) => {
        //     const item = action.payload

        //     const existItem = state.cartItems.find((x) => x._id === item._id)

        //     if (existItem) {
        //         state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x)
        //     } else {
        //         state.cartItems = [...state.cartItems, item]
        //     }

        //    return updateCart(state)
        // },

        addToCart: (state, action) => {
            const newItem = action.payload;
        
            const existingItem = state.cartItems.find((item) => item._id === newItem._id);
        
            if (existingItem) {
                // Update quantity of existing item
                state.cartItems = state.cartItems.map((item) => 
                    item._id === existingItem._id 
                        ? { ...item, quantity: newItem.quantity } // Increment quantity
                        : item
                );
            } else {
                // Add new item to cart
                state.cartItems.push(newItem);
            }
        
            return updateCart(state);
        },

        removeFromCart: (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter((item) => item._id !== id);
            
            return updateCart(state)
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;

            return updateCart(state)
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state)
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];
            return updateCart(state)
        }
    },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;
