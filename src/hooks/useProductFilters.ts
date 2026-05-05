import { useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  setSearch,
  setStatusFilter,
  setSortBy,
} from '@/features/filters/filtersSlice';
import { selectFilteredProducts } from '@/features/products/selectors';
import type { StatusFilter, SortBy } from '@/features/products/types';

export function useProductFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const filteredProducts = useAppSelector(selectFilteredProducts);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback(
    (value: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        dispatch(setSearch(value));
      }, 300);
    },
    [dispatch],
  );

  const handleStatusFilter = useCallback(
    (status: StatusFilter) => {
      dispatch(setStatusFilter(status));
    },
    [dispatch],
  );

  const handleSort = useCallback(
    (sortBy: SortBy) => {
      dispatch(setSortBy(sortBy));
    },
    [dispatch],
  );

  return {
    filters,
    filteredProducts,
    handleSearch,
    handleStatusFilter,
    handleSort,
  };
}
