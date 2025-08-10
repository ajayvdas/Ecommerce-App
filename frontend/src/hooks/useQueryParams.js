// hooks/useQueryParams.js
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const queryParams = useMemo(() => {
    const params = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  }, [searchParams]);
  
  const updateQueryParams = (updates) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    
    setSearchParams(newParams);
  };
  
  const clearQueryParams = () => {
    setSearchParams({});
  };
  
  return {
    queryParams,
    updateQueryParams,
    clearQueryParams,
    searchParams
  };
};