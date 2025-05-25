import { cn } from '@/lib/utils';
import { type FC, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ items, separator = '/', className }) => {
  return (
    <nav className={cn('flex items-center text-sm text-muted-foreground', className)} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={item.label} className="flex items-center gap-1">
            {index > 0 && <span className="px-1">{separator}</span>}

            {!isLast && item.href ? (
              <Link
                to={item.href}
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground flex items-center gap-1 font-medium">
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
