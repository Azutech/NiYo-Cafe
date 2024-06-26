import { PasswordService } from 'src/utils/passwordService';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from '../jwt/jwtStrategy';
import { JWTService } from 'src/jwt/jwt.token';
import { EventsModule } from 'src/events/events.module';
// import { UserGateway } from 'src/websocket/user.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load configuration from .env
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule to use ConfigService
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Get secret from .env
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService], // Inject ConfigService
    }),

    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    UsersModule,
    EventsModule
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PasswordService, JWTService], //UserGateway],
})
export class AuthModule {}
