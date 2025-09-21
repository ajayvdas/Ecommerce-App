import express from "express";

const router = express.Router();

import { getProducts, getProductById, createProduct, deleteProduct, updateProduct, createProductReview, getTopProducts } from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import checkObjectId from '../middleware/checkObjectId.js'

router.route("/").get(protect, getProducts).post(protect, admin, createProduct)
router.get('/top', getTopProducts)
router.route("/:id/reviews").post(protect, checkObjectId,  createProductReview)
router.route("/:id")
    .get(checkObjectId, getProductById)
    .put(protect, admin, checkObjectId, updateProduct) 
    .delete(protect, admin, checkObjectId, deleteProduct);

export default router;
