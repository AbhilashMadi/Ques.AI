import type { FC } from 'react';
import { logoPrimaryImg } from '@assets';
import { SiteConfig } from '@configs/site-config';
import { GearIcon, BellIcon } from '@icons';
import { Button } from '@custom';
import ThemeSwitch from '@components/common/theme-switch';

const ProjectsPageHeader: FC = () => {
  return (<header className="flex justify-center">
    <div className="py-12 flex grow justify-between items-center max-w-7xl">
      <img
        src={logoPrimaryImg}
        alt={SiteConfig.appName}
        loading="lazy"
        decoding="async"
        height={150}
        width={150} />
      <div className="flex gap-2">
        <Button size="icon" variant="secondary"><GearIcon height={18} /></Button>
        <Button size="icon" variant="secondary"><BellIcon height={18} /></Button>
        <ThemeSwitch />
      </div>
    </div>
  </header>)
}

export default ProjectsPageHeader;