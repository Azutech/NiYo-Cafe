import { IsNotEmpty, IsEmail, IsString, IsEnum, IsDate } from 'class-validator';
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
