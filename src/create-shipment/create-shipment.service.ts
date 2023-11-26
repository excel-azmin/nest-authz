import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateShipmentDto } from './dto/create-create-shipment.dto';
import { UpdateCreateShipmentDto } from './dto/update-create-shipment.dto';
import { CreateShipment } from './entities/create-shipment.entity';

@Injectable()
export class CreateShipmentService {
  constructor(
    @InjectRepository(CreateShipment)
    private shipmentRepository: Repository<CreateShipment>,
  ) {}

  async create(createShipmentDto: CreateShipmentDto): Promise<any> {
    console.log(createShipmentDto.created_by);
    const newShipment = this.shipmentRepository.create({
      invoice_no: createShipmentDto.invoice_no,
      lc_no: createShipmentDto.lc_no,
      customer: createShipmentDto.customer,
      item: createShipmentDto.item,
      qty: createShipmentDto.qty,
      created_by: { _id: new ObjectId(createShipmentDto.created_by) },
    });
    console.log(newShipment.created_by);
    return newShipment.save();
  }

  async findAll() {
    const shipment = await this.shipmentRepository.find({
      relations: User['created_by'],
    });

    console.log(shipment);

    return shipment;
  }

  findOne(id: number) {
    return `This action returns a #${id} createShipment`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateCreateShipmentDto: UpdateCreateShipmentDto) {
    return `This action updates a #${id} createShipment`;
  }

  remove(id: number) {
    return `This action removes a #${id} createShipment`;
  }
}
