import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsEnum,
  IsDate,
  Matches,
  Validate,
} from 'class-validator';
// import { IsOldEnough } from 'src/utils/AgeValidator';
import { IsDomainConstraint } from 'src/utils/emailValidators';

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
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @Validate(IsDomainConstraint, [
    '.com',
    '.co.uk',
    '.ng',
    '.org',
    'co.za',
    'net',
  ]) // Specify the allowed domain(s)
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Gender)
  gender: Gender;

}
