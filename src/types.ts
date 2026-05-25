export interface Watch {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  description: string;
  image: string;
  category: 'Luxury' | 'Sport' | 'Minimalist' | 'Classic';
}

export interface CartItem extends Watch {
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  email: string;
  whatsappNumber: string;
  location: string;
  deliveryMethod: 'Home Delivery' | 'Office Pickup';
  paymentMethod: 'bKash' | 'Cash on Delivery';
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerDetails;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
}
