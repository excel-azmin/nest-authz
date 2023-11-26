import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateShipmentDto {
  @ApiProperty({ example: '12345', description: 'The invoice number' })
  @IsString()
  invoice_no: string;

  @ApiProperty({ example: '67890', description: 'The LC number' })
  @IsString()
  lc_no: string;

  @ApiProperty({
    example: 'Customer Name',
    description: 'Name of the customer',
  })
  @IsString()
  customer: string;

  @ApiProperty({ example: 'Item Name', description: 'Name of the item' })
  @IsString()
  item: string;

  @ApiProperty({ example: 10, description: 'Quantity of the item' })
  @IsNumber()
  qty: number;

  // For createdBy, assuming you only need the userId
  @ApiProperty({
    example: '6562e66af9eb3f97e11301f6',
    description: 'ID of the user who created the shipment',
  })
  @IsString()
  created_by: string; // Use string type assuming the user ID is a string
}
