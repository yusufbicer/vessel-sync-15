
import { useState, ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Home,
  Menu,
  Truck,
  ShoppingBag,
  Package2,
  FileText,
  BarChart3,
  Settings,
} from 'lucide-react';
import Sidebar from './Sidebar';
import MobileNavigation from './MobileNavigation';
import UserDropdownMenu from './UserDropdownMenu';

interface DashboardShellProps {
  children: ReactNode;
}

const DashboardShell = ({ children }: DashboardShellProps) => {
  const { user, profile, logout, isAdmin, isLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Sevkiyatlarım', href: '/dashboard/shipments', icon: Truck },
    { name: 'Tedarikçilerim', href: '/dashboard/vendors', icon: ShoppingBag },
    { name: 'Konteynırlar', href: '/dashboard/containers', icon: Package2 },
    { name: 'Belgeler', href: '/dashboard/documents', icon: FileText },
    ...(isAdmin
      ? [{ name: 'Yönetim Paneli', href: '/dashboard/admin', icon: BarChart3 }]
      : []),
    { name: 'Ayarlar', href: '/dashboard/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await logout();
  };

  const currentPageName = navigation.find(item => isActive(item.href))?.name || 'Navigation';

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        navigation={navigation} 
        isSidebarOpen={isSidebarOpen} 
        closeSidebar={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <button
            className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Mobile Navigation Menu */}
          {isMobileView && (
            <MobileNavigation 
              navigation={navigation} 
              currentPageName={currentPageName} 
            />
          )}

          <div className="flex items-center gap-4">
            <UserDropdownMenu 
              profileName={profile?.full_name} 
              email={user?.email}
              initial={profile?.full_name?.charAt(0) || user?.email?.charAt(0) || '?'}
              onLogout={handleLogout}
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t px-4 py-4 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Groop - Tüm Hakları Saklıdır
        </footer>
      </div>
    </div>
  );
};

export default DashboardShell;
