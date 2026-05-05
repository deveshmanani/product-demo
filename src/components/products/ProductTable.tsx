import { useState } from "react";
import { Table, Tag, Dropdown, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useProductFilters } from "@/hooks/useProductFilters";
import { PAGINATION } from "@/constants";
import type { Product } from "@/features/products/types";
import styles from "./ProductTable.module.css";

const actionMenuItems = [
  { key: "edit", label: "Edit" },
  { key: "delete", label: "Delete" },
];

const columns: ColumnsType<Product> = [
  {
    title: "Product",
    dataIndex: "name",
    key: "name",
    render: (_: string, record: Product) => (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img
          src={record.image}
          alt={record.name}
          className={styles.thumbnail}
        />
        <div>
          <div className={styles.productName}>{record.name}</div>
          {record.description && (
            <div
              className={styles.productId}
              style={{
                maxWidth: 200,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {record.description}
            </div>
          )}
        </div>
      </div>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width: 100,
    render: (price: number) => `$${price.toFixed(2)}`,
  },
  {
    title: "Product ID",
    dataIndex: "id",
    key: "id",
    width: 120,
    render: (id: string) => <span className={styles.productId}>{id}</span>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 100,
    render: (status: Product["status"]) => (
      <Tag color={status === "active" ? "green" : "red"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Tag>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    width: 60,
    align: "center",
    render: () => (
      <Dropdown menu={{ items: actionMenuItems }} trigger={["click"]}>
        <Button type="text" icon={<MoreOutlined />} size="small" />
      </Dropdown>
    ),
  },
];

export default function ProductTable() {
  const { filteredProducts } = useProductFilters();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  return (
    <div className={styles.tableWrapper}>
      <Table<Product>
        rowKey="id"
        columns={columns}
        dataSource={filteredProducts}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        pagination={{
          pageSize: PAGINATION.PAGE_SIZE,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          showSizeChanger: false,
        }}
        scroll={{ x: 600 }}
        size="middle"
      />
    </div>
  );
}
