import { App, Form, Input, Select, Modal, Typography, Button } from "antd";
import { useAppDispatch } from "@/app/hooks";
import { createOrder } from "@/features/orders/ordersSlice";
import { useSendFlow } from "@/hooks/useSendFlow";
import styles from "./SendConnectModal.module.css";

const { Text } = Typography;

const countryOptions = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "India",
  "Japan",
].map((c) => ({ label: c, value: c }));

const formRules = {
  email: [
    { required: true, message: "Email is required" },
    { type: "email" as const, message: "Enter a valid email" },
  ],
  recipientName: [{ required: true, message: "Recipient name is required" }],
  line1: [{ required: true, message: "Address is required" }],
  country: [{ required: true, message: "Country is required" }],
  city: [{ required: true, message: "City is required" }],
  state: [{ required: true, message: "State is required" }],
  zip: [{ required: true, message: "Zip code is required" }],
};

export default function SendConnectModal() {
  const dispatch = useAppDispatch();
  const { notification } = App.useApp();
  const {
    selectedProduct,
    selectedOptions,
    sendConnectOpen,
    goBackToDetails,
    closeFlow,
  } = useSendFlow();
  const [form] = Form.useForm();

  if (!selectedProduct) return null;

  const handleSubmit = (values: {
    email: string;
    recipientName: string;
    recipientCompany?: string;
    line1: string;
    line2?: string;
    country: string;
    city: string;
    state: string;
    zip: string;
  }) => {
    const order = {
      id: crypto.randomUUID(),
      productId: selectedProduct.id,
      selectedColor: selectedOptions.color,
      selectedSize: selectedOptions.size,
      recipientEmail: values.email,
      recipientName: values.recipientName,
      recipientCompany: values.recipientCompany,
      address: {
        line1: values.line1,
        line2: values.line2,
        country: values.country,
        city: values.city,
        state: values.state,
        zip: values.zip,
      },
      createdAt: new Date().toISOString(),
    };

    dispatch(createOrder(order));
    form.resetFields();
    closeFlow();
    notification.success({
      message: "Order Sent Successfully!",
      description: "Your order has been placed.",
      placement: "topRight",
      duration: 3,
    });
  };

  const handleBack = () => {
    form.resetFields();
    goBackToDetails();
  };

  return (
    <Modal
      title="Send/Gift Connect"
      open={sendConnectOpen}
      onCancel={() => {
        form.resetFields();
        closeFlow();
      }}
      width={900}
      footer={
        <div className={styles.footer}>
          <Button onClick={handleBack}>Back</Button>
          <Button type="primary" onClick={() => form.submit()}>
            Confirm Order
          </Button>
        </div>
      }
    >
      <Text
        type="secondary"
        style={{ display: "block", marginBottom: 16, fontSize: 13 }}
      >
        Send a gift instantly to your recipient through filing out the details
        in the connect.
      </Text>
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <Text strong style={{ display: "block", marginBottom: 8 }}>
            Selected Item
          </Text>
          <div className={styles.itemSummary}>
            <div className={styles.summaryImageWrapper}>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className={styles.summaryImage}
              />
            </div>
            <div className={styles.summaryInfo}>
              <Text strong>{selectedProduct.name}</Text>
              <Text className={styles.summaryPrice}>
                ${selectedProduct.price.toFixed(2)}
              </Text>
              {selectedOptions.color && (
                <Text
                  type="secondary"
                  style={{ fontSize: 12, display: "block" }}
                >
                  Color: {selectedOptions.color}
                </Text>
              )}
              {selectedOptions.size && (
                <Text
                  type="secondary"
                  style={{ fontSize: 12, display: "block" }}
                >
                  Size: {selectedOptions.size}
                </Text>
              )}
            </div>
          </div>

          <div className={styles.productOptions}>
            <Text strong style={{ fontSize: 13 }}>
              Product Options
            </Text>
            <div className={styles.optionRow}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Color
              </Text>
              <Text style={{ fontSize: 12 }}>
                {selectedOptions.color || "—"}
              </Text>
            </div>
            <div className={styles.optionRow}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Size
              </Text>
              <Text style={{ fontSize: 12 }}>
                {selectedOptions.size || "—"}
              </Text>
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Text strong style={{ display: "block", marginBottom: 8 }}>
              Recipient Details
            </Text>
            <Form.Item
              label="Recipient Email"
              name="email"
              rules={formRules.email}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
            <Form.Item
              label="Recipient Name"
              name="recipientName"
              rules={formRules.recipientName}
            >
              <Input placeholder="Enter name" />
            </Form.Item>
            <Form.Item label="Recipient Company" name="recipientCompany">
              <Input placeholder="Enter company (optional)" />
            </Form.Item>

            <Text
              strong
              style={{ display: "block", marginBottom: 8, marginTop: 8 }}
            >
              Address Details
            </Text>
            <Form.Item
              label="Address Line 1"
              name="line1"
              rules={formRules.line1}
            >
              <Input placeholder="Street address" />
            </Form.Item>
            <Form.Item label="Address Line 2" name="line2">
              <Input placeholder="Apt, suite, etc. (optional)" />
            </Form.Item>
            <div style={{ display: "flex", gap: 12 }}>
              <Form.Item
                label="Country"
                name="country"
                rules={formRules.country}
                style={{ flex: 1 }}
              >
                <Select placeholder="Select country" options={countryOptions} />
              </Form.Item>
              <Form.Item
                label="City/Town"
                name="city"
                rules={formRules.city}
                style={{ flex: 1 }}
              >
                <Input placeholder="Enter city" />
              </Form.Item>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <Form.Item
                label="State"
                name="state"
                rules={formRules.state}
                style={{ flex: 1 }}
              >
                <Input placeholder="Enter state" />
              </Form.Item>
              <Form.Item
                label="Zip Code"
                name="zip"
                rules={formRules.zip}
                style={{ flex: 1 }}
              >
                <Input placeholder="Enter zip" />
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
