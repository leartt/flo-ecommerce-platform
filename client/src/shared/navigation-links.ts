export interface NavigationLinkType {
  path: string;
  name: string;
  isAccountMenu?: boolean;
}

const baseNavigationLinks: NavigationLinkType[] = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/shop',
    name: 'Shop',
  },
  {
    path: '/contact',
    name: 'Contact',
  },
  {
    path: '/about',
    name: 'About',
  },
];

export const guestNavigationLinks: NavigationLinkType[] = [
  ...baseNavigationLinks,
  {
    path: '/login',
    name: 'Login',
    isAccountMenu: true,
  },
  {
    path: '/Signup',
    name: 'Signup',
    isAccountMenu: true,
  },
];

export const authorizedNavigationLinks: NavigationLinkType[] = [
  ...baseNavigationLinks,
  {
    path: '/my-account',
    name: 'My Account',
    isAccountMenu: true,
  },
  {
    path: '/logout',
    name: 'Logout',
    isAccountMenu: true,
  },
];
