import { ApiProperty } from '@nestjs/swagger';

export class UserNotFoundResponseDto {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'User not found' })
  message: string;
}
