
import { supabase } from '@/integrations/supabase/client';
import { MetadataTypes, Profile } from './types';

export const fetchUserProfile = async (userId: string): Promise<Profile | null> => {
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
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const signUpUser = async (email: string, password: string, metadata: MetadataTypes = {}) => {
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

export const signInUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { user: data.user, error };
  } catch (error) {
    console.error('Error signing in:', error);
    return { user: null, error };
  }
};

export const logoutUser = async () => {
  try {
    await supabase.auth.signOut();
    return { error: null };
  } catch (error) {
    console.error('Error signing out:', error);
    return { error };
  }
};

export const checkIsAdmin = (profile: Profile | null): boolean => {
  if (!profile) return false;
  
  // Explicitly check for 'admin' string
  const isUserAdmin = profile.role === 'admin';
  console.log('Is user admin?', isUserAdmin, 'Role:', profile.role);
  return isUserAdmin;
};
