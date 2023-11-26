import { PartialType } from '@nestjs/swagger';
import { CreateShipmentDto } from './create-create-shipment.dto';

export class UpdateCreateShipmentDto extends PartialType(CreateShipmentDto) {}
