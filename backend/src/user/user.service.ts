import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { TokenService } from 'src/token/token.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { OAuthProfile, IUser as UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private tokenService: TokenService,
  ) {}

  async _findOrCreate(oauthProfile: OAuthProfile): Promise<UserModel> {
    const user = await this.userRepository.findOneBy({
      localId: oauthProfile.localId,
    });

    if (user) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }

    const savedUser = await this.saveProfile(oauthProfile);

    return savedUser;
  }

  async saveProfile(oauthProfile: OAuthProfile): Promise<UserModel> {
    const tokenIssuedByIdentityProvider = await this.tokenService.save(
      oauthProfile.accessToken,
      oauthProfile.refreshToken,
    );

    const user = await this.userRepository.create({
      name: oauthProfile.name,
      email: oauthProfile.email,
      photo: oauthProfile.photo,
      provider: oauthProfile.provider,
      localId: oauthProfile.localId,
      token: tokenIssuedByIdentityProvider,
    });

    const saved = await this.userRepository.save(user);

    return {
      id: saved.id,
      name: saved.name,
      email: saved.email,
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

  // TODO: condition type을 user의 column 중 하나로 찾을 수 있도록 변경
  async findOne(condition: { email?: string; id?: string; localId?: string }) {
    // TODO: 같은 이메일 사용하는 유저가 없도록 처리 필요
    const user = await this.userRepository.findOne({ where: condition });

    if (!user) {
      throw new Error('Can not find user.');
    }

    // TODO: user 모델 통일 필요
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }
}
