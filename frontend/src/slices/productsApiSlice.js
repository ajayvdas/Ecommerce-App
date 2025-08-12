import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL, UPLOAD_URL } from "../utils/constants";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params = {}) => {
                const searchParams = new URLSearchParams();

                // Add filters
                if (params.brand) searchParams.append("brand", params.brand);
                if (params.category) searchParams.append("category", params.category);

                // Add sorting
                if (params.sort) searchParams.append("sort", params.sort);

                // Add pagination
                if (params.page) searchParams.append("page", params.page);
                if (params.limit) searchParams.append("limit", params.limit);

                return `${PRODUCTS_URL}?${searchParams.toString()}`;
            },
            keepUnusedDataFor: 5,
            providesTags: ["Products"],
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: PRODUCTS_URL,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Product"],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data._id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Products"],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: UPLOAD_URL,
                method: "POST",
                body: data,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: "DELETE",
            }),
            providesTags: ["Product"],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
} = productsApiSlice;
