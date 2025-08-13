import express from "express";

const router = express.Router();

import { registerUser, authUser, logoutUser, getUsers, getUserProfile, updateUserProfile, deleteUser, getUserById, updateUser } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router
    .route("/:id")
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, updateUser)

export default router;
