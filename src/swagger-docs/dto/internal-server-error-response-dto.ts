import { ApiProperty } from '@nestjs/swagger';

export class InternalServerErrorResponseDto {
  @ApiProperty({ example: 500 })
  code: number;

  @ApiProperty({ example: 'Internal Server Error' })
  status: string;

  @ApiProperty({ example: 'Internal Server Error' })
  message: string;
}
