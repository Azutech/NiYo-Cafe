import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/model/users';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.authService.create(createUserDto);
    // Normally you would send a verification email with the token here
    return user;
  }
}
