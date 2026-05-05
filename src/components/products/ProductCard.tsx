import { Card, Typography } from 'antd';
import type { Product } from '@/features/products/types';
import styles from './ProductCard.module.css';

const { Text } = Typography;

interface ProductCardProps {
  product: Product;
  onClick: (productId: string) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card
      hoverable
      className={styles.card}
      cover={
        <div className={styles.imageWrapper}>
          <img src={product.image} alt={product.name} className={styles.image} />
        </div>
      }
      onClick={() => onClick(product.id)}
      styles={{ body: { padding: 12 } }}
    >
      <Text strong className={styles.name}>{product.name}</Text>
      <Text className={styles.price}>${product.price.toFixed(2)}</Text>
      <Text type="secondary" className={styles.vendor}>{product.vendor}</Text>
    </Card>
  );
}
