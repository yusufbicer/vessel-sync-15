import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { AuthContext } from './AuthContext';
import { fetchUserProfile, signUpUser, signInUser, logoutUser, checkIsAdmin } from './authUtils';
import { Profile, MetadataTypes } from './types';

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
        const userProfile = await fetchUserProfile(session.user.id);
        if (userProfile) {
          setProfile(userProfile);
          setIsAdmin(checkIsAdmin(userProfile));
        }
      }
      
      setIsLoading(false);
      
      // Listen for auth changes
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          const userProfile = await fetchUserProfile(session.user.id);
          if (userProfile) {
            setProfile(userProfile);
            setIsAdmin(checkIsAdmin(userProfile));
          }
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
  
  const refreshProfile = async () => {
    if (user) {
      const userProfile = await fetchUserProfile(user.id);
      if (userProfile) {
        setProfile(userProfile);
        setIsAdmin(checkIsAdmin(userProfile));
      } else {
        setProfile(null);
        setIsAdmin(false);
      }
    }
  };
  
  const signUp = async (email: string, password: string, metadata: MetadataTypes = {}) => {
    return signUpUser(email, password, metadata);
  };
  
  const signIn = async (email: string, password: string) => {
    const result = await signInUser(email, password);
    
    if (!result.error) {
      navigate('/dashboard');
    }
    
    return result;
  };
  
  const logout = async () => {
    await logoutUser();
    navigate('/login');
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
