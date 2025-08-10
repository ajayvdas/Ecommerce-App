import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useSelector, useDispatch } from "react-redux";
// import { addFilterValue, removeFilterValue, selectActiveFilters } from "../../redux/slices/filterSlice";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { addFilterValue, removeFilterValue, selectActiveFilters } from "@/slices/filterSlice";

const FilterGroup = ({ filterType, options, label }) => {
    const activeFilters = useSelector(selectActiveFilters);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();



    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        // Clear existing parameters for this filter type
        params.delete(filterType);

        // Add the currently selected values to the query string
        if (activeFilters[filterType]) {
            activeFilters[filterType]?.forEach((value) => {
                params.append(filterType, value);
            });
        }

        setSearchParams(params);
    }, [activeFilters, filterType, setSearchParams]);
    // console.log("activeFilters is: ", activeFilters);

    return (
        <>
            <h2 className="text-lg font-semibold mb-2">{label}</h2>
            {options?.map((option) => (
                <div key={`${filterType}-${option}`} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                        id={`${filterType}-${option}`}
                        checked={activeFilters[filterType]?.includes(option)}
                        onCheckedChange={(isChecked) => {
                            if (isChecked) {
                                dispatch(addFilterValue({ filterType, value: option }));
                                console.log("activeFilters[filterType]: ", activeFilters[filterType])
                            } else {
                                dispatch(removeFilterValue({ filterType, value: option }));
                            }
                        }}
                    />
                    <Label htmlFor={`${filterType}-${option}`}>{option}</Label>
                </div>
            ))}
        </>
    );
};

export default FilterGroup;
