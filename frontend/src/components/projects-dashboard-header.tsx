import LogoutButton from '@components/common/logout-button';
import { Breadcrumb, Button, Tooltip } from '@custom';
import { HomeIcon, LogOutIcon } from '@icons';
import { type FC } from 'react';

const ProjectsDashboardHeader: FC = () => {
  return (<header className="grow flex justify-between w-full">
    <Breadcrumb
      items={[
        { label: 'Home', href: '/', icon: <HomeIcon height={18} /> },
        { label: 'Projects', href: '/projects', icon: <>F</> },
        { label: 'My Project' },
      ]}
    />
    <div className="flex gap-2">
      <Tooltip content="Notifications" position="left">
        <LogoutButton size="icon" variant="secondary" className="rounded-full" />
      </Tooltip>
      <Tooltip content="Logout" position="left">
        <Button variant="secondary" size="icon" className="rounded-full text-destructive"><LogOutIcon height={16} /></Button>
      </Tooltip>
    </div>
  </header>)
}

export default ProjectsDashboardHeader;