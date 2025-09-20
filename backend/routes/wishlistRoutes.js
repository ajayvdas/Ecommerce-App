import express from 'express';
import {
    addToWishlist,
    removeFromWishlist,
    getWishlist,
    clearWishlist,
    checkProductInWishlist,
} from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
    .get(protect, getWishlist)
    .delete(protect, clearWishlist);

router.route("/:productId")
    .post(protect, addToWishlist)
    .delete(protect, removeFromWishlist);

router.route("/check/:productId")
    .get(protect, checkProductInWishlist);

export default router;