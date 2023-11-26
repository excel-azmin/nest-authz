import { Body, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInUserDto } from 'src/users/dto/signin-user-dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInUserDto: SignInUserDto) {
    const response = await this.userService.signIn(signInUserDto);
    if (response.status === HttpStatus.OK) {
      return await this.getAccessToken(response);
    }
    return response;
  }

  async create(@Body() createUserDto: CreateUserDto) {
    const response = this.userService.create(createUserDto);
    if ((await response).status == HttpStatus.CREATED) {
      return await this.getAccessToken(response);
    }
    return response;
  }

  async getAccessToken(response) {
    const payload = {
      sub: (await response).user._id,
      fullName: (await response).user.fullName,
      email: (await response).user.email,
      roles: (await response).user.roles,
    };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  // async getRegisterAccessToken(response) {
  //   const payload = {
  //     sub: (await response).user._id,
  //     fullName: (await response).user.fullName,
  //     email: (await response).user.email,
  //     roles: (await response).user.roles,
  //   };
  //   return { access_token: await this.jwtService.signAsync(payload) };
  // }
}
