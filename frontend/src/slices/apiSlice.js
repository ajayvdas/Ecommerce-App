import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./authSlice";

import { BASE_URL } from "../utils/constants"

// Custom base query with automatic token refresh handling
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await fetchBaseQuery({ 
        baseUrl: BASE_URL,
        credentials: 'include'
    })(args, api, extraOptions);

    // If the result is 401, the backend has already attempted token refresh
    // If it's still 401, it means refresh failed and user needs to login again
    if (result.error && result.error.status === 401) {
        console.log('RTK Query: Received 401, session expired. Logging out user.');
        api.dispatch(logout());
        result.error = { status: 401, data: 'Session expired. Please login again.' };
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Product", "Order", "User", "Wishlist", "Products"],
    // eslint-disable-next-line no-unused-vars
    endpoints: (builder) => ({})
})