import { lazy, Suspense } from 'react';
import { Col, Row, Typography } from 'antd';
import { useSendFlow } from '@/hooks/useSendFlow';
import SendFiltersPanel from '@/components/send/SendFiltersPanel';
import ProductGrid from '@/components/products/ProductGrid';
import styles from './SendProductPage.module.css';

const ItemDetailsModal = lazy(
  () => import('@/components/send/ItemDetailsModal'),
);
const SendConnectModal = lazy(
  () => import('@/components/send/SendConnectModal'),
);

const { Title } = Typography;

export default function SendProductPage() {
  const { openDetails, itemDetailsOpen, sendConnectOpen } = useSendFlow();

  return (
    <div className={styles.page}>
      <Title level={3} style={{ marginBottom: 16 }}>Send Item</Title>
      <Row gutter={24}>
        <Col xs={24} lg={6}>
          <SendFiltersPanel />
        </Col>
        <Col xs={24} lg={18}>
          <ProductGrid onCardClick={openDetails} />
        </Col>
      </Row>

      <Suspense fallback={null}>
        {itemDetailsOpen && <ItemDetailsModal />}
        {sendConnectOpen && <SendConnectModal />}
      </Suspense>
    </div>
  );
}
