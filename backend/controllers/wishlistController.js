import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModal.js";
import Wishlist from "../models/wishlistModal.js";

// @desc Add product to wishlist
// @route POST /api/wishlist/:productId
// @access Private
const addToWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    // Check if user already has a wishlist
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
        // create new wishlist if doesn't exist
        wishlist = new Wishlist({
            user: userId,
            products: [productId],
        });
    } else {
        // Check if product already in wishlist
        if (wishlist.products.includes(productId)) {
            res.status(400);
            throw new Error("Product already in wishlist");
        }
        // Add product to existing wishlist
        wishlist.products.push(productId);
    }

    const savedWishlist = await wishlist.save();

    // Populate the wishlist with product details before sending response
    const populatedWishlist = await Wishlist.findById(savedWishlist._id).populate(
        "products",
        "name price image rating numReviews"
    );

    res.status(201).json({
        message: "Product added to wishlist successfully",
        wishlist: populatedWishlist,
    });
});

// @desc Remove product from wishlist
// @route DELETE /api/wishlist/:productId
// @access Private

const removeFromWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
        res.status(404);
        throw new Error("Wishlist not found");
    }

    // Check if product is in wishlist
    if (!wishlist.products.includes(productId)) {
        res.status(404);
        throw new Error("Product not in wishlist");
    }

    // Remove product from wishlist
    wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);

    await wishlist.save();

    // Populate the wishlist with product details before sending response
    const populatedWishlist = await Wishlist.findById(wishlist._id).populate(
        "products",
        "name price image rating numReviews"
    );

    res.status(200).json({
        message: "Product removed from wishlist successfully",
        wishlist: populatedWishlist,
    });
});

// @desc Get user's wishlist
// @route GET /api/wishlist
// @access Private
const getWishlist = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const wishlist = await Wishlist.findOne({ user: userId })
        .populate('products', 'name price image rating numReviews brand category countInStock');

    if (!wishlist) {
        return res.status(200).json({
            products: [],
            message: "Wishlist is empty",
        });
    }

    res.status(200).json(wishlist);
});

// @desc Clear entire wishlist
// @route DELETE /api/wishlist
// @access Private
const clearWishlist = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
        res.status(404);
        throw new Error("Wishlist not found");
    }

    wishlist.products = [];
    await wishlist.save();

    res.status(200).json({
        message: "Wishlist cleared successfully",
        wishlist,
    });
});

// @desc Check if product is in wishlist
// @route GET /api/wishlist/check/:productId
// @access Private
const checkProductInWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    const wishlist = await Wishlist.findOne({ user: userId });

    const isInWishlist = wishlist ? wishlist.products.includes(productId) : false;

    res.status(200).json({
        isInWishlist,
    });
});


export { 
    addToWishlist,
    removeFromWishlist,
    getWishlist,
    clearWishlist,
    checkProductInWishlist
 };
