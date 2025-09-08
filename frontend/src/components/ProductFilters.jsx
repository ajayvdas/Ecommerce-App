
import { useQueryParams } from "../hooks/useQueryParams"
import { X, Filter, SortAsc, Grid, Tag, Package } from "lucide-react"
import { Button } from "./ui/button"

const ProductFilters = ({ onAfterChange }) => {
  const { queryParams, updateQueryParams } = useQueryParams()

  const handleFilterChange = (filterName, value) => {
    updateQueryParams({ [filterName]: value || null, page: 1 })
    onAfterChange?.()
  }

  const handleSortChange = (sortValue) => {
    updateQueryParams({ sort: sortValue || null, page: 1 })
    onAfterChange?.()
  }

  const handleLimitChange = (limitValue) => {
    updateQueryParams({ limit: limitValue, page: 1 })
    onAfterChange?.()
  }

  const clearFilters = () => {
    updateQueryParams({ brand: null, category: null, sort: null, page: 1 })
    onAfterChange?.()
  }

  const hasActiveFilters = !!(queryParams.brand || queryParams.category || queryParams.sort)

  return (
    <section
      aria-label="Product filters and sorting"
      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-background shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 sm:px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Filter className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <h2 className="text-base font-semibold leading-none text-foreground">Filters & Sorting</h2>
          <p className="mt-1 text-xs text-muted-foreground">Refine your product search</p>
        </div>
        {hasActiveFilters && (
          <span className="ml-auto inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            {[queryParams.brand, queryParams.category, queryParams.sort].filter(Boolean).length} active
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-5">
        {/* Brand */}
        <div className="space-y-2">
          <label htmlFor="brand" className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Tag className="h-4 w-4" />
            Brand
          </label>
          <select
            id="brand"
            value={queryParams.brand || ""}
            onChange={(e) => handleFilterChange("brand", e.target.value)}
            className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-background px-3 py-2.5 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <option value="">All Brands</option>
            <option value="Amazon">Amazon</option>
            <option value="Logitech">Logitech</option>
            <option value="Cannon">Cannon</option>
            <option value="Apple">Apple</option>
          </select>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label htmlFor="category" className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Package className="h-4 w-4" />
            Category
          </label>
          <select
            id="category"
            value={queryParams.category || ""}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-background px-3 py-2.5 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home">Home</option>
          </select>
        </div>

        {/* Sort */}
        <div className="space-y-2">
          <label htmlFor="sort" className="flex items-center gap-2 text-sm font-medium text-foreground">
            <SortAsc className="h-4 w-4" />
            Sort by
          </label>
          <select
            id="sort"
            value={queryParams.sort || ""}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-background px-3 py-2.5 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <option value="">Default</option>
            <option value="price">Price (Low to High)</option>
            <option value="-price">Price (High to Low)</option>
            <option value="name">Name (A-Z)</option>
            <option value="-name">Name (Z-A)</option>
            <option value="createdAt">Oldest First</option>
            <option value="-createdAt">Newest First</option>
          </select>
        </div>

        {/* Per page */}
        <div className="space-y-2">
          <label htmlFor="limit" className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Grid className="h-4 w-4" />
            Per page
          </label>
          <select
            id="limit"
            value={String(queryParams.limit || "10")}
            onChange={(e) => handleLimitChange(e.target.value)}
            className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-background px-3 py-2.5 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>

        {/* Clear */}
        <div className="pt-1">
          <Button
            onClick={clearFilters}
            variant="outline"
            className="w-full h-11 text-sm font-medium disabled:opacity-60 bg-transparent"
            disabled={!hasActiveFilters}
          >
            <X className="mr-2 h-4 w-4" />
            Clear all filters
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ProductFilters
