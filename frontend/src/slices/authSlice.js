import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    isLoading: false,
    error: null,
    tokenExpired: false
}

// Async thunk for token refresh
export const refreshTokens = createAsyncThunk(
    'auth/refreshTokens',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/users/refresh', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error('Token refresh failed');
            }
        } catch (error) {
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
        setUnauthorized: (state) => {
            state.userInfo = null;
            state.tokenExpired = true;
            state.error = "Unauthorized access";
            localStorage.removeItem('userInfo');
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
                state.userInfo = null;
                state.tokenExpired = true;
                state.error = action.payload;
                localStorage.removeItem('userInfo');
            });
    },
})

export const { 
    setCredentials, 
    logout, 
    setTokenExpired, 
    clearError, 
    setUnauthorized 
} = authSlice.actions;

export default authSlice.reducer; 