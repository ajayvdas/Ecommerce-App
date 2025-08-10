import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./slices/apiSlice";
import cartSliceReducer from "./slices/cartSlice"
import authSliceReducer from "./slices/authSlice"
import filterSliceReducer from './slices/filterSlice'
import sortSliceReducer from "./slices/sortSlice"

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
        auth: authSliceReducer,
        filters: filterSliceReducer,
        sort: sortSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store;