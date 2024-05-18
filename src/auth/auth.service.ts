import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, Status } from 'src/users/model/users';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { PasswordService } from 'src/utils/passwordService';

@Injectable()
export class AuthService {
  [x: string]: any;
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private passwordService: PasswordService, // Correctly inject PasswordService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { fullName, email, password, gender, dateOfBirth } = createUserDto;

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new HttpException('Email is already taken', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await this.passwordService.hashPassword(password);

    const verificationToken = uuidv4();

    const user = new this.userModel({
     ...createUserDto,
      password: hashedPassword,
      status: Status.Pending,
      verificationToken,
    });

    // Save the user to the database
    const createdUser = await user.save();

    // Here you would send the verification email with the token
    // For demonstration, we just return the user with the token
    return createdUser;
  }
}
