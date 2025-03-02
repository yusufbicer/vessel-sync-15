
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
      // Debug info
      console.log("AuthGuard - User:", user?.email);
      console.log("AuthGuard - Is Admin:", isAdmin);
      console.log("AuthGuard - Require Admin:", requireAdmin);
      console.log("AuthGuard - Current Path:", location.pathname);
      
      if (requireAuth && !user) {
        // Not authenticated, redirect to login
        navigate(redirectTo);
      } else if (requireAdmin && !isAdmin) {
        // Not admin, redirect to dashboard
        navigate('/dashboard');
      } else if (user && isAdmin && location.pathname === '/dashboard') {
        // Admin user is at regular dashboard, redirect to admin dashboard
        console.log("Redirecting admin to admin dashboard");
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

  // For auth required pages when user is not logged in
  if (requireAuth && !user) {
    return null;
  }

  // For admin required pages when user is not admin
  if (requireAdmin && !isAdmin) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
