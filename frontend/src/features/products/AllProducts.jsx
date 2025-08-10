import ProductsList from "./ProductsList";
import ProductsSearchBar from "./ProductsSearchBar";

export default function AllProducts() {
    return (
        <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-16">
            <ProductsSearchBar />
            <ProductsList />
        </div>
    );
}
