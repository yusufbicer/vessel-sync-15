
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarNavigationProps {
  navigation: NavItem[];
  onItemClick?: () => void;
}

const SidebarNavigation = ({ navigation, onItemClick }: SidebarNavigationProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col gap-1 px-2 py-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
      {navigation.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
            onClick={onItemClick}
          >
            <Icon className="h-5 w-5" />
            <span className="truncate">{item.name}</span>
            {active && (
              <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarNavigation;
