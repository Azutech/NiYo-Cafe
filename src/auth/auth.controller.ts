import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/model/users';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    console.log('Received createUserDto:', createUserDto);

    const user = await this.authService.create(createUserDto);
    // Normally you would send a verification email with the token here

    return user;
  }
}
