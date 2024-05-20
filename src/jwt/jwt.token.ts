import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/model/users';
import { ConfigService } from '@nestjs/config'; // Import ConfigService

@Injectable()
export class JWTService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService, // Inject ConfigService
  ) {}

  async generateToken(user: User): Promise<string> {
    const payload = { id: user._id, email: user.email };
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string): Promise<User> {
    try {
      const secretKey = this.configService.get<string>('JWT_SECRET'); // Retrieve secretKey from ConfigService
      const decoded = this.jwtService.verify(token, { secret: secretKey });
      return decoded as User;
    } catch (err) {
      // Token verification failed
      throw new UnauthorizedException('Invalid token');
    }
  }
}
