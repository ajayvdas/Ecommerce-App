import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModal.js";
import APIQueryFeatures from "../utils/APIQueryFeatures.js";

// @desc Fetch all products
// @route Get /api/products
// @access Public
// TODO: Need to modify
const getProducts = asyncHandler(async (req, res) => {
    // Get total count of ALL products (completely unfiltered)
    const totalCount = await Product.countDocuments();

    // EXECUTE QUERY
    const queryFeatures = new APIQueryFeatures(Product.find(), req.query).filter().sort().limitFields().paginate();
    // console.log("query from backend is: ", req.query)
    const products = await queryFeatures.query;
    

    // SEND RESPONSE
    // res.status(200).json(products);
  // { products: [...], totalCount: number, currentPage: number, totalPages: number }


    res.status(200).json(
        {products, totalCount}
    );
});

// @desc Fetch a product
// @route Get /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        return res.json(product);
    } else {
        res.status(404);
        throw new Error("Resource not found");
    }
});

// @desc Create a product
// @route Get /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const { name, price, brand, category, countInStock, description } = req.body;
    const product = new Product({
        name,
        price,
        user: req.user._id,
        image: "/images/sample.jpg",
        brand,
        category,
        countInStock,
        numReviews: 0,
        description,
    });

    const createProduct = await product.save();
    res.status(201).json(createProduct);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.status(200).json({ message: "Product deleted" });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

export { getProducts, getProductById, createProduct, deleteProduct, updateProduct };
