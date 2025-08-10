import express from "express";

const router = express.Router();

import { registerUser, authUser, logoutUser, getUsers, getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

export default router;
