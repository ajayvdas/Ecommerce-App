import EditProductForm from "@/components/EditProductForm";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
    useGetProductDetailsQuery,
    useUpdateProductMutation,
    useUploadProductImageMutation,
} from "@/slices/productsApiSlice";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
export default function ProductEditPage() {
    const { id: productId } = useParams();

    const [productData, setProductData] = useState({
        name: "",
        price: 0,
        image: "",
        brand: "",
        category: "",
        countInStock: 0,
        description: "",
    });

    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
    // console.log("Data at product edit page is: ", product);

    const [updateProduct, { isLoading: loadingProductUpdate }] = useUpdateProductMutation();

    const [uploadProductImage, { isLoading: loadingImageUpload }] = useUploadProductImageMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            setProductData({ ...product });
        }
    }, [product]);

    const submitHandler = async (e) => {
        e.preventDefault();

        // const updatedProduct = {
        //     ...productData,
        // };
        console.log("Product Data is: ", productData);
        // console.log("Updated product is: ", updateProduct);

        const result = await updateProduct(productData);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Product Updated");
            navigate("/admin/productlist");
        }
    };

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setProductData({ ...productData, image: res.image });
        } catch (err) {
            toast.err(err?.data?.message || err.error);
        }
    };
    return (
        <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-16 max-w-screen-md">
            {isLoading ? (
                <Loader />
            ) : error ? (
                // TODO: Build a custom error component
                <p>{error}</p>
            ) : (
                <>
                    <Link to="/admin/productlist">
                        <Button variant="outline" className="mb-4">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Go back
                        </Button>
                    </Link>
                    <motion.h1
                        className="text-3xl font-bold mb-8 mt-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Edit Product
                    </motion.h1>
                    <EditProductForm
                        productData={productData}
                        setProductData={setProductData}
                        onSubmit={submitHandler}
                        onFileUpload={uploadFileHandler}
                        loadingProductUpdate={loadingProductUpdate}
                    />
                </>
            )}
        </div>
    );
}
