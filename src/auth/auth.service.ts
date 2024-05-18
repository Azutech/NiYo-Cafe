import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, Status } from 'src/users/model/users';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { PasswordService } from 'src/utils/passwordService';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private passwordService: PasswordService,
    private userService: UsersService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { fullName, email, password, gender } = createUserDto;

      const existingUser = await this.userService.findByEmail(email);
      if (existingUser) {
        throw new HttpException('Email is already taken', HttpStatus.CONFLICT);
      }

      const hashedPassword = await this.passwordService.hashPassword(password);

      const verificationCode = uuidv4();

      const user = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
        status: Status.Pending,
        verificationCode,
      });

      // Save the user to the database
      const createdUser = await user.save();

      if (!createdUser) {
        throw new HttpException(
          'User could not be created',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Here you would send the verification email with the token
      // For demonstration, we just return the user with the token
      return createdUser;
    } catch (error) {
      // Log error message and stack trace
      this.logger.error(error.message, error.stack);

      // Rethrow the error to propagate it
      throw error;
    }
  }

  async login(logindto: LoginUserDto): Promise<User> {
    const { email, password } = logindto

    const findUser = await this.userService.findByEmail(email);
    if (!findUser) {
      throw new HttpException('Email does not exist', HttpStatus.BAD_REQUEST);
    }

    if (findUser.status === 'Pending') {
        throw new HttpException("User is not Active", HttpStatus.UNAUTHORIZED)
    }

    const isPasswordValid = await this.passwordService.comparePasswords(
        password,
        findUser.password, // Assuming the user object has a password property
      );
    
      if (!isPasswordValid) {
        throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
      }
    
      return findUser;
  }
}
