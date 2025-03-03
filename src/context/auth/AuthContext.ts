
import { createContext } from 'react';
import { AuthContextType } from './types';

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAdmin: false,
  isLoading: true,
  signIn: async () => ({ user: null, error: null }),
  signUp: async () => ({ user: null, error: null }),
  logout: async () => {},
  refreshProfile: async () => {},
});

export { AuthContext };
