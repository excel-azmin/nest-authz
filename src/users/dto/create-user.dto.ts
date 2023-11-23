import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from 'src/enum/role.enum';

export class CreateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the user.',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user.',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      enum: Object.values(Role),
      example: Role.User,
    },
    description: 'Array of user roles',
  })
  roles: Role[];

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email address of the user.',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Ex@mpl#8934',
    description: 'Password has to be strong.',
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
