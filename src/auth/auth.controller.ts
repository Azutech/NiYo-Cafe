import { Controller, Post, Body, Get, Query, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/model/users';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { LoginResponseDto } from 'src/users/dto/loginResponse';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    console.log('Received createUserDto:', createUserDto);

    const user = await this.authService.register(createUserDto);
    // Normally you would send a verification email with the token here

    return user;
  }

  @Post('login')
  async authenticate(@Body() loginDto: LoginUserDto): Promise<LoginResponseDto> {
    const user = await this.authService.login(loginDto);
    // Normally you would send a verification email with the token here

    return user;
  }

  @Get('activateAccount')
  async activate(@Query('id') id: string) {
    try {
      const activatedUser = await this.authService.accountActivation(id);
      return activatedUser;
    } catch (error) {
      throw new NotFoundException('Unable to activate account');
    }
  }
}
