import type { FC } from 'react';
import { logoPrimaryImg } from '@assets';
import { SiteConfig } from '@configs/site-config';
import { GearIcon, BellIcon } from '@icons';
import { Button } from '@custom';
import ThemeSwitch from '@components/common/theme-switch';
import LogoutButton from './common/logout-button';

const ProjectsPageHeader: FC = () => {
  return (
    <header className="flex justify-center px-4 sm:px-6">
      <div className="py-6 flex flex-wrap w-full justify-between items-center gap-4 max-w-7xl">
        <div className="flex-shrink-0">
          <img
            src={logoPrimaryImg}
            alt={SiteConfig.appName}
            loading="lazy"
            decoding="async"
            height={150}
            width={150}
          />
        </div>
        <div className="flex gap-2 items-center flex-wrap sm:flex-nowrap">
          <Button size="icon" variant="secondary">
            <GearIcon height={18} />
          </Button>
          <Button size="icon" variant="secondary">
            <BellIcon height={18} />
          </Button>
          <ThemeSwitch />
          <LogoutButton
            buttonProps={{ size: 'icon', variant: 'secondary' }}
            iconProps={{ height: 18 }} />
        </div>
      </div>
    </header>
  );
};

export default ProjectsPageHeader;
