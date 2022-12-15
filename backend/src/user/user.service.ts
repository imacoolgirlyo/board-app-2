import { Injectable } from '@nestjs/common';
import { SocialProfile } from 'src/auth/socialProfile.model';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor() {}

  async findOrCreate(profile: SocialProfile): Promise<User> {
    return {
      id: 'db id',
      email: profile.email,
      photo: profile.photo,
      name: profile.name,
    };
  }
}
