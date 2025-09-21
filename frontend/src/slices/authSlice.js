import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    isLoading: false,
    error: null,
    tokenExpired: false
}

// Async thunk for refreshing tokens
export const refreshTokens = createAsyncThunk(
    'auth/refreshTokens',
    async (_, { rejectWithValue }) => {
        try {
            console.log('AuthSlice: Attempting to refresh tokens...');
            const response = await fetch('/api/users/refresh', {
                method: 'POST',
                credentials: 'include', // Important for cookies
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('AuthSlice: Refresh response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('AuthSlice: Token refresh failed:', errorData);
                throw new Error(errorData.message || 'Token refresh failed');
            }

            const data = await response.json();
            console.log('AuthSlice: Token refresh successful:', data);
            return data.user;
        } catch (error) {
            console.error('AuthSlice: Token refresh error:', error);
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload
            state.tokenExpired = false
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        // eslint-disable-next-line no-unused-vars
        logout: (state, action) => {
            state.userInfo = null;
            state.tokenExpired = false;
            state.error = null;
            localStorage.clear();
        },
        setTokenExpired: (state, action) => {
            state.tokenExpired = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(refreshTokens.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(refreshTokens.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userInfo = action.payload;
                state.tokenExpired = false;
                state.error = null;
                localStorage.setItem('userInfo', JSON.stringify(action.payload));
            })
            .addCase(refreshTokens.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.tokenExpired = true;
                state.userInfo = null;
                localStorage.removeItem('userInfo');
            });
    }
})

export const { setCredentials, logout, setTokenExpired, clearError } = authSlice.actions;

export default authSlice.reducer; 