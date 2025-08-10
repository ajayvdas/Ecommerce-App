// components/Pagination.jsx
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQueryParams } from '../hooks/useQueryParams';

const Pagination = ({ 
  totalCount
}) => {
  const { queryParams, updateQueryParams } = useQueryParams();

  const currentPage = parseInt(queryParams.page) || 1;
  const itemsPerPage = parseInt(queryParams.limit) || 10;

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(start + itemsPerPage - 1, totalCount);
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (page, limit) => {
    updateQueryParams({ page, limit });
  };
  
  console.log(currentPage, itemsPerPage);
  
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };
  
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
      {/* Navigation buttons and page numbers */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1, itemsPerPage)}
          disabled={currentPage <= 1}
          className="h-9 px-3"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        
        <div className="flex items-center gap-1">
          {getPageNumbers().map(page => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(page, itemsPerPage)}
              className="h-9 w-9 p-0"
            >
              {page}
            </Button>
          ))}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1, itemsPerPage)}
          disabled={currentPage >= totalPages}
          className="h-9 px-3"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      {/* Results info */}
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{start}-{end}</span> of{' '}
        <span className="font-medium">{totalCount}</span> products
      </div>
    </div>
  );
};

export default Pagination;