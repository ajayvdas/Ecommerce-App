// components/ProductList.jsx
import ProductFilters from "@/components/ProductFilters";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useGetProductsQuery } from "@/slices/productsApiSlice";
import Loader from "@/components/Loader";
import ProductGrid from "@/components/ProductGrid";

const ProductsPage = () => {
    const { queryParams } = useQueryParams();

    const { data, error, isLoading } = useGetProductsQuery(queryParams);
    const products = data?.products ||  []
    const totalCount =  data?.totalCount

    // if (isLoading) return <div>Loading products...</div>;
    if (error) return <div>Error loading products: {error.message}</div>;


    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="container mx-auto mt-16 px-4 py-8 lg:px-8 lg:py-16">

                    <div className="flex flex-col md:flex-row gap-8">
                        <aside className="w-full px-4 md:px-6  md:w-64 lg:w-96 space-y-6">
                            <ProductFilters />
                        </aside>
                        <ProductGrid
                            products={products}
                            totalCount={totalCount}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductsPage;
