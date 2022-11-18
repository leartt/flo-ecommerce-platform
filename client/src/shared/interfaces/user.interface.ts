interface UserAddress {
  customerName: string;
  city: string;
  country: string;
  line1: string;
  line2?: string;
  postalCode: string;
  _id: string;
}

export interface UserBillingAddress extends UserAddress {}

export interface UserShippingAddress extends UserAddress {}
