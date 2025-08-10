import { useGetProductsQuery } from "@/slices/productsApiSlice";
import Loader from "@/components/Loader";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import ProductFilters from "@/components/ProductFilters";
import ProductGrid from "@/components/ProductGrid";
import ProductSorting from "@/components/ProductSorting";
import { selectActiveSort } from "@/slices/sortSlice";
import { useState } from "react";

export default function ProductsPage() {
    const [query, setQuery] = useState("");

    const filters = useSelector((state) => state.filters.activeFilters);
    const sortOption = useSelector(selectActiveSort);

    const count = 10;

    // Load full unfiltered list for initial category/brand extraction
    const { data: initialProducts } = useGetProductsQuery({}, { skip: false }); // always run
    
    // Use the combined filters and sort in the query

    const { data: products, isLoading } = useGetProductsQuery({
        filters: filters,
        sort: sortOption
    });

    // Add this temporarily to your component for debugging
    console.log("Sort Option:", sortOption);
    console.log("Filters:", filters);
    console.log("Query Params:", { filters, sort: sortOption });

    // Extract once from unfiltered list
    const categories = useMemo(() => {
        return [...new Set(initialProducts?.map((p) => p.category))];
    }, [initialProducts]);

    const brands = useMemo(() => {
        return [...new Set(initialProducts?.map((p) => p.brand))];
    }, [initialProducts]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="container mx-auto mt-16 px-4 py-8 lg:px-8 lg:py-16">
                    <SearchBar setQuery={setQuery} />

                    <div className="flex flex-col md:flex-row gap-8">
                        <aside className="w-full md:w-64 space-y-6">
                            <ProductSorting />
                            <ProductFilters categories={categories} brands={brands} />
                        </aside>
                        <ProductGrid products={products} query={query} count={count} />
                    </div>
                </div>
            )}
        </>
    );
}
