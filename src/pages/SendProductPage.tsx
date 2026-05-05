import { lazy, Suspense, useState } from "react";
import { Col, Row, Typography, Drawer } from "antd";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSendFlow } from "@/hooks/useSendFlow";
import SendFiltersPanel from "@/components/send/SendFiltersPanel";
import ProductGrid from "@/components/products/ProductGrid";
import styles from "./SendProductPage.module.css";

const ItemDetailsModal = lazy(
  () => import("@/components/send/ItemDetailsModal"),
);
const SendConnectModal = lazy(
  () => import("@/components/send/SendConnectModal"),
);

const { Title } = Typography;

export default function SendProductPage() {
  const { openDetails, itemDetailsOpen, sendConnectOpen } = useSendFlow();
  const isMobile = useMediaQuery("(max-width: 992px)");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  return (
    <div className={styles.page}>
      <Title level={3} style={{ marginBottom: 16 }}>
        Send Item
      </Title>
      <Row gutter={24}>
        {!isMobile && (
          <Col lg={6}>
            <SendFiltersPanel />
          </Col>
        )}
        <Col xs={24} lg={18}>
          <ProductGrid
            onCardClick={openDetails}
            onFilterClick={
              isMobile ? () => setFilterDrawerOpen(true) : undefined
            }
          />
        </Col>
      </Row>

      {isMobile && (
        <Drawer
          title="Filters"
          placement="right"
          open={filterDrawerOpen}
          onClose={() => setFilterDrawerOpen(false)}
          width={300}
          styles={{ body: { padding: 0 } }}
        >
          <SendFiltersPanel />
        </Drawer>
      )}

      <Suspense fallback={null}>
        {itemDetailsOpen && <ItemDetailsModal />}
        {sendConnectOpen && <SendConnectModal />}
      </Suspense>
    </div>
  );
}
