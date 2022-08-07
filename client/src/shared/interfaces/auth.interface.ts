export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: any;
  __v: string | number;
  shippingAddresses: [any];
  billingAddresses: [any];
}

export interface LoginRequestData {
  usernameOrEmail: string;
  password: string;
}
