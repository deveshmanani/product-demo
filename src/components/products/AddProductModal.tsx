import { useState } from "react";
import { App, Form, Input, InputNumber, Select, Modal, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addProduct } from "@/features/products/productsSlice";
import { closeAddProductModal } from "@/features/ui/uiSlice";
import { mockCategories } from "@/data/mockCategories";
import styles from "./AddProductModal.module.css";

const ACCEPT = "image/jpeg,image/png,image/gif,image/webp,image/svg+xml";
const MAX_IMAGES = 5;

const categoryOptions = mockCategories.map((cat) => ({
  label: cat,
  value: cat,
}));

const formRules = {
  name: [
    { required: true, message: "Product name is required" },
    { min: 2, message: "Name must be at least 2 characters" },
  ],
  description: [{ required: true, message: "Description is required" }],
  category: [{ required: true, message: "Category is required" }],
  price: [
    { required: true, message: "Price is required" },
    {
      type: "number" as const,
      min: 0.01,
      message: "Price must be greater than 0",
    },
  ],
};

export default function AddProductModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.addProductModalOpen);
  const [form] = Form.useForm();
  const { notification } = App.useApp();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSubmit = (values: {
    name: string;
    description: string;
    category: string;
    processingTime?: string;
    price: number;
  }) => {
    const newProduct = {
      id: `PRD-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      name: values.name,
      description: values.description,
      category: values.category,
      processingTime: values.processingTime || "",
      price: values.price,
      image: `https://picsum.photos/seed/${Date.now()}/300/300`,
      images: [],
      status: "active" as const,
      vendor: "New Vendor",
      colors: [],
      sizes: [],
    };

    dispatch(addProduct(newProduct));
    dispatch(closeAddProductModal());
    form.resetFields();
    setFileList([]);
    notification.success({
      message: "Product Added Successfully",
      description: "Your product has been created.",
      placement: "topRight",
      duration: 3,
    });
  };

  const handleCancel = () => {
    dispatch(closeAddProductModal());
    form.resetFields();
    setFileList([]);
  };

  return (
    <Modal
      title="Add Product"
      open={isOpen}
      onCancel={handleCancel}
      width={720}
      okText="Add Product"
      okButtonProps={{
        style: { backgroundColor: "#4caf50", borderColor: "#4caf50" },
      }}
      onOk={() => form.submit()}
    >
      <p
        style={{
          color: "var(--ant-color-text-secondary)",
          marginBottom: 20,
          fontSize: 13,
        }}
      >
        Provide product details, images and pricing to make your Product
        available on the platform
      </p>
      <div className={styles.modalContent}>
        <div className={styles.leftColumn}>
          <div className={styles.sectionTitle}>General Information</div>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Name" name="name" rules={formRules.name}>
              <Input placeholder="Product Name" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={formRules.description}
            >
              <Input.TextArea rows={3} placeholder="Add Description..." />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={formRules.category}
            >
              <Select placeholder="Select Category" options={categoryOptions} />
            </Form.Item>

            <div style={{ display: "flex", gap: 16 }}>
              <Form.Item
                label="Processing Time"
                name="processingTime"
                style={{ flex: 1 }}
              >
                <Input placeholder="Enter Time" />
              </Form.Item>

              <Form.Item
                label="Price"
                name="price"
                rules={formRules.price}
                style={{ flex: 1 }}
              >
                <InputNumber
                  prefix="$"
                  placeholder="Enter Price"
                  style={{ width: "100%" }}
                  min={0}
                  precision={2}
                />
              </Form.Item>
            </div>
          </Form>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.sectionTitle}>Product Media</div>
          <Upload.Dragger
            accept={ACCEPT}
            fileList={fileList}
            onChange={({ fileList: newList }) => setFileList(newList)}
            beforeUpload={() => false}
            maxCount={MAX_IMAGES}
            multiple
            className={styles.dragger}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined className={styles.uploadIcon} />
            </p>
            <p className={styles.uploadText}>
              Drop your Images, or{' '}
              <span className={styles.browseLink}>Click to Browse</span>
            </p>
            <p className={styles.uploadHint}>
              1600 × 1200 (4:3) recommended, up to 10MB
            </p>
          </Upload.Dragger>
        </div>
      </div>
    </Modal>
  );
}
