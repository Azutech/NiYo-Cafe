import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/model/users';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { LoginResponseDto } from 'src/users/dto/loginResponse';
import { ActivationResponse } from '../clientresponse/clientResponse';
import { JwtAuthGuard } from 'src/jwt/jwt.auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto): Promise<Partial<User>> {
    const user = await this.authService.register(createUserDto);
    // Normally you would send a verification email with the token here

    return user;
  }

  @Post('login')
  async authenticate(
    @Body() loginDto: LoginUserDto,
  ): Promise<LoginResponseDto> {
    const user = await this.authService.login(loginDto);
    // Normally you would send a verification email with the token here

    return user;
  }

  @Get('activateAccount')
  async activate(
    @Query('verication_code') verication_code: string,
  ): Promise<ActivationResponse> {
    const activatedUser =
      await this.authService.accountActivation(verication_code);
    return activatedUser;
  }

  @UseGuards(JwtAuthGuard) // Protect the endpoint with JWT authentication
  @Get('me')
  async getMe(@Req() req): Promise<User> {
    // Extract user information from the request

    console.log('Request user:', req.user); // Log the request user object

    const user = req.user;
    return user;
  }
}
