import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { RegisterUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneEmail(email);
    if (user && (await user.comparePassword(pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const isAdmin = user.email === process.env.JWT_ADMIN_EMAIL;
    const payload = {
      email: user.email,
      sub: Number(user.id),
      isAdmin,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin,
      },
    };
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    return this.usersService.create(registerUserDto);
  }

  async verifyAdminToken(token: string): Promise<boolean> {
    try {
      const payload = this.jwtService.verify(token);
      return !!payload.isAdmin;
    } catch (e) {
      console.error('Token verification error:', e);
      return false;
    }
  }

  async getProfile(token: string): Promise<User | null> {
    try {
      const payload = this.jwtService.verify(token);

      if (!payload?.sub) {
        throw new Error('JWT payload не содержит sub');
      }

      const userId = parseInt(payload.sub, 10);

      if (isNaN(userId)) {
        throw new Error(`Некорректный ID пользователя: ${payload.sub}`);
      }

      const user = await this.usersService.findOne(userId);
      return user;
    } catch (e) {
      throw new UnauthorizedException('Не удалось получить профиль');
    }
  }
}
