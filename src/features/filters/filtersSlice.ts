import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { StatusFilter, SortBy } from '@/features/products/types';

interface FiltersState {
  search: string;
  statusFilter: StatusFilter;
  sortBy: SortBy;
  categories: string[];
  priceRange: [number, number];
  vendors: string[];
}

const initialState: FiltersState = {
  search: '',
  statusFilter: 'all',
  sortBy: 'name-asc',
  categories: [],
  priceRange: [0, 500],
  vendors: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setStatusFilter(state, action: PayloadAction<StatusFilter>) {
      state.statusFilter = action.payload;
    },
    setSortBy(state, action: PayloadAction<SortBy>) {
      state.sortBy = action.payload;
    },
    toggleCategory(state, action: PayloadAction<string>) {
      const idx = state.categories.indexOf(action.payload);
      if (idx === -1) {
        state.categories.push(action.payload);
      } else {
        state.categories.splice(idx, 1);
      }
    },
    setCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
    },
    setPriceRange(state, action: PayloadAction<[number, number]>) {
      state.priceRange = action.payload;
    },
    toggleVendor(state, action: PayloadAction<string>) {
      const idx = state.vendors.indexOf(action.payload);
      if (idx === -1) {
        state.vendors.push(action.payload);
      } else {
        state.vendors.splice(idx, 1);
      }
    },
    setVendors(state, action: PayloadAction<string[]>) {
      state.vendors = action.payload;
    },
    clearAllFilters() {
      return initialState;
    },
  },
});

export const {
  setSearch,
  setStatusFilter,
  setSortBy,
  toggleCategory,
  setCategories,
  setPriceRange,
  toggleVendor,
  setVendors,
  clearAllFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
