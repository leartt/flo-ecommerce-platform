import { Outlet, Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '@src/stores/auth';
import { useEffect } from 'react';

const ProtectedRoutes = () => {
  const location = useLocation();
  const { isLoggedIn } = useAuthStore();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
};

export default ProtectedRoutes;
