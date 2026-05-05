import { Row, Col, Input, Select, Empty, Dropdown, Button } from 'antd';
import { FilterOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { useProductFilters } from '@/hooks/useProductFilters';
import ProductCard from '@/components/products/ProductCard';
import type { SortBy } from '@/features/products/types';
import styles from './ProductGrid.module.css';

const sortOptions: { label: string; value: SortBy }[] = [
  { label: 'Alphabetical (A-Z)', value: 'name-asc' },
  { label: 'Alphabetical (Z-A)', value: 'name-desc' },
  { label: 'Price (Low to High)', value: 'price-asc' },
  { label: 'Price (High to Low)', value: 'price-desc' },
];

interface ProductGridProps {
  onCardClick: (productId: string) => void;
  onFilterClick?: () => void;
}

export default function ProductGrid({ onCardClick, onFilterClick }: ProductGridProps) {
  const { filters, filteredProducts, handleSearch, handleSort } =
    useProductFilters();

  return (
    <div>
      <div className={styles.toolbar}>
        <Select
          className={styles.sortSelect}
          placeholder="Sort"
          options={sortOptions}
          value={filters.sortBy}
          onChange={handleSort}
        />
        <Input.Search
          className={styles.searchInput}
          placeholder="Search by name or ID"
          allowClear
          onChange={(e) => handleSearch(e.target.value)}
        />
        {onFilterClick && (
          <Button
            icon={<FilterOutlined />}
            onClick={onFilterClick}
            className={styles.filterIconBtn}
          />
        )}
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

      {filteredProducts.length === 0 ? (
        <Empty description="No products found" style={{ marginTop: 40 }} />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredProducts.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <ProductCard product={product} onClick={onCardClick} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
