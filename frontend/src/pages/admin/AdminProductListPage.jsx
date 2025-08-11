import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from "@/slices/productsApiSlice";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import { Link } from "react-router-dom";

// Mock data for products
// const initialProducts = [
//     { id: 1, name: "Classic Denim Jacket", price: 89.99, category: "Outerwear", brand: "DenimCo" },
//     { id: 2, name: "Leather Boots", price: 129.99, category: "Footwear", brand: "BootMaster" },
//     { id: 3, name: "Cotton T-Shirt", price: 24.99, category: "Tops", brand: "ComfyTees" },
//     { id: 4, name: "Slim Fit Jeans", price: 59.99, category: "Bottoms", brand: "DenimCo" },
//     { id: 5, name: "Wool Sweater", price: 79.99, category: "Outerwear", brand: "CozyKnits" },
// ];

function ProductListPage() {
    // const [products, setProducts] = useState(initialProducts);
    // const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "", brand: "" });

    // const handleCreateProduct = (e) => {
    //     e.preventDefault();
    //     const price = parseFloat(newProduct.price);
    //     if (isNaN(price)) return;
    //     setProducts([...products, { ...newProduct, id: products.length + 1, price }]);
    //     setNewProduct({ name: "", price: "", category: "", brand: "" });
    // };

    // const handleDeleteProduct = (id) => {
    //     setProducts(products.filter((product) => product.id !== id));
    // };

    // ---------------

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const [description, setDescription] = useState("");

    const { data: products, isLoading, error, refetch } = useGetProductsQuery();
    console.log("products is: ", products)

    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

    const createProductHandler = async () => {
        if (window.confirm("Are you sure you want to create a new product?")) {
            try {
                await createProduct({
                    name,
                    price,
                    category,
                    brand,
                    countInStock,
                    description,
                });
                toast.success("Product created");
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };
    const deleteProductHandler = async (id) => {
        if (window.confirm("Are you sure")) {
            try {
                console.log("id is:", id);
                await deleteProduct(id);
                toast.success("Product deleted");
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-screen-xl mt-12">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Products</h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Create Product
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Product</DialogTitle>
                                <DialogDescription>Add a new product to your inventory.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={createProductHandler} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div>
                                    <Label htmlFor="price">Price</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="brand">Brand</Label>
                                    <Input id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
                                </div>
                                <div>
                                    <Label htmlFor="category">Category</Label>
                                    <Input
                                        id="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="countInStock">Count In Stock</Label>
                                    <Input
                                        id="category"
                                        value={countInStock}
                                        onChange={(e) => setCountInStock(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit">{loadingCreate ? "Creating Product" : "Create Product"}</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    // TODO: Build an error component
                    <p>{error}</p>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Brand</TableHead>
                                    <TableHead>Modify Product</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products?.products.map((product) => (
                                    <TableRow key={product._id}>
                                        <TableCell>{product._id}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>${product.price.toFixed(2)}</TableCell>
                                        <TableCell>{product.category}</TableCell>
                                        <TableCell>{product.brand}</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Link to={`/admin/product/${product._id}/edit`}>
                                                    <Button variant="outline" size="icon">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => deleteProductHandler(product._id)}
                                                >
                                                    {loadingDelete ? (
                                                        <Loader2 className="h-4 w-4" />
                                                    ) : (
                                                        <Trash2 className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export default ProductListPage;
