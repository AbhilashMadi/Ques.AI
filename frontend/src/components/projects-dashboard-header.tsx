import { type FC } from 'react';
import { Button, Tooltip } from '@custom';
import { BellIcon, LogOutIcon, HomeIcon } from '@icons';
import { Breadcrumb } from '@custom';

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
        <Button variant="secondary" size="icon" className="rounded-full"><BellIcon height={16} /></Button>
      </Tooltip>
      <Tooltip content="Logout" position="left">
        <Button variant="secondary" size="icon" className="rounded-full text-destructive"><LogOutIcon height={16} /></Button>
      </Tooltip>
    </div>
  </header>)
}

export default ProjectsDashboardHeader;