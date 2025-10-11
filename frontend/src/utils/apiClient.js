import { store } from "../store";
import { logout, refreshTokens } from "../slices/authSlice";

// Create a custom fetch wrapper that handles token refresh
const apiClient = async (url, options = {}) => {
    const defaultOptions = {
        credentials: "include", // Important for cookies
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    };

    const requestOptions = { ...defaultOptions, ...options };

    try {
        const response = await fetch(url, requestOptions);


        // If the response is 401 (Unauthorized), try to refresh the token
        if (response.status === 401) {
            console.log("Received 401, attempting to refresh token...");
            try {
                // Attempt to refresh the token
                const refreshResult = await store.dispatch(refreshTokens()).unwrap();
                
                console.log("Token refresh successful:", refreshResult);
                if (!refreshResult) {
                    store.dispatch(logout());
                    throw new Error("Session expired. Please login again.");
                }
                
                // Retry the original request
                const retryResponse = await fetch(url, requestOptions);
                console.log("Retry request status:", retryResponse.status);
                return retryResponse;
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                // Refresh failed, logout the user
                store.dispatch(logout());
                throw new Error("Session expired. Please login again.");
            }
        }

        // Handle 403 Forbidden - User is not authorized
        if (response.status === 403) {
            store.dispatch(logout()); // Clear user info
            throw new Error("You are not authorized to access this resource.");
        }

        return response;
    } catch (error) {
        console.error("API Client error:", error);
        // If the error is a network error or server is unreachable
        if (!error.response) {
            store.dispatch(logout()); // Clear user info for security
        }
        throw error;
    }
};

// Helper function to make API requests with automatic retry
export const makeApiRequest = async (url, options = {}) => {
    const response = await apiClient(url, options);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export default apiClient;
