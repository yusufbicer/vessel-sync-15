
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

type Profile = {
  id: string;
  full_name: string;
  company_name: string;
  email: string;
  phone_number: string;
  role: string | null;
};

interface MetadataTypes {
  fullName?: string;
  companyName?: string;
  phoneNumber?: string;
  [key: string]: any;
}

type AuthContextType = {
  user: any;
  profile: Profile | null;
  isAdmin: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string, metadata?: MetadataTypes) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAdmin: false,
  isLoading: true,
  signUp: async () => ({ user: null, error: null }),
  signIn: async () => ({ user: null, error: null }),
  logout: async () => {},
  refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      
      // Get session
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await fetchUserProfile(session.user.id);
      }
      
      setIsLoading(false);
      
      // Listen for auth changes
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
          setIsAdmin(false);
        }
      });
      
      return () => {
        authListener.subscription.unsubscribe();
      };
    };
    
    initializeAuth();
  }, []);
  
  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user ID:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }
      
      console.log('Fetched profile:', data);
      
      if (data) {
        setProfile(data);
        // Explicitly check for 'admin' string
        const isUserAdmin = data.role === 'admin';
        console.log('Is user admin?', isUserAdmin, 'Role:', data.role);
        setIsAdmin(isUserAdmin);
      } else {
        console.log('No profile data found');
        setProfile(null);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setProfile(null);
      setIsAdmin(false);
    }
  };
  
  const signUp = async (email: string, password: string, metadata: MetadataTypes = {}) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: metadata.fullName || '',
            company_name: metadata.companyName || '',
            phone_number: metadata.phoneNumber || '',
          },
        },
      });
      
      return { user: data.user, error };
    } catch (error) {
      console.error('Error signing up:', error);
      return { user: null, error };
    }
  };
  
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (!error) {
        navigate('/dashboard');
      }
      
      return { user: data.user, error };
    } catch (error) {
      console.error('Error signing in:', error);
      return { user: null, error };
    }
  };
  
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };

  // Keep session active when navigating to the main page
  useEffect(() => {
    if (location.pathname === '/' && user) {
      console.log('User is logged in and on the landing page');
      // We intentionally do nothing here to keep the session active
    }
  }, [location.pathname, user]);
  
  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAdmin,
        isLoading,
        signUp,
        signIn,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
