import { WISHLIST_URL } from "@/utils/constants";
import { apiSlice } from "./apiSlice";

export const wishlistApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addToWishlist: builder.mutation({
            query: (productId) => ({
                url: `${WISHLIST_URL}/${productId}`,
                method: "POST",
            }),
            invalidatesTags: ['Wishlist'],
        }),
        removeFromWishlist: builder.mutation({
            query: (productId) => ({
                url: `${WISHLIST_URL}/${productId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Wishlist'],
        }),
        getWishlist: builder.query({
            query: () => ({
                url: WISHLIST_URL,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Wishlist'],
        }),
        clearWishlist: builder.mutation({
            query: () => ({
                url: WISHLIST_URL,
                method: "DELETE",
            }),
            invalidatesTags: ['Wishlist'],
        }),
        checkProductInWishlist: builder.query({
            query: (productId) => ({
                url: `${WISHLIST_URL}/check/${productId}`,
            }),
            providesTags: ['Wishlist'],
        }),
    }),
});

export const {
    useAddToWishlistMutation,
    useRemoveFromWishlistMutation,
    useGetWishlistQuery,
    useClearWishlistMutation,
    useCheckProductInWishlistQuery,
} = wishlistApiSlice;