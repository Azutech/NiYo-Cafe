import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsEnum,
  IsBoolean,
  Matches,
  Validate,
} from 'class-validator';

enum Status {
  Incomplete = 'Incomplete',
  Finished = 'Finished',
}

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
