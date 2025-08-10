import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useDispatch } from "react-redux";
import SortBy from "./SortBy";
import { clearSort } from "@/slices/sortSlice";

const sortPriceOptions = [
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
//   { label: 'Discounted Price: Low to High', value: 'discounted_price_asc' },
//   { label: 'Discounted Price: High to Low', value: 'discounted_price_desc' },
//   { label: 'Price Range: Under $25', value: 'under_25' },
//   { label: 'Price Range: $25 to $50', value: '25_to_50' },
//   { label: 'Price Range: $50 to $100', value: '50_to_100' },
//   { label: 'Price Range: Over $100', value: 'over_100' },
//   { label: 'Best Value (Price vs Rating)', value: 'best_value' },
];

const sortRatingOptions = [
  { label: 'Rating: High to Low', value: 'rating_desc' },
  { label: 'Rating: Low to High', value: 'rating_asc' },
//   { label: 'Only 5-Star Rated', value: 'only_5_star' },
//   { label: '4 Stars & Up', value: '4_star_up' },
//   { label: '3 Stars & Up', value: '3_star_up' },
//   { label: '2 Stars & Up', value: '2_star_up' },
//   { label: '1 Star & Up', value: '1_star_up' },
//   { label: 'Most Reviewed (by rating count)', value: 'most_reviewed' },
//   { label: 'Top Rated (Rating × Number of Reviews)', value: 'top_rated_weighted' },
];

export default function ProductSorting() {
    const dispatch = useDispatch();

    return (
        <>
            <div>
                <SortBy sortType="price" options={sortPriceOptions} label="Sort by price" />
            </div>
            <Separator />
            <div>
                <SortBy sortType="rating" options={sortRatingOptions} label="Sort by rating" />
            </div>
            <Separator />
            <Button onClick={() => dispatch(clearSort())} variant="outline" className="w-full">
                <X className="mr-2 h-4 w-4" /> Clear Sort
            </Button>
{/* ----------------------------------- */}
            {/* <div>
                <SortBy sortType={field} options={sortPriceOptions} label="Sort by price" />
            </div>
            <Separator />
            <Button onClick={() => dispatch(clearSort())} variant="outline" className="w-full">
                <X className="mr-2 h-4 w-4" /> Clear Filters
            </Button> */}
        </>
    );
}
