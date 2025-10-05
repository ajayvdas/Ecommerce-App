import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { refreshTokens, logout } from "./authSlice";

import { BASE_URL } from "../utils/constants"

// Custom base query with automatic token refresh
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await fetchBaseQuery({ 
        baseUrl: BASE_URL,
        credentials: 'include'
    })(args, api, extraOptions);

    // If the result is 401, try to refresh the token
    if (result.error && result.error.status === 401) {
        console.log('RTK Query: Received 401, attempting to refresh token...');
        
        try {
            // Attempt to refresh the token using the api parameter
            const refreshResult = await api.dispatch(refreshTokens()).unwrap();
            console.log('RTK Query: Token refresh successful:', refreshResult);
            
            // Retry the original query
            result = await fetchBaseQuery({ 
                baseUrl: BASE_URL,
                credentials: 'include'
            })(args, api, extraOptions);
            
            console.log('RTK Query: Retry request status:', result.error?.status || 'success');
        } catch (refreshError) {
            console.error('RTK Query: Token refresh failed:', refreshError);
            // Refresh failed, logout the user
            api.dispatch(logout());
            result.error = { status: 401, data: 'Session expired. Please login again.' };
        }
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Product", "Order", "User", "Wishlist", "Products"],
    // eslint-disable-next-line no-unused-vars
    endpoints: (builder) => ({})
})