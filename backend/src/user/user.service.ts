import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialProfile } from 'src/auth/socialProfile.model';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { User as UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOrCreate(profile: SocialProfile): Promise<UserModel> {
    const _user = await this.userRepository.findOneBy({ localId: profile.id });

    if (_user) {
      return _user;
    }

    const saved = await this.userRepository.save({
      name: profile.name,
      provider: profile.provider,
      email: profile.email,
      photo: profile.photo,
      localId: profile.id,
    });

    return saved;
  }
}
