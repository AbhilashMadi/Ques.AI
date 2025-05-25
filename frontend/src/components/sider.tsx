import useSessionStorage from '@/hooks/use-session-storage';
import { cn } from '@/lib/utils';
import StorageKeys from '@/resources/storage-keys';
import {
  logoPrimaryImg,
  logoSymbolImg
} from '@assets';
import {
  Button,
  NavItem,
  Tooltip,
  UserCard,
} from '@custom';
import {
  ChevronRight,
  DiamondIcon,
  GearIcon,
  LayersIcon,
  PencilIcon,
  PlusIcon
} from '@icons';
import {
  type FC
} from 'react';

const Sider: FC = () => {
  const [collapse, setCollapse] = useSessionStorage(StorageKeys.COLLSPED, false);

  const toggleCollapse = () => setCollapse((prev) => !prev);

  return (
    <aside
      className={cn(
        'bg-card min-h-screen transition-all duration-300 ease-in-out flex flex-col relative border-r border-border',
        collapse ? 'w-[56px] p-2' : 'w-[250px] p-6'
      )}
    >
      {/* Logo */}
      <div className="flex items-center pl-2">
        <img
          src={collapse ? logoSymbolImg : logoPrimaryImg}
          alt="Logo"
          height={collapse ? 25 : 120}
          width={collapse ? 25 : 120}
          className="transition-all duration-300 ease-in-out"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Content */}
      <div className={cn('flex-1 divide-y divide-border [&>div]:py-4 flex justify-between flex-col', !collapse && 'overflow-hidden')}>
        {/* Top Nav */}
        <div className="pb-6 space-y-3">
          <Tooltip content="Add your Podcast(s)" className={!collapse ? 'hidden' : ''}>
            <NavItem collapse={collapse} icon={<PlusIcon height={20} />} title="Add your Podcast(s)" />
          </Tooltip>
          <Tooltip content="Create & Repurpose" className={!collapse ? 'hidden' : ''}>
            <NavItem collapse={collapse} icon={<PencilIcon height={20} />} title="Create & Repurpose" />
          </Tooltip>
          <Tooltip content="Podcast Widget" className={!collapse ? 'hidden' : ''}>
            <NavItem collapse={collapse} icon={<LayersIcon height={20} />} title="Podcast Widget" />
          </Tooltip>
          <Tooltip content="Upgrade" className={!collapse ? 'hidden' : ''}>
            <NavItem collapse={collapse} icon={<DiamondIcon height={20} />} title="Upgrade" />
          </Tooltip>
        </div>

        <div className="flex-1 flex items-end">
          <Tooltip content="Help" className={!collapse ? 'hidden' : ''}>
            <NavItem collapse={collapse} icon={<GearIcon height={20} />} title="Help" />
          </Tooltip>
        </div>

        {/* Bottom Nav */}
        <div className="mt-2">
          <UserCard collapse={collapse} />
        </div>
      </div>

      {/* Toggle Button */}
      <Button
        onClick={toggleCollapse}
        size="icon"
        className="rounded-full absolute bottom-1/2 -right-5 bg-primary text-primary-foreground hover:bg-primary/90 shadow"
      >
        <ChevronRight
          height={18}
          className={cn(
            'transform transition-transform duration-300 ease-in-out',
            collapse ? 'rotate-0' : 'rotate-180'
          )}
        />
      </Button>
    </aside>
  );
};

export default Sider;
