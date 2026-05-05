import { createSelector } from '@reduxjs/toolkit';
import { selectAllProducts, selectProductById } from '@/features/products/productsSlice';
import type { RootState } from '@/app/store';

const selectFilters = (state: RootState) => state.filters;
const selectSelectedProductId = (state: RootState) => state.ui.selectedProductId;

export const selectSelectedProduct = createSelector(
  [(state: RootState) => state, selectSelectedProductId],
  (state, productId) => (productId ? selectProductById(state, productId) : undefined),
);

export const selectStatusCounts = createSelector(
  [selectAllProducts],
  (products) => {
    let active = 0;
    let inactive = 0;
    for (const p of products) {
      if (p.status === 'active') active++;
      else inactive++;
    }
    return { all: products.length, active, inactive };
  },
);

export const selectFilteredProducts = createSelector(
  [selectAllProducts, selectFilters],
  (products, filters) => {
    const { search, statusFilter, sortBy, categories, priceRange, vendors } = filters;
    const searchLower = search.toLowerCase();
    const categorySet = new Set(categories);
    const vendorSet = new Set(vendors);

    const filtered = products.filter((product) => {
      if (statusFilter !== 'all' && product.status !== statusFilter) {
        return false;
      }

      if (
        searchLower &&
        !product.name.toLowerCase().includes(searchLower) &&
        !product.id.toLowerCase().includes(searchLower)
      ) {
        return false;
      }

      if (categorySet.size > 0 && !categorySet.has(product.category)) {
        return false;
      }

      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      if (vendorSet.size > 0 && !vendorSet.has(product.vendor)) {
        return false;
      }

      return true;
    });

    const sorted = [...filtered];
    switch (sortBy) {
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
    }

    return sorted;
  }
);
