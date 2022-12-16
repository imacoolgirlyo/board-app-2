export interface SocialProfile {
  id: string;
  name?: string;
  provider: IdentityProvider;
  email: string;
  accessToken: string;
  photo?: string;
}

export enum IdentityProvider {
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
}
