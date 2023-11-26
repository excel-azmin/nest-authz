import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthMailService } from './auth-mail.service';

@Controller('auth-mail')
@ApiTags('auth-mail')
export class AuthMailController {
  constructor(private readonly authMailService: AuthMailService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.authMailService.create(createUserDto);
  }

  @Post('/verify:token')
  async verify(@Param('token') token: string) {
    return this.authMailService.verify(token);
  }
}
