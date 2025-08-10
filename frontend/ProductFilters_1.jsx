import { X } from "lucide-react";
import FilterGroup from "./FilterGroup";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
// import { Slider } from "./ui/slider";
import { useDispatch } from "react-redux";
import { clearAllFilters } from "@/slices/filterSlice";
// import { useState } from "react";


export default function ProductFilters({ categories, brands }) {
    const dispatch = useDispatch();
    // const [priceRange, setPriceRange] = useState([0, 1500]);

    return (
        <>
            {/* <div>
                <h2 className="text-lg font-semibold mb-2">Price Range</h2>
                <Slider
                    min={0}
                    max={150}
                    step={1}
                    value={priceRange}
                    onValueChange={(newValue) => {
                        setPriceRange(newValue); // Assuming newValue is the updated range
                        console.log("priceRange is: ", newValue);
                        // You can add more statements here
                        // For example:
                        // fetchUpdatedProducts(newValue);
                        // trackSliderInteraction(newValue);
                    }}
                    className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>
            <Separator /> */}

            {/* <div>
                <SortBy 
                sortType="price"
                options={sortPriceOptions}
                label="Sort by price"
                />
            </div>
            <Separator /> */}

            <div>
                <FilterGroup filterType="category" options={categories} label="Filter by category" />
            </div>
            <Separator />
            <div>
                <FilterGroup filterType="brand" options={brands} label="Filter by Brand" />
            </div>
            <Separator />
            <Button onClick={() => dispatch(clearAllFilters())} variant="outline" className="w-full">
                <X className="mr-2 h-4 w-4" /> Clear Filters
            </Button>
        </>
    );
}
