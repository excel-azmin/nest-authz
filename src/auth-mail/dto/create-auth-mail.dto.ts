import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthMailDto {
  @IsEmail()
  @ApiProperty({
    example: 'test.azmin@gmail.com',
    description: 'The email address of the user.',
  })
  @IsNotEmpty()
  email: string;
}
