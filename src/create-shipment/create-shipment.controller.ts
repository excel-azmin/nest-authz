import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Role } from 'src/enum/role.enum';
import { CreateShipmentService } from './create-shipment.service';
import { CreateShipmentDto } from './dto/create-create-shipment.dto';
import { UpdateCreateShipmentDto } from './dto/update-create-shipment.dto';

@Controller('create-shipment')
@ApiTags('create-shipment')
@ApiBearerAuth()
export class CreateShipmentController {
  constructor(
    private readonly createShipmentService: CreateShipmentService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User, Role.Manager, Role.Admin)
  async create(@Req() req, @Body() createShipmentDto: CreateShipmentDto) {
    createShipmentDto.created_by = req.user.sub;
    console.log('controller', req.user.sub);
    return await this.createShipmentService.create(createShipmentDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User, Role.Manager, Role.Admin)
  async findAll() {
    return await this.createShipmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.createShipmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCreateShipmentDto: UpdateCreateShipmentDto,
  ) {
    return this.createShipmentService.update(+id, updateCreateShipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.createShipmentService.remove(+id);
  }
}
