import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    },
    {
        timestamps: true,
    }
)

const productSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            enum: ['xs', 'sm', 'm', 'l', 'xl'],
            required: true
        },
        reviews: [reviewSchema],
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model('Product', productSchema)

export default Product

// Explanation
// user: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: 'User',
// },

// type: mongoose.Schema.Types.ObjectId:
// This indicates the type of the field.
// ObjectId is a special data type in MongoDB used to store unique identifiers for documents.
// This means that the user field will store the unique identifier (_id) of another document, typically from another collection.

// ref: 'User':
// This is a reference to another collection in the database, specifically the User collection.
// It tells Mongoose that this ObjectId refers to a document in the User collection. This is part of Mongoose's population feature, which allows you to fetch and include the referenced User document automatically when querying.

// What Does This Mean in Practice?
// This field sets up a relationship between the current schema and the User schema. For example:

// If this schema is for a Post, the user field will reference the user who created the post.
// By referencing the User schema, you can populate the user field with the corresponding user's data instead of just its ID.