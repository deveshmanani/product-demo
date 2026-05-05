import { lazy, Suspense } from "react";
import { Select, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setCategories } from "@/features/filters/filtersSlice";
import ProductFilters from "@/components/products/ProductFilters";
import ProductTable from "@/components/products/ProductTable";
import { mockCategories } from "@/data/mockCategories";
import styles from "./ProductListPage.module.css";

const AddProductModal = lazy(
  () => import("@/components/products/AddProductModal"),
);

const { Title } = Typography;

const categoryOptions = [
  { label: "All Categories", value: "" },
  ...mockCategories.map((cat) => ({ label: cat, value: cat })),
];

export default function ProductListPage() {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((state) => state.ui.addProductModalOpen);

  const handleCategoryChange = (value: string) => {
    dispatch(setCategories(value ? [value] : []));
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <Title level={3} style={{ margin: 0 }}>
          Product List
        </Title>
        <Select
          defaultValue=""
          options={categoryOptions}
          onChange={handleCategoryChange}
          style={{ minWidth: 160 }}
        />
      </div>

      <ProductFilters />
      <ProductTable />

      <Suspense fallback={null}>{isModalOpen && <AddProductModal />}</Suspense>
    </div>
  );
}
