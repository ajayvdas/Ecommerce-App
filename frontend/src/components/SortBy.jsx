import { useEffect } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { setSortOption, clearSort, selectActiveSort } from "@/slices/sortSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export default function SortBy({ sortType, options, label }) {
  const activeSortOption = useSelector(selectActiveSort);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // Transform options to include field and direction properties
  const transformedOptions = options.map(option => {
    const [field, direction] = option.value.split('_');
    return {
      ...option,
      fieldInfo: {
        field: field,
        direction: direction === 'desc' ? '-' : '' // Use empty string for ascending
      }
    };
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    // Clear existing sort parameter
    params.delete('sort');

    // Add the current sort value if it exists
    if (activeSortOption && activeSortOption.field) {
      // Only add the direction if it's negative (for descending order)
      // This way, ascending sort will just show field name (e.g., 'price' instead of '+price')
      const sortValue = `${activeSortOption.direction}${activeSortOption.field}`;
      params.set('sort', sortValue);
    }

    setSearchParams(params);
  }, [activeSortOption, setSearchParams]);

  return (
    <>
      <h2 className="text-lg font-semibold mb-2">{label}</h2>
      {transformedOptions?.map((option) => (
        <div key={`${sortType}-${option.value}`} className="flex items-center space-x-2 mb-2">
          <Checkbox
            id={`${sortType}-${option.value}`}
            checked={
              activeSortOption?.field === option.fieldInfo.field && 
              activeSortOption?.direction === option.fieldInfo.direction
            }
            onCheckedChange={(isChecked) => {
              if (isChecked) {
                // When checked, set this option as the active sort
                dispatch(clearSort());
                dispatch(setSortOption({
                  field: option.fieldInfo.field,
                  direction: option.fieldInfo.direction
                }));
              } else {
                // When unchecked, clear the sort
                dispatch(clearSort());
              }
            }}
          />
          <Label htmlFor={`${sortType}-${option.value}`}>{option.label}</Label>
        </div>
      ))}
    </>
  );
}