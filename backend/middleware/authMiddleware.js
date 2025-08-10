import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModal.js";

// user must be authenticated
const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userId).select("-password");

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    } else {
        res.status(401);
        // throw new Error('Not authorized, no token')
        console.error("JWT Verification Error:", error); // Log the full error object
        console.error("Token being verified:", token); // Log the token (be careful in production)
        console.error("JWT_SECRET:", process.env.JWT_SECRET); // Log the secret (be careful in production)
        res.status(401);
        throw new Error("Not authorized, token failed");
    }
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

export { admin, protect };
