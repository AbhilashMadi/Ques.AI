import useAuth from '@hooks/use-auth';
import { Navigate, Outlet } from 'react-router-dom';
import { SitePaths } from '@configs/site-config';

export default function PublicLayout() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated
    ? <Navigate to={SitePaths.PROJECTS} replace />
    : <Outlet />;
}
