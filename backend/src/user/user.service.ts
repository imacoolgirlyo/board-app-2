import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Token } from 'src/token/token.entity';
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

    // 이 함수의 가장 큰 문제는 계층이 같은 service 함수를 가져와서 썼다는 것임. 계층이 옆으로 참조하는게 아니라 아래의 함수를 사용해야함. 왜?

    // 함수는 user, profile 둘다 다루고 있다. 함수가 해야할 역할이 사실 상 두개인 것임. (user 생성, 토큰 생성)
    // user는 토큰에 대한 정보를 몰라도 된다. tokenService에서 다루는 token의 형태가 바뀌었을 때 userService까지 영향을 미치게 되는 것이다.
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

  async createUser(profile: OAuthProfile, token: Token): Promise<UserModel> {
    const user = await this.userRepository.create({
      name: profile.name,
      email: profile.email,
      photo: profile.photo,
      provider: profile.provider,
      localId: profile.localId,
      token,
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
      return null; // service에서는 error를 던지지 않나 보통?
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
