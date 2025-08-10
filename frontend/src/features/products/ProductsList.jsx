import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState } from "react";
import { X } from "lucide-react";

// Mock data for products, categories, and brands
const data = [
  { id: 1, name: "Classic Denim Jacket", price: 89.99, category: "Outerwear", brand: "DenimCo" },
  { id: 2, name: "Leather Boots", price: 129.99, category: "Footwear", brand: "BootMaster" },
  { id: 3, name: "Cotton T-Shirt", price: 24.99, category: "Tops", brand: "ComfyTees" },
  { id: 4, name: "Slim Fit Jeans", price: 59.99, category: "Bottoms", brand: "DenimCo" },
  { id: 5, name: "Wool Sweater", price: 79.99, category: "Outerwear", brand: "CozyKnits" },
]

const categories = ["Outerwear", "Footwear", "Tops", "Bottoms"];
const brands = ["DenimCo", "BootMaster", "ComfyTees", "CozyKnits"];

export default function ProductsList() {
    const [searchTerm, setSearchTerm] = useState("");
        const [priceRange, setPriceRange] = useState([0, 1500]);
        const [selectedCategories, setSelectedCategories] = useState([]);
        const [selectedBrands, setSelectedBrands] = useState([]);
            const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    const handleBrandChange = (brand) => {
        setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));
    };

    const clearFilters = () => {
        setSearchTerm("");
        setPriceRange([0, 1500]);
        setSelectedCategories([]);
        setSelectedBrands([]);
    };

    const filteredProducts =
        data?.filter(
            (product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                product.price >= priceRange[0] &&
                product.price <= priceRange[1] &&
                (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
                (selectedBrands.length === 0 || selectedBrands.includes(product.brand))
        ) || [];
  return (
<div className="flex flex-col md:flex-row gap-8">
                        <aside className="w-full md:w-64 space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold mb-2">Price Range</h2>
                                <Slider
                                    min={0}
                                    max={150}
                                    step={1}
                                    value={priceRange}
                                    onValueChange={setPriceRange}
                                    className="mb-2"
                                />
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>${priceRange[0]}</span>
                                    <span>${priceRange[1]}</span>
                                </div>
                            </div>
                            <Separator />
                            <div>
                                <h2 className="text-lg font-semibold mb-2">Categories</h2>
                                {categories.map((category) => (
                                    <div key={category} className="flex items-center space-x-2 mb-2">
                                        <Checkbox
                                            id={`category-${category}`}
                                            checked={selectedCategories.includes(category)}
                                            onCheckedChange={() => handleCategoryChange(category)}
                                        />
                                        <Label htmlFor={`category-${category}`}>{category}</Label>
                                    </div>
                                ))}
                            </div>
                            <Separator />
                            <div>
                                <h2 className="text-lg font-semibold mb-2">Brands</h2>
                                {brands.map((brand) => (
                                    <div key={brand} className="flex items-center space-x-2 mb-2">
                                        <Checkbox
                                            id={`brand-${brand}`}
                                            checked={selectedBrands.includes(brand)}
                                            onCheckedChange={() => handleBrandChange(brand)}
                                        />
                                        <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                                    </div>
                                ))}
                            </div>
                            <Separator />
                            <Button onClick={clearFilters} variant="outline" className="w-full">
                                <X className="mr-2 h-4 w-4" /> Clear Filters
                            </Button>
                        </aside>
                        <main className="flex-1">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <div key={product._id} className="border rounded-lg p-4 shadow-sm">
                                        <Card className="w-full">
                                          <Link to={`/product/${product._id}`}>
                                            <CardContent className="p-6 relative">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-48 object-cover mb-4 rounded-md"
                                                />

                                                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                                                <p className="text-gray-600 mb-2">{product.category}</p>
                                                <p className="text-gray-600 mb-2">{product.brand}</p>
                                                <p className="font-bold">${product.price.toFixed(2)}</p>
                                            </CardContent>
                                            </Link>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </main>
                    </div>
  )
}
