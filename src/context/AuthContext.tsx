
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

type Profile = {
  id: string;
  full_name: string;
  company_name: string;
  phone_number: string;
  email: string;
  role: string;
  account_balance: number;
};

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  signup: (email: string, password: string, userData: any) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  resetPassword: (email: string) => Promise<{
    error: any | null;
    data: any | null;
  }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const setData = async () => {
      try {
        setIsLoading(true);
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        setUser(data.session?.user ?? null);

        // Check if user is admin by fetching their profile
        if (data.session?.user) {
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.session.user.id)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
          } else if (profileData) {
            setProfile(profileData);
            setIsAdmin(profileData.role === 'admin');
            console.log('User role:', profileData.role);
            console.log('Is admin:', profileData.role === 'admin');
          }
        }
      } catch (error) {
        console.error('Error setting data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    setData();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Check if user is admin when auth state changes
        if (currentSession?.user) {
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', currentSession.user.id)
            .single();

          if (error) {
            console.error('Error fetching profile on auth change:', error);
          } else if (profileData) {
            setProfile(profileData);
            setIsAdmin(profileData.role === 'admin');
            console.log('User role (auth change):', profileData.role);
            console.log('Is admin (auth change):', profileData.role === 'admin');
          }
        } else {
          setProfile(null);
          setIsAdmin(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error, data: null };
      }

      // Fetch user profile after successful login
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile after login:', profileError);
      } else if (profileData) {
        setProfile(profileData);
        setIsAdmin(profileData.role === 'admin');
      }

      return { data, error: null };
    } catch (error) {
      console.error('Login error:', error);
      return { error, data: null };
    }
  };

  const signup = async (email: string, password: string, userData: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      return { data, error };
    } catch (error) {
      return { error, data: null };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
      setIsAdmin(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (data: Partial<Profile>) => {
    try {
      if (!user) return { error: 'No user logged in', data: null };

      const { data: updatedData, error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id)
        .select()
        .single();

      if (!error && updatedData) {
        setProfile(updatedData);
        setIsAdmin(updatedData.role === 'admin');
        toast({
          title: 'Profil güncellendi',
          description: 'Bilgileriniz başarıyla kaydedildi.',
        });
      }

      return { data: updatedData, error };
    } catch (error) {
      return { error, data: null };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      return { data, error };
    } catch (error) {
      return { error, data: null };
    }
  };

  const value = {
    user,
    session,
    profile,
    isAdmin,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
