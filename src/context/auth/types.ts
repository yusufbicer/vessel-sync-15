
export type Profile = {
  id: string;
  full_name: string;
  company_name: string;
  email: string;
  phone_number: string;
  role: string | null;
};

export interface MetadataTypes {
  fullName?: string;
  companyName?: string;
  phoneNumber?: string;
  [key: string]: any;
}

export type AuthContextType = {
  user: any;
  profile: Profile | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, metadata?: MetadataTypes) => Promise<any>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};
