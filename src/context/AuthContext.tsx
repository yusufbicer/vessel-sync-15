
// This file re-exports the authentication context from the new structure
// to maintain backward compatibility
import { AuthContext, AuthProvider } from './auth';
export { AuthContext, AuthProvider } from './auth';
export { useAuth } from './auth';
export type { Profile, MetadataTypes, AuthContextType } from './auth/types';

export default AuthContext;
