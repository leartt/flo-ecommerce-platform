import { UserShippingAddress } from './user.interface';
import { Product } from './product.interface';
import { User } from './auth.interface';

interface OrderProduct extends Product {
  quantity: number;
}

export interface Order {
  paymentIntentId: string;
  paymentStatus: string;
  deliveryStatus: string;
  totalPrice: number;
  subtotal: number;
  discount?: {
    code: string;
    percentage: string;
    value: string;
  };
  paymentMethodDetails: {
    card: {
      brand: string;
      expMonth: number;
      expYear: number;
      last4Digit: string;
    };
  };
  products: OrderProduct[];
  person: User;
  shippingAddress: UserShippingAddress;
  orderNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetOrderByOrderNumberApiResponse {
  success: boolean;
  order: Order;
}
