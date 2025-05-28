import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@hooks/use-auth'
import { SitePaths } from '@configs/site-config';

export default function PrivateLayout() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated
    ? <Outlet />
    : <Navigate to={SitePaths.AUTH_LOGIN} replace />
}