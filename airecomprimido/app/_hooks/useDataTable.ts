import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from './useDebounce';

export function useTableData<T>(endpoint: string, initialFilters: any = {}) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(initialFilters);
  
  const debouncedFilters = useDebounce(filters, 500);
  const updateFilter = (key: string, value: string) => {
    setFilters((prev: any) => ({
      ...prev,
      [key]: value
    }));
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const cleanFilters: Record<string, string> = Object.fromEntries(
        Object.entries(debouncedFilters)
          .filter(([_, v]) => v != null && v !== '')
          .map(([k, v]) => [k, String(v)])
      );

      const queryParams = new URLSearchParams(cleanFilters).toString();
      const url = `${endpoint}?${queryParams}`;

      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json' 
        }
      });

      if (res.ok) {
        const result = await res.json();
        setData(result.data); 
      }
    } catch (error) {
      console.error("Error fetching table data:", error);
    } finally {
      setLoading(false);
    }
  }, [endpoint, debouncedFilters]);



  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, filters, updateFilter, refresh: fetchData };
}