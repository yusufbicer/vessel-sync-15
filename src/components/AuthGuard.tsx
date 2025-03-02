
import { useEffect, ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
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

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !user) {
        navigate(redirectTo);
      } else if (requireAdmin && !isAdmin) {
        navigate('/dashboard');
      }
    }
  }, [user, isLoading, isAdmin, navigate, requireAuth, requireAdmin, redirectTo]);

  useEffect(() => {
    // Debug for admin role
    if (user && !isLoading) {
      console.log("Auth Guard - User:", user.email);
      console.log("Auth Guard - Is Admin:", isAdmin);
    }
  }, [user, isLoading, isAdmin]);

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
