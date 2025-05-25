import Sider from '@components/sider';
import { Outlet } from 'react-router-dom';
import ProjectsDashboardHeader from '@components/projects-dashboard-header';

export default function ProjectDashboardLayout() {
  return (<main className="flex">
    <Sider />
    <div className="p-8 flex-1 space-y-6">
      <ProjectsDashboardHeader />
      <Outlet />
    </div>
  </main>)
}