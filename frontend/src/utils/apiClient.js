import { store } from '../store';
import { refreshTokens, logout, setCredentials } from '../slices/authSlice';

// Create a custom fetch wrapper that handles token refresh
const apiClient = async (url, options = {}) => {
    const defaultOptions = {
        credentials: 'include', // Important for cookies
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    const requestOptions = { ...defaultOptions, ...options };

    try {
        const response = await fetch(url, requestOptions);

        // Check if backend automatically refreshed the token
        const tokenRefreshed = response.headers.get('X-Token-Refreshed');
        if (tokenRefreshed === 'true' && response.ok) {
            console.log('Token was automatically refreshed by backend');
            // Optionally update Redux state if needed
            const state = store.getState();
            if (state.auth.userInfo) {
                // Token was refreshed, user is still valid
                store.dispatch(setCredentials(state.auth.userInfo));
            }
        }

        // If the response is 401 (Unauthorized), try to refresh the token
        if (response.status === 401) {
            console.log('Received 401, attempting to refresh token...');
            try {
                // Attempt to refresh the token
                const refreshResult = await store.dispatch(refreshTokens()).unwrap();
                console.log('Token refresh successful:', refreshResult);
                
                // Retry the original request
                const retryResponse = await fetch(url, requestOptions);
                console.log('Retry request status:', retryResponse.status);
                return retryResponse;
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                // Refresh failed, logout the user
                store.dispatch(logout());
                throw new Error('Session expired. Please login again.');
            }
        }

        return response;
    } catch (error) {
        console.error('API Client error:', error);
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
