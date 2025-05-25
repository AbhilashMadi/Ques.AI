import Sider from '@components/sider';
import { Outlet } from 'react-router-dom';

export default function ProjectDashboardLayout() {
  return (<main>
    <Sider />
    <Outlet />
  </main>)
}