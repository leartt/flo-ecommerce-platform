import useAuthStore from '@src/stores/auth';
import { memo, useMemo, useState } from 'react';
import NavigationLink from '@src/components/NavigationLink';
import AccountMenu from '@src/components/AccountMenu';
import {
  guestNavigationLinks,
  authorizedNavigationLinks,
} from '@src/shared/navigation-links';

const NavigationMenu = () => {
  console.log('RENDERING NAVIGATION MENU');
  const { isLoggedIn } = useAuthStore();

  const navLinks = useMemo(() => {
    if (isLoggedIn) {
      return authorizedNavigationLinks.filter(item => !item.isAccountMenu);
    }
    return guestNavigationLinks.filter(item => !item.isAccountMenu);
  }, [isLoggedIn]);

  const navLinksAccount = useMemo(() => {
    if (isLoggedIn) {
      return authorizedNavigationLinks.filter(item => item.isAccountMenu);
    }
    return guestNavigationLinks.filter(item => item.isAccountMenu);
  }, [isLoggedIn]);

  return (
    <>
      {navLinks.map(item => (
        <NavigationLink key={item.path} to={item.path} name={item.name} />
      ))}
      <AccountMenu items={navLinksAccount} />
    </>
  );
};

export default memo(NavigationMenu);
