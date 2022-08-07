import { Outlet, Navigate } from 'react-router-dom';
import useAuthStore from '@src/stores/auth';
import { useEffect } from 'react';

const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuthStore();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
