import React, { useEffect } from 'react';
import { logout } from '@src/utils/auth.utils';

const Logout = () => {
  useEffect(() => {
    logout();
  }, []);

  return null;
};

export default Logout;
