import { useQueryParams } from '../hooks/useQueryParams';
import { X, Filter, SortAsc, Grid, Tag, Package } from "lucide-react";
import { Button } from "./ui/button";

const ProductFilters = () => {
  const { queryParams, updateQueryParams } = useQueryParams();
  
  const handleFilterChange = (filterName, value) => {
    updateQueryParams({
      [filterName]: value,
      page: 1,
    });
  };
  
  const handleSortChange = (sortValue) => {
    updateQueryParams({
      sort: sortValue,
      page: 1,
    });
  };
  
  const handleLimitChange = (limitValue) => {
    updateQueryParams({
      limit: limitValue,
      page: 1,
    });
  };
  
  const clearFilters = () => {
    updateQueryParams({
      brand: null,
      category: null,
      sort: null,
      page: 1,
    });
  };

  const hasActiveFilters = queryParams.brand || queryParams.category || queryParams.sort;
  
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200 dark:border-slate-700">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-sm">
          <Filter className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Filters & Sorting
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Refine your product search
          </p>
        </div>
        {hasActiveFilters && (
          <div className="ml-auto">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              {[queryParams.brand, queryParams.category, queryParams.sort].filter(Boolean).length} active
            </span>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="p-5 space-y-6">
        
        {/* Brand */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <Tag className="h-4 w-4" />
            <label htmlFor="brand" className="text-sm font-medium">
              Brand
            </label>
          </div>
          <select
            id="brand"
            value={queryParams.brand || ''}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
            className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
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
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <Package className="h-4 w-4" />
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
          </div>
          <select
            id="category"
            value={queryParams.category || ''}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
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
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <SortAsc className="h-4 w-4" />
            <label htmlFor="sort" className="text-sm font-medium">
              Sort by
            </label>
          </div>
          <select
            id="sort"
            value={queryParams.sort || ''}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
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
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <Grid className="h-4 w-4" />
            <label htmlFor="limit" className="text-sm font-medium">
              Per page
            </label>
          </div>
          <select
            id="limit"
            value={queryParams.limit || '10'}
            onChange={(e) => handleLimitChange(e.target.value)}
            className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>

        {/* Clear button */}
        <Button
          onClick={clearFilters}
          variant="outline"
          className="w-full h-11 mt-4 text-sm font-medium"
          disabled={!hasActiveFilters}
        >
          <X className="mr-2 h-4 w-4" />
          Clear All Filters
        </Button>
      </div>
    </div>
  );
};

export default ProductFilters;
