import { motion } from "framer-motion";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import ImageFormGroup from "./ImageFormGroup";
// import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function EditProductForm({ productData, setProductData, onSubmit, onFileUpload, loadingProductUpdate, loadingImageUpload }) {
    // TODO: Implement the functionalities


    // let loadingUpload = false;



    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <motion.form
            className="space-y-6 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={onSubmit}
        >
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={productData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" value={productData.price} onChange={handleChange} required />
            </div>
            {/* Image */}
            <div className="space-y-2">
                {/* <ImageFormGroup
                    image={image}
                    setImage={setImage}
                    onFileUpload={uploadFileHandler}
                    loadingUpload={loadingUpload}
                /> */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="image">Image</Label>
                        <Input
                            id="image"
                            type="text"
                            placeholder="Enter image url"
                            value={productData.image}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Input id="imageFile" type="file" onChange={onFileUpload} className="cursor-pointer" />
                    </div>
                    {loadingImageUpload && (
                        <div className="flex items-center justify-center">
                            <Loader2 className="h-5 w-5 animate-spin" />
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" name="brand" value={productData.brand} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="countInStock">Count In Stock</Label>
                <Input
                    id="countInStock"
                    name="countInStock"
                    value={productData.countInStock}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" value={productData.category} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <Button type="submit" className="w-full">
                {loadingProductUpdate ? 'Updating...' : 'Update'}
            </Button>
        </motion.form>
    );
}
