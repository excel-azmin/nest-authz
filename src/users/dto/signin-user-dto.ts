import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class SignInUserDto {
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
