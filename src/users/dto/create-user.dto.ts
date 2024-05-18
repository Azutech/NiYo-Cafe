import { IsNotEmpty, IsEmail, IsString, IsEnum, IsDate, Matches} from 'class-validator';
import { IsEmailDomain } from 'src/utils/emailValidators';

enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @IsEmailDomain({
    message:
      'Email domain is not allowed. Allowed domains are: .com, .co.uk, .ng, .org, co.za',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsDate()
  dateOfBirth: Date;
}
