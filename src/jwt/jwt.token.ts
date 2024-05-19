import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/model/users';

@Injectable()
export class JWTService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: User): Promise<string> {
    const payload = { sub: user._id, username: user.email };
    return this.jwtService.sign(payload);
  }
}
