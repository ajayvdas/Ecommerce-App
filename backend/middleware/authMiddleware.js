import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModal.js";
import { generateAccessToken, setTokenCookies } from "../utils/generateToken.js";

// user must be authenticated
const protect = asyncHandler(async (req, res, next) => {
    let accessToken = req.cookies.accessToken;
    let refreshToken = req.cookies.refreshToken;

    // Check for legacy JWT token for backward compatibility
    if (!accessToken && !refreshToken) {
        accessToken = req.cookies.jwt;
    }

    if (accessToken) {
        try {
            // Verify access token
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");

            if (req.user) {
                return next();
            }
        } catch (error) {
            // Access token expired, try to refresh
            if (error.name === 'TokenExpiredError' && refreshToken) {
                try {
                    // Verify refresh token
                    const refreshDecoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
                    const user = await User.findById(refreshDecoded.userId).select("-password");

                    if (user) {
                        // Generate new access token
                        const newAccessToken = generateAccessToken(user._id);

                        // Set new access token cookie
                        res.cookie("accessToken", newAccessToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== "development",
                            sameSite: "strict",
                            maxAge: 1 * 60 * 1000, // 1 minute
                        });
                        // Set a header to indicate token was refreshed
                        res.set('X-Token-Refreshed', 'true');
                        req.user = user;
                        return next();
                    }
                } catch (refreshError) {
                    console.error("Refresh token verification failed:", refreshError);
                    res.status(401);
                    throw new Error("Not authorized, refresh token failed");
                }
            }

            console.error("Access token verification failed:", error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    res.status(401);
    throw new Error("Not authorized, no token");
});

// Optional authentication - doesn't throw error if no token
const optionalAuth = asyncHandler(async (req, res, next) => {
    let accessToken = req.cookies.accessToken;
    let refreshToken = req.cookies.refreshToken;

    // Check for legacy JWT token for backward compatibility
    if (!accessToken && !refreshToken) {
        accessToken = req.cookies.jwt;
    }

    if (accessToken) {
        try {
            // Verify access token
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");
        } catch (error) {
            // Access token expired, try to refresh
            if (error.name === 'TokenExpiredError' && refreshToken) {
                try {
                    // Verify refresh token
                    const refreshDecoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
                    const user = await User.findById(refreshDecoded.userId).select("-password");

                    if (user) {
                        // Generate new access token
                        const newAccessToken = generateAccessToken(user._id);

                        // Set new access token cookie
                        res.cookie("accessToken", newAccessToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== "development",
                            sameSite: "strict",
                            maxAge: 1 * 60 * 1000, // 1 minute
                        });
                        // Set a header to indicate token was refreshed
                        res.set('X-Token-Refreshed', 'true');
                        req.user = user;
                    }
                } catch (refreshError) {
                    // Refresh failed, continue without user
                    req.user = null;
                }
            } else {
                // Token verification failed, continue without user
                req.user = null;
            }
        }
    }

    next();
});

// User must be an admin
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as an admin");
    }
};

export { admin, protect, optionalAuth };
