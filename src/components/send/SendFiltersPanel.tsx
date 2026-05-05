import { useCallback, useEffect, useRef, useState } from 'react';
import { Checkbox, Collapse, Slider, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  toggleCategory,
  toggleVendor,
  setPriceRange,
  clearAllFilters,
} from '@/features/filters/filtersSlice';
import { mockCategories } from '@/data/mockCategories';
import { mockVendors } from '@/data/mockVendors';
import { PRICE_RANGE } from '@/constants';
import styles from './SendFiltersPanel.module.css';

const { Text } = Typography;

const ALL_KEYS = ['categories', 'price', 'vendors'];

export default function SendFiltersPanel() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const [localRange, setLocalRange] = useState<[number, number]>(filters.priceRange);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocalRange(filters.priceRange);
  }, [filters.priceRange]);

  const handleRangeChange = useCallback(
    (val: number[]) => {
      const range = val as [number, number];
      setLocalRange(range);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        dispatch(setPriceRange(range));
      }, 300);
    },
    [dispatch],
  );

  const collapseItems = [
    {
      key: 'categories',
      label: <Text strong style={{ fontSize: 13 }}>Categories</Text>,
      children: (
        <div className={styles.checkboxList}>
          {mockCategories.map((cat) => (
            <Checkbox
              key={cat}
              checked={filters.categories.includes(cat)}
              onChange={() => dispatch(toggleCategory(cat))}
            >
              {cat}
            </Checkbox>
          ))}
        </div>
      ),
    },
    {
      key: 'price',
      label: <Text strong style={{ fontSize: 13 }}>Price Range</Text>,
      children: (
        <>
          <Slider
            range
            min={PRICE_RANGE.MIN}
            max={PRICE_RANGE.MAX}
            value={localRange}
            onChange={handleRangeChange}
          />
          <div className={styles.priceLabels}>
            <span>${localRange[0]}</span>
            <span>${localRange[1]}</span>
          </div>
        </>
      ),
    },
    {
      key: 'vendors',
      label: <Text strong style={{ fontSize: 13 }}>Vendors</Text>,
      children: (
        <div className={styles.checkboxList}>
          {mockVendors.map((vendor) => (
            <Checkbox
              key={vendor}
              checked={filters.vendors.includes(vendor)}
              onChange={() => dispatch(toggleVendor(vendor))}
            >
              {vendor}
            </Checkbox>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <Text strong>Filters</Text>
        <button
          type="button"
          className={styles.clearAll}
          onClick={() => dispatch(clearAllFilters())}
        >
          Clear All
        </button>
      </div>

      <Collapse
        ghost
        bordered={false}
        className={styles.collapse}
        defaultActiveKey={ALL_KEYS}
        items={collapseItems}
      />
    </div>
  );
}
