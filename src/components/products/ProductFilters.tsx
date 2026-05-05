import { Radio, Input, Select, Button, Dropdown } from 'antd';
import { PlusOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { openAddProductModal } from '@/features/ui/uiSlice';
import { selectStatusCounts } from '@/features/products/selectors';
import { useProductFilters } from '@/hooks/useProductFilters';
import type { SortBy } from '@/features/products/types';
import styles from './ProductFilters.module.css';

const sortOptions: { label: string; value: SortBy }[] = [
  { label: 'Alphabetical (A-Z)', value: 'name-asc' },
  { label: 'Alphabetical (Z-A)', value: 'name-desc' },
  { label: 'Price (Low to High)', value: 'price-asc' },
  { label: 'Price (High to Low)', value: 'price-desc' },
];

export default function ProductFilters() {
  const dispatch = useAppDispatch();
  const { filters, handleSearch, handleStatusFilter, handleSort } =
    useProductFilters();
  const counts = useAppSelector(selectStatusCounts);

  return (
    <div className={styles.filtersBar}>
      <Radio.Group
        className={styles.statusGroup}
        buttonStyle="solid"
        value={filters.statusFilter}
        onChange={(e) => handleStatusFilter(e.target.value)}
      >
        <Radio.Button value="all">
          All <span className={styles.countBadge}>{counts.all}</span>
        </Radio.Button>
        <Radio.Button value="active">
          Active <span className={styles.countBadge}>{counts.active}</span>
        </Radio.Button>
        <Radio.Button value="inactive">
          Inactive <span className={styles.countBadge}>{counts.inactive}</span>
        </Radio.Button>
      </Radio.Group>

      <div className={styles.searchRow}>
        <Input.Search
          className={styles.searchInput}
          placeholder="Search by name or ID"
          allowClear
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Dropdown
          menu={{
            items: sortOptions.map((opt) => ({
              key: opt.value,
              label: opt.label,
            })),
            selectedKeys: [filters.sortBy],
            onClick: ({ key }) => handleSort(key as SortBy),
          }}
          trigger={['click']}
        >
          <Button
            icon={<SortAscendingOutlined />}
            className={styles.sortIconBtn}
          />
        </Dropdown>
      </div>

      <Select
        className={styles.sortSelect}
        placeholder="Sort"
        options={sortOptions}
        value={filters.sortBy}
        onChange={handleSort}
      />

      <Select
        className={styles.bulkSelect}
        placeholder="Bulk Action"
        disabled
      />

      <div className={styles.spacer} />

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => dispatch(openAddProductModal())}
        style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }}
      >
        Add Product
      </Button>
    </div>
  );
}
