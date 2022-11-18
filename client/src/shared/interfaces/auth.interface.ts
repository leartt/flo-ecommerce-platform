import { UserShippingAddress } from '@src/shared/interfaces/user.interface';

interface UserRole {
  type: 'basic' | 'editor' | 'admin' | 'superadmin';
  privileges: string[];
}

// {
//   basic: 'basic';
//   editor: 'editor';
//   admin: 'admin';
//   superadmin: 'superadmin';
// };

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
  __v: string | number;
  shippingAddresses: [UserShippingAddress];
  billingAddresses: [any];
}

export interface LoginRequestData {
  usernameOrEmail: string;
  password: string;
}

export interface SignupRequestData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
