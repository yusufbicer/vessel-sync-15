
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, X } from 'lucide-react';
import SidebarNavigation from './SidebarNavigation';

interface SidebarProps {
  navigation: Array<{
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar = ({ navigation, isSidebarOpen, closeSidebar }: SidebarProps) => {
  return (
    <>
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-background transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link to="/" className="flex items-center gap-2 text-foreground group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary/20">
              <Package className="h-5 w-5 text-primary transition-all" />
            </div>
            <span className="font-display text-xl font-semibold">Groop</span>
          </Link>
          <button
            className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden"
            onClick={closeSidebar}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <SidebarNavigation navigation={navigation} onItemClick={closeSidebar} />
      </div>
    </>
  );
};

export default Sidebar;
