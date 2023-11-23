import { Body, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from 'src/users/dto/signin-user-dto';
import { UsersService } from 'src/users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInUserDto: SignInUserDto) {
    const user = await this.userService.signIn(signInUserDto);
    if (user.status === HttpStatus.OK) {
      const payload = {
        sub: user.user._id,
        fullName: user.user.fullName,
        email: user.user.email,
        roles: user.user.roles,
      };
      return { access_token: await this.jwtService.signAsync(payload) };
    }

    console.log(user.status);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(@Body() createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
