import {
    IsNotEmpty,
    IsEmail,
    IsString,
   
  } from 'class-validator';
  
  export class LoginResponseDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    token: string;
  }