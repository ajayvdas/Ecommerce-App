import { useQueryParams } from '../hooks/useQueryParams';
import { X, Filter, SortAsc, Grid, Tag, Package } from "lucide-react";
import { Button } from "./ui/button";

const ProductFilters = () => {
  const { queryParams, updateQueryParams } = useQueryParams();
  
  const handleFilterChange = (filterName, value) => {
    updateQueryParams({
      [filterName]: value,
      page: 1, // Reset to first page when filtering
    });
  };
  
  const handleSortChange = (sortValue) => {
    updateQueryParams({
      sort: sortValue,
      page: 1, // Reset to first page when sorting
    });
  };
  
  const handleLimitChange = (limitValue) => {
    updateQueryParams({
      limit: limitValue,
      page: 1, // Reset to first page when changing limit
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

      <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 shadow-lg backdrop-blur-sm overflow-hidden">
        
        {/* Header */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200/60 dark:border-slate-700/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md">
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
        </div>

        {/* Filter Content */}
        <div className="p-6">
          <div className="grid grid-cols-1  gap-6">
            
            {/* Brand Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                <label htmlFor="brand" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Brand
                </label>
              </div>
              <select
                id="brand"
                value={queryParams.brand || ''}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-500"
              >
                <option value="">All Brands</option>
                <option value="Amazon">Amazon</option>
                <option value="Logitech">Logitech</option>
                <option value="Cannon">Cannon</option>
                <option value="Apple">Apple</option>
              </select>
            </div>
            
            {/* Category Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                <label htmlFor="category" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Category
                </label>
              </div>
              <select
                id="category"
                value={queryParams.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-500"
              >
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Home">Home</option>
              </select>
            </div>
            
            {/* Sort Options */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <SortAsc className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                <label htmlFor="sort" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Sort by
                </label>
              </div>
              <select
                id="sort"
                value={queryParams.sort || ''}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-500"
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
            
            {/* Items per page */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Grid className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                <label htmlFor="limit" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Per page
                </label>
              </div>
              <select
                id="limit"
                value={queryParams.limit || '10'}
                onChange={(e) => handleLimitChange(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-500"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
          
          {/* Clear Filters Button */}
          <div className="mt-6 pt-6">
            <Button 
              onClick={clearFilters} 
              variant="outline" 
              className="w-full h-12"
              disabled={!hasActiveFilters}
            >
              <X className="mr-2 h-4 w-4" /> 
              Clear All Filters
            </Button>
          </div>
        </div>
      </div>
  );
};

export default ProductFilters;