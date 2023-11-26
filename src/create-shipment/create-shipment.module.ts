import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateShipmentController } from './create-shipment.controller';
import { CreateShipmentService } from './create-shipment.service';
import { CreateShipment } from './entities/create-shipment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreateShipment])],
  controllers: [CreateShipmentController],
  providers: [CreateShipmentService],
})
export class CreateShipmentModule {}
