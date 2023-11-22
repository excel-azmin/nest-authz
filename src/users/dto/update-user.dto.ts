import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'Updated John',
    description: 'The updated first name of the user.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @ApiProperty({
    example: 'Updated Doe',
    description: 'The updated last name of the user.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @ApiProperty({
    example: 'updated@example.com',
    description: 'The updated email address of the user.',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email?: string;
}
