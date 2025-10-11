import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    isLoading: false,
    error: null,
    tokenExpired: false
}


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
})

export const { 
    setCredentials, 
    logout, 
    setTokenExpired, 
    clearError, 
    setUnauthorized 
} = authSlice.actions;

export default authSlice.reducer; 