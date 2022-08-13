import { Outlet, Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '@src/stores/auth';

const GuestRoutes = () => {
  const { isLoggedIn } = useAuthStore();

  return !isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default GuestRoutes;
