
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

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // Kimlik doğrulama gerektiren sayfalar için kullanıcı giriş yapmamışsa null döndür
  if (requireAuth && !user) {
    return null;
  }

  // Admin gerektiren sayfalar için kullanıcı admin değilse null döndür
  if (requireAdmin && !isAdmin) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
