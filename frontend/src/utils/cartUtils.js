// helper function
export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
    // Calculate items price
    state.itemsPrice = Number(addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)));

    // Calculate total items
    state.totalItems = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);

    // Calculate shipping price (If order is over $100 then free, else $10 shipping)
    state.shippingPrice = Number(addDecimals(state.itemsPrice > 100 ? 0 : 100));

    // Calculate tax price (15%tax)
    state.taxPrice = Number(addDecimals(Number(0.15 * state.itemsPrice).toFixed(2)));

    // Calculate total price
    state.totalPrice = Number((Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2));

    localStorage.setItem("cart", JSON.stringify(state));

    return state;
};
