import { useState } from "react";
import { Modal, Typography, Radio, Button, App } from "antd";
import { useSendFlow } from "@/hooks/useSendFlow";
import styles from "./ItemDetailsModal.module.css";

const { Title, Text, Paragraph } = Typography;

export default function ItemDetailsModal() {
  const { notification } = App.useApp();
  const {
    selectedProduct,
    selectedOptions,
    itemDetailsOpen,
    proceedToSend,
    closeFlow,
    selectColor,
    selectSize,
  } = useSendFlow();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!selectedProduct) return null;

  const allImages = [selectedProduct.image, ...selectedProduct.images];

  const handleSendItem = () => {
    if (!selectedOptions.color || !selectedOptions.size) {
      notification.warning({
        message: "Selection Required",
        description: "Please select both a color and a size before proceeding.",
        placement: "topRight",
      });
      return;
    }
    proceedToSend();
  };

  return (
    <Modal
      title="Item Details"
      open={itemDetailsOpen}
      onCancel={closeFlow}
      width={800}
      footer={
        <div className={styles.footer}>
          <Button onClick={closeFlow}>Back</Button>
          <Button type="primary" onClick={handleSendItem}>
            Send Item
          </Button>
        </div>
      }
    >
      <Text
        type="secondary"
        style={{ display: "block", marginBottom: 16, fontSize: 13 }}
      >
        Review product information, pricing and specifications and other details
        below.
      </Text>
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <div className={styles.mainImageWrapper}>
            <img
              src={allImages[activeImageIndex]}
              alt={selectedProduct.name}
              className={styles.mainImage}
            />
          </div>
          <div className={styles.thumbnailRow}>
            {allImages.map((img, i) => (
              <img
                key={img}
                src={img}
                alt={`Thumbnail ${i + 1}`}
                className={`${styles.thumbnail} ${i === activeImageIndex ? styles.thumbnailActive : ""}`}
                onClick={() => setActiveImageIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className={styles.rightColumn}>
          <Title level={4} style={{ margin: 0 }}>
            {selectedProduct.name}
          </Title>
          <Text className={styles.price}>
            ${selectedProduct.price.toFixed(2)}
          </Text>
          <Text type="secondary" className={styles.vendor}>
            {selectedProduct.vendor}
          </Text>

          <Paragraph className={styles.description}>
            {selectedProduct.description}
          </Paragraph>

          <div className={styles.optionsSection}>
            <Text strong style={{ fontSize: 13 }}>
              Product Options Available
            </Text>

            <div className={styles.optionGroup}>
              <Text type="secondary" className={styles.optionLabel}>
                Select Color
              </Text>
              <Radio.Group
                value={selectedOptions.color}
                onChange={(e) => selectColor(e.target.value)}
                optionType="button"
                buttonStyle="outline"
                size="small"
              >
                {selectedProduct.colors.map((color) => (
                  <Radio.Button key={color} value={color}>
                    {color}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </div>

            <div className={styles.optionGroup}>
              <Text type="secondary" className={styles.optionLabel}>
                Select Size
              </Text>
              <Radio.Group
                value={selectedOptions.size}
                onChange={(e) => selectSize(e.target.value)}
                optionType="button"
                buttonStyle="outline"
                size="small"
              >
                {selectedProduct.sizes.map((size) => (
                  <Radio.Button key={size} value={size}>
                    {size}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </div>
          </div>

          <div className={styles.deliveryInfo}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              ✓ Free delivery available
            </Text>
          </div>
        </div>
      </div>
    </Modal>
  );
}
