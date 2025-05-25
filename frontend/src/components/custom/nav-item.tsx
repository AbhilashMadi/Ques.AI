import { cn } from '@/lib/utils';
import { type FC, type ReactNode } from 'react';

interface NavItemProps {
  icon: ReactNode;
  title: string;
  collapse: boolean;
  active?: boolean;
  className?: string;
}

const NavItem: FC<NavItemProps> = ({
  icon,
  title,
  collapse,
  active = false,
  className = ''
}) => {
  return (
    <button
      className={cn(
        'flex items-center gap-3 p-2 w-full',
        active ? 'bg-accent text-primary' : 'text-muted-foreground hover:bg-accent/[0.3] hover:text-primary',
        'cursor-pointer rounded transition-colors duration-200',
        className)}
      aria-label={collapse ? title : undefined}
    >
      <span className="flex-shrink-0">
        {icon}
      </span>
      {!collapse && (
        <span className="whitespace-nowrap font-medium transition-opacity duration-200">
          {title}
        </span>
      )}
    </button>
  );
};

export default NavItem;