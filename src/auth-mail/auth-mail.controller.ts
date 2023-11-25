import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthMailService } from './auth-mail.service';
import { CreateAuthMailDto } from './dto/create-auth-mail.dto';
import { UpdateAuthMailDto } from './dto/update-auth-mail.dto';

@Controller('auth-mail')
@ApiTags('auth-mail')
export class AuthMailController {
  constructor(private readonly authMailService: AuthMailService) {}

  @Post()
  create(@Body() createAuthMailDto: CreateAuthMailDto) {
    return this.authMailService.create(createAuthMailDto);
  }

  @Get()
  findAll() {
    return this.authMailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authMailService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthMailDto: UpdateAuthMailDto,
  ) {
    return this.authMailService.update(+id, updateAuthMailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authMailService.remove(+id);
  }
}
