
import { useEffect, ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  redirectTo?: string;
}

const AuthGuard = ({
  children,
  requireAuth = false,
  requireAdmin = false,
  redirectTo = '/login',
}: AuthGuardProps) => {
  const { user, isLoading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading) {
      console.log('AuthGuard check:', { 
        user: !!user, 
        isAdmin, 
        requireAuth, 
        requireAdmin, 
        path: location.pathname 
      });
      
      if (requireAuth && !user) {
        // Redirect to login if authentication is required but user is not logged in
        navigate(redirectTo);
      } else if (requireAdmin && !isAdmin) {
        // Redirect to dashboard if admin is required but user is not admin
        console.log('User is not admin, redirecting from admin page');
        navigate('/dashboard');
      } else if (user && isAdmin && location.pathname === '/dashboard') {
        // Redirect admin users to admin dashboard if they're on the regular dashboard
        console.log('Admin user at dashboard, redirecting to admin dashboard');
        navigate('/dashboard/admin');
      }
    }
  }, [user, isLoading, isAdmin, navigate, requireAuth, requireAdmin, redirectTo, location.pathname]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // Return null if auth is required but user is not logged in
  if (requireAuth && !user) {
    return null;
  }

  // Return null if admin is required but user is not admin
  if (requireAdmin && !isAdmin) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
