export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[]; // [front, back, side, close-up]
  sizes: string[];
  colors: string[];
  features: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  trackingNumber?: string;
  shippingCarrier?: string;
  shippingInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    instructions?: string;
  };
  paymentMethod: 'card' | 'qr' | 'cod';
  createdAt: string;
}
