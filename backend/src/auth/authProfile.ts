import { OAuthProfile } from 'src/user/user.model';
import { IdentityProvider } from './socialProfile.model';

type Name = string | undefined;
type Email = { value: string };
type Photo = Email;

export interface IFacebookProfile {
  id: string;
  username: Name;
  name: { familyName: Name; givenName: Name; middleName: Name };
  gender: Name;
  profileUrl: Name;
  emails: Email[];
  photos: Photo[];
  provider: 'facebook';
  _raw: string;
}

export interface IGoogleProfile {
  id: string;
  displayName: string;
  provider: string; // 'google'
  name?: { familyName: string; givenName: string };
  emails?: { value: string; verified: boolean }[];
  photos?: { value: string }[];
  _raw: string;
  _json: {
    sub: string;
    name?: string;
    given_name?: string;
    family_name?: string;
    picture?: string;
    email?: string;
    email_verified?: boolean;
    locale?: string;
    hd?: string;
  };
}

abstract class AuthProfile {
  profile: any;
  constructor(profile: any) {
    this.profile = profile;
  }

  public abstract convertToOAuthProfile(
    accessToken: string,
    refreshToken: string,
  ): OAuthProfile;
}

export class FacebookProfile extends AuthProfile {
  profile: IFacebookProfile;
  constructor(profile: IFacebookProfile) {
    super(profile);
    this.profile = profile;
  }

  getEmail() {
    return this.profile.emails.length > 0
      ? this.profile.emails[0].value
      : undefined;
  }

  getName() {
    const name = [
      this.profile.name.familyName ?? '',
      this.profile.name.givenName ?? '',
      this.profile.name.middleName ?? '',
    ].join(' ');

    return this.profile.username ?? name;
  }

  getPhotoUrl() {
    return this.profile.photos.length > 0
      ? this.profile.photos[0].value
      : undefined;
  }

  public convertToOAuthProfile(
    accessToken: string,
    refreshToken: string,
  ): OAuthProfile {
    return {
      localId: this.profile.id,
      provider: IdentityProvider.FACEBOOK,
      accessToken,
      refreshToken,
      email: this.getEmail(),
      name: this.getName(),
      photo: this.getPhotoUrl(),
    };
  }
}

export class GoogleProfile extends AuthProfile {
  profile: IGoogleProfile;
  constructor(profile: IGoogleProfile) {
    super(profile);
    this.profile = profile;
  }

  public convertToOAuthProfile(
    accessToken: string,
    refreshToken?: string,
  ): OAuthProfile {
    return {
      localId: this.profile.id,
      provider: IdentityProvider.GOOGLE,
      accessToken,
      refreshToken,
      email: this.getEmail(),
      name: this.getName(),
      photo: this.getPhotoUrl(),
    };
  }

  getPhotoUrl() {
    return this.profile.photos.length > 0
      ? this.profile.photos[0].value
      : undefined;
  }

  getName() {
    return this.profile.name
      ? `${this.profile.name.familyName ?? ''} ${
          this.profile.name.givenName ?? ''
        }`
      : undefined;
  }

  getEmail() {
    return this.profile.emails.length > 0
      ? this.profile.emails[0].value
      : undefined;
  }
}
