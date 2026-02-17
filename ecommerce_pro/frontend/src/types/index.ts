export interface Review {
  id: number;
  content: string;
  rating: number;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  image_url: string;
  reviews: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: number;
  product_names: string;
  total_price: string;
  created_at: string;
}