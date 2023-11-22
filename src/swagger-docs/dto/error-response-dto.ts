import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: 400 })
  code: number;

  @ApiProperty({ example: 'Bad Request' })
  message: string;

  @ApiProperty({
    example: [
      {
        message: 'should be string',
        field: 'name',
        value: '123',
      },
    ],
  })
  errors: {
    message: string;
    field: string;
    value: any;
  }[];
}
