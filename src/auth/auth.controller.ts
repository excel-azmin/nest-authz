import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInUserDto } from 'src/users/dto/signin-user-dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @Public()
  async singIn(@Body() signInUserDto: SignInUserDto) {
    return await this.authService.signIn(signInUserDto);
  }

  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.authService.create(createUserDto);
  }
}
