
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface MobileNavigationProps {
  navigation: NavItem[];
  currentPageName: string;
}

const MobileNavigation = ({ navigation, currentPageName }: MobileNavigationProps) => {
  return (
    <div className="flex-1 px-2 lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-8 w-full justify-between px-2 text-sm">
            <span className="truncate">{currentPageName || 'Navigation'}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-52">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <DropdownMenuItem key={item.name} asChild>
                <Link to={item.href} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="truncate">{item.name}</span>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileNavigation;
