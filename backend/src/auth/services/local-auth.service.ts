import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { IUser as UserModel } from 'src/user/user.model';

@Injectable()
export class LocalAuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string): Promise<UserModel> {
    const user = await this.userService.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }
  }
}
