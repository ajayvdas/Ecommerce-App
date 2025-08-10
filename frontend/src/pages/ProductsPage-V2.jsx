/* eslint-disable no-unused-vars */
// ProductsPage.jsx
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetProductsQuery } from "@/slices/productsApiSlice";
import Loader from "@/components/Loader";
// import SearchBar from "@/components/products/SearchBar";
// import ProductFilters from "@/components/products/ProductFilters";
// import ProductGrid from "@/components/products/ProductGrid";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import FilterGroup from "@/components/FilterGroup";
import { Button } from "@/components/ui/button";
import { clearAllFilters } from "@/slices/filterSlice";
import { X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";



export default function ProductsPage() {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.filters.activeFilters);
    
    // Load full unfiltered list for initial category/brand extraction
    const { data: initialProducts } = useGetProductsQuery({}, { skip: false });
    const { data: products, isLoading } = useGetProductsQuery(filters);

    // Extract once from unfiltered list
    const categories = useMemo(() => {
        return initialProducts ? [...new Set(initialProducts.map(p => p.category))] : [];
    }, [initialProducts]);

    const brands = useMemo(() => {
        return initialProducts ? [...new Set(initialProducts.map(p => p.brand))] : [];
    }, [initialProducts]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-16">
                    <SearchBar />
                    
                    <div className="flex flex-col md:flex-row gap-8">
                        <ProductFilters 
                            categories={categories} 
                            brands={brands} 
                        />
                        <ProductGrid products={products || []} />
                    </div>
                </div>
            )}
        </>
    );
}

function SearchBar() {
    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state.filters.searchTerm || "");

    const handleSearch = (e) => {
        // Assuming we have a setSearchTerm action in our filterSlice
        // dispatch(setSearchTerm(e.target.value));
    };

    return (
        <div className="mb-6">
            <div className="relative">
                <SearchBar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10"
                />
            </div>
        </div>
    );
}

function ProductFilters({ categories, brands }) {
    const dispatch = useDispatch();
    
    return (
        <aside className="w-full md:w-64 space-y-6">
            <PriceRangeFilter />
            
            <Separator />
            
            <div>
                <FilterGroup 
                    filterType="category" 
                    options={categories} 
                    label="Filter by category" 
                />
            </div>
            
            <Separator />
            
            <div>
                <FilterGroup 
                    filterType="brand" 
                    options={brands} 
                    label="Filter by Brand" 
                />
            </div>
            
            <Separator />
            
            <Button 
                onClick={() => dispatch(clearAllFilters())} 
                variant="outline" 
                className="w-full"
            >
                <X className="mr-2 h-4 w-4" /> Clear Filters
            </Button>
        </aside>
    );
}

function PriceRangeFilter() {
    const dispatch = useDispatch();
    const priceRange = useSelector((state) => state.filters.priceRange || [0, 150]);

    const handlePriceChange = (value) => {
        // Assuming we have a setPriceRange action in our filterSlice
        // dispatch(setPriceRange(value));
    };

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">Price Range</h2>
            <Slider
                min={0}
                max={150}
                step={1}
                value={priceRange}
                onValueChange={handlePriceChange}
                className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
            </div>
        </div>
    );
}

function ProductGrid({ products }) {
    return (
        <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </main>
    );
}

function ProductCard({ product }) {
    return (
        <div className="border rounded-lg p-4 shadow-sm">
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
    );
}