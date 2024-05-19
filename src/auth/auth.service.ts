import { Injectable, HttpException, NotFoundException, HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, Status } from 'src/users/model/users';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { PasswordService } from 'src/utils/passwordService';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { JWTService } from 'src/jwt/jwt.token';
import { LoginResponseDto } from 'src/users/dto/loginResponse';


@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private passwordService: PasswordService,
    private userService: UsersService,
    private readonly jwtService: JWTService,
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
    } catch (err) {
      // Log error message and stack trace
      this.logger.error(err.message, err.stack);

      // Rethrow the error to propagate it
      throw err;
    }
  }

  async login(logindto: LoginUserDto): Promise<LoginResponseDto> {
    try {
      const { email, password } = logindto;

      const findUser = await this.userService.findByEmail(email);
      if (!findUser) {
        throw new HttpException('Email does not exist', HttpStatus.BAD_REQUEST);
      }

      if (findUser.status === 'Pending') {
        throw new HttpException('User is not Active', HttpStatus.UNAUTHORIZED);
      }

      const isPasswordValid = await this.passwordService.comparePasswords(
        password,
        findUser.password, // Assuming the user object has a password property
      );

      if (!isPasswordValid) {
        throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
      }

      const token = await this.jwtService.generateToken(findUser)

      const user : LoginResponseDto = {
        token : token,
        email : findUser.email
      }
        return user

    } catch (err) {
      this.logger.error(err.message, err.stack);

      // Rethrow the error to propagate it
      throw err;
    }
  }

  async accountActivation(code: string): Promise<User> {
    try {
      const findCode = await this.userService.findByCode(code);
    if (!findCode) {
      throw new NotFoundException('Verification Code not found',);
    }

    const findUser = await this.userService.findOne(findCode?._id) 
    if (! findUser) {
      throw new NotFoundException('Verification Code not found',);
    }

    const verifiedUser = await this.userService.activateAccount(findUser._id, findUser.status, findUser.verificationCode);

    if (!verifiedUser) {
			throw new HttpException('Unable to Activate account', HttpStatus.BAD_REQUEST );
		}

    return findUser;
    } catch (err) {
      this.logger.error(err?.message, err?.stack);
    }
  }
}
