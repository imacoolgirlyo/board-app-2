import { IdentityProvider } from 'src/auth/authProfile';

export interface User {
  id: string;
  name?: string;
  email?: string;
  photo?: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface OAuthProfile {
  localId: string;
  accessToken: string;
  provider: IdentityProvider;
  refreshToken?: string;
  email?: string;
  name?: string;
  photo?: string;
}
