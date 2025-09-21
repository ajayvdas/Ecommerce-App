import jwt from "jsonwebtoken";

// Generate access token (short-lived)
const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1m", // 15 minutes
    });
};

// Generate refresh token (long-lived)
const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "7d", // 7 days
    });
};

// Set tokens as HTTP-Only cookies
const setTokenCookies = (res, accessToken, refreshToken) => {
    // Access token cookie
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 1 * 60 * 1000, // 15 minutes
    });

    // Refresh token cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};

// Clear token cookies
const clearTokenCookies = (res) => {
    res.cookie("accessToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        expires: new Date(0),
    });

    res.cookie("refreshToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        expires: new Date(0),
    });
};

// Legacy function for backward compatibility
const generateToken = (res, userId) => {
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);
    setTokenCookies(res, accessToken, refreshToken);
};

export {
    generateAccessToken,
    generateRefreshToken,
    setTokenCookies,
    clearTokenCookies,
    generateToken // Keep for backward compatibility
};

// https://chatgpt.com/c/677807c3-e218-8001-a298-cc80fa486c1b
