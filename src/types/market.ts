export interface Seller {
  id: string | number;
  name: string;
  profileImage?: string;
  isVerified?: boolean;
  location?: string;
  previousSales?: any[];
}

export interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
  seller: Seller;
  category?: string;
}

export interface ProductCardProps {
  product: Product;
  onRemove: (id: string | number) => void;
  onMarkAsSold: (id: string | number) => void;
  onSellerClick: (seller: Seller) => void;
  onAddToCart: (product: Product) => void;
}