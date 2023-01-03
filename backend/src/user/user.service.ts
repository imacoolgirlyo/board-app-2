import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Token } from 'src/token/token.entity';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { OAuthProfile, IUser as UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

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
