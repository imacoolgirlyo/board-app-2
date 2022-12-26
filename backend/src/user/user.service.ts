import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
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

  async findById(id: string): Promise<UserModel> {
    const user = await this.userRepository.findOne({ where: { id } });
    return {
      id: user.id,
    };
  }

  async update(user: {
    id: string;
    name: string;
    email: string;
    password: string;
  }): Promise<UserModel> {
    const _user = await this.userRepository.findOne({ where: { id: user.id } });
    if (!_user) {
      throw new Error('Can not find user.');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    _user.email = user.email;
    _user.name = user.name;
    _user.password = hashedPassword;

    const saved = await this.userRepository.save(_user);

    return {
      id: saved.id,
      name: saved.name,
      email: saved.email,
    };
  }
}
