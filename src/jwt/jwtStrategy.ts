import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/model/users';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<User> {
    try {
      console.log('JWT payload:', payload);
      const user = await this.userService.findOne(payload.id);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (error) {
      console.error('JWT validation error:', error);
      throw error;
    }
  }
}

