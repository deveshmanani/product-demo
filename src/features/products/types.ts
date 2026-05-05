export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  processingTime: string;
  price: number;
  image: string;
  images: string[];
  status: 'active' | 'inactive';
  vendor: string;
  colors: string[];
  sizes: string[];
}

export interface Order {
  id: string;
  productId: string;
  selectedColor: string;
  selectedSize: string;
  recipientEmail: string;
  recipientName: string;
  recipientCompany?: string;
  address: {
    line1: string;
    line2?: string;
    country: string;
    city: string;
    state: string;
    zip: string;
  };
  createdAt: string;
}

export type StatusFilter = 'all' | 'active' | 'inactive';
export type SortBy = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';
