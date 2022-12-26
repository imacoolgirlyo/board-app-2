import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdentityProvider, SocialProfile } from 'src/auth/socialProfile.model';
import { TokenService } from 'src/token/token.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { User as UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private tokenService: TokenService,
  ) {}

  async findOrCreate(profile: SocialProfile): Promise<UserModel> {
    const _user = await this.userRepository.findOneBy({ localId: profile.id });

    if (_user) {
      return _user;
    }

    const token = await this.tokenService.save(profile.accessToken);
    const saved = await this.userRepository.save({
      name: profile.name,
      provider: profile.provider,
      email: profile.email,
      photo: profile.photo,
      localId: profile.id,
      token,
    });

    return saved;
  }

  async create(profile): Promise<{ id: string; provider: IdentityProvider }> {
    const openBankingToken = await this.tokenService.create(profile.token);

    const saved = await this.userRepository.save({
      provider: profile.provider,
      localId: profile.id,
      token: openBankingToken,
    });

    return {
      id: saved.id,
      provider: saved.provider,
    };
  }
}
