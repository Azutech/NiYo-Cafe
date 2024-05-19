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

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
